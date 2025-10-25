import { useState } from 'react';
import { audioManager } from '../utils/audioManager';
import { useDailyChallenge } from '../hooks/useDailyChallenge';

interface MenuScreenProps {
  onStartGame: () => void;
  onStartDailyChallenge: () => void;
  onViewLeaderboard: () => void;
}

export function MenuScreen({ onStartGame, onStartDailyChallenge, onViewLeaderboard }: MenuScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(audioManager.isSFXEnabled());
  const [musicEnabled, setMusicEnabled] = useState(audioManager.isMusicEnabled());
  const { dailyChallenge, loading } = useDailyChallenge();

  const handleToggleSFX = () => {
    const newValue = !sfxEnabled;
    setSfxEnabled(newValue);
    audioManager.toggleSFX(newValue);
  };

  const handleToggleMusic = () => {
    const newValue = !musicEnabled;
    setMusicEnabled(newValue);
    audioManager.toggleMusic(newValue);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">🎮 MojiMatcher</h1>
        <p className="text-lg text-gray-600">Find the matching emoji!</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {/* Daily Challenge Button */}
        {!loading && dailyChallenge && (
          <button
            onClick={onStartDailyChallenge}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <span>📅</span>
              <span>Daily Challenge</span>
              <span className="text-2xl">{dailyChallenge.emoji}</span>
            </div>
            {dailyChallenge.streak > 0 && (
              <div className="text-sm mt-1 opacity-90">
                🔥 {dailyChallenge.streak} day streak!
              </div>
            )}
            {dailyChallenge.hasPlayed && dailyChallenge.bestScore && (
              <div className="text-sm mt-1 opacity-90">
                Best today: {dailyChallenge.bestScore} pts
              </div>
            )}
          </button>
        )}

        <button
          onClick={onStartGame}
          className="px-8 py-4 bg-[#d93900] text-white text-xl font-bold rounded-lg hover:bg-[#c13300] transition-colors shadow-lg"
        >
          ▶️ Play Game
        </button>

        <button
          onClick={onViewLeaderboard}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          🏆 Leaderboard
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
          <h3 className="text-lg font-bold mb-4">Settings</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Sound Effects</span>
              <button
                onClick={handleToggleSFX}
                className={`w-12 h-6 rounded-full transition-colors ${
                  sfxEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    sfxEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Music</span>
              <button
                onClick={handleToggleMusic}
                className={`w-12 h-6 rounded-full transition-colors ${
                  musicEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    musicEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-600 max-w-md">
        <p className="mb-2">How to play:</p>
        <ul className="text-left list-disc list-inside space-y-1">
          <li>Find the ONE emoji that appears on both cards</li>
          <li>Click it before time runs out!</li>
          <li>Correct match: +25 base points, +3-13 seconds (combo bonus!)</li>
          <li>Build combos for more points and time!</li>
          <li>Wrong click: -2 seconds, combo reset</li>
        </ul>
      </div>
    </div>
  );
}
