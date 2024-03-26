import { useCallback, useState } from "preact/hooks";
import Map from "@/3rd/react-map-gl/index.ts";

import {DrawControl} from "./draw-control.tsx";
import { useMapboxToken } from "@/context/app-context.ts";

type FeaturesObject = { features: { id: string }[] };

export function MapboxDrawPolygon({ token }: { token: any }) {
  const [features, setFeatures] = useState({});
  const mapbox_access_token = useMapboxToken();
  console.log("read token from context:", { mapbox_access_token });

  const onUpdate = useCallback((e: FeaturesObject) => {
    console.log("polygon:", e.features[0]);
    setFeatures(e.features[0]);
  }, []);

  const onDelete = useCallback((e: FeaturesObject) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures } as Record<string, any>;
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <div class="h-5/6">
      <Map
        className="mapx "
        class="mapx2 "
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={token}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate!}
          onUpdate={onUpdate!}
          onDelete={onDelete!}
        />
      </Map>
      <div class="pre">
        features:{JSON.stringify(features)}
      </div>
    </div>
  );
}
