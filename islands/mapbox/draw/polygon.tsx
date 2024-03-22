import { useState, useCallback } from 'preact/hooks';
import Map from '@/3rd/react-map-gl/index.ts';

import ControlPanel from './control-panel.tsx';
import DrawControl from './draw-control.tsx';
import { conf } from '@/conf.ts';

type FeaturesObject = { features: { id: string; }[]; };

export function MapboxDrawPolygon() {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e: FeaturesObject) => {
    setFeatures(currFeatures => {
      const newFeatures = { ...currFeatures } as any;
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: FeaturesObject) => {
    setFeatures(currFeatures => {
      const newFeatures = { ...currFeatures } as any;
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <div>
      <Map
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={conf.mapbox.accessToken}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate!}
          onUpdate={onUpdate!}
          onDelete={onDelete!}
        />
      </Map>
      <ControlPanel polygons={Object.values(features)} />
    </div>
  );
}
