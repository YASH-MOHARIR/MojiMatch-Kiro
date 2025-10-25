import { useState, useCallback, useEffect } from 'react';
import { Achievement, ACHIEVEMENTS } from '../../shared/constants/achievements';
import { GameStats } from '../../shared/types/game';

export interface UnlockedAchievement extends Achievement {
  unlocked: boolean;
  unlockedAt?: number;
  progress?: number;
  rarity?: number;
}

export interface UseAchievementsReturn {
  achievements: UnlockedAchievement[];
  checkAchievements: (gameStats: GameStatsExtended) => Achievement[];
  unlockAchievement: (achievementId: string) => Promise<void>;
  newlyUnlocked: Achievement[];
  clearNewlyUnlocked: () => void;
}

export interface GameStatsExtended extends GameStats {
  score: number;
  rounds: number;
  combo: number;
  accuracy: number;
  playTime: number;
  streak?: number;
  dailyRank?: number;
}

export function useAchievements(): UseAchievementsReturn {
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);
  const [achievements, setAchievements] = useState<UnlockedAchievement[]>([]);

  // Load unlocked achievements from server
  useEffect(() => {
    fetchUnlockedAchievements();
  }, []);

  const fetchUnlockedAchievements = async () => {
    try {
      // Get current username (fallback to anonymous)
      const username = 'anonymous'; // TODO: Get from context
      const response = await fetch(`/api/achievements/${username}`);

      if (response.ok) {
        const data = await response.json();
        const ids = new Set(data.achievements.map((a: any) => a.id));
        setUnlockedIds(ids);

        // Merge with achievement definitions
        const merged = ACHIEVEMENTS.map((achievement) => ({
          ...achievement,
          unlocked: ids.has(achievement.id),
          rarity: data.achievements.find((a: any) => a.id === achievement.id)?.rarity,
        }));
        setAchievements(merged);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      // Load from localStorage as fallback
      const stored = localStorage.getItem('mojimatcher:achievements');
      if (stored) {
        const ids = new Set(JSON.parse(stored));
        setUnlockedIds(ids);
      }
    }
  };

  const checkAchievements = useCallback(
    (gameStats: GameStatsExtended): Achievement[] => {
      const newAchievements: Achievement[] = [];

      for (const achievement of ACHIEVEMENTS) {
        // Skip if already unlocked
        if (unlockedIds.has(achievement.id)) continue;

        let unlocked = false;

        // Check conditions based on achievement type
        switch (achievement.category) {
          case 'speed':
            if (
              achievement.condition.matches &&
              achievement.condition.time &&
              gameStats.rounds >= achievement.condition.matches &&
              gameStats.playTime <= achievement.condition.time
            ) {
              unlocked = true;
            }
            break;

          case 'combo':
            if (achievement.condition.combo && gameStats.combo >= achievement.condition.combo) {
              unlocked = true;
            }
            break;

          case 'accuracy':
            if (
              achievement.condition.accuracy &&
              achievement.condition.rounds &&
              gameStats.accuracy >= achievement.condition.accuracy &&
              gameStats.rounds >= achievement.condition.rounds
            ) {
              unlocked = true;
            }
            break;

          case 'score':
            if (achievement.condition.score && gameStats.score >= achievement.condition.score) {
              unlocked = true;
            }
            break;

          case 'participation':
            if (achievement.condition.streak && gameStats.streak && gameStats.streak >= achievement.condition.streak) {
              unlocked = true;
            }
            break;

          case 'daily':
            if (achievement.condition.dailyRank && gameStats.dailyRank === achievement.condition.dailyRank) {
              unlocked = true;
            }
            break;
        }

        if (unlocked) {
          newAchievements.push(achievement);
        }
      }

      if (newAchievements.length > 0) {
        setNewlyUnlocked((prev) => [...prev, ...newAchievements]);
      }

      return newAchievements;
    },
    [unlockedIds]
  );

  const unlockAchievement = useCallback(async (achievementId: string) => {
    try {
      const response = await fetch('/api/achievements/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievementId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.alreadyUnlocked) {
          setUnlockedIds((prev) => new Set([...prev, achievementId]));

          // Save to localStorage as backup
          const stored = Array.from(unlockedIds);
          stored.push(achievementId);
          localStorage.setItem('mojimatcher:achievements', JSON.stringify(stored));
        }
      }
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      // Fallback to localStorage
      setUnlockedIds((prev) => new Set([...prev, achievementId]));
      const stored = Array.from(unlockedIds);
      stored.push(achievementId);
      localStorage.setItem('mojimatcher:achievements', JSON.stringify(stored));
    }
  }, [unlockedIds]);

  const clearNewlyUnlocked = useCallback(() => {
    setNewlyUnlocked([]);
  }, []);

  return {
    achievements,
    checkAchievements,
    unlockAchievement,
    newlyUnlocked,
    clearNewlyUnlocked,
  };
}
