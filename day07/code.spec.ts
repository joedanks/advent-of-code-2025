import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 07", () => {
  const testInput = [
    ".......S.......",
    "...............",
    ".......^.......",
    "...............",
    "......^.^......",
    "...............",
    ".....^.^.^.....",
    "...............",
    "....^.^...^....",
    "...............",
    "...^.^...^.^...",
    "...............",
    "..^...^.....^..",
    "...............",
    ".^.^.^.^.^...^.",
    "...............",
  ];

  describe.skip("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(21);
    });
    it("should solve the real input", () => {
      expect(part1(input)).toBe(0);
    });
  });

  describe.skip("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testInput)).toBe(40);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
