import { MapboxDrawPolygon } from "@/islands/mapbox/draw/polygon.tsx";
import { createContext } from "preact";
import { useContext } from "preact/hooks";

const CSP_CONTEXT = createContext<number | undefined>(10);
function useCSP(mutator: (csp: number) => void) {
  const csp = useContext(CSP_CONTEXT);
  if (csp) {
    mutator(csp);
  }
}

export default function App() {
  useCSP((n) => {
    console.log("CSP", n);
  });
  return <MapboxDrawPolygon />;
}
