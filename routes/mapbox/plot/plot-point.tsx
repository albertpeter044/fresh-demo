import PlotPoint from  "@/islands/mapbox/plot/plot-point.tsx";

export default function App() {
  const token = Deno.env.get("MAPBOX_TOKEN") !
  return (
    <PlotPoint token={token}/>
  );
}