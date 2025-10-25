import { Achievement } from '../../shared/constants/achievements';

interface GameOverScreenProps {
  score: number;
  roundsCompleted: number;
  stats: {
    totalClicks: number;
    correctClicks: number;
    highestCombo: number;
  };
  matchingEmoji?: string;
  newAchievements?: Achievement[];
  isDailyChallenge?: boolean;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
}

export function GameOverScreen({
  score,
  roundsCompleted,
  stats,
  matchingEmoji,
  newAchievements = [],
  isDailyChallenge = false,
  onPlayAgain,
  onReturnToMenu,
}: GameOverScreenProps) {
  const accuracy = stats.totalClicks > 0 
    ? Math.round((stats.correctClicks / stats.totalClicks) * 100) 
    : 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {isDailyChallenge ? '📅 Daily Challenge Complete!' : '⏰ Time\'s Up!'}
        </h1>
        <p className="text-lg text-gray-600">Game Over</p>
        {matchingEmoji && (
          <div className="mt-2 text-sm text-gray-500">
            Last match was: <span className="text-3xl">{matchingEmoji}</span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-sm text-gray-600 mb-1">Final Score</div>
          <div className="text-6xl font-bold text-[#d93900]">{score}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Rounds</div>
            <div className="text-2xl font-bold text-gray-900">{roundsCompleted}</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Accuracy</div>
            <div className="text-2xl font-bold text-gray-900">{accuracy}%</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Best Combo</div>
            <div className="text-2xl font-bold text-gray-900">{stats.highestCombo}x</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Total Clicks</div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalClicks}</div>
          </div>
        </div>
      </div>

      {/* New Achievements */}
      {newAchievements.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 w-full max-w-md border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            🎉 New Achievements Unlocked!
          </h3>
          <div className="space-y-3">
            {newAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 bg-white rounded-lg p-3 shadow"
              >
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{achievement.name}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
                <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded uppercase font-bold">
                  {achievement.tier}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onPlayAgain}
          className="px-8 py-4 bg-[#d93900] text-white text-xl font-bold rounded-lg hover:bg-[#c13300] transition-colors shadow-lg"
        >
          🔄 Play Again
        </button>
        <button
          onClick={onReturnToMenu}
          className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Back to Menu
        </button>
      </div>
    </div>
  );
}
