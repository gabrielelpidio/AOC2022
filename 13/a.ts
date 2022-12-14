export {};

type ArrType = number[] | ArrType[];

const lines = (await Deno.readTextFile("./input.txt"))
  .split("\n\n")
  .map((str) => {
    const [left, right] = str.split("\n");
    return JSON.parse(`{"left":${left}, "right":${right}}`) as {
      left: ArrType;
      right: ArrType;
    };
  });

type PCompareArrays = number[] | undefined | undefined[] | PCompareArrays[];

function compareArrays(
  leftArr: PCompareArrays,
  rightArr: PCompareArrays
): boolean {
  if (typeof leftArr === "undefined" && typeof rightArr === "undefined") {
    return false;
  }

  if (typeof leftArr === "undefined") {
    return true;
  }

  if (typeof rightArr === "undefined") {
    return false;
  }

  if (leftArr.length === 0 && rightArr.length !== 0) return true;
  if (leftArr.length !== 0 && rightArr.length === 0) return false;

  for (const i in leftArr) {
    const left = leftArr[i];
    const right = rightArr[i];

    if (!right && right !== 0 && (typeof left === "number" || left))
      return false;

    if (!left && left !== 0 && (typeof right === "number" || right)) {
      return true;
    }

    if (typeof left === "number" && typeof right === "number") {
      if (left !== right) return left < right;
    }

    if (Array.isArray(left) || Array.isArray(right)) {
      const res = compareArrays(
        Array.isArray(left) ? left : [left],
        Array.isArray(right) ? right : [right]
      );
      if (typeof res !== "undefined") {
        return res;
      }
    }
  }
  if (leftArr.length < rightArr.length) return true;
}

const comparisonResults = [];
for (const line in lines) {
  // console.log("-------------- " + line + " --------------");
  const c = compareArrays(lines[line].left, lines[line].right);
  if (line === "114") console.log(lines[line].left, lines[line].right);
  // console.log(line, c);
  if (c) {
    comparisonResults.push(+line + 1);
  }
}

console.log(
  "result",
  comparisonResults.reduce((a, b) => a + b, 0)
);
