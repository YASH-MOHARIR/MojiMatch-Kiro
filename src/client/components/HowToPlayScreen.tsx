import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface HowToPlayScreenProps {
  onBack: () => void;
}

export function HowToPlayScreen({ onBack }: HowToPlayScreenProps) {
  const [step, setStep] = useState(0);

  // Tutorial steps with animations
  const tutorialSteps = [
    {
      caption: "Two cards appear with different emojis",
      leftEmojis: ['🎮', '🎯', '🎨', '🎭', '🎪'],
      rightEmojis: ['🎪', '🎸', '🎺', '🎻', '🎹'],
      matchEmoji: '🎪',
      pointerPosition: null,
    },
    {
      caption: "Find the ONE emoji that appears on BOTH cards",
      leftEmojis: ['🎮', '🎯', '🎨', '🎭', '🎪'],
      rightEmojis: ['🎪', '🎸', '🎺', '🎻', '🎹'],
      matchEmoji: '🎪',
      pointerPosition: null,
      highlightMatch: true,
    },
    {
      caption: "Click the matching emoji on either card!",
      leftEmojis: ['🎮', '🎯', '🎨', '🎭', '🎪'],
      rightEmojis: ['🎪', '🎸', '🎺', '🎻', '🎹'],
      matchEmoji: '🎪',
      pointerPosition: { card: 'left', index: 4 },
    },
    {
      caption: "Correct! +25 points and bonus time! 🎉",
      leftEmojis: ['🎮', '🎯', '🎨', '🎭', '🎪'],
      rightEmojis: ['🎪', '🎸', '🎺', '🎻', '🎹'],
      matchEmoji: '🎪',
      pointerPosition: null,
      showSuccess: true,
    },
  ];

  const currentStep = tutorialSteps[step];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % tutorialSteps.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-4 sm:p-8 animate-fadeIn max-w-2xl mx-auto">
      <div className="text-center animate-slideDown">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 animate-pulse">How to Play</h1>
        <p className="text-base sm:text-lg text-gray-600">Master the art of emoji matching!</p>
      </div>

      {/* Animated Tutorial Demo */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-2xl p-4 sm:p-8 w-full animate-scaleIn border-4 border-blue-200">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Interactive Demo</h2>
          <p className="text-sm sm:text-lg text-blue-600 font-semibold animate-pulse min-h-[48px] sm:min-h-[60px] flex items-center justify-center px-2">
            {currentStep.caption}
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 relative">
          {/* Left Card */}
          <div className={`bg-white rounded-xl shadow-lg p-3 sm:p-6 border-2 sm:border-4 ${currentStep.showSuccess ? 'border-green-400 animate-pulse' : 'border-gray-200'}`}>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {currentStep.leftEmojis.map((emoji, idx) => (
                <div
                  key={idx}
                  className={`text-2xl sm:text-4xl flex items-center justify-center transition-all duration-500 ${
                    currentStep.highlightMatch && emoji === currentStep.matchEmoji
                      ? 'scale-125 animate-bounce-slow'
                      : ''
                  } ${
                    currentStep.showSuccess && emoji === currentStep.matchEmoji
                      ? 'scale-150 animate-pulse'
                      : ''
                  }`}
                  style={{
                    filter: currentStep.highlightMatch && emoji !== currentStep.matchEmoji ? 'grayscale(100%) opacity(0.3)' : 'none',
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className={`bg-white rounded-xl shadow-lg p-3 sm:p-6 border-2 sm:border-4 ${currentStep.showSuccess ? 'border-green-400 animate-pulse' : 'border-gray-200'}`}>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {currentStep.rightEmojis.map((emoji, idx) => (
                <div
                  key={idx}
                  className={`text-2xl sm:text-4xl flex items-center justify-center transition-all duration-500 ${
                    currentStep.highlightMatch && emoji === currentStep.matchEmoji
                      ? 'scale-125 animate-bounce-slow'
                      : ''
                  } ${
                    currentStep.showSuccess && emoji === currentStep.matchEmoji
                      ? 'scale-150 animate-pulse'
                      : ''
                  }`}
                  style={{
                    filter: currentStep.highlightMatch && emoji !== currentStep.matchEmoji ? 'grayscale(100%) opacity(0.3)' : 'none',
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Animated Pointer */}
          {currentStep.pointerPosition && (
            <div
              className="absolute pointer-events-none animate-pointer-pulse hidden sm:block"
              style={{
                left: currentStep.pointerPosition.card === 'left' ? '20%' : '70%',
                top: '60%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500 animate-ping absolute"></div>
                <div className="w-16 h-16 rounded-full border-4 border-blue-600 bg-blue-400 bg-opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                  👆
                </div>
              </div>
            </div>
          )}

          {/* Success Effect */}
          {currentStep.showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-5xl sm:text-8xl animate-bounceIn">✅</div>
            </div>
          )}
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {tutorialSteps.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                idx === step ? 'bg-blue-600 w-6 sm:w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full animate-slideUp">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold text-base sm:text-lg">✓</span>
            <div>
              <strong>Correct match:</strong> +25 points + time bonus
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-600 font-bold text-base sm:text-lg">✗</span>
            <div>
              <strong>Wrong click:</strong> -2 seconds, combo resets
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold text-base sm:text-lg">🔥</span>
            <div>
              <strong>Build combos:</strong> More points & time!
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-600 font-bold text-base sm:text-lg">⏱️</span>
            <div>
              <strong>Watch timer:</strong> Green → Yellow → Red
            </div>
          </div>
        </div>
      </div>

      <button onClick={onBack} className="pushable btn-gray animate-slideUp">
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front font-semibold px-6 sm:px-8 py-2 sm:py-3 flex items-center justify-center gap-2 text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 inline-block align-middle" />
          <span className="inline-block align-middle">Back to Menu</span>
        </span>
      </button>
    </div>
  );
}
