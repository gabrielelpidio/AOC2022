export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

const overlap = (start1: number, end1: number, start2: number, end2: number) =>
  start1 <= start2 && end1 >= end2;

const partialOverlap = (
  start1: number,
  end1: number,
  start2: number,
  end2: number
) => (start2 <= end1 && end2 >= start1) || (start1 <= end2 && end1 >= start2);

const count = lines
  .map((line) =>
    line
      .split(",")
      .map((item) => item.split("-").map(Number) as [number, number])
  )
  .filter(([first, second]) => partialOverlap(...first, ...second)).length;

console.log(count);
