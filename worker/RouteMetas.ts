import { walk as walkDir } from "$std/fs/mod.ts";
import { readPartial } from "@/utils/fs/file.ts";

interface IslandMeta {
  title: string;
  description: string;
  tags: string[];
}

export class RouteMetas {
  private _metas: Record<string, IslandMeta> = {};
  private metaPath = "./fresh.meta.ts";
  constructor() {
    // this.generateAll();
  }
  async generateAll() {
    //1. iterate over all files in islands
    for await (
      const entry of walkDir("./islands", {
        includeDirs: false,
        exts: [".tsx"],
      })
    ) {
      const path = entry.path;
      const content = await readPartial(path, 300);
      this.loadIslandContent(path, content);
    }
    this.syncMeta();
  }
  syncMetaPartial(path: string, content: string) {
    this.loadIslandContent(path, content);
    this.syncMeta();
  }

  loadIslandContent(path: string, content: string) {
    const meta = this.parseIslandMeta(content);
    if (meta.title) {
      this._metas[path] = meta;
    }
  }

  parseIslandMeta(content: string) {
    const meta = {} as IslandMeta;
    const line = content.split("\n")[0];
    if (line.startsWith("//")) {
      const parts = line.slice(2).split(":");
      const key = parts[0].trim();
      const value = parts.slice(1).join(":").trim();
      // @ts-ignore: dynamic key
      meta[key] = value;
    }
    return meta;
  }

  syncMeta() {
    const output = Object.entries(this._metas).map(([path, meta]) => {
      return `"${path}":"${meta.title}"`;
    }).join(",\n");
    const content = `export default {\n${output}\n} as Record<string,string>;`;
    console.log(content);
    Deno.writeTextFileSync(this.metaPath, content);
  }
}
