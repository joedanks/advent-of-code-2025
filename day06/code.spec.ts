import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 06", () => {
  const testInput = [
    "123 328  51 64 ",
    " 45 64  387 23 ",
    "  6 98  215 314",
    "*   +   *   +  ",
  ];

  describe.skip("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(4277556);
    });
    it("should solve the real input", () => {
      expect(part1(input)).toBe(0);
    });
  });

  describe.skip("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testInput)).toBe(3263827);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
