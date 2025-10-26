import { Difficulty } from '../types/game';

export interface DifficultyConfig {
  name: string;
  emoji: string;
  emojiCount: number;
  scoreMultiplier: number;
  description: string;
  color: string;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    name: 'Easy',
    emoji: '',
    emojiCount: 8,
    scoreMultiplier: 1,
    description: 'Perfect for beginners',
    color: 'green',
  },
  medium: {
    name: 'Medium',
    emoji: '',
    emojiCount: 12,
    scoreMultiplier: 1.5,
    description: 'A balanced challenge',
    color: 'blue',
  },
  hard: {
    name: 'Hard',
    emoji: '',
    emojiCount: 16,
    scoreMultiplier: 2,
    description: 'For experienced players',
    color: 'orange',
  },
  god: {
    name: 'GOD',
    emoji: '',
    emojiCount: 20,
    scoreMultiplier: 3,
    description: 'Ultimate challenge!',
    color: 'purple',
  },
};

export function getDifficultyConfig(difficulty: Difficulty): DifficultyConfig {
  return DIFFICULTY_CONFIGS[difficulty];
}
