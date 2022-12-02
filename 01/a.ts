export {};

const lines = (await Deno.readTextFile("./input.txt"))
  .split("\n\n")
  .map((v) => {
    return v.split("\n").map((v) => parseInt(v));
  });

let elfWithMost = 0;

for (let index = 0; index < lines.length; index++) {
  const sum = lines[index].reduce((acc, v) => v + acc, 0);

  if (sum > elfWithMost) {
    elfWithMost = sum;
  }
}

console.log(elfWithMost);
