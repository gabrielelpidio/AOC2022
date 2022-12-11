export {};

let headPosX = 0;
let headPosY = 0;

let ropePostions: [number, number][] = [...new Array(10)].map(() =>
  new Array(2).fill(0)
);

const tailVisited = new Set<string>();

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

for (let i = 0; i < lines.length; i++) {
  const [direction, stepCount] = lines[i].split(" ");
  console.log(direction + stepCount + "-----------------");
  for (let j = 0; j < parseInt(stepCount); j++) {
    switch (direction) {
      case "U":
        ropePostions[0][1]++;
        break;
      case "D":
        ropePostions[0][1]--;
        break;
      case "L":
        ropePostions[0][0]--;
        break;
      case "R":
        ropePostions[0][0]++;
        break;
    }
    for (let k = 1; k < ropePostions.length; k++) {
      const dx = ropePostions[k - 1][0] - ropePostions[k][0];
      const dy = ropePostions[k - 1][1] - ropePostions[k][1];

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        ropePostions[k][0] += Math.sign(dx);
        ropePostions[k][1] += Math.sign(dy);
      }
    }
    tailVisited.add(`${ropePostions.at(-1)[0]},${ropePostions.at(-1)[1]}`);
  }
}

// console.log(tailVisited);
console.log(tailVisited.size);
