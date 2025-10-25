import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  rounds: number;
  timestamp: number;
}

interface PersonalStats {
  totalGames: number;
  bestScore: number;
  averageScore: number;
  totalPlaytime: number;
  achievementCount: number;
  totalAchievements: number;
  dailyStreak: number;
  weeklyRank: number | null;
}

interface EnhancedLeaderboardProps {
  onBack: () => void;
  currentUsername?: string;
}

type TabType = 'alltime' | 'daily' | 'weekly' | 'stats';

export function EnhancedLeaderboard({ onBack, currentUsername = 'anonymous' }: EnhancedLeaderboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('alltime');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [personalStats, setPersonalStats] = useState<PersonalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'alltime' as TabType, label: 'All-Time', icon: '🏆' },
    { id: 'daily' as TabType, label: 'Daily', icon: '📅' },
    { id: 'weekly' as TabType, label: 'Weekly', icon: '📊' },
    { id: 'stats' as TabType, label: 'My Stats', icon: '📈' },
  ];

  useEffect(() => {
    if (activeTab === 'stats') {
      fetchPersonalStats();
    } else {
      fetchLeaderboard(activeTab);
    }
  }, [activeTab]);

  const fetchLeaderboard = async (type: 'alltime' | 'daily' | 'weekly') => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/leaderboard/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      const data = await response.json();
      let scores = data.scores || [];

      // Fallback to old leaderboard format if alltime is empty
      if (type === 'alltime' && scores.length === 0) {
        const oldResponse = await fetch('/api/leaderboard');
        if (oldResponse.ok) {
          const oldData = await oldResponse.json();
          scores = oldData.scores || [];
        }
      }

      setLeaderboard(scores);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard');
      
      // Try localStorage fallback
      if (type === 'alltime') {
        const stored = localStorage.getItem('mojimatcher:leaderboard');
        if (stored) {
          try {
            const localData = JSON.parse(stored);
            setLeaderboard(localData);
          } catch (e) {
            setLeaderboard([]);
          }
        } else {
          setLeaderboard([]);
        }
      } else {
        setLeaderboard([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonalStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/stats/${currentUsername}`);
      if (!response.ok) {
        throw new Error('Failed to fetch personal stats');
      }

      const data = await response.json();
      setPersonalStats(data);
    } catch (err) {
      console.error('Error fetching personal stats:', err);
      setError('Failed to load personal stats');
      setPersonalStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (activeTab === 'stats') {
      fetchPersonalStats();
    } else {
      fetchLeaderboard(activeTab);
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const formatPlaytime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 max-w-4xl w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆 Leaderboards</h1>
        <p className="text-lg text-gray-600">Compete with the community!</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-white rounded-lg p-2 shadow-lg flex-wrap justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        {loading ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p className="text-lg mb-2">⚠️ {error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : activeTab === 'stats' ? (
          // Personal Stats View
          personalStats ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Statistics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{personalStats.totalGames}</div>
                  <div className="text-sm text-gray-600">Total Games</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{personalStats.bestScore}</div>
                  <div className="text-sm text-gray-600">Best Score</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{personalStats.averageScore}</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">{personalStats.dailyStreak}</div>
                  <div className="text-sm text-gray-600">🔥 Day Streak</div>
                </div>
                
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600">
                    {personalStats.achievementCount}/{personalStats.totalAchievements}
                  </div>
                  <div className="text-sm text-gray-600">Achievements</div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">
                    {formatPlaytime(personalStats.totalPlaytime)}
                  </div>
                  <div className="text-sm text-gray-600">Playtime</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Achievement Progress</span>
                  <span>{Math.round((personalStats.achievementCount / personalStats.totalAchievements) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all"
                    style={{ width: `${(personalStats.achievementCount / personalStats.totalAchievements) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg">No stats available yet. Play some games!</p>
            </div>
          )
        ) : (
          // Leaderboard View
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === 'alltime' && 'All-Time Top 10'}
                {activeTab === 'daily' && "Today's Top 10"}
                {activeTab === 'weekly' && "This Week's Top 10"}
              </h2>
              <button
                onClick={handleRefresh}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                🔄 Refresh
              </button>
            </div>

            {leaderboard.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p className="text-lg mb-2">No scores yet!</p>
                <p className="text-sm">Be the first to set a record.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div
                    key={`${entry.username}-${entry.timestamp}`}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                      entry.rank === 1
                        ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-400'
                        : entry.username === currentUsername
                          ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-400'
                          : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-2xl font-bold ${
                          entry.rank === 1
                            ? 'text-yellow-600'
                            : entry.rank === 2
                              ? 'text-gray-400'
                              : entry.rank === 3
                                ? 'text-orange-600'
                                : 'text-gray-600'
                        }`}
                      >
                        {getRankBadge(entry.rank)}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          {entry.score}
                          {entry.username === currentUsername && (
                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">You</span>
                          )}
                        </div>
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
          </>
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
