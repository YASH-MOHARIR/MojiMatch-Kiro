// Core game types for MojiMatcher

export interface EmojiInstance {
  emoji: string;
  x: number;
  y: number;
  size: number; // Scale factor (0.8 - 2.5)
  rotation: number; // Degrees (0-360)
}

export interface Card {
  emojis: EmojiInstance[];
}

export type CardEmoji = EmojiInstance;

export interface CardPair {
  card1: Card;
  card2: Card;
}

export interface GameState {
  screen: 'menu' | 'game' | 'gameover' | 'leaderboard';
  score: number;
  timer: number;
  combo: number;
  roundsCompleted: number;
  currentCards: [Card, Card] | null;
  matchingEmoji: string | null;
  isGameActive: boolean;
  stats: GameStats;
  showEmojiHighlight?: boolean;
  isDailyChallenge?: boolean;
  dailyChallengeSeed?: number | undefined;
}

export interface GameStats {
  totalClicks: number;
  correctClicks: number;
  highestCombo: number;
  startTime: number;
}
