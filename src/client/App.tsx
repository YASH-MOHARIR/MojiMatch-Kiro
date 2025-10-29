import { useState } from 'react';
import { MenuScreen } from './components/MenuScreen';
import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';
import { GameOverScreen } from './components/GameOverScreen';
import { EnhancedLeaderboard } from './components/EnhancedLeaderboard';
import { HowToPlayScreen } from './components/HowToPlayScreen';
import { GameStartCountdown } from './components/GameStartCountdown';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';
import { BarChart3 } from 'lucide-react';

export const App = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const { 
    gameState, 
    startGame,
    startGameAfterCountdown,
    handleEmojiClick, 
    updateTimer, 
    endGame, 
    returnToMenu, 
    viewLeaderboard,
    newlyUnlockedAchievements,
    setGameState
  } = useGameState();

  // Timer hook
  useTimer({
    isActive: gameState.isGameActive,
    timer: gameState.timer,
    onTick: updateTimer,
    onExpire: endGame,
  });

  // How To Play Screen
  if (showHowToPlay) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 animate-fadeIn">
        <HowToPlayScreen onBack={() => setShowHowToPlay(false)} />
      </div>
    );
  }

  // Menu Screen
  if (gameState.screen === 'menu') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 animate-fadeIn">
        <MenuScreen 
          onStartGame={(difficulty) => startGame(difficulty)}
          onViewLeaderboard={viewLeaderboard}
          onViewHowToPlay={() => setShowHowToPlay(true)}
        />
      </div>
    );
  }

  // Leaderboard Screen
  if (gameState.screen === 'leaderboard') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 animate-fadeIn">
        <EnhancedLeaderboard onBack={returnToMenu} />
      </div>
    );
  }

  // Game Screen
  if (gameState.screen === 'game') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 bg-gradient-to-b from-blue-50 to-blue-100 animate-fadeIn">
        {/* Countdown Overlay */}
        {gameState.showCountdown && <GameStartCountdown onComplete={startGameAfterCountdown} />}

        <div className="animate-slideDown w-full max-w-[900px]">
          <GameUI
            score={gameState.score}
            timer={gameState.timer}
            roundsCompleted={gameState.roundsCompleted}
            combo={gameState.combo}
            matchingEmoji={gameState.matchingEmoji}
            showDebug={false}
            onBack={returnToMenu}
            difficulty={gameState.difficulty || 'easy'}
            showCombo={gameState.combo > 0}
          />
        </div>

        <div className="animate-scaleIn w-full max-w-[900px]">
          {gameState.currentCards && (
            <GameCanvas
              cards={gameState.currentCards}
              onEmojiClick={handleEmojiClick}
              difficulty={gameState.difficulty || 'easy'}
            />
          )}
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState.screen === 'gameover') {
    // Show results screen if requested
    if (gameState.showResults) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 animate-fadeIn">
          <GameOverScreen
            score={gameState.score}
            roundsCompleted={gameState.roundsCompleted}
            stats={gameState.stats}
            matchingEmoji={gameState.matchingEmoji || undefined}
            newAchievements={newlyUnlockedAchievements}
            onPlayAgain={() => startGame(gameState.difficulty || 'easy')}
            onReturnToMenu={returnToMenu}
          />
        </div>
      );
    }

    // Show final board with highlighted matching emoji
    if (gameState.currentCards && gameState.matchingEmoji) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 sm:gap-6 p-4 bg-gradient-to-b from-purple-50 to-purple-100 animate-fadeIn">
          <div className="text-center animate-bounceIn">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Time's Up!</h1>
            <p className="text-sm sm:text-lg text-gray-600">The matching emoji was:</p>
            <div className="text-4xl sm:text-6xl my-2 sm:my-4 animate-pulse">{gameState.matchingEmoji}</div>
          </div>

          <div className="animate-scaleIn w-full max-w-[900px]">
            <GameCanvas
              cards={gameState.currentCards}
              onEmojiClick={() => {}}
              difficulty={gameState.difficulty || 'easy'}
              highlightEmoji={gameState.matchingEmoji}
            />
          </div>

          <button
            onClick={() => setGameState((prev) => ({ ...prev, showResults: true }))}
            className="pushable btn-primary animate-slideUp"
          >
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front text-base sm:text-xl font-bold px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 inline-block align-middle" />
              <span className="inline-block align-middle">See Results</span>
            </span>
          </button>
        </div>
      );
    }

    // Fallback to results if no cards
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 animate-fadeIn">
        <GameOverScreen
          score={gameState.score}
          roundsCompleted={gameState.roundsCompleted}
          stats={gameState.stats}
          matchingEmoji={gameState.matchingEmoji || undefined}
          newAchievements={newlyUnlockedAchievements}
          onPlayAgain={() => startGame(gameState.difficulty || 'easy')}
          onReturnToMenu={returnToMenu}
        />
      </div>
    );
  }

  return null;
};
