import { type PageProps } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";
import "@/worker/watch.ts";
import { AppContext } from "@/context/app-context.ts";
import { conf } from "@/conf.ts";
export default function App({ Component }: PageProps) {
  const mapbox_access_token = conf.mapbox.accessToken ||
    Deno.env.get("MAPBOX_TOKEN") || "";
  const routes = manifest.routes;
  const ignorePaths = ["_404.tsx", "_app.tsx", "index.tsx"];
  const routePaths = Object.keys(routes).map((p) => p.slice("./routes/".length))
    .filter((v) => {
      if (v.match("\.(tsx|ts)$")) {
        return !ignorePaths.includes(v);
      }
      return false;
    }).map((v) => {
      if (v.endsWith("/index.tsx")) {
        return v.slice(0, -10);
      } else if (v.endsWith(".ts")) {
        return v.slice(0, -3);
      } else {
        return v.slice(0, -4);
      }
    });
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh-demo1</title>
        <link rel="stylesheet" href="/styles.css" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body class="flex min-h-screen">
        <div class="w-1/5 p-2 bg-green-300 border-r-2">
          <div class="flex items-center justify-center">
            <img src="/logo.svg" />
          </div>
          <div>
            <a href="/">index</a>
          </div>
          {routePaths.map((path) => {
            return (
              <div key={path}>
                <a href={`/${path}`}>{path}</a>
              </div>
            );
          })}
        </div>
        <div class="flex-1 bg-slate-30">
          <AppContext.Provider value={{ mapbox_access_token }}>
            <Component />
          </AppContext.Provider>
        </div>
      </body>
    </html>
  );
}
