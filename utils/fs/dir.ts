
export function existsSync(filename: string){
  try {
    Deno.statSync(filename);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
};

export async function exists(filename: string): Promise<boolean> {
  try {
    await Deno.stat(filename);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
};


function _mycwd(): string {
  return Deno.cwd();
}

// Deno.chdir(".")
function _chdirModule() {
  const rootDir = new URL('.', Deno.mainModule).href.replace(/^file:\/\//, "");
  Deno.chdir(rootDir);
  console.log('cwd', Deno.cwd());
}

// readDir
export function readDirSync(dir: string) {
  return Deno.readDirSync(dir);
}
// walkDir
import{ ensureDir as _ensureDir, walk as walkDir } from "$std/fs/mod.ts";
export function walk(dir: string) {
  return walkDir(dir)
}

Deno.test("walk dir", async () => {
  console.log("Deno.cwd():",Deno.cwd())
  for await (const entry of walk('.')) {
    if (entry.isFile) {
      console.log(entry.path)
      break;
    }
  }
})


// join path
import {
  dirname as _dirname,
  relative as relativePath,
  join as joinPath
} from "$std/path/mod.ts";
import {join as joinWin} from "$std/path/mod.ts";
export function join(...paths: string[]) {
    return joinPath(...paths);
}

Deno.test(
  "test relativePath/join/walk...",
  () => {
  console.log(relativePath('/a/b/c/d.txt', '/a/b/')) // ../..
  console.log(relativePath('/a/b','/a/b/c/d.txt' )) // c/d.txt
  console.log(join('/a/b', './a.txt')) // /a/b/a.txt
  console.log(join('/a/b', 'a.txt')) // /a/b/a.txt
  console.log(join('/a/b', '/')) // /a/b/
  console.log(join('/a/b', '..')) // /a
  console.log(joinWin('/a/b', '/')) // \a\b\
})

//resolve path
function resolveImport(path:string) {
    return import.meta.resolve(path) //./a.ts
}
Deno.test("resolve path", () => {
  resolveImport('./a.ts');
})

import{ normalize, resolve, toFileUrl, } from "$std/path/mod.ts";
Deno.test("resolve:", () => {
  console.log("to fileURL:",toFileUrl('/home/www/jslib/a.ts')); // URL(file:///home/www/jslib/a.ts)
  console.log("fileurl:",import.meta.resolve('./a.ts')); // file:///home/www/jslib/a.ts
  console.log("filepath:",resolve('./a.ts')); // /home/www/jslib/a.ts
  console.log("filepath:",resolve('../')); // /home/www
  console.log("normal:",normalize('./a.ts')); // a.ts
  console.log("normal:",normalize('a.ts')); // a.ts
  console.log("normal:",normalize('..')); // ..
})


