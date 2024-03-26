import { createContext } from "preact";
import { useContext } from "preact/hooks";

export const AppContext = createContext({
  mapbox_access_token: "",
});

export function useMapboxToken(mutator?: (token: string) => void) {
  const data = useContext(AppContext);
  if (mutator) {
    mutator(data.mapbox_access_token);
  }
  return data.mapbox_access_token;
}