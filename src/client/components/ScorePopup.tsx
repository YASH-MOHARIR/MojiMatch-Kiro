import { useEffect, useState } from 'react';

interface ScorePopupProps {
  points: number;
  x: number;
  y: number;
  onComplete: () => void;
}

export function ScorePopup({ points, x, y, onComplete }: ScorePopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 animate-[float_1s_ease-out]"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="text-3xl font-bold text-green-500 drop-shadow-lg">
        +{points}
      </div>
    </div>
  );
}
