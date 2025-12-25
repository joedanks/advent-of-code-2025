import { part1, part2, pressButton } from "./code";
import input from "./input.json";

describe("Day 10", () => {
  const testInput: string[] = [
    "[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}",
    "[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}",
    "[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}",
  ];

  describe.skip("Part 1", () => {
    it("should press buttons", () => {
      const first = pressButton("....", { key: 0, togglesIndexes: [1, 3] });
      const second = pressButton(first, { key: 1, togglesIndexes: [2, 3] });
      console.log(`First: ${first}, Second: ${second}`);
    });
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(7);
    });
    it("should solve the real input", () => {
      expect(part1(input)).toBe(0);
    });
  });

  describe.skip("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testInput)).toBe(33);
    });
    it("should solve the first real input", () => {
      expect(part2(input.slice(0, 1))).toBe(78);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
