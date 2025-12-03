export function part1(data: string[]): number {
  let zeroCount = 0;
  let pointer = 50;
  data.forEach((c) => {
    const direction = c.charAt(0);
    let next =
      direction == "L"
        ? pointer - parseInt(c.substring(1))
        : pointer + parseInt(c.substring(1));
    next = next % 100;
    if (next < 0) {
      next += 100;
    }
    pointer = next;
    if (pointer == 0) {
      zeroCount++;
    }
  });
  return zeroCount;
}

export function part2(data: string[]): number {
  let zeroCount = 0;
  let pointer = 50;

  data.forEach((c) => {
    // console.log(`Command: ${c}`);
    const direction = c.charAt(0);
    const ticks = parseInt(c.substring(1));
    const minTicks = ticks % 100;
    let next = direction == "L" ? pointer - minTicks : pointer + minTicks;
    const spins = Math.trunc(ticks / 100);
    zeroCount += spins;
    if (next >= 100) {
      next = next % 100;
      if (pointer != 0) {
        zeroCount++;
      }
    } else if (next < 0) {
      next = next % 100;
      next += 100;
      if (pointer != 0) {
        zeroCount++;
      }
    } else if (next === 0) {
      zeroCount++;
    }
    pointer = next;
    // console.log(`Pointer: ${pointer}  Zero Count: ${zeroCount}`);
  });
  return zeroCount;
}
