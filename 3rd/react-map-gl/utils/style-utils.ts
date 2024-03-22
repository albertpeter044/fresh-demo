import { ImmutableLike, MapStyle } from "../types/index.ts";

const refProps = [
  "type",
  "source",
  "source-layer",
  "minzoom",
  "maxzoom",
  "filter",
  "layout",
];

// Prepare a map style object for diffing
// If immutable - convert to plain object
// Work around some issues in older styles that would fail Mapbox's diffing
export function normalizeStyle(
  style: string | MapStyle | ImmutableLike<MapStyle>,
): string | MapStyle {
  if (!style) {
    return null as any;
  }
  if (typeof style === "string") {
    return style;
  }
  if ("toJS" in style) {
    style = style.toJS();
  }
  if (!style.layers) {
    return style;
  }
  const layerIndex = {};

  for (const layer of style.layers) {
    // @ts-ignore:
    layerIndex[layer.id] = layer;
  }

  const layers = style.layers.map((layer) => {
    // @ts-ignore:
    let normalizedLayer: typeof layer = null;

    if ("interactive" in layer) {
      normalizedLayer = Object.assign({}, layer);
      // Breaks style diffing :(
      // @ts-ignore legacy field not typed
      delete normalizedLayer.interactive;
    }

    // Style diffing doesn't work with refs so expand them out manually before diffing.
    // @ts-ignore legacy field not typed
    const layerRef = layerIndex[layer.ref];
    if (layerRef) {
      normalizedLayer = normalizedLayer || Object.assign({}, layer);
      // @ts-ignore:
      delete normalizedLayer.ref;
      // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/deref.js
      for (const propName of refProps) {
        if (propName in layerRef) {
          // @ts-ignore:
          normalizedLayer[propName] = layerRef[propName];
        }
      }
    }

    return normalizedLayer || layer;
  });

  // Do not mutate the style object provided by the user
  return { ...style, layers };
}
