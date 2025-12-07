import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 04", () => {
  const testInput = [
    "..@@.@@@@.",
    "@@@.@.@.@@",
    "@@@@@.@.@@",
    "@.@@@@..@.",
    "@@.@@@@.@@",
    ".@@@@@@@.@",
    ".@.@.@.@@@",
    "@.@@@.@@@@",
    ".@@@@@@@@.",
    "@.@.@@@.@.",
  ];

  describe.skip("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(13);
    });
    it("should solve the real input", () => {
      const result = part1(input);
      expect(result).toBeLessThan(1558);
      expect(result).toBe(0);
    });
  });

  describe.skip("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testInput)).toBe(43);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
