import { ArrowLeft } from 'lucide-react';

interface HowToPlayScreenProps {
  onBack: () => void;
}

export function HowToPlayScreen({ onBack }: HowToPlayScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 animate-fadeIn max-w-2xl mx-auto">
      <div className="text-center animate-slideDown">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-pulse">How to Play</h1>
        <p className="text-lg text-gray-600">Master the art of emoji matching!</p>
      </div>

      <div className="bg-white rounded-lg shadow-2xl p-8 w-full animate-scaleIn">
        <div className="space-y-6">
          {/* Basic Rules */}
          <div className="animate-slideUp">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              The Goal
            </h2>
            <p className="text-gray-700 text-lg">
              Find the <strong>ONE emoji</strong> that appears on both cards before time runs out!
            </p>
          </div>

          {/* Scoring */}
          <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Scoring
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Correct match:</strong> +25 base points</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">+</span>
                <span><strong>Combo bonus:</strong> Build combos for extra points!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span><strong>Wrong click:</strong> Combo resets to 0</span>
              </li>
            </ul>
          </div>

          {/* Time Management */}
          <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Time Management
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">+</span>
                <span><strong>Correct match:</strong> +3 to +13 seconds (combo bonus!)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">-</span>
                <span><strong>Wrong click:</strong> -2 seconds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">*</span>
                <span><strong>Higher combos</strong> = More time added!</span>
              </li>
            </ul>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Pro Tips
            </h2>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Scan both cards quickly to spot the matching emoji</li>
              <li>• Build combos to maximize your score and time</li>
              <li>• Don't rush - wrong clicks cost you time!</li>
              <li>• Watch the timer color: Green → Yellow → Red</li>
              <li>• Try different difficulty modes for bigger challenges!</li>
            </ul>
          </div>
        </div>
      </div>

      <button onClick={onBack} className="pushable btn-gray animate-slideUp">
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front font-semibold px-8 py-3 flex items-center justify-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </span>
      </button>
    </div>
  );
}
