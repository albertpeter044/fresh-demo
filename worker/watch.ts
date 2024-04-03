import { debounce as _debounce } from "$std/async/debounce.ts";
import { dirname, fromFileUrl } from "$std/path/mod.ts";
import { existsSync as fileExists, statSync } from "$utils/fs/dir.ts";
function getRootPath() {
  const dir = dirname(fromFileUrl(import.meta.url));
  return dirname(dir);
}

function mkdir(filepath: string) {
  const path = filepath;
  try {
    Deno.statSync(path);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      Deno.mkdirSync(path, { recursive: true });
    } else {
      throw error;
    }
  }
  return true;
}

let watchCount = 0;
async function watchIslands() {
  const rootDir = getRootPath();
  console.log(
    `%c Watching islands: (${rootDir}), (pid:${Deno.pid},${++watchCount})`,
    "color: gray; background-color: orange;",
  );

  // debounce(fn,1000);
  const islandHandlerRaw = (islandPath: string) => {
    const relpath = islandPath.slice((rootDir + "/islands/").length);
    const importIslandPath = "@/islands/" + relpath;
    const routeFile = rootDir + "/routes/" + relpath;
    const content = `export {default} from  "${importIslandPath}";`;
    const routeDir = dirname(routeFile);
    mkdir(routeDir);
    if (fileExists(islandPath)) {
      if (fileExists(routeFile)) {
        return;
      }
      if (!Deno.readTextFileSync(islandPath).includes("export default ")) {
        return;
      }
      console.log(`write to file ${routeFile}`);
      Deno.writeTextFileSync(routeFile, content);
    } else {
      const isIslandRoute = (statSync(routeFile) as any).size < 200;
      if (isIslandRoute && Deno.readTextFileSync(routeFile).includes(content)) {
        console.log("remove file", routeFile);
        Deno.removeSync(routeFile);
      }
    }
  };

  const islandTimer = {} as Record<string, number>;
  function islandHandler(event: Deno.FsEvent, timeout = 200) {
    const islandPath = event.paths[0];
    const kind = event.kind;
    if (
      islandPath.match(".tsx") && islandPath.startsWith(rootDir) &&
      !islandPath.includes(" ")
    ) {
      if (kind === "create" || kind == "modify") {
        if (islandTimer[islandPath]) {
          clearTimeout(islandTimer[islandPath]);
          islandTimer[islandPath] = 0;
        }
        islandTimer[islandPath] = setTimeout(() => {
          console.log("[%s] %s", kind, islandPath);
          islandHandlerRaw(islandPath);
        }, timeout);
      }
    }
  }

  const watcher = Deno.watchFs("./islands");
  for await (const event of watcher) {
    islandHandler(event);
  }
}
if (Deno.mainModule.endsWith("/dev.ts") || import.meta.main) {
  watchIslands();
}
