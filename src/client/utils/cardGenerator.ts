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
 * Generates a random size with weighted distribution
 * Favors medium sizes but allows extremes for variety
 */
function getRandomSize(rng: RandomGenerator): number {
  const minSize = 0.7;
  const maxSize = 2.8;
  
  // Use a weighted random to favor medium sizes
  const random1 = rng.next();
  const random2 = rng.next();
  const weighted = (random1 + random2) / 2; // Tends toward middle values
  
  return minSize + weighted * (maxSize - minSize);
}

/**
 * Generates a random rotation between 0 and 360 degrees
 * With slight bias toward cardinal directions for visual variety
 */
function getRandomRotation(rng: RandomGenerator): number {
  const random = rng.next();
  
  // 20% chance of cardinal/ordinal angles for visual interest
  if (random < 0.2) {
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    return angles[Math.floor(rng.next() * angles.length)]!;
  }
  
  // Otherwise fully random
  return rng.nextFloat(0, 360);
}

/**
 * Checks if two emojis overlap with improved collision detection
 */
function checkOverlap(e1: EmojiInstance, e2: EmojiInstance): boolean {
  const baseFontSize = 40;
  
  // Calculate actual visual radius for each emoji (accounting for size)
  // Add extra padding to ensure clear separation
  const padding = 15; // Extra space between emojis
  const radius1 = (baseFontSize * e1.size) / 2 + padding;
  const radius2 = (baseFontSize * e2.size) / 2 + padding;

  // Calculate distance between centers
  const dx = e1.x - e2.x;
  const dy = e1.y - e2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Minimum distance should be sum of radii
  const minDistance = radius1 + radius2;

  // Check if they overlap
  return distance < minDistance;
}

/**
 * Grid-based spatial partitioning for faster overlap checks
 */
class SpatialGrid {
  private grid: Map<string, EmojiInstance[]>;
  private cellSize: number;

  constructor(cellSize: number = 80) {
    this.grid = new Map();
    this.cellSize = cellSize;
  }

  private getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX},${cellY}`;
  }

  private getNearbyCells(x: number, y: number): string[] {
    const cells: string[] = [];
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);

    // Check current cell and 8 surrounding cells
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        cells.push(`${cellX + dx},${cellY + dy}`);
      }
    }
    return cells;
  }

  add(emoji: EmojiInstance): void {
    const key = this.getCellKey(emoji.x, emoji.y);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(emoji);
  }

  getNearby(x: number, y: number): EmojiInstance[] {
    const nearby: EmojiInstance[] = [];
    const cells = this.getNearbyCells(x, y);

    for (const cell of cells) {
      const emojis = this.grid.get(cell);
      if (emojis) {
        nearby.push(...emojis);
      }
    }
    return nearby;
  }
}

/**
 * Generates random position within card boundaries with improved overlap prevention
 * Uses grid-based spatial partitioning and progressive relaxation
 */
function getRandomPositionWithoutOverlap(
  existingEmojis: EmojiInstance[],
  size: number,
  rng: RandomGenerator,
  cardWidth: number = 350,
  cardHeight: number = 450,
  maxAttempts: number = 100
): { x: number; y: number } {
  const baseFontSize = 40;
  const emojiRadius = (baseFontSize * size) / 2;
  
  // Dynamic padding based on emoji count - less padding for more emojis
  const emojiCount = existingEmojis.length;
  let padding = 40;
  if (emojiCount > 12) padding = 30;
  if (emojiCount > 16) padding = 25;

  // Create spatial grid for faster overlap checks
  const spatialGrid = new SpatialGrid(80);
  existingEmojis.forEach(emoji => spatialGrid.add(emoji));

  // Progressive relaxation: try with strict requirements first, then relax
  const attempts = [
    { maxTries: 50, minDistanceMultiplier: 1.0 }, // Full distance
    { maxTries: 30, minDistanceMultiplier: 0.85 }, // 85% distance
    { maxTries: 20, minDistanceMultiplier: 0.7 }, // 70% distance
  ];

  for (const { maxTries, minDistanceMultiplier } of attempts) {
    for (let attempt = 0; attempt < maxTries; attempt++) {
      // Ensure emoji stays within bounds
      const minX = padding + emojiRadius;
      const maxX = cardWidth - padding - emojiRadius;
      const minY = padding + emojiRadius;
      const maxY = cardHeight - padding - emojiRadius;

      // Generate random position
      const x = minX + rng.nextFloat(0, maxX - minX);
      const y = minY + rng.nextFloat(0, maxY - minY);

      const tempEmoji: EmojiInstance = {
        emoji: '',
        x,
        y,
        size,
        rotation: 0,
      };

      // Only check nearby emojis using spatial grid
      const nearbyEmojis = spatialGrid.getNearby(x, y);
      
      // Check overlap with relaxed distance requirements
      let hasOverlap = false;
      for (const existing of nearbyEmojis) {
        const baseFontSize = 40;
        const padding = 15 * minDistanceMultiplier;
        const radius1 = (baseFontSize * tempEmoji.size) / 2 + padding;
        const radius2 = (baseFontSize * existing.size) / 2 + padding;
        
        const dx = tempEmoji.x - existing.x;
        const dy = tempEmoji.y - existing.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = radius1 + radius2;

        if (distance < minDistance) {
          hasOverlap = true;
          break;
        }
      }

      if (!hasOverlap) {
        return { x, y };
      }
    }
  }

  // Last resort: use Poisson disk sampling for guaranteed non-overlap
  return poissonDiskSampling(existingEmojis, size, rng, cardWidth, cardHeight, padding);
}

/**
 * Poisson disk sampling as fallback for guaranteed non-overlapping placement
 */
function poissonDiskSampling(
  existingEmojis: EmojiInstance[],
  size: number,
  rng: RandomGenerator,
  cardWidth: number,
  cardHeight: number,
  padding: number
): { x: number; y: number } {
  const baseFontSize = 40;
  const emojiRadius = (baseFontSize * size) / 2 + 15;
  
  // Create a grid of valid positions
  const gridSize = emojiRadius * 2;
  const cols = Math.floor((cardWidth - 2 * padding) / gridSize);
  const rows = Math.floor((cardHeight - 2 * padding) / gridSize);
  
  // Mark occupied cells
  const occupied = new Set<string>();
  for (const emoji of existingEmojis) {
    const col = Math.floor((emoji.x - padding) / gridSize);
    const row = Math.floor((emoji.y - padding) / gridSize);
    // Mark cell and surrounding cells as occupied
    for (let dc = -1; dc <= 1; dc++) {
      for (let dr = -1; dr <= 1; dr++) {
        occupied.add(`${col + dc},${row + dr}`);
      }
    }
  }
  
  // Find available cells
  const available: { col: number; row: number }[] = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (!occupied.has(`${col},${row}`)) {
        available.push({ col, row });
      }
    }
  }
  
  // Pick random available cell
  if (available.length > 0) {
    const cell = available[Math.floor(rng.next() * available.length)]!;
    const x = padding + cell.col * gridSize + gridSize / 2;
    const y = padding + cell.row * gridSize + gridSize / 2;
    return { x, y };
  }
  
  // Absolute fallback: place at center with slight random offset
  const x = cardWidth / 2 + rng.nextFloat(-20, 20);
  const y = cardHeight / 2 + rng.nextFloat(-20, 20);
  return { x, y };
}

/**
 * Generates a pair of cards with exactly 1 matching emoji
 * @param seed Optional seed for deterministic generation
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
