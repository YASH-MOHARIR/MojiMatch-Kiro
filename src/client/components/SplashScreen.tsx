import { useEffect, useState } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  onStart: () => void;
  recordingMode?: boolean;
}

interface GlobalStats {
  playersToday: number;
  totalGames: number;
  dailyChallengeEmoji: string;
  dailyChallengeDate: string;
}

export function SplashScreen({ onStart, recordingMode = false }: SplashScreenProps) {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recordingMode) {
      fetchGlobalStats();
    } else {
      setLoading(false);
    }
  }, [recordingMode]);

  const fetchGlobalStats = async () => {
    try {
      const response = await fetch('/api/stats/global');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch global stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate floating emojis
  const floatingEmojis = ['🎮', '🎯', '⚡', '🔥', '⭐', '💫', '🎊', '🎉', '✨', '💎', '🏆', '🎪', '🎨', '🌟', '💥'];

  return (
    <div className="splash-screen">
      {/* Animated background emojis */}
      <div className="floating-emojis">
        {floatingEmojis.map((emoji, index) => (
          <div
            key={index}
            className="floating-emoji"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              fontSize: `${2 + Math.random() * 2}rem`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Main content - hidden in recording mode */}
      {!recordingMode && (
        <div className="splash-content">
          <div className="splash-logo">
            <h1 className="splash-title">
              <span className="emoji-icon">🎮</span>
              MojiMatcher
            </h1>
            <p className="splash-subtitle">Find the matching emoji!</p>
          </div>

          {/* Stats section */}
          {!loading && stats && (
            <div className="splash-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-value">{stats.playersToday}</span>
                <span className="stat-label">players today</span>
              </div>
              <div className="stat-divider">•</div>
              <div className="stat-item">
                <span className="stat-icon">🎯</span>
                <span className="stat-value">{stats.totalGames.toLocaleString()}</span>
                <span className="stat-label">total games</span>
              </div>
            </div>
          )}

          {/* Daily challenge preview */}
          {!loading && stats && (
            <div className="daily-challenge-preview">
              <span className="daily-icon">📅</span>
              <span className="daily-text">Today's Challenge:</span>
              <span className="daily-emoji">{stats.dailyChallengeEmoji}</span>
            </div>
          )}

          {/* Play button */}
          <button onClick={onStart} className="splash-play-button">
            <span className="button-icon">🎮</span>
            <span className="button-text">Play Now</span>
          </button>

          {/* Quick info */}
          <div className="splash-info">
            <p>⚡ 30-second rounds • 🎯 Build combos • 🏆 Compete on leaderboards</p>
          </div>
        </div>
      )}
    </div>
  );
}
