function fileExists(filepath: string) {
  try {
    Deno.statSync(filepath);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
}
async function main() {
  // 1. create tmp file
  if(!fileExists("./tmp")){
    Deno.mkdir("./tmp");
  }
  if(!fileExists("./tmp/a1.log")){
    Deno.writeTextFileSync("./tmp/a1.log", "123");
  }
  if(fileExists("./tmp/a2.log")){
    Deno.removeSync("./tmp/a2.log");
  }

  // rename
  function rename() {
    setTimeout(() => {
      Deno.rename("./tmp/a1.log", "./tmp/a2.log");
    }, 50000);
  }
  rename();

  // start watching
  console.log("Watching ./tmp...");
  const watcher = Deno.watchFs("./tmp");
  for await (const event of watcher) {
    console.log(event);
  }
}
main();
