export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

interface Directory {
  dir: string;
  parentDirectory?: string;
  [key: string]: any;
}

/**
 * { directory: { file: size }}
 */
const directories: Directory = {
  dir: "/",
};

//Transform string with dots to path in Object
function toPath<T extends Record<string, any>>(path: string, object: T): T {
  if (path === "") return object;
  const [first, ...rest] = path.split(".");
  if (rest.length === 0) {
    return object[first];
  }
  return toPath(rest.join("."), object[first]);
}

let currentDirectory = "";

for (let line = 0; line < lines.length; line++) {
  if (lines[line].startsWith("$ cd /")) {
    currentDirectory = "";
    continue;
  }

  if (lines[line].startsWith("$ cd ..")) {
    currentDirectory = currentDirectory.split(".").slice(0, -1).join(".");
    continue;
  }

  if (lines[line].startsWith("$ cd")) {
    currentDirectory =
      currentDirectory === ""
        ? lines[line].replace("$ cd ", "")
        : currentDirectory + "." + lines[line].replace("$ cd ", "");
    continue;
  }

  if (lines[line].startsWith("$ ls")) {
    for (let i = line + 1; i < lines.length; i++) {
      if (lines[i].startsWith("$")) {
        break;
      }
      const name = lines[i];
      if (name.startsWith("dir")) {
        toPath(currentDirectory, directories)[name.split(" ")[1]] = {
          dir: name.split(" ")[1],
          parentDirectory: currentDirectory,
        };
        continue;
      }

      const [size, filename] = lines[i].split(" ");

      toPath(currentDirectory, directories)[`file-${filename}`] = Number(size);
    }
  }
}

const summedDirs: number[] = [];

//Recursive sum of files in directories
function sumFilesUnderArbitraryN(directory: Directory): number {
  let sum = 0;
  for (const key in directory) {
    if (key === "dir" || key === "parentDirectory") continue;
    if (key.startsWith("file-")) {
      sum += directory[key];
    } else {
      sum += sumFilesUnderArbitraryN(directory[key]);
    }
  }

  if (sum < 100000) {
    summedDirs.push(sum);
  }

  return sum;
}

sumFilesUnderArbitraryN(directories);

console.log(summedDirs.reduce((acc, size) => size + acc, 0));
