import { useEffect, useState } from 'react';

interface GameStartCountdownProps {
  onComplete: () => void;
}

export function GameStartCountdown({ onComplete }: GameStartCountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    // Play countdown beep
    if (count > 0) {
      playBeep(800, 0.1, 0.1);
    } else if (count === 0) {
      // Play start sound (higher pitch, longer)
      playBeep(1200, 0.2, 0.3);
      setTimeout(onComplete, 500);
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
      <div className="text-center">
        {count > 0 ? (
          <div className="text-9xl font-bold text-white animate-bounceIn" key={count}>
            {count}
          </div>
        ) : (
          <div className="text-7xl font-bold text-white animate-scaleIn">
            GO!
          </div>
        )}
      </div>
    </div>
  );
}

// Simple beep sound generator
function playBeep(frequency: number, duration: number, volume: number = 0.1) {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    console.warn('Audio not supported:', error);
  }
}

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
      <div className="text-center">
        {count > 0 ? (
          <div className="text-9xl font-bold text-white animate-bounceIn" key={count}>
            {count}
          </div>
        ) : (
          <div className="text-7xl font-bold text-white animate-scaleIn">
            🎮 GO! 🎮
          </div>
        )}
      </div>
    </div>
  );
}
