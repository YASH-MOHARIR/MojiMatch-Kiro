import { Card, EmojiInstance } from '../../shared/types/game';
import { EMOJI_POOL } from '../../shared/constants/emojis';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Selects n unique random emojis from the pool, excluding specified emojis
 */
function selectRandomEmojis(count: number, exclude: string[] = []): string[] {
  const availableEmojis = EMOJI_POOL.filter(emoji => !exclude.includes(emoji));
  const shuffled = shuffleArray(availableEmojis);
  return shuffled.slice(0, count);
}

/**
 * Generates a random size between 0.8x and 2.5x
 */
function getRandomSize(): number {
  const minSize = 0.8;
  const maxSize = 2.5;
  return minSize + Math.random() * (maxSize - minSize);
}

/**
 * Generates a random rotation between 0 and 360 degrees
 */
function getRandomRotation(): number {
  return Math.random() * 360;
}

/**
 * Generates random position within card boundaries
 * Card dimensions: 350px × 450px
 * Adds padding to keep emojis within bounds
 */
function getRandomPosition(cardWidth: number = 350, cardHeight: number = 450): { x: number; y: number } {
  const padding = 40; // Padding from edges to keep emojis visible
  const x = padding + Math.random() * (cardWidth - 2 * padding);
  const y = padding + Math.random() * (cardHeight - 2 * padding);
  return { x, y };
}

/**
 * Generates a pair of cards with exactly 1 matching emoji
 * Each card contains 8 emojis total
 */
export function generateCardPair(): {
  cards: [Card, Card];
  matchingEmoji: string;
} {
  // Step 1: Select 1 matching emoji from pool
  const matchingEmoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];

  // Step 2: Select 7 unique emojis for card 1 (excluding matching emoji)
  const card1Emojis = selectRandomEmojis(7, [matchingEmoji]);

  // Step 3: Select 7 unique emojis for card 2 (excluding matching emoji and card 1 emojis)
  const card2Emojis = selectRandomEmojis(7, [matchingEmoji, ...card1Emojis]);

  // Step 4: Add matching emoji to both cards
  const card1AllEmojis = [...card1Emojis, matchingEmoji];
  const card2AllEmojis = [...card2Emojis, matchingEmoji];

  // Step 5: Shuffle emoji order on each card
  const card1Shuffled = shuffleArray(card1AllEmojis);
  const card2Shuffled = shuffleArray(card2AllEmojis);

  // Create emoji instances with random size, rotation, and position
  const card1: Card = {
    emojis: card1Shuffled.map(emoji => {
      const position = getRandomPosition();
      return {
        emoji,
        x: position.x,
        y: position.y,
        size: getRandomSize(),
        rotation: getRandomRotation(),
      };
    }),
  };

  const card2: Card = {
    emojis: card2Shuffled.map(emoji => {
      const position = getRandomPosition();
      return {
        emoji,
        x: position.x,
        y: position.y,
        size: getRandomSize(),
        rotation: getRandomRotation(),
      };
    }),
  };

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
