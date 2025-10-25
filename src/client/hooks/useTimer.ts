import { useEffect, useRef } from 'react';
import { audioManager } from '../utils/audioManager';

interface UseTimerProps {
  isActive: boolean;
  timer: number;
  onTick: (newTime: number) => void;
  onExpire: () => void;
}

export function useTimer({ isActive, timer, onTick, onExpire }: UseTimerProps) {
  const intervalRef = useRef<number | null>(null);
  const lastTickSoundRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Play timer warning sounds (adjusted for 30s game)
    if (timer === 10) {
      audioManager.playSound('tick');
    } else if (timer <= 5 && timer > 0) {
      // Play fast tick every second for last 5 seconds
      if (timer !== lastTickSoundRef.current) {
        audioManager.playSound('fasttick');
        lastTickSoundRef.current = timer;
      }
    }

    // Start timer
    intervalRef.current = window.setInterval(() => {
      onTick(timer - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timer, onTick]);

  // Check for expiration
  useEffect(() => {
    if (isActive && timer <= 0) {
      onExpire();
    }
  }, [isActive, timer, onExpire]);
}
