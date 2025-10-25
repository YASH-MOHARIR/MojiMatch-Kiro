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
}

export interface GameStats {
  totalClicks: number;
  correctClicks: number;
  highestCombo: number;
  startTime: number;
}
