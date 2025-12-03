import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 02", () => {
  const testInput = [
    "11-22",
    "95-115",
    "998-1012",
    "1188511880-1188511890",
    "222220-222224",
    "1698522-1698528",
    "446443-446449",
    "38593856-38593862",
    "565653-565659",
    "824824821-824824827",
    "2121212118-2121212124",
  ];

  describe("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(1227775554);
    });
    it("should solve the real input", () => {
      expect(part1(input)).toBe(24747430309);
    });
  });

  describe("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testInput)).toBe(0); // TODO: Update expected value
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
