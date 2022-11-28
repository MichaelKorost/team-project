import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { geocodeApiKey, placesApiKey } from './tokens';

export async function fetchUserAddressFromSettings(user) {
  const fallbackAddress =
    '221b Baker St, London, England' || '10 Downing St, London, England, UK'; // address in case there's no address in the user's data
  try {
    const docRef = doc(db, 'users', user.uid);
    const docUser = await getDoc(docRef);
    const data = docUser.data();
    console.log(data);
    return (
      data?.location ??
      (console.warn(
        'fetchUserAddressFromSettings :: could not find a defined user address. using fallback location instead'
      ) ||
        fallbackAddress)
    );
  } catch (err) {
    console.error('fetchUserAddressFromSettings ::  fetch error', err);
    return null;
  }
}

export async function fetchAllMatchingAddresses(address) {
  try {
    const req = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=${geocodeApiKey}`
    );
    const json = await req.json();
    return json;
  } catch (err) {
    console.error('fetchAddress :: fetch error', { address }, err);
    return null;
  }
}

export async function fetchAddress(address) {
  try {
    const suggestions = await fetchAllMatchingAddresses(address);
    const location = suggestions?.features?.[0]?.geometry?.coordinates || [
      0, 0,
    ];
    return location;
  } catch (err) {
    console.error('fetchAddress :: fetch error', { address }, err);
    return null;
  }
}

// fetch coordinates of origin and destination (===DEPRECATED===)
// deprecation reason: this function was only used for testing where the values have been hard-coded. not necessary for the final product
export async function fetchOriginAndDestination(addresses) {
  try {
    const { origin, destination } = addresses;
    const coors = await Promise.all(
      [origin, destination].map((address) => fetchAddress(address))
    );
    return coors;
  } catch (err) {
    console.error(
      'fetchOriginAndDestination :: fetch error',
      { addresses },
      err
    );
    return null;
  }
}

/* hospital finder */

// find hospital closest to coor
export async function fetchNearestHospital(coor) {
  try {
    const nearbyHospitals = await fetchNearbyHospitals(coor);
    const nearestHospital = findNearestHospital(nearbyHospitals);
    return nearestHospital;
  } catch (err) {
    console.error('fetchNearestHospital :: fetch error', { coor }, err);
    return null;
  }
}

// find hospitals near my area, return features array
export async function fetchNearbyHospitals(coor) {
  try {
    const req = await fetch(
      `https://api.geoapify.com/v2/places?categories=healthcare.hospital&bias=proximity:${coor.join(
        ','
      )}&limit=20&apiKey=${placesApiKey}`
    );
    const json = await req.json();
    return json.features;
  } catch (err) {
    console.error('fetchNearbyHospitals :: fetch error', { coor }, err);
    return null;
  }
}

// get list of hospitals (features array from geoapify's places api) and return the nearest one
export function findNearestHospital(hosptalList) {
  try {
    return hosptalList.reduce((nominee, curr) =>
      curr.properties.distance < nominee.properties.distance ? curr : nominee
    );
  } catch (err) {
    console.error(
      'findNearestHospital :: issue finding the nearest hospital. please check input',
      { hosptalList }
    );
  }
}

/* route finder */

// fetch rotue data between 2 coordinates
export async function fetchRoute(coors) {
  try {
    const req = await fetch(
      `https://routing.openstreetmap.de/routed-car/route/v1/driving/${coors
        .map((coor) => coor.join(','))
        .join(';')}?overview=false&geometries=polyline&steps=true`
    );
    const json = await req.json();
    if (json.code !== 'Ok') {
      throw new Error('code status not Ok');
    }
    return json.routes[0].legs[0];
  } catch (err) {
    console.error('fetchRoute :: fetch error', { coors }, err);
    return null;
  }
}

// decode polyline data (could have just forEached over the maneuovers but meh. tried to decode but whose brightest idea was to use a bitwise or, am i supposed
// to pull out my magic wand and poof know which byte the 6th byte was :p anyway was too lazy to figure this one out, i've been pretty edepressed lately
// so ima steal it from github like a REAL developer
export function decodeGeometry(encoded) {
  // https://stackoverflow.com/questions/15924834/decoding-polyline-with-new-google-maps-api
  if (!encoded) {
    return [];
  }
  let poly = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);

    let dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);

    let dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    let p = [lat / 1e5, lng / 1e5];
    poly.push(p);
  }
  return poly;
}

// conver geoapify's geocode api's steps to  actual coordinates that will be used to trace a path
export function stepsToPoints(steps) {
  const coors = [];
  steps.forEach((step) => {
    const decoded = decodeGeometry(step.geometry);
    coors.push(...decoded);
  });
  return coors;
}

/* miscellaneous */

// calculate zoom from distance (0=entire map, 19=max zoom)
export function calcZoom(distance) {
  // console.log("calcZoom", {distance});
  // const resolution = 0.5;
  // const zoom = 20 - Math.round(Math.log2(156412/(distance * resolution)));
  // return Math.max(Math.min(20, zoom), 0);
  return 20 - Math.round(Math.log2(156412 / distance));
}
