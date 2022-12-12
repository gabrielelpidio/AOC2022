export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

const abecedary = "SabcdefghijklmnopqrstuvwxyzE".split("");

const twoDLines = lines.map((line) => line.split(""));

// Find in two dimensional array
const findIn2DArray = (array: string[][], value: string) => {
  for (const i in array) {
    for (const j in array[i]) {
      if (array[i][j] === value) {
        return [i, j];
      }
    }
  }
};

const filterIn2DArray = (array: string[][], value: string | string[]) => {
  const result = [];
  for (const i in array) {
    for (const j in array[i]) {
      if (typeof value === "string") {
        if (array[i][j] === value) {
          result.push([i, j]);
        }
      }
      if (Array.isArray(value)) {
        if (value.includes(array[i][j])) {
          result.push([i, j]);
        }
      }
    }
  }
  return result;
};

const [startX, startY] = findIn2DArray(twoDLines, "S") || [];
const [endX, endY] = findIn2DArray(twoDLines, "E") || [];

const findShortestPath = (
  array: string[][],
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  const visited = new Set();
  const queue = [[startX, startY, 0]];
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length) {
    const [x, y, steps] = queue.shift() || [];

    if (x === endX && y === endY) {
      return steps;
    }

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const currentLetter = array[x][y];

      if (
        newX < 0 ||
        newX >= array.length ||
        newY < 0 ||
        newY >= array[0].length ||
        visited.has(`${newX},${newY}`)
      ) {
        continue;
      }

      const nextLetter = array[newX][newY];

      if (
        abecedary.indexOf(nextLetter) - abecedary.indexOf(currentLetter) >
        1
      ) {
        continue;
      }
      visited.add(`${newX},${newY}`);
      queue.push([newX, newY, steps + 1]);
      // console.log(currentLetter, nextLetter, queue);
    }
  }
};

console.log(
  Math.min(
    ...(filterIn2DArray(twoDLines, ["S", "a"])
      .map(([startX, startY]) =>
        findShortestPath(
          twoDLines,
          Number(startX),
          Number(startY),
          Number(endX),
          Number(endY)
        )
      )
      .filter((x) => typeof x !== "undefined") as number[])
  )
);
