export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

const forest = lines.map((line) => line.split(""));
let count = 0;
for (let i = 0; i < forest.length; i++) {
  for (let j = 0; j < forest[i].length; j++) {
    let visibleDown = true;
    let visibleUp = true;
    let visibleLeft = true;
    let visibleRight = true;

    for (let k = i + 1; k < forest.length; k++) {
      if (i === 1 && j === 1) {
        console.log(forest[k][j], forest[i][j]);
      }
      if (forest[k][j] >= forest[i][j]) {
        visibleDown = false;
        break;
      }
    }

    for (let k = i - 1; k >= 0; k--) {
      if (forest[k][j] >= forest[i][j]) {
        visibleUp = false;
        break;
      }
    }

    for (let k = j + 1; k < forest[i].length; k++) {
      if (forest[i][k] >= forest[i][j]) {
        visibleRight = false;
        break;
      }
    }

    for (let k = j - 1; k >= 0; k--) {
      if (forest[i][k] >= forest[i][j]) {
        visibleLeft = false;
        break;
      }
    }

    if (visibleDown || visibleUp || visibleLeft || visibleRight) {
      count++;
    }
  }
}

console.log(count);
