import solver from "javascript-lp-solver";

interface Button {
  key: number;
  togglesIndexes: number[];
}

interface Machine {
  currentState: string;
  desiredState: string;
  buttons: Button[];
  currentJoltage: number[];
  desiredJoltage: number[];
}

function parseInput(data: string[]): Machine[] {
  return data.map((line) => {
    const elements = line.split(" ");
    const desiredState = elements[0].slice(1, -1);
    const desiredJoltage = elements
      .slice(1)
      .filter((text) => text.startsWith("{"))
      .flatMap((text) =>
        text
          .slice(1, -1)
          .split(",")
          .map((joltage) => parseInt(joltage))
      );

    return {
      currentState: desiredState.replaceAll(/./g, "."),
      desiredState,
      buttons: elements
        .slice(1)
        .filter((text) => text.startsWith("("))
        .map((text, index) => ({
          key: index,
          togglesIndexes: text
            .slice(1, -1)
            .split(",")
            .map((index) => parseInt(index)),
        })),
      currentJoltage: desiredJoltage.map((j) => 0),
      desiredJoltage,
    };
  });
}

function buildButtonKey(buttons: Button[]): string {
  return buttons
    .map((button) => button.key)
    .sort()
    .join(",");
}

export function pressButton(currentState: string, button: Button): string {
  const tempState = currentState.split("");
  button.togglesIndexes.forEach((index) => {
    tempState[index] = tempState[index] === "." ? "#" : ".";
  });
  return tempState.join("");
}

function analyzeMachine(machine: Machine): string {
  const attemptCache: Set<string> = new Set<string>();
  const attempts: [string, Button[]][] = [[machine.currentState, []]];
  let found = false;

  do {
    attempts.sort((a, b) => a[1].length - b[1].length);
    const attempt = attempts.shift();
    for (const button of machine.buttons) {
      const nextButtons = [...attempt[1], button];
      const nextButtonKey = buildButtonKey(nextButtons);
      if (attemptCache.has(nextButtonKey)) {
        continue;
      }
      attemptCache.add(nextButtonKey);
      const nextState = pressButton(attempt[0], button);
      if (nextState === machine.desiredState) {
        found = true;
        console.log(
          `Machine ${machine.desiredState} achieved with buttons: ${nextButtons
            .map((button) => button.togglesIndexes.join(","))
            .join(" -- ")}`
        );
        return nextButtonKey;
      }
      attempts.push([nextState, nextButtons]);
    }
  } while (!found);
}

export function part1(data: string[]): number {
  const machines = parseInput(data);
  return machines
    .map((machine) => analyzeMachine(machine))
    .reduce((acc, key) => acc + key.split(",").length, 0);
}

function compareJoltage(
  currentJoltage: number[],
  desiredJoltage: number[]
): number {
  let equals = true;
  for (let i = 0; i < currentJoltage.length; i++) {
    if (currentJoltage[i] !== desiredJoltage[i]) {
      equals = false;
    }
    if (currentJoltage[i] > desiredJoltage[i]) {
      return 1;
    }
  }
  return equals ? 0 : -1;
}

export function pressButtonJoltage(
  currentJoltage: number[],
  button: Button
): number[] {
  const tempJoltage = [...currentJoltage];
  button.togglesIndexes.forEach((index) => {
    tempJoltage[index] += 1;
  });
  return tempJoltage;
}

// Binary search to find insertion index to keep attempts sorted by button count
function findInsertionIndex(
  attempts: [number[], number][],
  buttonCount: number
): number {
  let left = 0;
  let right = attempts.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (attempts[mid][1] < buttonCount) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function joltageToKey(joltage: number[]): string {
  return joltage.join(",");
}

function initialAttempts(machine: Machine): [number[], number][] {
  return machine.buttons.map((button) => {
    const sortedIndexes = button.togglesIndexes
      .map((index) => {
        return [index, machine.desiredJoltage[index]];
      })
      .sort((a, b) => a[1] - b[1]);
    const minimumCount = sortedIndexes[0][1];
    const initialJoltage: number[] = [...machine.currentJoltage];
    button.togglesIndexes.forEach((index) => {
      initialJoltage[index] = minimumCount;
    });
    return [initialJoltage, minimumCount];
  });
}

function analyzeMachineJoltage(machine: Machine): number {
  // Build the LP model
  const model: any = {
    optimize: "totalPresses",
    opType: "min",
    constraints: {},
    variables: {},
    ints: {}, // All variables must be integers
  };

  // Create a variable for each button (number of times it's pressed)
  machine.buttons.forEach((button, buttonIndex) => {
    const varName = `button${buttonIndex}`;

    model.variables[varName] = {
      totalPresses: 1, // Each button press contributes 1 to the total
    };

    // Mark as integer variable
    model.ints[varName] = 1;

    // Add constraints for each joltage position this button affects
    button.togglesIndexes.forEach((positionIndex) => {
      const constraintName = `position${positionIndex}`;

      if (!model.variables[varName][constraintName]) {
        model.variables[varName][constraintName] = 0;
      }

      // Each press of this button adds 1 to this position
      model.variables[varName][constraintName] = 1;
    });
  });

  // Add constraints for each joltage position (must equal target)
  machine.desiredJoltage.forEach((targetValue, positionIndex) => {
    const constraintName = `position${positionIndex}`;
    model.constraints[constraintName] = {
      equal: targetValue, // Must equal the target joltage exactly
    };
  });

  // Solve the LP problem
  const result = solver.Solve(model);

  if (!result.feasible) {
    throw new Error(
      `No solution found for machine {${machine.desiredJoltage.join(",")}}`
    );
  }

  // Calculate total presses by summing all button variables
  let totalPresses = 0;
  machine.buttons.forEach((_, buttonIndex) => {
    const varName = `button${buttonIndex}`;
    const presses = result[varName] || 0;
    totalPresses += presses;
  });

  console.log(
    `Machine {${machine.desiredJoltage.join(
      ","
    )}} achieved with button clicks: ${totalPresses}`
  );

  return totalPresses;
}

export function part2(data: string[]): number {
  const machines = parseInput(data);
  return machines
    .map((machine) => analyzeMachineJoltage(machine))
    .reduce((acc, count) => acc + count, 0);
}
