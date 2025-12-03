export function part1(data: string[]): number {
  const pattern = /^(.+)\1$/;
  const duplicates = [];
  data.map((s) => {
    const range = s.split("-").map((x) => parseInt(x));
    for (let i = range[0]; i <= range[1]; i++) {
      const result = i.toString().match(pattern);
      if (result) {
        duplicates.push(i);
      }
    }
  });
  return duplicates.reduce((acc, next) => acc + next, 0);
}

export function part2(data: string[]): number {
  return 0;
}
