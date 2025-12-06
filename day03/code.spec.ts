import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 03", () => {
  const testInput = [
    "987654321111111",
    "811111111111119",
    "234234234234278",
    "818181911112111",
  ];

  describe.skip("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(357);
    });
    it("should solve the real input", () => {
      const result = part1(input);
      expect(result).toBeGreaterThan(17188);
      expect(result).toBe(17403);
    });
  });

  describe.skip("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testInput)).toBe(3121910778619);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
