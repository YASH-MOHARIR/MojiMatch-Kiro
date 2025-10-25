import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { MenuScreen } from './components/MenuScreen';
import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';
import { GameOverScreen } from './components/GameOverScreen';
import { EnhancedLeaderboard } from './components/EnhancedLeaderboard';
import { ComboIndicator } from './components/ComboIndicator';
import { EmojiHighlight } from './components/EmojiHighlight';
import { DailyChallengeIndicator } from './components/DailyChallengeIndicator';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import { useDailyChallenge } from './hooks/useDailyChallenge';

export const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { dailyChallenge } = useDailyChallenge();
  const { 
    gameState, 
    startGame, 
    startDailyChallenge, 
    handleEmojiClick, 
    updateTimer, 
    endGame, 
    returnToMenu, 
    viewLeaderboard, 
    hideEmojiHighlight,
    newlyUnlockedAchievements 
  } = useGameState();

  // Timer hook
  useTimer({
    isActive: gameState.isGameActive,
    timer: gameState.timer,
    onTick: updateTimer,
    onExpire: endGame,
  });

  // Splash Screen
  if (showSplash) {
    return <SplashScreen onStart={() => setShowSplash(false)} />;
  }

  // Menu Screen
  if (gameState.screen === 'menu') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <MenuScreen 
          onStartGame={startGame} 
          onStartDailyChallenge={startDailyChallenge}
          onViewLeaderboard={viewLeaderboard} 
        />
      </div>
    );
  }

  // Leaderboard Screen
  if (gameState.screen === 'leaderboard') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <EnhancedLeaderboard onBack={returnToMenu} />
      </div>
    );
  }

  // Game Screen
  if (gameState.screen === 'game') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 sm:gap-6 p-2 sm:p-4 bg-gradient-to-b from-blue-50 to-blue-100">
        {/* Daily Challenge Indicator */}
        {gameState.isDailyChallenge && dailyChallenge && (
          <DailyChallengeIndicator emoji={dailyChallenge.emoji} streak={dailyChallenge.streak} />
        )}

        <ComboIndicator combo={gameState.combo} />

        <GameUI
          score={gameState.score}
          timer={gameState.timer}
          roundsCompleted={gameState.roundsCompleted}
          combo={gameState.combo}
          matchingEmoji={gameState.matchingEmoji}
          showDebug={true}
        />

        <div className="w-full max-w-[800px] px-2">
          {gameState.currentCards && (
            <GameCanvas cards={gameState.currentCards} onEmojiClick={handleEmojiClick} />
          )}
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState.screen === 'gameover') {
    // Show emoji highlight first, then game over screen
    if (gameState.showEmojiHighlight && gameState.currentCards && gameState.matchingEmoji) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 sm:gap-6 p-2 sm:p-4 bg-gradient-to-b from-blue-50 to-blue-100">
          <GameUI
            score={gameState.score}
            timer={gameState.timer}
            roundsCompleted={gameState.roundsCompleted}
            combo={gameState.combo}
            matchingEmoji={gameState.matchingEmoji}
            showDebug={false}
          />

          <div className="w-full max-w-[800px] px-2 relative">
            <GameCanvas cards={gameState.currentCards} onEmojiClick={() => {}} />
            <EmojiHighlight
              matchingEmoji={gameState.matchingEmoji}
              cards={{ card1: gameState.currentCards[0], card2: gameState.currentCards[1] }}
              onComplete={hideEmojiHighlight}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
        <GameOverScreen
          score={gameState.score}
          roundsCompleted={gameState.roundsCompleted}
          stats={gameState.stats}
          matchingEmoji={gameState.matchingEmoji || undefined}
          newAchievements={newlyUnlockedAchievements}
          isDailyChallenge={gameState.isDailyChallenge}
          onPlayAgain={startGame}
          onReturnToMenu={returnToMenu}
        />
      </div>
    );
  }

  return null;
};
