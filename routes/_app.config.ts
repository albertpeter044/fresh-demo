import {conf} from '@/conf.ts';
export function initApp() {
  // conf.mapbox.accessToken = conf.mapbox.accessToken || Deno.env.get("MAPBOX_TOKEN") || "";
  console.log("config length:", Object.keys(conf).length)
}