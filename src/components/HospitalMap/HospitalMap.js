import {useState, useEffect, useContext} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import {fetchRoute, stepsToPoints, fetchAddress, fetchNearestHospital, calcZoom, fetchUserAddressFromSettings} from './mapFunctions';
import { AuthContext } from '../../AuthContext';

function HospitalMap({setHospitalName}) {

	const {user} = useContext(AuthContext);

	async function loadMap() {
		try {
			// load required data
			const originAddressName = await fetchUserAddressFromSettings(user); // temporary address as a test
			const originAddressCoor = await fetchAddress(originAddressName);
			const destinationAddressData = await fetchNearestHospital(originAddressCoor);
			console.log({user});
			const destinationAddressCoor = destinationAddressData.geometry.coordinates;
			const coors = [originAddressCoor, destinationAddressCoor].map(coor => coor.reverse());
			const route = await fetchRoute(coors.map(coor => coor.concat().reverse()));
			const path = stepsToPoints(route.steps);
			// set states
			setRoutes(path);
			setOriginName(originAddressName);
			setDestinationName(destinationAddressData.properties.formatted);
			setOrigin(coors[0]);
			setDestination(coors[1]);
			setCenter([(coors[0][0] + coors[1][0]) / 2, (coors[0][1] + coors[1][1]) / 2]);
			setZoom(calcZoom(destinationAddressData.properties.distance));
			const ps = destinationAddressData.properties;
			setHospitalName((ps.name ? ps.name + ", " : "") + ps.formatted);
			setMapReady(true);
		} catch (err) {
			console.error("loadMap :: unable to construct map", {err});
			setLoadingText("Error: Could not construct map/locate hospital. Please check again your address settings");
		}
	}

	const [mapReady, setMapReady] = useState(false);
	const [origin, setOrigin] = useState([0, 0]);
	const [originName, setOriginName] = useState("Destination");
	const [destination, setDestination] = useState([0, 0]);
	const [destinationName, setDestinationName] = useState("Destination");
	const [center, setCenter] = useState([0, 0]);
	const [zoom, setZoom] = useState(10);
	const [routes, setRoutes] = useState([]);
	const [loadingText, setLoadingText] = useState("loading map...");

	useEffect(() => {
		loadMap();
	}, []);

	return (
		<section style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "450px", margin: "auto", backgroundColor: "#ccc"}}>
			{mapReady ? <MapContainer center={center} zoom={zoom} style={{width: "100%", height: "450px"}}>
				<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Polyline positions={routes} color="red" />
				<Marker position={origin}>
					<Popup>
						{originName}
					</Popup>
				</Marker>
				<Marker position={destination}>
					<Popup>
						{destinationName}
					</Popup>
				</Marker>
			</MapContainer> : <div>{loadingText}</div>}
		</section>
	);
}

export default HospitalMap;