interface GameUIProps {
  score: number;
  timer: number;
  roundsCompleted: number;
  combo: number;
  matchingEmoji?: string | null;
  showDebug?: boolean;
}

export function GameUI({
  score,
  timer,
  roundsCompleted,
  combo,
  matchingEmoji,
  showDebug = false,
}: GameUIProps) {
  // Determine timer color based on time remaining
  const getTimerColor = () => {
    if (timer > 75) return 'text-green-600'; // Green
    if (timer > 30) return 'text-yellow-600'; // Yellow
    return 'text-red-600'; // Red
  };

  const getTimerBgColor = () => {
    if (timer > 75) return 'bg-green-50';
    if (timer > 30) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-[800px]">
      {/* Score and Timer Display */}
      <div className="flex justify-between items-center w-full px-2 sm:px-4">
        <div className="text-left">
          <div className="text-xs sm:text-sm text-gray-600">Score</div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">{score}</div>
          {combo > 0 && <div className="text-xs text-orange-600 font-semibold mt-1">{combo}x Combo</div>}
        </div>

        <div className="text-center">
          <div className="text-xs sm:text-sm text-gray-600">Timer</div>
          <div
            className={`text-2xl sm:text-3xl font-bold ${getTimerColor()} px-3 sm:px-4 py-1 sm:py-2 rounded-lg ${getTimerBgColor()} transition-colors duration-300`}
          >
            {timer}s
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs sm:text-sm text-gray-600">Rounds</div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">{roundsCompleted}</div>
        </div>
      </div>

      {/* Debug Info */}
      {showDebug && matchingEmoji && (
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg px-3 sm:px-4 py-2">
          <p className="text-xs sm:text-sm text-yellow-800">
            🐛 Debug: Matching emoji is <span className="text-xl sm:text-2xl">{matchingEmoji}</span>
          </p>
        </div>
      )}
    </div>
  );
}
