export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

console.log(lines);

const pairs = {
  A: "X",
  B: "Y",
  C: "Z",
};

const win = {
  A: pairs.B,
  B: pairs.C,
  C: pairs.A,
};

let sum = 0;

const obj = {
  X: 1,
  Y: 2,
  Z: 3,
};

for (let index = 0; index < lines.length; index++) {
  const [they, me] = lines[index].split(" ");

  let toBeSummed = obj[me];

  toBeSummed += win[they] === me ? 6 : pairs[they] === me ? 3 : 0;

  sum += toBeSummed;
}

let result = lines;

console.log(sum);
