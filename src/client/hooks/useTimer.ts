import { useEffect, useRef } from 'react';

interface UseTimerProps {
  isActive: boolean;
  timer: number;
  onTick: (newTime: number) => void;
  onExpire: () => void;
}

export function useTimer({ isActive, timer, onTick, onExpire }: UseTimerProps) {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
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
