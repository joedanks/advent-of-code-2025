export function part1(data: string[]): number {
  return data
    .map((bank) => {
      const [max, index] = findMax(bank.substring(0, bank.length - 1));
      const [nextMax] = findMax(bank.substring(index + 1));
      return parseInt(`${max}${nextMax}`);
    })
    .reduce((prev, next) => prev + next);
}

function findMax(batteryBank: string): [number, number] {
  const batteries = batteryBank.split("").map((battery) => parseInt(battery));
  let max = -1;
  let index = -1;
  for (const [i, battery] of batteries.entries()) {
    if (battery > max) {
      max = battery;
      index = i;
    }
    if (max === 9) {
      break;
    }
  }
  return [max, index];
}

export function part2(data: string[]): number {
  return data
    .map((bank) => {
      let m = "";
      let lastIndex = 0;
      for (let i = 11; i >= 0; i--) {
        const [max, index] = findMax(
          bank.substring(lastIndex, bank.length - i)
        );
        m += max.toString();
        lastIndex += index + 1;
        // console.log(
        //   `max: ${max}, index: ${index}, lastIndex: ${lastIndex}, i: ${i}`
        // );
      }
      //   console.log(m);
      return parseInt(m);
    })
    .reduce((prev, next) => prev + next);
}
