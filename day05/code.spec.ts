import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 05", () => {
  const testInput = [
    "3-5",
    "10-14",
    "16-20",
    "12-18",
    "",
    "1",
    "5",
    "8",
    "11",
    "17",
    "32",
  ];

  describe.skip("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(3);
    });
    it("should solve the real input", () => {
      expect(part1(input)).toBe(862);
    });
  });

  describe("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testInput)).toBe(14);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
