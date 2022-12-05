export {};

const [c, movements] = (await Deno.readTextFile("./input.txt")).split("\n\n");

const crates = c.split("\n");

const cratesIndex = crates.splice(-1)[0];

let transposedCrates: string[][] = [];

const cratesStr = crates.map((item) => item.split(""));

for (const crate of cratesStr) {
  for (const crateCharIndex in crate) {
    const toIndex = Number(cratesIndex[crateCharIndex].trim());
    const character = crate[crateCharIndex]
      .trim()
      .replaceAll("[", "")
      .replaceAll("]", "");
    if (character && toIndex) {
      transposedCrates[crateCharIndex] = [
        crate[crateCharIndex],
        ...(transposedCrates[crateCharIndex] || []),
      ];
    }
  }
}

transposedCrates = transposedCrates.filter((i) => i);

for (const movement of movements.split("\n")) {
  const from = Number(movement.split(" ")[3]) - 1;
  const to = Number(movement.split(" ")[5]) - 1;
  const amount = Number(movement.split(" ")[1]);

  const toBeMoved = transposedCrates[from].splice(-amount);
  transposedCrates[to].push(...toBeMoved);
}

console.log(
  transposedCrates
    .reduce((acc, item) => [...acc, item.at(-1) as string], [])
    .join("")
);

// console.log(lines);
