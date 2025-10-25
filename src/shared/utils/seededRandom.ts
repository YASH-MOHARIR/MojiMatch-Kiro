/**
 * Seeded Random Number Generator
 * Uses Linear Congruential Generator (LCG) algorithm for deterministic random numbers
 */
export class SeededRandom {
  private seed: number;
  private readonly a = 1664525;
  private readonly c = 1013904223;
  private readonly m = 2 ** 32;

  constructor(seed: number) {
    this.seed = seed;
  }

  /**
   * Generate next random number between 0 and 1
   * @returns Random number in range [0, 1)
   */
  next(): number {
    this.seed = (this.a * this.seed + this.c) % this.m;
    return this.seed / this.m;
  }

  /**
   * Generate random integer between min (inclusive) and max (exclusive)
   * @param min Minimum value (inclusive)
   * @param max Maximum value (exclusive)
   * @returns Random integer in range [min, max)
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min)) + min;
  }

  /**
   * Generate random float between min (inclusive) and max (exclusive)
   * @param min Minimum value (inclusive)
   * @param max Maximum value (exclusive)
   * @returns Random float in range [min, max)
   */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Shuffle an array using Fisher-Yates algorithm with seeded random
   * @param array Array to shuffle (will be modified in place)
   * @returns The shuffled array
   */
  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i + 1);
      [result[i], result[j]] = [result[j]!, result[i]!];
    }
    return result;
  }

  /**
   * Pick a random element from an array
   * @param array Array to pick from
   * @returns Random element from the array
   */
  pick<T>(array: T[]): T {
    return array[this.nextInt(0, array.length)]!;
  }

  /**
   * Reset the seed to a new value
   * @param newSeed New seed value
   */
  reset(newSeed: number): void {
    this.seed = newSeed;
  }

  /**
   * Get current seed value
   * @returns Current seed
   */
  getSeed(): number {
    return this.seed;
  }
}

/**
 * Generate a seed from a date string (YYYY-MM-DD)
 * @param dateString Date in format YYYY-MM-DD
 * @returns Numeric seed
 */
export function generateSeedFromDate(dateString: string): number {
  // Remove hyphens and convert to number (e.g., "2025-10-25" → 20251025)
  return parseInt(dateString.replace(/-/g, ''), 10);
}

/**
 * Get today's date seed
 * @returns Seed for today's date
 */
export function getTodaySeed(): number {
  const today = new Date().toISOString().split('T')[0]!;
  return generateSeedFromDate(today);
}
