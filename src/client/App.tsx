import { MenuScreen } from './components/MenuScreen';
import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';
import { GameOverScreen } from './components/GameOverScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ComboIndicator } from './components/ComboIndicator';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';

export const App = () => {
  const { gameState, startGame, handleEmojiClick, updateTimer, endGame, returnToMenu, viewLeaderboard } =
    useGameState();

  // Timer hook
  useTimer({
    isActive: gameState.isGameActive,
    timer: gameState.timer,
    onTick: updateTimer,
    onExpire: endGame,
  });

  // Menu Screen
  if (gameState.screen === 'menu') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <MenuScreen onStartGame={startGame} onViewLeaderboard={viewLeaderboard} />
      </div>
    );
  }

  // Leaderboard Screen
  if (gameState.screen === 'leaderboard') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <LeaderboardScreen onBack={returnToMenu} />
      </div>
    );
  }

  // Game Screen
  if (gameState.screen === 'game') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 sm:gap-6 p-2 sm:p-4 bg-gradient-to-b from-blue-50 to-blue-100">
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
        <GameOverScreen
          score={gameState.score}
          roundsCompleted={gameState.roundsCompleted}
          stats={gameState.stats}
          onPlayAgain={startGame}
          onReturnToMenu={returnToMenu}
        />
      </div>
    );
  }

  return null;
};
