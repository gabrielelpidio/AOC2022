export {};

const lines = (await Deno.readTextFile("./input.txt"))
  .split("\n\n")
  .map((v) => {
    return v.split("\n").map((v) => parseInt(v));
  });

const elfWithMost: number[] = [];

for (let index = 0; index < lines.length; index++) {
  const sum = lines[index].reduce((acc, v) => v + acc, 0);
  elfWithMost.push(sum);
}

const result = elfWithMost
  .sort()
  .splice(-3, 3)
  .reduce((acc, v) => v + acc, 0);

console.log(result);
