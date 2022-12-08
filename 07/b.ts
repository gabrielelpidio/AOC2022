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

const TOTAL_SPACE = 70000000;
const NEEEDED_SPACE = 30000000;

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

let summedDirs: number[] = [];

let smallestDir: [string, number] = ["", Infinity];
let rootDirSize = sumFilesUnderArbitraryN(directories);
const currentUnusedSpace = TOTAL_SPACE - rootDirSize;

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

function findSmallestDir(directory: Directory): number {
  let sum = 0;
  for (const key in directory) {
    if (key === "dir" || key === "parentDirectory") continue;
    if (key.startsWith("file-")) {
      sum += directory[key];
    } else {
      sum += findSmallestDir(directory[key]);
    }
  }

  if (currentUnusedSpace + sum > NEEEDED_SPACE && sum < smallestDir[1]) {
    smallestDir = [directory.dir, sum];
  }
  return sum;
}

findSmallestDir(directories);

// console.log(summedDirs.reduce((acc, size) => size + acc, 0));
console.log(smallestDir);
