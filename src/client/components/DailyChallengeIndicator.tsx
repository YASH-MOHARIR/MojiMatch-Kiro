interface DailyChallengeIndicatorProps {
  emoji: string;
  streak: number;
}

export function DailyChallengeIndicator({ emoji, streak }: DailyChallengeIndicatorProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-pulse">
        <span className="text-2xl">📅</span>
        <div className="flex flex-col">
          <span className="font-bold text-sm">Daily Challenge</span>
          {streak > 0 && (
            <span className="text-xs opacity-90">🔥 {streak} day streak</span>
          )}
        </div>
        <span className="text-3xl">{emoji}</span>
      </div>
    </div>
  );
}
