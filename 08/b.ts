export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

const forest = lines.map((line) => line.split(""));
let count = 0;
for (let i = 0; i < forest.length; i++) {
  for (let j = 0; j < forest[i].length; j++) {
    let visibleDown = 0;
    let visibleUp = 0;
    let visibleLeft = 0;
    let visibleRight = 0;

    for (let k = i + 1; k < forest.length; k++) {
      visibleDown++;
      if (forest[k][j] >= forest[i][j]) {
        break;
      }
    }

    for (let k = i - 1; k >= 0; k--) {
      visibleUp++;
      if (forest[k][j] >= forest[i][j]) {
        break;
      }
    }

    for (let k = j + 1; k < forest[i].length; k++) {
      visibleRight++;
      if (forest[i][k] >= forest[i][j]) {
        break;
      }
    }

    for (let k = j - 1; k >= 0; k--) {
      visibleLeft++;
      if (forest[i][k] >= forest[i][j]) {
        break;
      }
    }

    const score = visibleDown * visibleUp * visibleLeft * visibleRight;
    count = count > score ? count : score;
  }
}

console.log(count);
