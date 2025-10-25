interface LeaderboardEntry {
  rank: number;
  score: number;
  rounds: number;
  timestamp: number;
}

interface LeaderboardScreenProps {
  onBack: () => void;
}

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  // Load leaderboard from localStorage
  const loadLeaderboard = (): LeaderboardEntry[] => {
    const stored = localStorage.getItem('mojimatcher:leaderboard');
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  };

  const leaderboard = loadLeaderboard();

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆 Leaderboard</h1>
        <p className="text-lg text-gray-600">Top 5 High Scores</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {leaderboard.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg mb-2">No scores yet!</p>
            <p className="text-sm">Play a game to set the first record.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`text-2xl font-bold ${
                      index === 0
                        ? 'text-yellow-600'
                        : index === 1
                          ? 'text-gray-400'
                          : index === 2
                            ? 'text-orange-600'
                            : 'text-gray-600'
                    }`}
                  >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${entry.rank}`}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{entry.score}</div>
                    <div className="text-xs text-gray-600">{entry.rounds} rounds</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
      >
        ← Back to Menu
      </button>
    </div>
  );
}
