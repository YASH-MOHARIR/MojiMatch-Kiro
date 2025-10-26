import { Card, EmojiInstance } from '../../shared/types/game';
import { EMOJI_POOL } from '../../shared/constants/emojis';
import { SeededRandom } from '../../shared/utils/seededRandom';

/**
 * Random number generator interface
 * Can be either Math.random or SeededRandom
 */
interface RandomGenerator {
  next(): number;
  nextInt(min: number, max: number): number;
  nextFloat(min: number, max: number): number;
  shuffle<T>(array: readonly T[]): T[];
  pick<T>(array: readonly T[]): T;
}

/**
 * Wrapper for Math.random to match SeededRandom interface
 */
class MathRandomGenerator implements RandomGenerator {
  next(): number {
    return Math.random();
  }

  nextInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  nextFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  shuffle<T>(array: readonly T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    return shuffled;
  }

  pick<T>(array: readonly T[]): T {
    return array[Math.floor(Math.random() * array.length)]!;
  }
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: readonly T[], rng: RandomGenerator): T[] {
  return rng.shuffle(array);
}

/**
 * Selects n unique random emojis from the pool, excluding specified emojis
 */
function selectRandomEmojis(count: number, exclude: string[], rng: RandomGenerator): string[] {
  const availableEmojis = EMOJI_POOL.filter(emoji => !exclude.includes(emoji));
  const shuffled = shuffleArray(availableEmojis, rng);
  return shuffled.slice(0, count);
}

/**
 * Generates a random size between 0.8x and 2.5x
 */
function getRandomSize(rng: RandomGenerator): number {
  const minSize = 0.8;
  const maxSize = 2.5;
  return rng.nextFloat(minSize, maxSize);
}

/**
 * Generates a random rotation between 0 and 360 degrees
 */
function getRandomRotation(rng: RandomGenerator): number {
  return rng.nextFloat(0, 360);
}

/**
 * Checks if two emojis overlap
 */
function checkOverlap(e1: EmojiInstance, e2: EmojiInstance): boolean {
  const baseFontSize = 40;
  const minDistance = 60; // Increased minimum distance between emoji centers

  // Calculate effective radius for each emoji (accounting for size)
  const radius1 = (baseFontSize * e1.size) / 2 + minDistance / 2;
  const radius2 = (baseFontSize * e2.size) / 2 + minDistance / 2;

  // Calculate distance between centers
  const dx = e1.x - e2.x;
  const dy = e1.y - e2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Check if they overlap
  return distance < radius1 + radius2;
}

/**
 * Generates random position within card boundaries with overlap prevention
 * Card dimensions: 350px × 450px
 */
function getRandomPositionWithoutOverlap(
  existingEmojis: EmojiInstance[],
  size: number,
  rng: RandomGenerator,
  cardWidth: number = 350,
  cardHeight: number = 450,
  maxAttempts: number = 50
): { x: number; y: number } {
  const padding = 40;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = padding + rng.nextFloat(0, cardWidth - 2 * padding);
    const y = padding + rng.nextFloat(0, cardHeight - 2 * padding);

    const tempEmoji: EmojiInstance = {
      emoji: '',
      x,
      y,
      size,
      rotation: 0,
    };

    // Check if this position overlaps with any existing emoji
    const hasOverlap = existingEmojis.some(existing => checkOverlap(tempEmoji, existing));

    if (!hasOverlap) {
      return { x, y };
    }
  }

  // If we couldn't find a non-overlapping position, return a random one
  const x = padding + rng.nextFloat(0, cardWidth - 2 * padding);
  const y = padding + rng.nextFloat(0, cardHeight - 2 * padding);
  return { x, y };
}

/**
 * Generates a pair of cards with exactly 1 matching emoji
 * @param seed Optional seed for deterministic generation (for daily challenges)
 * @param emojiCount Number of emojis per card (default: 8)
 */
export function generateCardPair(seed?: number, emojiCount: number = 8): {
  cards: [Card, Card];
  matchingEmoji: string;
} {
  // Use seeded RNG if seed provided, otherwise use Math.random
  const rng: RandomGenerator = seed !== undefined ? new SeededRandom(seed) : new MathRandomGenerator();

  // Step 1: Select 1 matching emoji from pool
  const matchingEmoji = rng.pick(EMOJI_POOL);

  // Step 2: Select (emojiCount - 1) unique emojis for card 1 (excluding matching emoji)
  const card1Emojis = selectRandomEmojis(emojiCount - 1, [matchingEmoji], rng);

  // Step 3: Select (emojiCount - 1) unique emojis for card 2 (excluding matching emoji and card 1 emojis)
  const card2Emojis = selectRandomEmojis(emojiCount - 1, [matchingEmoji, ...card1Emojis], rng);

  // Step 4: Add matching emoji to both cards
  const card1AllEmojis = [...card1Emojis, matchingEmoji];
  const card2AllEmojis = [...card2Emojis, matchingEmoji];

  // Step 5: Shuffle emoji order on each card
  const card1Shuffled = shuffleArray(card1AllEmojis, rng);
  const card2Shuffled = shuffleArray(card2AllEmojis, rng);

  // Create emoji instances with random size, rotation, and position (with overlap prevention)
  const card1Instances: EmojiInstance[] = [];
  for (const emoji of card1Shuffled) {
    const size = getRandomSize(rng);
    const rotation = getRandomRotation(rng);
    const position = getRandomPositionWithoutOverlap(card1Instances, size, rng);

    card1Instances.push({
      emoji: emoji!,
      x: position.x,
      y: position.y,
      size,
      rotation,
    });
  }

  const card2Instances: EmojiInstance[] = [];
  for (const emoji of card2Shuffled) {
    const size = getRandomSize(rng);
    const rotation = getRandomRotation(rng);
    const position = getRandomPositionWithoutOverlap(card2Instances, size, rng);

    card2Instances.push({
      emoji: emoji!,
      x: position.x,
      y: position.y,
      size,
      rotation,
    });
  }

  const card1: Card = { emojis: card1Instances };
  const card2: Card = { emojis: card2Instances };

  return {
    cards: [card1, card2],
    matchingEmoji,
  };
}

/**
 * Verifies that exactly one emoji appears on both cards
 * Used for testing
 */
export function verifyCardPair(card1: Card, card2: Card): {
  isValid: boolean;
  matchingEmojis: string[];
} {
  const card1Emojis = card1.emojis.map(e => e.emoji);
  const card2Emojis = card2.emojis.map(e => e.emoji);

  const matchingEmojis = card1Emojis.filter(emoji => card2Emojis.includes(emoji));

  return {
    isValid: matchingEmojis.length === 1,
    matchingEmojis,
  };
}
