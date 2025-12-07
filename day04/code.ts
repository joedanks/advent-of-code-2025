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

function getNeighbors(
  map: Record<string, string>,
  x: number,
  y: number
): string[] {
  return [
    toKey(x - 1, y),
    toKey(x + 1, y),
    toKey(x, y - 1),
    toKey(x, y + 1),
    toKey(x - 1, y - 1),
    toKey(x - 1, y + 1),
    toKey(x + 1, y - 1),
    toKey(x + 1, y + 1),
  ].map((key) => readFromMap(map, key));
}

function parseMap(data: string[]): Record<string, string> {
  const entries = data.flatMap((row, y) =>
    row.split("").reduce((acc, cell, x) => {
      if (cell === "@") {
        acc.push([toKey(x, y), cell]);
      }
      return acc;
    }, [])
  );
  return Object.fromEntries(entries);
}

export function part1(data: string[]): number {
  const map = parseMap(data);
  let count = 0;
  Object.entries(map).forEach(([key, value]) => {
    const neighbors = getNeighbors(map, ...fromKey(key));
    const surroundingRolls = neighbors.filter((n) => n === "@").length;
    if (surroundingRolls < 4) {
      count++;
    }
  });
  return count;
}

export function part2(data: string[]): number {
  const map = parseMap(data);
  let rollsToRemove = [];
  let count = 0;
  do {
    rollsToRemove = [];
    Object.entries(map).forEach(([key, value]) => {
      const neighbors = getNeighbors(map, ...fromKey(key));
      const surroundingRolls = neighbors.filter((n) => n === "@").length;
      if (surroundingRolls < 4) {
        rollsToRemove.push(key);
        count++;
      }
    });
    rollsToRemove.forEach((key) => {
      delete map[key];
    });
  } while (rollsToRemove.length > 0);
  return count;
}
