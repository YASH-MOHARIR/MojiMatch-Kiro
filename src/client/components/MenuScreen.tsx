import { useState } from 'react';
import { audioManager } from '../utils/audioManager';
import { DifficultySelector } from './DifficultySelector';
import { Difficulty } from '../../shared/types/game';
import { Play, Trophy, HelpCircle, Settings } from 'lucide-react';

interface MenuScreenProps {
  onStartGame: (difficulty: Difficulty) => void;
  onViewLeaderboard: () => void;
  onViewHowToPlay: () => void;
}

export function MenuScreen({ onStartGame, onViewLeaderboard, onViewHowToPlay }: MenuScreenProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [sfxEnabled, setSfxEnabled] = useState(audioManager.isSFXEnabled());
  const [musicEnabled, setMusicEnabled] = useState(audioManager.isMusicEnabled());

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
    <div className="flex flex-col items-center justify-center gap-8 p-8 animate-fadeIn">
      <div className="text-center animate-slideDown">
        <img 
          src="/logo.png" 
          alt="MojiMatcher" 
          className="w-96 h-96 mx-auto mb-4 animate-bounce-slow drop-shadow-2xl"
        />
        <p className="text-lg text-gray-600">Find the matching emoji!</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs animate-stagger">
        <button onClick={() => setShowDifficulty(true)} className="pushable btn-primary w-full">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front text-xl font-bold px-8 py-4 flex items-center justify-center gap-3">
            <Play className="w-6 h-6 flex-shrink-0 inline-block align-middle" />
            <span className="inline-block align-middle">Play Game</span>
          </span>
        </button>

        <button onClick={onViewLeaderboard} className="pushable btn-secondary w-full">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front font-semibold px-8 py-3 flex items-center justify-center gap-3">
            <Trophy className="w-5 h-5 flex-shrink-0 inline-block align-middle" />
            <span className="inline-block align-middle">Leaderboard</span>
          </span>
        </button>

        <button onClick={onViewHowToPlay} className="pushable btn-green w-full">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front font-semibold px-8 py-3 flex items-center justify-center gap-3">
            <HelpCircle className="w-5 h-5 flex-shrink-0 inline-block align-middle" />
            <span className="inline-block align-middle">How to Play</span>
          </span>
        </button>

        <button onClick={() => setShowSettings(!showSettings)} className="pushable btn-gray w-full">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front font-semibold px-8 py-3 flex items-center justify-center gap-3">
            <Settings className="w-5 h-5 flex-shrink-0 inline-block align-middle" />
            <span className="inline-block align-middle">Settings</span>
          </span>
        </button>
      </div>

      {/* Difficulty Selector */}
      {showDifficulty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn" onClick={() => setShowDifficulty(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <DifficultySelector
              selectedDifficulty={selectedDifficulty}
              onSelect={(difficulty) => {
                setSelectedDifficulty(difficulty);
                setShowDifficulty(false);
                onStartGame(difficulty);
              }}
            />
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs animate-scaleIn">
          <h3 className="text-lg font-bold mb-4">Settings</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Sound Effects</span>
              <button
                onClick={handleToggleSFX}
                className={`w-12 h-6 rounded-full transition-all-smooth ${
                  sfxEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all-smooth ${
                    sfxEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Music</span>
              <button
                onClick={handleToggleMusic}
                className={`w-12 h-6 rounded-full transition-all-smooth ${
                  musicEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all-smooth ${
                    musicEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
