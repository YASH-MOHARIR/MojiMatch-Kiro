interface DailyChallengeIndicatorProps {
  emoji: string;
  streak: number;
}

export function DailyChallengeIndicator({ emoji, streak }: DailyChallengeIndicatorProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 shadow-lg">
      <div className="flex items-center justify-center gap-3 text-sm sm:text-base">
        <span className="text-xl">📅</span>
        <span className="font-semibold">Daily Challenge</span>
        <span className="text-2xl">{emoji}</span>
        {streak > 0 && (
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs sm:text-sm">
            🔥 {streak} day streak
          </span>
        )}
      </div>
    </div>
  );
}
