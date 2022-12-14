export {};

const wallsInstructions: [number, number][][] = (
  await Deno.readTextFile("./input.txt")
)
  .split("\n")
  .map((i) =>
    i.split("->").map((i) => i.split(",").map(Number) as [number, number])
  );

const [startX, endX] = wallsInstructions.reduce(
  ([min, max], i) => {
    const flattened = i.map(([x]) => x);
    return [Math.min(min, ...flattened), Math.max(max, ...flattened)];
  },
  [Infinity, 0]
);

const endY = wallsInstructions.reduce(
  (max, i) => Math.max(max, ...i.map(([_, y]) => y)),
  0
);

const create2dArr = (x: number, y: number) =>
  Array.from({ length: y }, () => Array.from({ length: x }, () => "."));

const cave = create2dArr(endX - startX + 1, endY + 1);

console.log(startX, endX, endY);

const fallingIndex = 500 - startX;

for (const item of wallsInstructions) {
  let currentX = item[0][0];
  let currentY = item[0][1];

  // Draw from currentX to nextX and currentY to nextY
  for (const [nextX, nextY] of item.slice(1)) {
    if (currentX === nextX) {
      // Vertical line
      for (
        let i = Math.min(currentY, nextY);
        i <= Math.max(currentY, nextY);
        i++
      ) {
        cave[i][currentX - startX] = "#";
      }
    } else {
      // Horizontal line
      for (
        let i = Math.min(currentX, nextX);
        i <= Math.max(currentX, nextX);
        i++
      ) {
        cave[currentY][i - startX] = "#";
      }
    }

    currentX = nextX;
    currentY = nextY;
  }
}

let abbysFound = false;

while (!abbysFound) {
  // Find the occupied in the falling index
  const firstWallIndex = cave.findIndex(
    (i) => i[fallingIndex] === "#" || i[fallingIndex] === "o"
  );

  let settled = false;
  let sandPositionY = firstWallIndex - 1;
  let sandPositionX = fallingIndex;

  while (!settled) {
    // const caveDeepCopy = JSON.parse(JSON.stringify(cave));
    // caveDeepCopy[sandPositionY][sandPositionX] = "x";
    // console.log(caveDeepCopy.map((i) => i.join("")).join("\n"));

    const diagonalLeft = cave[sandPositionY + 1]?.[sandPositionX - 1];
    const diagonalRight = cave[sandPositionY + 1]?.[sandPositionX + 1];
    const below = cave[sandPositionY + 1]?.[sandPositionX];

    if (diagonalLeft === undefined || diagonalRight === undefined) {
      settled = true;
      abbysFound = true;
      break;
    }

    if (below === ".") {
      sandPositionY++;
      continue;
    }

    if (diagonalLeft === ".") {
      sandPositionX--;
      sandPositionY++;
      continue;
    }
    if (diagonalRight === ".") {
      sandPositionX++;
      sandPositionY++;
      continue;
    }
    settled = true;
    cave[sandPositionY][sandPositionX] = "o";
  }
}

Deno.writeTextFileSync("./output.txt", cave.map((i) => i.join("")).join("\n"));
console.log(cave.map((i) => i.join("")).join("\n"));
console.log(
  cave.reduce((acc, i) => acc + i.filter((i) => i === "o").length, 0)
);
