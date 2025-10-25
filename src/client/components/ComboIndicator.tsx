interface ComboIndicatorProps {
  combo: number;
}

export function ComboIndicator({ combo }: ComboIndicatorProps) {
  // Only show for 3x combo and higher
  if (combo < 3) return null;

  // Different styles based on combo level
  const getComboStyle = () => {
    if (combo >= 10) {
      return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110';
    } else if (combo >= 5) {
      return 'bg-gradient-to-r from-orange-500 to-red-500 text-white scale-105';
    } else {
      return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
    }
  };

  const getComboText = () => {
    if (combo >= 10) return '🔥 LEGENDARY!';
    if (combo >= 5) return '⚡ AMAZING!';
    return '✨ COMBO!';
  };

  return (
    <div
      className={`
        fixed top-20 left-1/2 -translate-x-1/2 z-50
        px-6 py-3 rounded-full font-bold text-xl
        shadow-lg animate-bounce
        transition-all duration-300
        ${getComboStyle()}
      `}
    >
      <div className="flex items-center gap-2">
        <span>{getComboText()}</span>
        <span className="text-2xl">{combo}x</span>
      </div>
    </div>
  );
}
