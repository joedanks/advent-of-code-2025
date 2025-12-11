function toKey(x: number, y: number): string {
  return `${x},${y}`;
}

function fromKey(key: string): [number, number] {
  const [x, y] = key.split(",").map((s) => parseInt(s));
  return [x, y];
}

function readFromMap(map: Record<string, string>, key: string): string {
  return map[key] ?? ".";
}

function parseInput(
  data: string[]
): [Record<string, string>, [number, number]] {
  let start: [number, number] = [-1, -1];
  const map = data
    .flatMap((line, y) => {
      return line
        .split("")
        .map((char, x) => {
          if (char === "S") {
            start = [x, y];
          }
          if (char != ".") {
            return [toKey(x, y), char];
          }
          return null;
        })
        .filter((a) => !!a);
    })
    .reduce((acc, next) => {
      acc[next[0]] = next[1];
      return acc;
    }, {});
  return [map, start];
}

function advanceBeam(
  map: Record<string, string>,
  beam: [number, number]
): [number, number][] {
  const [x, y] = beam;
  const below = readFromMap(map, toKey(x, y + 1));
  if (below === ".") {
    return [[x, y + 1]];
  } else if (below === "^") {
    return [
      [x - 1, y + 1],
      [x + 1, y + 1],
    ];
  }
  return [];
}

export function part1(data: string[]): number {
  const [map, start] = parseInput(data);

  let currentBeams: [number, number][] = advanceBeam(map, start);
  let splits: number = 0;
  for (let i = 0; i < data.length; i++) {
    const nextSteps: Set<string> = new Set();
    currentBeams.forEach((beam) => {
      const nextBeams = advanceBeam(map, beam);
      if (nextBeams.length > 1) {
        splits++;
      }
      nextBeams
        .map((n) => toKey(n[0], n[1]))
        .forEach((key) => nextSteps.add(key));
    });
    currentBeams = Array.from(nextSteps).map((key) => fromKey(key));
  }
  return splits;
}

export function part2(data: string[]): number {
  const [map, start] = parseInput(data);

  let currentBeams: [number, number][] = advanceBeam(map, start);
  for (let i = 0; i < data.length; i++) {
    const nextSteps: [number, number][] = [];
    currentBeams.forEach((beam) => {
      const nextBeams = advanceBeam(map, beam);
      nextBeams.forEach((n) => nextSteps.push(n));
    });
    currentBeams = nextSteps;
  }
  return currentBeams.length;
}
