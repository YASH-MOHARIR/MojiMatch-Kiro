export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'speed' | 'combo' | 'accuracy' | 'score' | 'participation';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  condition: AchievementCondition;
}

export interface AchievementCondition {
  matches?: number;
  time?: number;
  combo?: number;
  accuracy?: number;
  rounds?: number;
  score?: number;
  streak?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Speed Achievements
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: '10 matches in 20 seconds',
    icon: '⚡',
    category: 'speed',
    tier: 'silver',
    condition: { matches: 10, time: 20 },
  },
  {
    id: 'lightning_fast',
    name: 'Lightning Fast',
    description: '15 matches in 25 seconds',
    icon: '⚡⚡',
    category: 'speed',
    tier: 'gold',
    condition: { matches: 15, time: 25 },
  },

  // Combo Achievements
  {
    id: 'combo_starter',
    name: 'Combo Starter',
    description: 'Reach 5x combo',
    icon: '🔥',
    category: 'combo',
    tier: 'bronze',
    condition: { combo: 5 },
  },
  {
    id: 'combo_master',
    name: 'Combo Master',
    description: 'Reach 10x combo',
    icon: '🔥🔥',
    category: 'combo',
    tier: 'silver',
    condition: { combo: 10 },
  },
  {
    id: 'combo_legend',
    name: 'Combo Legend',
    description: 'Reach 20x combo',
    icon: '🔥🔥🔥',
    category: 'combo',
    tier: 'gold',
    condition: { combo: 20 },
  },
  {
    id: 'combo_god',
    name: 'Combo God',
    description: 'Reach 30x combo',
    icon: '👑',
    category: 'combo',
    tier: 'platinum',
    condition: { combo: 30 },
  },

  // Accuracy Achievements
  {
    id: 'sharp_eye',
    name: 'Sharp Eye',
    description: '90% accuracy for 10 rounds',
    icon: '👁️',
    category: 'accuracy',
    tier: 'silver',
    condition: { accuracy: 90, rounds: 10 },
  },
  {
    id: 'perfect_vision',
    name: 'Perfect Vision',
    description: '100% accuracy for 5 rounds',
    icon: '💎',
    category: 'accuracy',
    tier: 'gold',
    condition: { accuracy: 100, rounds: 5 },
  },

  // Score Achievements
  {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'Score 500 points',
    icon: '⭐',
    category: 'score',
    tier: 'bronze',
    condition: { score: 500 },
  },
  {
    id: 'high_scorer',
    name: 'High Scorer',
    description: 'Score 1000 points',
    icon: '⭐⭐',
    category: 'score',
    tier: 'silver',
    condition: { score: 1000 },
  },
  {
    id: 'elite_player',
    name: 'Elite Player',
    description: 'Score 2000 points',
    icon: '⭐⭐⭐',
    category: 'score',
    tier: 'gold',
    condition: { score: 2000 },
  },

  // Participation Achievements
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Play 3 days in a row',
    icon: '📅',
    category: 'participation',
    tier: 'bronze',
    condition: { streak: 3 },
  },
  {
    id: 'committed',
    name: 'Committed',
    description: 'Play 7 days in a row',
    icon: '📅📅',
    category: 'participation',
    tier: 'silver',
    condition: { streak: 7 },
  },
  {
    id: 'legendary',
    name: 'Legendary',
    description: 'Play 30 days in a row',
    icon: '👑',
    category: 'participation',
    tier: 'platinum',
    condition: { streak: 30 },
  },
];

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.category === category);
}
