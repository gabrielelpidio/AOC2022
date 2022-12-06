export {};

const chars = (await Deno.readTextFile("./input.txt")).split("");

for (const char in chars) {
  const uniqueChars = new Set([...chars].splice(+char, 14));
  if (uniqueChars.size === 14) {
    console.log(+char + 14);
    break;
  }
}
