import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 09", () => {
  const testInput: string[] = [
    "7,1",
    "11,1",
    "11,7",
    "9,7",
    "9,5",
    "2,5",
    "2,3",
    "7,3",
  ];

  describe.skip("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(50);
    });
    it("should solve the real input", () => {
      expect(part1(input)).toBe(0);
    });
  });

  describe.skip("Part 2", () => {
    it.skip("should solve the example", () => {
      expect(part2(testInput)).toBe(24);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
