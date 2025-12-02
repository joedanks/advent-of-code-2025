import { part1, part2 } from './code';
import input from './input.json';

describe('Day 01', () => {
  const testInput = [
    'L68',
    'L30',
    'R48',
    'L5',
    'R60',
    'L55',
    'L1',
    'L99',
    'R14',
    'L82',
  ];

  describe('Part 1', () => {
    it('should solve the example', () => {
      expect(part1(testInput)).toBe(3);
    });
    it('should solve the real input', () => {
      expect(part1(input)).toBe(0);
    })
  });

  describe('Part 2', () => {
    it('should solve the example', () => {
      expect(part2(testInput)).toBe(0); // TODO: Update expected value
    });
  });
});
