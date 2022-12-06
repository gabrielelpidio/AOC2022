export {};

const chars = (await Deno.readTextFile("./input.txt")).split("");

for (const char in chars) {
  const uniqueChars = new Set([...chars].splice(+char, 4));
  if (uniqueChars.size === 4) {
    console.log(+char + 4);
    break;
  }
}
