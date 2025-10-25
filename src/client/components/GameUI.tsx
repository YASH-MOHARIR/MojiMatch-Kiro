interface GameUIProps {
  score: number;
  timer: number;
  roundsCompleted: number;
  matchingEmoji?: string | null;
  showDebug?: boolean;
}

export function GameUI({ score, timer, roundsCompleted, matchingEmoji, showDebug = false }: GameUIProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[800px]">
      {/* Score and Timer Display */}
      <div className="flex justify-between items-center w-full px-4">
        <div className="text-left">
          <div className="text-sm text-gray-600">Score</div>
          <div className="text-3xl font-bold text-gray-900">{score}</div>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-600">Timer</div>
          <div className="text-3xl font-bold text-gray-900">{timer}s</div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-600">Rounds</div>
          <div className="text-3xl font-bold text-gray-900">{roundsCompleted}</div>
        </div>
      </div>

      {/* Debug Info */}
      {showDebug && matchingEmoji && (
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg px-4 py-2">
          <p className="text-sm text-yellow-800">
            🐛 Debug: Matching emoji is <span className="text-2xl">{matchingEmoji}</span>
          </p>
        </div>
      )}
    </div>
  );
}
