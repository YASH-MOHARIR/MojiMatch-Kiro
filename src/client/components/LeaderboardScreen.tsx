import { useState, useEffect } from 'react';
import { LeaderboardEntry, LeaderboardResponse } from '../../shared/types/api';
import { ArrowLeft } from 'lucide-react';

interface LeaderboardScreenProps {
  onBack: () => void;
}

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      const data: LeaderboardResponse = await response.json();
      setLeaderboard(data.scores);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard');

      // Fallback to localStorage
      const stored = localStorage.getItem('mojimatcher:leaderboard');
      if (stored) {
        const localData = JSON.parse(stored);
        setLeaderboard(localData);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 animate-fadeIn">
      <div className="text-center animate-slideDown">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-pulse">Leaderboard</h1>
        <p className="text-lg text-gray-600">Top 5 High Scores</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-scaleIn">
        {loading ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p className="text-lg mb-2">⚠️ {error}</p>
            <p className="text-sm">Showing local scores</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg mb-2">No scores yet!</p>
            <p className="text-sm">Play a game to set the first record.</p>
          </div>
        ) : (
          <div className="space-y-3 animate-stagger">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg transition-all-smooth hover:scale-105 hover:shadow-md ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400 animate-glow'
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
                    <div className="text-xs text-gray-600">
                      {entry.username} • {entry.rounds} rounds
                    </div>
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

      <button onClick={onBack} className="pushable btn-gray animate-slideUp">
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front font-semibold px-8 py-3 flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </span>
      </button>
    </div>
  );
}
