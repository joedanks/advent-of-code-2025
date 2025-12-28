import { part1, part2 } from "./code";
import input from "./input.json";

describe("Day 11", () => {
  const testInput: string[] = [
    "aaa: you hhh",
    "you: bbb ccc",
    "bbb: ddd eee",
    "ccc: ddd eee fff",
    "ddd: ggg",
    "eee: out",
    "fff: out",
    "ggg: out",
    "hhh: ccc fff iii",
    "iii: out",
  ];

  const secondTestInput: string[] = [
    "svr: aaa bbb",
    "aaa: fft",
    "fft: ccc",
    "bbb: tty",
    "tty: ccc",
    "ccc: ddd eee",
    "ddd: hub",
    "hub: fff",
    "eee: dac",
    "dac: fff",
    "fff: ggg hhh",
    "ggg: out",
    "hhh: out",
  ];

  describe.skip("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testInput)).toBe(5);
    });
    it("should solve the real input", () => {
      expect(part1(input)).toBe(0);
    });
  });

  describe.skip("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(secondTestInput)).toBe(2);
    });
    it("should solve the real input", () => {
      expect(part2(input)).toBe(0);
    });
  });
});
