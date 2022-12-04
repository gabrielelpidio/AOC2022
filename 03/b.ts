export {};

const lines = (await Deno.readTextFile("./input.txt"))
  .match(new RegExp(/(?:.+\n?){3}/g))
  ?.map((str) => str.split("\n"))
  .filter((s) => s);

console.log(lines);

const getAlphabetN = (str: string) => str.charCodeAt(0) - 97 + 1;

let globalScore = 0;

for (let index = 0; index < lines.length; index++) {
  const count = {};
  const [first, second, third] = lines[index];

  for (let index = 0; index < first.length; index++) {
    count[first[index]] = 1;
  }

  for (let index = 0; index < second.length; index++) {
    if (count[second[index]] === 1) {
      count[second[index]] = 2;
    }
  }

  for (let index = 0; index < third.length; index++) {
    if (count[third[index]] === 2) {
      count[third[index]] = 3;
    }
  }

  const countFromEntries = Object.entries(count).filter(
    ([_key, val]) => val === 3
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
