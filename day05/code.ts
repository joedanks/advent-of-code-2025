function parseInput(data: string[]): [[number, number][], number[]] {
  const ranges: [number, number][] = [];
  const inventory: number[] = [];

  data.forEach((line) => {
    if (line.includes("-")) {
      ranges.push(line.split("-").map((n) => parseInt(n)) as [number, number]);
    } else if (line === "") {
      return;
    } else {
      inventory.push(parseInt(line));
    }
  });
  return [ranges, inventory];
}

export function part1(data: string[]): number {
  let count = 0;
  const [ranges, inventory] = parseInput(data);
  inventory.forEach((item) => {
    for (let i = 0; i < ranges.length; i++) {
      const [min, max] = ranges[i];
      if (item >= min && item <= max) {
        count++;
        break;
      }
    }
  });
  return count;
}

export function part2(data: string[]): number {
  const [ranges] = parseInput(data);
  const sorted = ranges.sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];
    if (current[0] <= last[1] + 1) {
      merged[merged.length - 1] = [last[0], Math.max(last[1], current[1])];
    } else {
      merged.push(current);
    }
  }
  return merged.reduce((acc, next) => {
    return acc + (next[1] - next[0] + 1);
  }, 0);
}
