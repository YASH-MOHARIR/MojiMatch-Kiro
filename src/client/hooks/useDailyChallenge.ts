import { useState, useEffect, useCallback } from 'react';

export interface DailyChallengeData {
  seed: number;
  date: string;
  emoji: string;
  hasPlayed: boolean;
  bestScore: number | null;
  streak: number;
}

export interface UseDailyChallengeReturn {
  dailyChallenge: DailyChallengeData | null;
  loading: boolean;
  error: string | null;
  isDailyChallengeMode: boolean;
  startDailyChallenge: () => void;
  exitDailyChallenge: () => void;
  refreshDailyChallenge: () => Promise<void>;
}

export function useDailyChallenge(): UseDailyChallengeReturn {
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallengeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDailyChallengeMode, setIsDailyChallengeMode] = useState(false);

  const fetchDailyChallenge = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/daily-challenge');
      if (!response.ok) {
        throw new Error('Failed to fetch daily challenge');
      }

      const data: DailyChallengeData = await response.json();
      setDailyChallenge(data);
    } catch (err) {
      console.error('Error fetching daily challenge:', err);
      setError('Failed to load daily challenge');

      // Fallback to localStorage
      const stored = localStorage.getItem('mojimatcher:daily-challenge');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          // Check if it's still today's challenge
          const today = new Date().toISOString().split('T')[0];
          if (data.date === today) {
            setDailyChallenge(data);
          }
        } catch (parseError) {
          console.error('Error parsing stored daily challenge:', parseError);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshDailyChallenge = useCallback(async () => {
    await fetchDailyChallenge();
  }, [fetchDailyChallenge]);

  const startDailyChallenge = useCallback(() => {
    setIsDailyChallengeMode(true);
  }, []);

  const exitDailyChallenge = useCallback(() => {
    setIsDailyChallengeMode(false);
  }, []);

  // Fetch daily challenge on mount
  useEffect(() => {
    fetchDailyChallenge();
  }, [fetchDailyChallenge]);

  // Cache daily challenge to localStorage
  useEffect(() => {
    if (dailyChallenge) {
      localStorage.setItem('mojimatcher:daily-challenge', JSON.stringify(dailyChallenge));
    }
  }, [dailyChallenge]);

  return {
    dailyChallenge,
    loading,
    error,
    isDailyChallengeMode,
    startDailyChallenge,
    exitDailyChallenge,
    refreshDailyChallenge,
  };
}
