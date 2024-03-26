import { MapboxDrawPolygon } from "@/islands/mapbox/draw/polygon.tsx";
import { useMapboxToken } from "@/context/app-context.ts";
import { AppContext } from "@/context/app-context.ts";

export default function App() {
  const mapbox_access_token = useMapboxToken();
  if (!mapbox_access_token){
    return <div>Please set `export MAPBOX_TOKEN=""`</div>
  }
  return (
    <AppContext.Provider value={{ mapbox_access_token: "1234" }}>
      <MapboxDrawPolygon token={mapbox_access_token}/>
    </AppContext.Provider>
  );
}
