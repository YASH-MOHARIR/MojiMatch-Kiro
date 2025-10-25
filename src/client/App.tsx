import { MenuScreen } from './components/MenuScreen';
import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';
import { GameOverScreen } from './components/GameOverScreen';
import { useGameState } from './hooks/useGameState';
import { useTimer } from './hooks/useTimer';

// Import tests in development
if (import.meta.env.DEV) {
  import('./utils/cardGenerator.test');
}

export const App = () => {
  const { gameState, startGame, handleEmojiClick, updateTimer, endGame, returnToMenu } =
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
        <MenuScreen onStartGame={startGame} />
      </div>
    );
  }

  // Game Screen
  if (gameState.screen === 'game') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 bg-gradient-to-b from-blue-50 to-blue-100">
        <GameUI
          score={gameState.score}
          timer={gameState.timer}
          roundsCompleted={gameState.roundsCompleted}
          matchingEmoji={gameState.matchingEmoji}
          showDebug={true}
        />

        {gameState.currentCards && (
          <GameCanvas cards={gameState.currentCards} onEmojiClick={handleEmojiClick} />
        )}
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
