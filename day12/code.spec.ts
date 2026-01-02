import { part1, part2, getTransformationShapes, parseShapes } from "./code";
import shapes from "./shapes.json";
import regions from "./regions.json";

describe("Day 12", () => {
  const testShapes: string[] = [
    "0:",
    "###",
    "##.",
    "##.",
    "",
    "1:",
    "###",
    "##.",
    ".##",
    "",
    "2:",
    ".##",
    "###",
    "##.",
    "",
    "3:",
    "##.",
    "###",
    "##.",
    "",
    "4:",
    "###",
    "#..",
    "###",
    "",
    "5:",
    "###",
    ".#.",
    "###",
    "",
  ];
  const testRegions: string[] = [
    "4x4: 0 0 0 0 2 0",
    "12x5: 1 0 1 0 2 2",
    "12x5: 1 0 1 0 3 2",
  ];

  function printShape(shape: string[]) {
    let str = "";
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (shape.includes(`${x},${y}`)) {
          str += "#";
        } else {
          str += ".";
        }
      }
      str += "\n";
    }
    console.log(str);
  }

  describe.skip("utils", () => {
    it("should get transformations (H)", () => {
      const transformations = getTransformationShapes({
        id: 5,
        shape: ["0,0", "1,0", "2,0", "1,1", "0,2", "1,2", "2,2"],
        totalArea: 7,
      });
      expect(transformations).toHaveLength(2);
    });
    it("should get transformations (C)", () => {
      const present = {
        id: 4,
        shape: ["0,0", "1,0", "2,0", "0,1", "0,2", "1,2", "2,2"],
        totalArea: 7,
      };
      const transformations = getTransformationShapes(present);
      transformations.forEach((transformation) => {
        printShape(transformation);
      });
      expect(transformations).toHaveLength(4);
    });
    it("should parse shapes", () => {
      const parsed = parseShapes(testShapes);
      Object.values(parsed).forEach((present) => {
        printShape(present.shape);
      });
    });
  });

  describe("Part 1", () => {
    it("should solve the example", () => {
      expect(part1(testShapes, testRegions)).toBe(2);
    });
    it("should solve the real input", () => {
      expect(part1(shapes, regions)).toBe(0);
    });
  });

  describe.skip("Part 2", () => {
    it("should solve the example", () => {
      expect(part2(testShapes, testRegions)).toBe(0);
    });
    it("should solve the real input", () => {
      expect(part2(shapes, regions)).toBe(0);
    });
  });
});
