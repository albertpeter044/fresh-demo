// import * as turf from '@turf/turf';
// import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

interface Props {
  token: string;
  container: string;
}

export function getMapbox({ token, container }: Props) {
  mapboxgl.accessToken = token;
  const mapbox = new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [116.393, 40],
    zoom: 9,
  });

  mapbox.on('move', () => {
    const center = mapbox.getCenter();
    const zoom = mapbox.getZoom();
    location.hash = `#${center.lng.toFixed(4)},${center.lat.toFixed(4)},${zoom.toFixed(2)}`;
  });
  
  return mapbox;
}
