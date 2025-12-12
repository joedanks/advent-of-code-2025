import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 08", () => {
  const testInput: string[] = [
    "162,817,812",
    "57,618,57",
    "906,360,560",
    "592,479,940",
    "352,342,300",
    "466,668,158",
    "542,29,236",
    "431,825,988",
    "739,650,466",
    "52,470,668",
    "216,146,977",
    "819,987,18",
    "117,168,530",
    "805,96,715",
    "346,949,466",
    "970,615,88",
    "941,993,340",
    "862,61,35",
    "984,92,344",
    "425,690,689",
  ];

  describe("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput, 10)).toBe(40);
    });
    it("should solve the real input", () => {
      expect(part1(input, 1000)).toBe(0);
    });
  });

  describe.skip("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testInput)).toBe(0);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
