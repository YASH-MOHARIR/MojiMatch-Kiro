export type InitResponse = {
  type: 'init';
  postId: string;
  count: number;
  username: string;
};

export type IncrementResponse = {
  type: 'increment';
  postId: string;
  count: number;
};

export type DecrementResponse = {
  type: 'decrement';
  postId: string;
  count: number;
};

// MojiMatcher API Types
export interface SaveScoreRequest {
  score: number;
  rounds: number;
  highestCombo: number;
  accuracy: number;
}

export interface SaveScoreResponse {
  success: boolean;
  rank?: number;
  error?: {
    code: string;
    message: string;
  };
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  rounds: number;
  timestamp: number;
}

export interface LeaderboardResponse {
  scores: LeaderboardEntry[];
}
