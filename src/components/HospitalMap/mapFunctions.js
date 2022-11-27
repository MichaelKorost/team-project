import {apiKey} from "./tokens";

export async function fetchAllMatchingAddresses(address) {
	try {
		const req = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`);
		const json = await req.json();
		return json;
	} catch (err) {
		console.error("fetchAddress :: fetch error", {address}, err);
		return null;
	}
}

export async function fetchAddress(address) {
	try {
		const suggestions = await fetchAllMatchingAddresses(address);
		const location = suggestions?.features?.[0]?.geometry?.coordinates|| [0, 0];
		return location;
	} catch (err) {
		console.error("fetchAddress :: fetch error", {address}, err);
		return null;
	}
}

export async function fetchOriginAndDestination(addresses) {
	try {
		const {origin, destination} = addresses;
		const coors = await Promise.all([origin, destination].map(address => fetchAddress(address)));
		return coors;
	} catch (err) {
		console.error("fetchOriginAndDestination :: fetch error", {addresses}, err);
		return null;
	}
}

export async function fetchRoute(coors) {
	try {
		const req = await fetch(`https://routing.openstreetmap.de/routed-car/route/v1/driving/${coors.map(coor => coor.join(",")).join(";")}?overview=false&geometries=polyline&steps=true`);
		const json = await req.json();
		if (json.code !== "Ok") {
			throw new Error("code status not Ok");
		}
		return json.routes[0].legs[0];
	} catch (err) {
		console.erroror("fetchRoute :: fetch error", {coors}, err);
		return null;
	}
}

export function decodeGeometry(encoded) {
	// https://stackoverflow.com/questions/15924834/decoding-polyline-with-new-google-maps-api
	if (!encoded) {
		return [];
	}
	let poly = [];
	let index = 0, len = encoded.length;
	let lat = 0, lng = 0;

	while (index < len) {
		let b, shift = 0, result = 0;

		do {
			b = encoded.charCodeAt(index++) - 63;
			result = result | ((b & 0x1f) << shift);
			shift += 5;
		} while (b >= 0x20);

		let dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
		lat += dlat;

		shift = 0;
		result = 0;

		do {
			b = encoded.charCodeAt(index++) - 63;
			result = result | ((b & 0x1f) << shift);
			shift += 5;
		} while (b >= 0x20);

		let dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
		lng += dlng;

		let p = [lat / 1e5, lng / 1e5];
		poly.push(p);
	}
	return poly;
}

export function stepsToPoints(steps) {
	const coors = [];
	steps.forEach(step => {
		const decoded = decodeGeometry(step.geometry);
		coors.push(...decoded);
	});
	return coors;
}