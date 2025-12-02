export function part1(data: string[]): number {
  let zeroCount = 0;
  let pointer = 50;
  data.forEach(c => {
    const direction = c.charAt(0);
    let next = direction == 'L' ? pointer - parseInt(c.substring(1)) : pointer + parseInt(c.substring(1));
    next = next % 100;
    if (next < 0) {
      next += 100;
    }
    pointer = next;
    if (pointer == 0) {
      zeroCount++;
    }
  })
  return zeroCount;
}

export function part2(data: string[]): number {
  return 0;
}
