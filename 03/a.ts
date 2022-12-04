export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

const getAlphabetN = (str: string) => str.charCodeAt(0) - 97 + 1;

let globalScore = 0;

for (let index = 0; index < lines.length; index++) {
  const count = {};
  const first = lines[index].split("");
  const second = first.splice(-1 * (first.length / 2));

  for (let index = 0; index < first.length; index++) {
    count[first[index]] = 1;
  }

  for (let index = 0; index < second.length; index++) {
    if (count[second[index]] === 1) {
      count[second[index]] = 2;
    }
  }

  const countFromEntries = Object.entries(count).filter(
    ([_key, val]) => val === 2
  );

  const score = countFromEntries.reduce(
    (acc, [key, val]) =>
      key == key.toLowerCase()
        ? getAlphabetN(key)
        : getAlphabetN(key.toLowerCase()) + 26,
    0
  );

  globalScore += score;
}
console.log(globalScore);
