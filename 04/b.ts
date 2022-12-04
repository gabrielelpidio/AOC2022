export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

let count = 0;

for (let index = 0; index < lines.length; index++) {
  const ranges = lines[index].split(",");
  const [first, second] = ranges;

  const firstRange = range(...first.split("-").map(Number));
  const secondRange = range(...second.split("-").map(Number));

  if (
    firstRange.some((n) => secondRange.includes(n)) ||
    secondRange.some((n) => firstRange.includes(n))
  ) {
    count++;
  }
}

console.log(count);
