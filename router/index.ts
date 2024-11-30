import islandMetas from "@/fresh.meta.ts";
export interface PathNode{
  name: string;
  title?: string;
  children: PathNode[];
}
export function genNestedRoutePath(paths: string[],prePath="", i=0): [PathNode[], number] {
  const nodes: PathNode[] = [];
  for(;i<paths.length;){ 
    const path = paths[i];
    if(path.startsWith(prePath)){
      const parts = path.substring(prePath.length).split("/");
      const name = parts[0];
      const key = `islands/${prePath+name}.tsx`;
      // console.log(path, key, islandMetas[key])
      const node: PathNode = {
        name:name,
        title: islandMetas[key],
        children:[],
      }
      const [children, j] = genNestedRoutePath(paths, prePath+name+"/", i);
      if(j>i){
        i = j;
      }else if(j==i){
        i++
      }else{
        throw new Error("j should be greater than i")
      }
      node.children = children;
      nodes.push(node)
    }else{
      break
    }
  }
  return [nodes, i];
}

Deno.test("genNestedRoutePath", () => {
  const paths = [
    "antd/input",
    "api/joke",
    "deno/import",
    "deno/os",
    "greet/[name]",
    "mapbox/draw/polygon",
    "mapbox/plot/plot-point",
    "react/play",
    "react/render",
    "react/signal",
    "react/vnode/vnode-mutable",
    "video/ffmpeg-wasm",
  ];
  const a = genNestedRoutePath(paths)
  for(const node of a[0]){
    if(node.name=="mapbox"){
      console.log(node)
    }
  }
  // console.log(a.mapbox);
});
