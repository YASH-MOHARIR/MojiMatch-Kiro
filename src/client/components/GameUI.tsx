import { Difficulty } from '../../shared/types/game';
import { getDifficultyConfig } from '../../shared/constants/difficulty';
import { audioManager } from '../utils/audioManager';
import { ArrowLeft, Volume2, VolumeX, Music } from 'lucide-react';

interface GameUIProps {
  score: number;
  timer: number;
  roundsCompleted: number;
  combo: number;
  matchingEmoji?: string | null;
  showDebug?: boolean;
  onBack?: () => void;
  difficulty: Difficulty;
  showCombo?: boolean;
}

export function GameUI({
  score,
  timer,
  roundsCompleted,
  combo,
  onBack,
  difficulty = 'easy',
  showCombo = false,
}: GameUIProps) {
  const difficultyConfig = getDifficultyConfig(difficulty);
  // Determine timer color based on time remaining (adjusted for 30s game)
  const getTimerColor = () => {
    if (timer > 15) return 'text-green-600'; // Green (>15s)
    if (timer > 7) return 'text-yellow-600'; // Yellow (8-15s)
    return 'text-red-600'; // Red (<8s)
  };

  const getTimerBgColor = () => {
    if (timer > 15) return 'bg-green-50';
    if (timer > 7) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-[800px]">
      {/* Top Bar with Back Button and Settings */}
      <div className="w-full px-2 sm:px-4 flex justify-between items-center">
        {onBack && (
          <button onClick={onBack} className="pushable btn-gray">
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front font-semibold px-3 sm:px-4 py-2 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 inline-block align-middle" />
              <span className="inline-block align-middle hidden sm:inline">Back</span>
            </span>
          </button>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => {
              const newValue = !audioManager.isSFXEnabled();
              audioManager.toggleSFX(newValue);
            }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            title="Toggle Sound Effects"
          >
            {audioManager.isSFXEnabled() ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            )}
          </button>
          <button
            onClick={() => {
              const newValue = !audioManager.isMusicEnabled();
              audioManager.toggleMusic(newValue);
            }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            title="Toggle Music"
          >
            <Music
              className={`w-4 h-4 sm:w-5 sm:h-5 ${audioManager.isMusicEnabled() ? 'text-gray-700' : 'text-gray-400'}`}
            />
          </button>
        </div>
      </div>

      {/* Score and Timer Display */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full px-2 sm:px-4">
        <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 text-center">
          <div className="text-xs text-gray-600 mb-1">Score</div>
          <div className="text-lg sm:text-2xl font-bold text-gray-900">{score}</div>
          {combo > 0 && <div className="text-xs text-orange-600 font-semibold mt-1">{combo}x</div>}
          <div className="text-xs text-gray-500 mt-1">{difficultyConfig.name}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 text-center">
          <div className="text-xs text-gray-600 mb-1">Timer</div>
          <div
            className={`text-lg sm:text-2xl font-bold ${getTimerColor()} px-2 py-1 rounded-lg ${getTimerBgColor()} transition-colors duration-300`}
          >
            {timer}s
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 text-center">
          <div className="text-xs text-gray-600 mb-1">Rounds</div>
          <div className="text-lg sm:text-2xl font-bold text-gray-900">{roundsCompleted}</div>
          <div className="text-xs text-gray-500 mt-1">{difficultyConfig.scoreMultiplier}x</div>
        </div>
      </div>

      {/* Time Progress Bar */}
      <div className="w-full px-2 sm:px-4">
        <div className="bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              timer > 15
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : timer > 7
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  : 'bg-gradient-to-r from-red-500 to-red-600'
            } ${timer <= 5 ? 'animate-pulse' : ''}`}
            style={{ width: `${(timer / 30) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
