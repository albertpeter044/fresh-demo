import { getMapbox } from "../lib.ts";
import { useEffect, useRef } from "preact/hooks";
import mapboxgl from "mapbox-gl";

interface Props {
  token: string;
}

const featureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        "name": "Beijing",
      },
      geometry: {
        type: "Point",
        coordinates: [116.4057, 39.9045],
      },
    },
    {
      type: "Feature",
      properties: {
        "name": "Shanghai",
      },
      geometry: {
        type: "Point",
        coordinates: [121.4737, 31.2304],
      },
    },
  ],
};
export default ({ token }: Props) => {
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current);
    const mapbox = getMapbox({
      token,
      container: "map",
    });
    mapbox.on("load", () => {
      mapbox.addSource("points", {
        type: "geojson",
        data:featureCollection,
      });
      mapbox.addLayer({
        id: "points",
        type: "circle",
        source: "points",
        paint: {
          "circle-radius": 20,
          "circle-color": "#007cbf",
        },
      });

      //on click
      mapbox.on("click", "points", function (e: any) {
        // Assuming the properties you want to display are 'title' and 'description'
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML("<h3>" + e.features[0].properties.name + "</h3><p> </p>")
          .addTo(mapbox);
      });
    });
  }, []);

  return (
    <div class="h-full">
      <div id="map" class="h-5/6 w-200" ref={ref}></div>
    </div>
  );
};
