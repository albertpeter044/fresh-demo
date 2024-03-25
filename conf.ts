import localConfig from "./conf/local.ts";
export const conf = {
  mapbox: {
    accessToken: "",
  },
} as const;

// conf.mapbox.accessToken = conf.mapbox.accessToken || Deno.env.get("MAPBOX_TOKEN") || "";
Object.assign(conf, localConfig)
