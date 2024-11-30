import { type PageProps } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";
import "@/worker/watch.ts";
import { AppContext } from "@/context/app-context.ts";
import { conf } from "@/conf.ts";
import { genNestedRoutePath, PathNode } from "@/router/index.ts";
function renderNestedPaths(nodes: PathNode[], prePath = "", classname="fresh-menu-tree") {
  return (
    <ul class={classname}>
      {nodes.map((node) => {
        const hasChildren = node.children?.length > 0;
        const nodePrePath = `${prePath}/${node.name}`;
        const link = <a href={hasChildren?"#":nodePrePath}>{node.title || node.name}</a>
        return (
          <li key={node.name}>
            {hasChildren && <details open>
              <summary>
                {link}
              </summary>
               {node.children?.length > 0
                ? renderNestedPaths(node.children, nodePrePath, "")
                : null} 
            </details>}
            {!hasChildren && link}
          </li>
        );
      })}
    </ul>
  );
}
export default function App({ Component }: PageProps) {
  const mapbox_access_token = conf.mapbox.accessToken ||
    Deno.env.get("MAPBOX_TOKEN") || "";
  const routes = manifest.routes;
  const ignorePaths = ["_404.tsx", "_app.tsx", "index.tsx"];
  const routePaths = Object.keys(routes).map((p) => p.slice("./routes/".length))
    .filter((v) => {
      if (ignorePaths.includes(v)) {
        return false;
      }
      if (v.match("\.(tsx|ts)$")) {
        return true;
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
  const routeNestedPaths = genNestedRoutePath(routePaths)[0];
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh-demo1</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body class="flex min-h-screen">
        <div class="w-1/5 p-2 bg-green-300 border-r-2">
          <div class="flex items-center justify-center">
            <img src="/logo.svg" />
          </div>
          <div>
            <a href="/">index</a>
          </div>
          {renderNestedPaths(routeNestedPaths)}
          
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
