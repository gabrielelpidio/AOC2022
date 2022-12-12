export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n\n");
const rounds = 10000;

const parseMonkey = (monkey: string) => {
  /**
    Monkey 0:
      Starting items: 79, 98
      Operation: new = old * 19
      Test: divisible by 23
        If true: throw to monkey 2
        If false: throw to monkey 3
   */
  const [name, items, operation, test, trueCase, falseCase] =
    monkey.split("\n");
  const i = items
    .split(": ")[1]
    .split(", ")
    .map((n) => parseInt(n));
  const [id] = name.split("Monkey ")[1].split(":");
  const [_o, op] = operation.split(": ")[1].split(" = ");
  const divisibleBy = test.split(": ")[1].split(" by ")[1];
  const [_tt, throwTrue] = trueCase.split("to monkey ");
  const [_tf, throwFalse] = falseCase.split("to monkey ");

  const opFn = operationBySign(op.split(" ")[1]);
  const opSubjects = op
    .split(" ")
    .map((n) => (n === "old" ? n : parseInt(n)))
    .filter((n) => n === "old" || !isNaN(n));

  return {
    id: parseInt(id),
    items: i,
    opFn: opFn || (() => 0),
    opSubjects,
    testOp: parseInt(divisibleBy),
    throwTrue: parseInt(throwTrue),
    throwFalse: parseInt(throwFalse),
    timesInspected: 0,
  };
};

const operationBySign = (sign: string) => {
  switch (sign) {
    case "*":
      return (a: number, b: number) => a * b;
    case "+":
      return (a: number, b: number) => a + b;
    case "-":
      return (a: number, b: number) => a - b;
    case "/":
      return (a: number, b: number) => a / b;
  }
};

const monkeys = lines.map(parseMonkey);
const divisor = monkeys.reduce((acc, m) => acc * m.testOp, 1);

for (let i = 0; i < rounds; i++) {
  for (const monkey of monkeys) {
    if (monkey.items.length === 0) continue;
    while (monkey.items.length > 0) {
      const item = monkey.items.shift();
      const subjects = monkey.opSubjects.map((s) => (s === "old" ? item : s));
      const result = monkey.opFn(...(subjects as [number, number])) % divisor;

      if (result % monkey.testOp === 0) {
        monkeys[monkey.throwTrue].items.push(result);
      } else {
        monkeys[monkey.throwFalse].items.push(result);
      }
      monkey.timesInspected++;
    }
  }
}

const [a, b, ...rest] = monkeys.sort(
  (a, b) => b.timesInspected - a.timesInspected
);
console.log(a.timesInspected * b.timesInspected);
