export {};

let headPosX = 0;
let headPosY = 0;

let tailPosX = 0;
let tailPosY = 0;

const tailVisited = new Set<string>();

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

console.log(`-----------------START--------------------`);
for (let i = 0; i < lines.length; i++) {
  const [direction, stepCount] = lines[i].split(" ");
  for (let j = 0; j < parseInt(stepCount); j++) {
    switch (direction) {
      case "U":
        headPosY++;
        break;
      case "D":
        headPosY--;
        break;
      case "L":
        headPosX--;
        break;
      case "R":
        headPosX++;
        break;
    }
    const differenceX = headPosX - tailPosX;
    const differenceY = headPosY - tailPosY;
    const moveToX = Math.abs(differenceX) > 1 ? Math.sign(differenceX) : 0;
    const moveToY = Math.abs(differenceY) > 1 ? Math.sign(differenceY) : 0;

    tailPosX +=
      Math.abs(differenceX) === 1 && moveToY !== 0
        ? headPosX - tailPosX
        : moveToX;
    tailPosY +=
      Math.abs(differenceY) === 1 && moveToX !== 0
        ? headPosY - tailPosY
        : moveToY;

    console.log(
      `${tailPosX}:${tailPosY}`,
      `${headPosX}:${headPosY}`,
      direction,
      stepCount,
      j
    );
    tailVisited.add(`${tailPosX}:${tailPosY}`);
  }
  console.log(`-------------------------------------`);
}

console.log(tailVisited);
console.log(tailVisited.size);
