export {};

const wallsInstructions: [number, number][][] = (
  await Deno.readTextFile("./input.txt")
)
  .split("\n")
  .map((i) =>
    i.split("->").map((i) => i.split(",").map(Number) as [number, number])
  );

type Path = `${string},${string}`;
const walls: Set<Path> = new Set();
const fallenSand: Set<Path> = new Set();

const endY =
  wallsInstructions.reduce(
    (max, i) => Math.max(max, ...i.map(([_, y]) => y)),
    0
  ) + 1;

const fallingIndex = 500;

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
        walls.add(`${currentX},${i}`);
      }
    } else {
      // Horizontal line
      for (
        let i = Math.min(currentX, nextX);
        i <= Math.max(currentX, nextX);
        i++
      ) {
        walls.add(`${i},${currentY}`);
      }
    }

    currentX = nextX;
    currentY = nextY;
  }
}

let reachedTop = false;

const cave = Array.from({ length: endY + 1 }, () =>
  Array.from({ length: 1000 }, () => ".")
);

while (!reachedTop) {
  // Find the occupied in the falling index
  const firstWallIndex = Array.from(walls).reduce((min, i) => {
    const [x, y] = i.split(",").map(Number);
    if (x === fallingIndex) {
      return Math.min(min, y);
    }
    return min;
  }, Infinity);

  const firstSandIndex = Array.from(fallenSand).reduce((min, i) => {
    const [x, y] = i.split(",").map(Number);
    if (x === fallingIndex) {
      return Math.min(min, y);
    }
    return min;
  }, Infinity);

  const firstObstacle = Math.min(firstWallIndex, firstSandIndex);

  let settled = false;
  let sandPositionY = firstObstacle - 1;
  if (sandPositionY < 0) {
    reachedTop = true;
    break;
  }
  let sandPositionX = fallingIndex;

  while (!settled) {
    const diagonalLeft = `${sandPositionX - 1},${sandPositionY + 1}` as const;
    const diagonalRight = `${sandPositionX + 1},${sandPositionY + 1}` as const;
    const below = `${sandPositionX},${sandPositionY + 1}` as const;

    if (!walls.has(below) && !fallenSand.has(below) && sandPositionY < endY) {
      sandPositionY++;
      continue;
    }

    if (
      !walls.has(diagonalLeft) &&
      !fallenSand.has(diagonalLeft) &&
      sandPositionY < endY
    ) {
      sandPositionX--;
      sandPositionY++;
      continue;
    }
    if (
      !walls.has(diagonalRight) &&
      !fallenSand.has(diagonalRight) &&
      sandPositionY < endY
    ) {
      sandPositionX++;
      sandPositionY++;
      continue;
    }
    settled = true;
    fallenSand.add(`${sandPositionX},${sandPositionY}`);
  }
}

for (const wall of walls) {
  const [x, y] = wall.split(",").map(Number);
  cave[y][x] = "#";
}
for (const sand of fallenSand) {
  const [x, y] = sand.split(",").map(Number);
  cave[y][x] = "o";
}
Deno.writeTextFileSync("./output.txt", cave.map((i) => i.join("")).join("\n"));
console.log(fallenSand.size);
