interface MenuScreenProps {
  onStartGame: () => void;
}

export function MenuScreen({ onStartGame }: MenuScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">🎮 MojiMatcher</h1>
        <p className="text-lg text-gray-600">Find the matching emoji!</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={onStartGame}
          className="px-8 py-4 bg-[#d93900] text-white text-xl font-bold rounded-lg hover:bg-[#c13300] transition-colors shadow-lg"
        >
          ▶️ Play Game
        </button>
      </div>

      <div className="text-center text-sm text-gray-600 max-w-md">
        <p className="mb-2">How to play:</p>
        <ul className="text-left list-disc list-inside space-y-1">
          <li>Find the ONE emoji that appears on both cards</li>
          <li>Click it before time runs out!</li>
          <li>Correct match: +25 points, +10 seconds</li>
          <li>Wrong click: -1 second</li>
        </ul>
      </div>
    </div>
  );
}
