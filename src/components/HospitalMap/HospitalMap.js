import {useState, useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import {fetchOriginAndDestination, fetchRoute, stepsToPoints} from "./mapFunctions";

function HospitalMap({addresses}) {


	async function loadMap(addresses) {
		// load required data
		const coors = await fetchOriginAndDestination(addresses);
		const route = await fetchRoute(coors);
		const path = stepsToPoints(route.steps);
		console.info({route});
		// set states
		setRoutes(path);
		setOrigin(coors[0].reverse());
		setDestination(coors[1].reverse());
		setCenter([(coors[0][0] + coors[1][0]) / 2, (coors[0][1] + coors[1][1]) / 2]);
		setZoom(9);
		setMapReady(true);
	}

	const [mapReady, setMapReady] = useState(false);
	const [origin, setOrigin] = useState([0, 0]);
	const [destination, setDestination] = useState([0, 0]);
	const [center, setCenter] = useState([0, 0]);
	const [zoom, setZoom] = useState(10);
	const [routes, setRoutes] = useState([]);

	useEffect(() => {
		loadMap(addresses);
	}, []);

	return (
		<section style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "450px", margin: "auto", backgroundColor: "#ccc"}}>
			{mapReady ? <MapContainer center={center} zoom={zoom} style={{width: "100%", height: "450px"}}>
				<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<Polyline positions={routes} color="red" />
				<Marker position={origin}>
					<Popup>
						{addresses?.origin}
					</Popup>
				</Marker>
				<Marker position={destination}>
					<Popup>
						{addresses?.destination}
					</Popup>
				</Marker>
			</MapContainer> : <span>loading map...</span>}
		</section>
	);
}

export default HospitalMap;