import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Zap, ArrowLeft, RefreshCw } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

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

type TabType = 'alltime' | 'weekly' | 'god';

export function EnhancedLeaderboard({ onBack, currentUsername = 'anonymous' }: EnhancedLeaderboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('alltime');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [personalStats, setPersonalStats] = useState<PersonalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'alltime' as TabType, label: 'All-Time', Icon: Trophy },
    { id: 'weekly' as TabType, label: 'Weekly', Icon: TrendingUp },
    { id: 'god' as TabType, label: 'GOD Mode', Icon: Zap },
  ];

  useEffect(() => {
    fetchLeaderboard(activeTab);
  }, [activeTab]);

  const fetchLeaderboard = async (type: 'alltime' | 'weekly' | 'god') => {
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
    fetchLeaderboard(activeTab);
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
    <div className="flex flex-col items-center justify-center gap-6 p-8 max-w-4xl w-full animate-fadeIn">
      <div className="text-center animate-slideDown">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-pulse">Leaderboards</h1>
        <p className="text-lg text-gray-600">Compete with the community!</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 bg-white rounded-lg p-2 shadow-lg flex-wrap justify-center animate-scaleIn">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { audioManager.playSound('buttonclick'); setActiveTab(tab.id); }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all-smooth transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <tab.Icon className="w-4 h-4 inline-block align-middle" />
            <span className="inline-block align-middle">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full animate-slideUp">
        {loading ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p className="text-lg mb-2">⚠️ {error}</p>
            <button
              onClick={() => { audioManager.playSound('buttonclick'); handleRefresh(); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all-smooth transform hover:scale-105 active:scale-95"
            >
              Retry
            </button>
          </div>
        ) : (
          // Leaderboard View
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === 'alltime' && 'All-Time Top 10'}
                {activeTab === 'weekly' && "This Week's Top 10"}
                {activeTab === 'god' && 'GOD Mode Top 10'}
              </h2>
              <button
                onClick={() => { audioManager.playSound('buttonclick'); handleRefresh(); }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm transition-all-smooth transform hover:scale-105 active:scale-95 flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4 inline-block align-middle" />
                <span className="inline-block align-middle">Refresh</span>
              </button>
            </div>

            {leaderboard.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p className="text-lg mb-2">No scores yet!</p>
                <p className="text-sm">Be the first to set a record.</p>
              </div>
            ) : (
              <div className="space-y-3 animate-stagger">
                {leaderboard.map((entry) => (
                  <div
                    key={`${entry.username}-${entry.timestamp}`}
                    className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 rounded-lg transition-all-smooth transform hover:scale-105 hover:shadow-md ${
                      entry.rank === 1
                        ? 'bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 border-2 border-yellow-500 shadow-lg'
                        : entry.rank === 2
                          ? 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 border-2 border-gray-400 shadow-md'
                          : entry.rank === 3
                            ? 'bg-gradient-to-r from-orange-200 via-orange-100 to-orange-50 border-2 border-orange-400 shadow-md'
                            : entry.username === currentUsername
                              ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-400'
                              : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {/* Rank Badge */}
                    <div
                      className={`text-2xl font-bold ${
                        entry.rank === 1
                          ? 'text-yellow-600'
                          : entry.rank === 2
                            ? 'text-gray-500'
                            : entry.rank === 3
                              ? 'text-orange-600'
                              : 'text-gray-600'
                      }`}
                    >
                      {getRankBadge(entry.rank)}
                    </div>

                    {/* Username */}
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {entry.username}
                        {entry.username === currentUsername && (
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">You</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Score Column */}
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Score</div>
                      <div className="text-xl font-bold text-gray-900">{entry.score}</div>
                    </div>

                    {/* Rounds Column - Highlighted */}
                    <div className="text-center bg-blue-100 rounded-lg px-3 py-2 border-2 border-blue-300">
                      <div className="text-xs text-blue-700 font-semibold mb-1">Rounds</div>
                      <div className="text-xl font-bold text-blue-900">{entry.rounds}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <button onClick={() => { audioManager.playSound('buttonclick'); onBack(); }} className="pushable btn-gray animate-slideUp">
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front font-semibold px-8 py-3 flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5 inline-block align-middle" />
          <span className="inline-block align-middle">Back to Menu</span>
        </span>
      </button>
    </div>
  );
}
