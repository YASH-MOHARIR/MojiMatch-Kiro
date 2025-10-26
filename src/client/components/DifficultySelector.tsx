import { Difficulty } from '../../shared/types/game';
import { DIFFICULTY_CONFIGS } from '../../shared/constants/difficulty';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export function DifficultySelector({ selectedDifficulty, onSelect }: DifficultySelectorProps) {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'god'];

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md animate-scaleIn">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Select Difficulty</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {difficulties.map((difficulty) => {
          const config = DIFFICULTY_CONFIGS[difficulty];
          const isSelected = selectedDifficulty === difficulty;
          
          return (
            <button
              key={difficulty}
              onClick={() => onSelect(difficulty)}
              className={`pushable w-full ${
                isSelected ? 'ring-4 ring-blue-400' : ''
              }`}
            >
              <span className="shadow"></span>
              <span className={`edge ${
                config.color === 'green' ? 'bg-green-500' :
                config.color === 'blue' ? 'bg-blue-600' :
                config.color === 'orange' ? 'bg-orange-600' :
                'bg-purple-600'
              }`}></span>
              <span className={`front font-bold px-4 py-3 ${
                config.color === 'green' ? 'bg-green-400' :
                config.color === 'blue' ? 'bg-blue-500' :
                config.color === 'orange' ? 'bg-orange-500' :
                'bg-purple-500'
              }`}>
                <div className="text-xl font-bold mb-1">{config.name}</div>
                <div className="text-sm opacity-90 mt-1">{config.emojiCount} emojis</div>
                <div className="text-sm opacity-90">{config.scoreMultiplier}x score</div>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        {DIFFICULTY_CONFIGS[selectedDifficulty].description}
      </div>
    </div>
  );
}
