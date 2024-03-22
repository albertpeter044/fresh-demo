import localConfig from "./conf/local.ts";
export const conf = {
  mapbox: {
    accessToken: "",
  },
} as const;
Object.assign(conf, localConfig)
