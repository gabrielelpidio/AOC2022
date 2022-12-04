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

const lose = {
  A: pairs.C,
  B: pairs.A,
  C: pairs.B,
};

let sum = 0;

const obj = {
  X: 1,
  Y: 2,
  Z: 3,
};

const obj2 = {
  Y: 3,
  X: 0,
  Z: 6,
};

for (let index = 0; index < lines.length; index++) {
  const [they, me] = lines[index].split(" ");

  let toBeSummed = 0;

  toBeSummed += obj2[me];

  console.log(they, me);
  console.log(pairs[they]);

  toBeSummed +=
    me === "Y"
      ? obj[pairs[they]]
      : me === "X"
      ? obj[lose[they]]
      : obj[win[they]];

  console.log(toBeSummed);

  sum += toBeSummed;
}

let result = lines;

console.log(sum);
