export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

let cycle = 1;
let signalStrength = 1;
let currentBreakPointIndex = 0;
// const breakPoints = [40, 80, 120, 160, 200, 240];
const breakPoints = [20, 60, 100, 140, 180, 220];
const breakPointSignalStrength = [];

for (const line of lines) {
  const sumSignal = line.startsWith("addx") ? Number(line.split(" ")[1]) : 0;
  const cycleLength = line.startsWith("addx") ? 2 : 1;
  for (let i = cycleLength; i > 0; i--) {
    if (breakPoints[currentBreakPointIndex] === cycle) {
      breakPointSignalStrength.push(
        signalStrength * breakPoints[currentBreakPointIndex]
      );
      currentBreakPointIndex++;
    }
    if (i === 1) {
      signalStrength += sumSignal;
    }
    cycle++;
  }
}

console.log(breakPointSignalStrength);
console.log(breakPointSignalStrength.reduce((acc, i) => acc + i, 0));
