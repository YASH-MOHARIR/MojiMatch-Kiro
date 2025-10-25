import { describe, it, expect } from 'vitest';
import { SeededRandom, generateSeedFromDate, getTodaySeed } from './seededRandom';

describe('SeededRandom', () => {
  describe('Deterministic Output', () => {
    it('should produce identical sequences with same seed', () => {
      const rng1 = new SeededRandom(12345);
      const rng2 = new SeededRandom(12345);

      const sequence1 = Array.from({ length: 10 }, () => rng1.next());
      const sequence2 = Array.from({ length: 10 }, () => rng2.next());

      expect(sequence1).toEqual(sequence2);
    });

    it('should produce different sequences with different seeds', () => {
      const rng1 = new SeededRandom(12345);
      const rng2 = new SeededRandom(54321);

      const sequence1 = Array.from({ length: 10 }, () => rng1.next());
      const sequence2 = Array.from({ length: 10 }, () => rng2.next());

      expect(sequence1).not.toEqual(sequence2);
    });

    it('should produce same sequence after reset', () => {
      const rng = new SeededRandom(12345);
      const sequence1 = Array.from({ length: 10 }, () => rng.next());

      rng.reset(12345);
      const sequence2 = Array.from({ length: 10 }, () => rng.next());

      expect(sequence1).toEqual(sequence2);
    });
  });

  describe('next()', () => {
    it('should return numbers between 0 and 1', () => {
      const rng = new SeededRandom(12345);

      for (let i = 0; i < 100; i++) {
        const value = rng.next();
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(1);
      }
    });

    it('should not return the same value consecutively', () => {
      const rng = new SeededRandom(12345);
      const values = Array.from({ length: 10 }, () => rng.next());
      const uniqueValues = new Set(values);

      expect(uniqueValues.size).toBeGreaterThan(1);
    });
  });

  describe('nextInt()', () => {
    it('should return integers in specified range', () => {
      const rng = new SeededRandom(12345);
      const min = 5;
      const max = 15;

      for (let i = 0; i < 100; i++) {
        const value = rng.nextInt(min, max);
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThan(max);
        expect(Number.isInteger(value)).toBe(true);
      }
    });

    it('should handle range of 0 to 10', () => {
      const rng = new SeededRandom(12345);

      for (let i = 0; i < 100; i++) {
        const value = rng.nextInt(0, 10);
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThan(10);
      }
    });
  });

  describe('nextFloat()', () => {
    it('should return floats in specified range', () => {
      const rng = new SeededRandom(12345);
      const min = 0.8;
      const max = 2.5;

      for (let i = 0; i < 100; i++) {
        const value = rng.nextFloat(min, max);
        expect(value).toBeGreaterThanOrEqual(min);
        expect(value).toBeLessThan(max);
      }
    });
  });

  describe('shuffle()', () => {
    it('should shuffle array deterministically', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const rng1 = new SeededRandom(12345);
      const shuffled1 = rng1.shuffle(array);

      const rng2 = new SeededRandom(12345);
      const shuffled2 = rng2.shuffle(array);

      expect(shuffled1).toEqual(shuffled2);
    });

    it('should contain all original elements', () => {
      const array = [1, 2, 3, 4, 5];
      const rng = new SeededRandom(12345);
      const shuffled = rng.shuffle(array);

      expect(shuffled.sort()).toEqual(array.sort());
    });

    it('should not modify original array', () => {
      const array = [1, 2, 3, 4, 5];
      const original = [...array];
      const rng = new SeededRandom(12345);
      rng.shuffle(array);

      expect(array).toEqual(original);
    });
  });

  describe('pick()', () => {
    it('should pick elements deterministically', () => {
      const array = ['a', 'b', 'c', 'd', 'e'];

      const rng1 = new SeededRandom(12345);
      const picks1 = Array.from({ length: 10 }, () => rng1.pick(array));

      const rng2 = new SeededRandom(12345);
      const picks2 = Array.from({ length: 10 }, () => rng2.pick(array));

      expect(picks1).toEqual(picks2);
    });

    it('should only pick elements from the array', () => {
      const array = ['a', 'b', 'c'];
      const rng = new SeededRandom(12345);

      for (let i = 0; i < 100; i++) {
        const picked = rng.pick(array);
        expect(array).toContain(picked);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle seed of 0', () => {
      const rng = new SeededRandom(0);
      const value = rng.next();

      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    });

    it('should handle negative seed', () => {
      const rng = new SeededRandom(-12345);
      const value = rng.next();

      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    });

    it('should handle very large seed', () => {
      const rng = new SeededRandom(999999999);
      const value = rng.next();

      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    });
  });

  describe('getSeed()', () => {
    it('should return current seed', () => {
      const seed = 12345;
      const rng = new SeededRandom(seed);

      expect(rng.getSeed()).toBe(seed);
    });

    it('should return updated seed after reset', () => {
      const rng = new SeededRandom(12345);
      const newSeed = 54321;

      rng.reset(newSeed);

      expect(rng.getSeed()).toBe(newSeed);
    });
  });
});

describe('generateSeedFromDate', () => {
  it('should convert date string to numeric seed', () => {
    const seed = generateSeedFromDate('2025-10-25');
    expect(seed).toBe(20251025);
  });

  it('should handle different date formats', () => {
    expect(generateSeedFromDate('2025-01-01')).toBe(20250101);
    expect(generateSeedFromDate('2025-12-31')).toBe(20251231);
  });

  it('should produce different seeds for different dates', () => {
    const seed1 = generateSeedFromDate('2025-10-25');
    const seed2 = generateSeedFromDate('2025-10-26');

    expect(seed1).not.toBe(seed2);
  });
});

describe('getTodaySeed', () => {
  it('should return a valid numeric seed', () => {
    const seed = getTodaySeed();

    expect(typeof seed).toBe('number');
    expect(seed).toBeGreaterThan(0);
  });

  it('should return same seed when called multiple times in same day', () => {
    const seed1 = getTodaySeed();
    const seed2 = getTodaySeed();

    expect(seed1).toBe(seed2);
  });
});
