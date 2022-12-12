export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

let cycle = 0;
let signalStrength = 0;
let currentBreakPointIndex = 0;
let pixels = "";
const breakPoints = [40, 80, 120, 160, 200, 240];
// const breakPoints = [20, 60, 100, 140, 180, 220];
const breakPointSignalStrength = [];

const isInRange = (x: number, [y, z]: [number, number]) => {
  return x >= y && x <= z;
};

for (const line of lines) {
  const sumSignal = line.startsWith("addx") ? Number(line.split(" ")[1]) : 0;
  const cycleLength = line.startsWith("addx") ? 2 : 1;
  for (let i = cycleLength; i > 0; i--) {
    const relativeCycle =
      cycle - (breakPoints[currentBreakPointIndex - 1] || 0);
    pixels += isInRange(relativeCycle, [signalStrength, signalStrength + 2])
      ? "#"
      : ".";

    if (i === 1) {
      signalStrength += sumSignal;
    }
    cycle++;

    if (breakPoints[currentBreakPointIndex] === cycle) {
      breakPointSignalStrength.push(pixels);
      pixels = "";
      currentBreakPointIndex++;
    }
  }
}
console.log(cycle);
console.log(breakPointSignalStrength);
