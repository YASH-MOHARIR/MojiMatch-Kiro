import { useState, useCallback } from 'react';
import { GameState, Difficulty } from '../../shared/types/game';
import { generateCardPair } from '../utils/cardGenerator';
import { audioManager } from '../utils/audioManager';
import { useAchievements } from './useAchievements';
import { getDifficultyConfig } from '../../shared/constants/difficulty';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    screen: 'menu',
    score: 0,
    timer: 150,
    combo: 0,
    roundsCompleted: 0,
    currentCards: null,
    matchingEmoji: null,
    isGameActive: false,
    stats: {
      totalClicks: 0,
      correctClicks: 0,
      highestCombo: 0,
      startTime: 0,
    },
  });

  const [lastPointsEarned, setLastPointsEarned] = useState<number | null>(null);
  const { newlyUnlocked, clearNewlyUnlocked } = useAchievements();

  const startGame = useCallback((difficulty: Difficulty = 'easy') => {
    const difficultyConfig = getDifficultyConfig(difficulty);
    const { cards, matchingEmoji } = generateCardPair(undefined, difficultyConfig.emojiCount);
    audioManager.playSound('start');
    setGameState({
      screen: 'game',
      score: 0,
      timer: 30,
      combo: 0,
      roundsCompleted: 0,
      currentCards: cards,
      matchingEmoji,
      isGameActive: false,
      showCountdown: true,
      difficulty,
      stats: {
        totalClicks: 0,
        correctClicks: 0,
        highestCombo: 0,
        startTime: Date.now(),
      },
    });
  }, []);

  const startGameAfterCountdown = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameActive: true,
      showCountdown: false,
    }));
  }, []);



  const calculatePoints = useCallback((combo: number, difficulty: Difficulty = 'easy'): number => {
    // Base points: 25
    // Combo bonus: (combo - 1) × 10
    // Formula: (25 + (combo - 1) × 10) × difficulty multiplier
    const basePoints = 25;
    const comboBonus = combo > 0 ? (combo - 1) * 10 : 0;
    const difficultyConfig = getDifficultyConfig(difficulty);
    return Math.round((basePoints + comboBonus) * difficultyConfig.scoreMultiplier);
  }, []);

  const handleCorrectMatch = useCallback(() => {
    setGameState(prev => {
      const difficulty = prev.difficulty || 'easy';
      const difficultyConfig = getDifficultyConfig(difficulty);
      
      // Generate new cards
      const { cards, matchingEmoji } = generateCardPair(undefined, difficultyConfig.emojiCount);

      const newCombo = prev.combo + 1;
      const pointsEarned = calculatePoints(newCombo, difficulty);
      const newScore = prev.score + pointsEarned;

      // Calculate time bonus based on combo
      // Base: +3 seconds, +1 second per combo level
      const timeBonus = 3 + newCombo;

      // Set last points earned for popup
      setLastPointsEarned(pointsEarned);

      // Play correct sound
      audioManager.playSound('correct');

      // Play combo sounds
      if (newCombo === 3) audioManager.playSound('combo3');
      else if (newCombo === 5) audioManager.playSound('combo5');
      else if (newCombo === 10) audioManager.playSound('combo10');

      console.log('✅ Correct match!', {
        emoji: prev.matchingEmoji,
        combo: newCombo,
        pointsEarned,
        timeBonus,
        totalScore: newScore,
      });

      return {
        ...prev,
        score: newScore,
        combo: newCombo,
        roundsCompleted: prev.roundsCompleted + 1,
        currentCards: cards,
        matchingEmoji,
        timer: prev.timer + timeBonus, // Dynamic time bonus based on combo
        stats: {
          ...prev.stats,
          correctClicks: prev.stats.correctClicks + 1,
          totalClicks: prev.stats.totalClicks + 1,
          highestCombo: Math.max(prev.stats.highestCombo, newCombo),
        },
      };
    });
  }, [calculatePoints]);

  const handleWrongClick = useCallback((clickedEmoji: string) => {
    audioManager.playSound('wrong');

    setGameState(prev => {
      console.log('❌ Wrong click!', {
        clicked: clickedEmoji,
        correct: prev.matchingEmoji,
      });

      return {
        ...prev,
        combo: 0, // Reset combo
        timer: Math.max(0, prev.timer - 2), // Subtract 2 seconds (increased penalty)
        stats: {
          ...prev.stats,
          totalClicks: prev.stats.totalClicks + 1,
        },
      };
    });
  }, []);

  const handleEmojiClick = useCallback(
    (clickedEmoji: string) => {
      if (!gameState.isGameActive) return;

      if (clickedEmoji === gameState.matchingEmoji) {
        handleCorrectMatch();
      } else {
        handleWrongClick(clickedEmoji);
      }
    },
    [gameState.isGameActive, gameState.matchingEmoji, handleCorrectMatch, handleWrongClick]
  );

  const updateTimer = useCallback((newTime: number) => {
    setGameState(prev => ({
      ...prev,
      timer: Math.max(0, newTime),
    }));
  }, []);

  const saveToLeaderboard = useCallback(
    async (score: number, rounds: number, highestCombo: number, accuracy: number, difficulty: Difficulty = 'easy') => {
      try {
        // Try to save to server
        const response = await fetch('/api/save-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score, rounds, highestCombo, accuracy, difficulty }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.rank) {
            console.log(`🏆 Made it to rank ${data.rank} on the leaderboard!`);
          }
        } else {
          throw new Error('Server save failed');
        }
      } catch (error) {
        console.warn('Failed to save to server, using localStorage:', error);

        // Fallback to localStorage
        const stored = localStorage.getItem('mojimatcher:leaderboard');
        let leaderboard: Array<{ rank: number; score: number; rounds: number; timestamp: number }> = stored
          ? JSON.parse(stored)
          : [];

        leaderboard.push({
          rank: 0,
          score,
          rounds,
          timestamp: Date.now(),
        });

        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 5);

        leaderboard.forEach((entry, index) => {
          entry.rank = index + 1;
        });

        localStorage.setItem('mojimatcher:leaderboard', JSON.stringify(leaderboard));
      }
    },
    []
  );

  const endGame = useCallback(() => {
    audioManager.playSound('gameover');
    setGameState(prev => {
      // Calculate accuracy
      const accuracy =
        prev.stats.totalClicks > 0 ? (prev.stats.correctClicks / prev.stats.totalClicks) * 100 : 0;

      // Save score to leaderboard
      saveToLeaderboard(prev.score, prev.roundsCompleted, prev.stats.highestCombo, accuracy, prev.difficulty || 'easy');

      return {
        ...prev,
        screen: 'gameover',
        isGameActive: false,
        showEmojiHighlight: true, // Show highlight before game over screen
      };
    });
  }, [saveToLeaderboard]);

  const hideEmojiHighlight = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showEmojiHighlight: false,
    }));
  }, []);

  const returnToMenu = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      screen: 'menu',
      isGameActive: false,
    }));
  }, []);

  const viewLeaderboard = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      screen: 'leaderboard',
      isGameActive: false,
    }));
  }, []);

  return {
    gameState,
    startGame,
    startGameAfterCountdown,
    handleEmojiClick,
    updateTimer,
    endGame,
    returnToMenu,
    viewLeaderboard,
    setGameState,
    lastPointsEarned,
    clearLastPoints: () => setLastPointsEarned(null),
    hideEmojiHighlight,
    newlyUnlockedAchievements: newlyUnlocked,
    clearNewlyUnlockedAchievements: clearNewlyUnlocked,
  };
}
