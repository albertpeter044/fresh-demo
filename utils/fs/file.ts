/**
 * write.ts
 */
function _writeFile(path: string, data: string): string {
  try {
    Deno.writeTextFileSync(path, data);
    //writeFileSync( path: string | URL, data: Uint8Array, options?: WriteFileOptions): void;
    return "Written to " + path;
  } catch (e: any) {
    return e.message;
  }
}
//console.log(writeFile("./data.json", "some data"));
/**
 * read file sync
 */
//Deno.readTextFileSync("./a.txt")

export async function readPartial(path:string, n:number){
  // using 是 TypeScript 5.2 引入的一个关键字，用于声明一个资源在使用完毕后会自动释放。它通常用于处理需要显式关闭或释放的资源，如文件、数据库连接等。
  using file = await Deno.open(path);
  const buf = new Uint8Array(n);
  const numberOfBytesRead = await file.read(buf);
  const text = new TextDecoder().decode(buf); 
  return text
}