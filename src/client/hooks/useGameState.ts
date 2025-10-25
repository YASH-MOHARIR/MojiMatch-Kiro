import { useState, useCallback } from 'react';
import { GameState, Card } from '../../shared/types/game';
import { generateCardPair } from '../utils/cardGenerator';

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

  const startGame = useCallback(() => {
    const { cards, matchingEmoji } = generateCardPair();
    setGameState({
      screen: 'game',
      score: 0,
      timer: 150,
      combo: 0,
      roundsCompleted: 0,
      currentCards: cards,
      matchingEmoji,
      isGameActive: true,
      stats: {
        totalClicks: 0,
        correctClicks: 0,
        highestCombo: 0,
        startTime: Date.now(),
      },
    });
  }, []);

  const handleCorrectMatch = useCallback(() => {
    setGameState(prev => {
      // Generate new cards
      const { cards, matchingEmoji } = generateCardPair();

      const newCombo = prev.combo + 1;
      const newScore = prev.score + 25; // Base points for now

      console.log('✅ Correct match!', {
        emoji: prev.matchingEmoji,
        combo: newCombo,
        score: newScore,
      });

      return {
        ...prev,
        score: newScore,
        combo: newCombo,
        roundsCompleted: prev.roundsCompleted + 1,
        currentCards: cards,
        matchingEmoji,
        timer: prev.timer + 10, // Add 10 seconds
        stats: {
          ...prev.stats,
          correctClicks: prev.stats.correctClicks + 1,
          totalClicks: prev.stats.totalClicks + 1,
          highestCombo: Math.max(prev.stats.highestCombo, newCombo),
        },
      };
    });
  }, []);

  const handleWrongClick = useCallback((clickedEmoji: string) => {
    setGameState(prev => {
      console.log('❌ Wrong click!', {
        clicked: clickedEmoji,
        correct: prev.matchingEmoji,
      });

      return {
        ...prev,
        combo: 0, // Reset combo
        timer: Math.max(0, prev.timer - 1), // Subtract 1 second
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

  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      screen: 'gameover',
      isGameActive: false,
    }));
  }, []);

  const returnToMenu = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      screen: 'menu',
      isGameActive: false,
    }));
  }, []);

  return {
    gameState,
    startGame,
    handleEmojiClick,
    updateTimer,
    endGame,
    returnToMenu,
    setGameState,
  };
}
