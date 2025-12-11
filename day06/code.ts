function parseInput(data: string[]): [number[], string][] {
  const result: [number[], string][] = [];
  for (let i = 0; i < data.length - 1; i++) {
    data[i]
      .trim()
      .split(/\s+/)
      .forEach((num, index) => {
        if (!result[index]) {
          result[index] = [[], ""];
        }
        result[index][0].push(parseInt(num));
      });
  }
  data[data.length - 1]
    .trim()
    .split(/\s+/)
    .forEach((op, index) => {
      result[index][1] = op;
    });
  return result;
}

export function part1(data: string[]): number {
  const problems = parseInput(data);
  return problems.reduce((acc, problem) => {
    const operator = problem[1];
    return (acc + eval(problem[0].join(operator))) as number;
  }, 0);
}

function prepInput(data: string[]): string[][] {
  return data.map((line) => line.split(""));
}

export function part2(data: string[]): number {
  const input = prepInput(data);
  const operators = input[input.length - 1];
  const numbers = input.slice(0, input.length - 1);
  const rowCount = numbers.length;
  const finalEvals: string[] = [];
  let currentOperator = "";
  const currentEvals: string[] = [];

  for (let x = 0; x < operators.length; x++) {
    let evalString = "";
    for (let y = 0; y < rowCount; y++) {
      evalString += numbers[y][x];
    }
    currentOperator =
      operators[x].trim() === "" ? currentOperator : operators[x].trim();
    if (evalString.trim() === "") {
      finalEvals.push(currentEvals.join(currentOperator));
      currentEvals.length = 0;
    } else {
      currentEvals.push(evalString.trim());
    }
  }
  finalEvals.push(currentEvals.join(currentOperator));

  console.log(finalEvals);
  return finalEvals.map(eval).reduce((acc, num) => acc + num, 0);
}
