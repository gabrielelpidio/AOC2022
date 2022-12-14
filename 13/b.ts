export {};

type ArrType = number[] | ArrType[];

const lines = (await Deno.readTextFile("./input.txt"))
  .split("\n\n")
  .flatMap((str) => {
    const [l, r] = str.split("\n");
    const { left, right } = JSON.parse(`{"left":${l}, "right":${r}}`) as {
      left: ArrType;
      right: ArrType;
    };
    return [left, right];
  });

lines.push([[2]], [[6]]);

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

const arr = lines.sort((...a) => (compareArrays(...a) ? -1 : 1));

const i1 = arr.findIndex((a) => JSON.stringify(a) === JSON.stringify([[2]]));
const i2 = arr.findIndex((a) => JSON.stringify(a) === JSON.stringify([[6]]));

console.log(i1 + 1, i2 + 1);
