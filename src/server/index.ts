import express from 'express';
import { InitResponse, IncrementResponse, DecrementResponse } from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId } = context;

    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      const [count, username] = await Promise.all([
        redis.get('count'),
        reddit.getCurrentUsername(),
      ]);

      res.json({
        type: 'init',
        postId: postId,
        count: count ? parseInt(count) : 0,
        username: username ?? 'anonymous',
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = 'Unknown error during initialization';
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

router.post<{ postId: string }, IncrementResponse | { status: string; message: string }, unknown>(
  '/api/increment',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    res.json({
      count: await redis.incrBy('count', 1),
      postId,
      type: 'increment',
    });
  }
);

router.post<{ postId: string }, DecrementResponse | { status: string; message: string }, unknown>(
  '/api/decrement',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    res.json({
      count: await redis.incrBy('count', -1),
      postId,
      type: 'decrement',
    });
  }
);

// MojiMatcher: Save score to leaderboard
router.post('/api/save-score', async (req, res): Promise<void> => {
  try {
    const { score, rounds, highestCombo, accuracy } = req.body;

    if (typeof score !== 'number' || typeof rounds !== 'number') {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Score and rounds are required' },
      });
      return;
    }

    // Get current username
    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';

    // Get current leaderboard
    const leaderboardData = await redis.get('mojimatcher:leaderboard');
    let leaderboard: Array<{
      username: string;
      score: number;
      rounds: number;
      highestCombo: number;
      accuracy: number;
      timestamp: number;
    }> = leaderboardData ? JSON.parse(leaderboardData) : [];

    // Add new score
    leaderboard.push({
      username,
      score,
      rounds,
      highestCombo: highestCombo ?? 0,
      accuracy: accuracy ?? 0,
      timestamp: Date.now(),
    });

    // Sort by score descending
    leaderboard.sort((a, b) => b.score - a.score);

    // Keep only top 5
    leaderboard = leaderboard.slice(0, 5);

    // Save back to Redis
    await redis.set('mojimatcher:leaderboard', JSON.stringify(leaderboard));

    // Update global stats
    const statsData = await redis.get('mojimatcher:global:stats');
    const stats = statsData ? JSON.parse(statsData) : { totalGames: 0 };
    stats.totalGames = (stats.totalGames || 0) + 1;
    await redis.set('mojimatcher:global:stats', JSON.stringify(stats));

    // Track unique player today
    const today = new Date().toISOString().split('T')[0]!;
    const playersKey = `mojimatcher:players:${today}`;
    const playersData = await redis.get(playersKey);
    const players = playersData ? JSON.parse(playersData) : [];
    if (!players.includes(username)) {
      players.push(username);
      await redis.set(playersKey, JSON.stringify(players), {
        expiration: new Date(Date.now() + 86400000),
      });
    }

    // Save to all-time leaderboard (sorted set)
    const alltimeKey = 'mojimatcher:alltime:leaderboard';
    await redis.zAdd(alltimeKey, {
      member: `${username}:${score}:${rounds}:${Date.now()}`,
      score: score,
    });

    // Save to weekly leaderboard
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    const weekKey = `${now.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
    const weeklyKey = `mojimatcher:weekly:leaderboard:${weekKey}`;
    await redis.zAdd(weeklyKey, {
      member: `${username}:${score}:${rounds}:${Date.now()}`,
      score: score,
    });
    await redis.expire(weeklyKey, 604800); // 7 days

    // Update user stats
    const userStatsKey = `mojimatcher:user:${username}:stats`;
    const userStats = await redis.hGetAll(userStatsKey);
    const currentBestScore = parseInt(userStats.bestScore || '0', 10);
    const currentTotalGames = parseInt(userStats.totalGames || '0', 10);
    const currentTotalScore = parseInt(userStats.totalScore || '0', 10);

    await redis.hSet(userStatsKey, {
      totalGames: (currentTotalGames + 1).toString(),
      bestScore: Math.max(currentBestScore, score).toString(),
      totalScore: (currentTotalScore + score).toString(),
      lastPlayed: Date.now().toString(),
    });

    // Check if score made top 5
    const rank = leaderboard.findIndex(
      (entry) => entry.username === username && entry.score === score
    );

    res.json({
      success: true,
      rank: rank >= 0 ? rank + 1 : undefined,
    });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to save score' },
    });
  }
});

// MojiMatcher: Get leaderboard (legacy - all-time)
router.get('/api/leaderboard', async (_req, res): Promise<void> => {
  try {
    const leaderboardData = await redis.get('mojimatcher:leaderboard');
    const leaderboard: Array<{
      username: string;
      score: number;
      rounds: number;
      timestamp: number;
    }> = leaderboardData ? JSON.parse(leaderboardData) : [];

    // Add rank to each entry
    const scores = leaderboard.map((entry, index) => ({
      rank: index + 1,
      username: entry.username,
      score: entry.score,
      rounds: entry.rounds,
      timestamp: entry.timestamp,
    }));

    res.json({ scores });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch leaderboard' },
    });
  }
});

// MojiMatcher: Get daily leaderboard
router.get('/api/leaderboard/daily', async (_req, res): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const leaderboardKey = `mojimatcher:daily:leaderboard:${today}`;

    const entries = await redis.zRange(leaderboardKey, 0, 9, { by: 'rank', reverse: true });

    const scores = entries.map((entry, index) => {
      const [username, score, rounds, timestamp] = entry.member.split(':');
      return {
        rank: index + 1,
        username: username!,
        score: parseInt(score!, 10),
        rounds: parseInt(rounds!, 10),
        timestamp: parseInt(timestamp!, 10),
      };
    });

    res.json({ scores });
  } catch (error) {
    console.error('Error fetching daily leaderboard:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch daily leaderboard' },
    });
  }
});

// MojiMatcher: Get weekly leaderboard
router.get('/api/leaderboard/weekly', async (_req, res): Promise<void> => {
  try {
    // Calculate current week (ISO week format: YYYY-Www)
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
    const weekKey = `${now.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;

    const leaderboardKey = `mojimatcher:weekly:leaderboard:${weekKey}`;

    const entries = await redis.zRange(leaderboardKey, 0, 9, { by: 'rank', reverse: true });

    const scores = entries.map((entry, index) => {
      const [username, score, rounds, timestamp] = entry.member.split(':');
      return {
        rank: index + 1,
        username: username!,
        score: parseInt(score!, 10),
        rounds: parseInt(rounds!, 10),
        timestamp: parseInt(timestamp!, 10),
      };
    });

    res.json({ scores });
  } catch (error) {
    console.error('Error fetching weekly leaderboard:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch weekly leaderboard' },
    });
  }
});

// MojiMatcher: Get all-time leaderboard (top 10)
router.get('/api/leaderboard/alltime', async (_req, res): Promise<void> => {
  try {
    const leaderboardKey = 'mojimatcher:alltime:leaderboard';

    const entries = await redis.zRange(leaderboardKey, 0, 9, { by: 'rank', reverse: true });

    const scores = entries.map((entry, index) => {
      const [username, score, rounds, timestamp] = entry.member.split(':');
      return {
        rank: index + 1,
        username: username!,
        score: parseInt(score!, 10),
        rounds: parseInt(rounds!, 10),
        timestamp: parseInt(timestamp!, 10),
      };
    });

    res.json({ scores });
  } catch (error) {
    console.error('Error fetching all-time leaderboard:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch all-time leaderboard' },
    });
  }
});

// MojiMatcher: Get personal stats
router.get('/api/stats/:username', async (req, res): Promise<void> => {
  try {
    const { username } = req.params;

    if (!username) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Username is required' },
      });
      return;
    }

    // Get user stats
    const statsData = await redis.hGetAll(`mojimatcher:user:${username}:stats`);

    // Get user streak
    const streakData = await redis.get(`mojimatcher:streak:${username}`);
    const streak = streakData ? JSON.parse(streakData) : { count: 0 };

    // Get user achievements count
    const achievements = await redis.sMembers(`mojimatcher:user:${username}:achievements`);

    // Calculate average score
    const totalGames = parseInt(statsData.totalGames || '0', 10);
    const totalScore = parseInt(statsData.totalScore || '0', 10);
    const averageScore = totalGames > 0 ? Math.round(totalScore / totalGames) : 0;

    res.json({
      totalGames: totalGames,
      bestScore: parseInt(statsData.bestScore || '0', 10),
      averageScore: averageScore,
      totalPlaytime: parseInt(statsData.totalPlaytime || '0', 10),
      achievementCount: achievements.length,
      totalAchievements: 15, // Total number of achievements available
      dailyStreak: streak.count,
      weeklyRank: null, // TODO: Calculate from weekly leaderboard
    });
  } catch (error) {
    console.error('Error fetching personal stats:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch personal stats' },
    });
  }
});

// MojiMatcher: Get global stats for splash screen
router.get('/api/stats/global', async (_req, res): Promise<void> => {
  try {
    // Get or initialize global stats
    const statsData = await redis.get('mojimatcher:global:stats');
    let stats = statsData ? JSON.parse(statsData) : { totalGames: 0, playersToday: 0 };

    // Get today's date for daily challenge
    const today = new Date().toISOString().split('T')[0]!;
    const dailyChallengeData = await redis.get(`mojimatcher:daily:challenge:${today}`);
    let dailyChallenge = dailyChallengeData ? JSON.parse(dailyChallengeData) : null;

    // Generate daily challenge if it doesn't exist
    if (!dailyChallenge) {
      const emojis = ['🎯', '🎮', '⚡', '🔥', '⭐', '💫', '🎊', '🎉', '✨', '💎'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      dailyChallenge = {
        seed: parseInt(today.replace(/-/g, '')),
        date: today,
        emoji: randomEmoji,
      };
      // Set expiration to end of today (midnight)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      await redis.set(`mojimatcher:daily:challenge:${today}`, JSON.stringify(dailyChallenge), {
        expiration: tomorrow,
      });
    }

    // Get unique players today from stored array
    const playersData = await redis.get(`mojimatcher:players:${today!}`);
    const playersToday = playersData ? JSON.parse(playersData).length : 0;

    res.json({
      totalGames: stats.totalGames || 0,
      playersToday: playersToday,
      dailyChallengeEmoji: dailyChallenge.emoji,
      dailyChallengeDate: dailyChallenge.date,
    });
  } catch (error) {
    console.error('Error fetching global stats:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch global stats' },
    });
  }
});

// MojiMatcher: Get daily challenge
router.get('/api/daily-challenge', async (_req, res): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const dailyChallengeData = await redis.get(`mojimatcher:daily:challenge:${today}`);
    let dailyChallenge = dailyChallengeData ? JSON.parse(dailyChallengeData) : null;

    // Generate daily challenge if it doesn't exist
    if (!dailyChallenge) {
      const emojis = ['🎯', '🎮', '⚡', '🔥', '⭐', '💫', '🎊', '🎉', '✨', '💎'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      dailyChallenge = {
        seed: parseInt(today.replace(/-/g, ''), 10),
        date: today,
        emoji: randomEmoji,
      };
      await redis.set(`mojimatcher:daily:challenge:${today}`, JSON.stringify(dailyChallenge), {
        expiration: new Date(new Date().setHours(24, 0, 0, 0)),
      });
    }

    // Get user's best score for today
    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    const userScoreKey = `mojimatcher:daily:${today}:user:${username}`;
    const userScoreData = await redis.get(userScoreKey);
    const bestScore = userScoreData ? JSON.parse(userScoreData).score : null;

    // Get user's streak
    const streakData = await redis.get(`mojimatcher:streak:${username}`);
    const streak = streakData ? JSON.parse(streakData) : { count: 0, lastPlayed: null };

    res.json({
      seed: dailyChallenge.seed,
      date: dailyChallenge.date,
      emoji: dailyChallenge.emoji,
      hasPlayed: bestScore !== null,
      bestScore: bestScore,
      streak: streak.count,
    });
  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch daily challenge' },
    });
  }
});

// MojiMatcher: Save daily challenge score
router.post('/api/daily-challenge/score', async (req, res): Promise<void> => {
  try {
    const { score, rounds, highestCombo, accuracy } = req.body;

    if (typeof score !== 'number' || typeof rounds !== 'number') {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Score and rounds are required' },
      });
      return;
    }

    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    const today = new Date().toISOString().split('T')[0];

    // Check if this is user's best score for today
    const userScoreKey = `mojimatcher:daily:${today}:user:${username}`;
    const existingScoreData = await redis.get(userScoreKey);
    const existingScore = existingScoreData ? JSON.parse(existingScoreData).score : 0;

    if (score > existingScore) {
      // Save user's best score for today
      await redis.set(
        userScoreKey,
        JSON.stringify({ score, rounds, highestCombo, accuracy, timestamp: Date.now() }),
        { expiration: new Date(new Date().setHours(48, 0, 0, 0)) } // Keep for 2 days
      );

      // Update daily leaderboard (sorted set)
      const leaderboardKey = `mojimatcher:daily:leaderboard:${today}`;
      await redis.zAdd(leaderboardKey, {
        member: `${username}:${score}:${rounds}:${Date.now()}`,
        score: score,
      });
      await redis.expire(leaderboardKey, 172800); // 2 days

      // Update streak
      const streakData = await redis.get(`mojimatcher:streak:${username}`);
      const streak = streakData ? JSON.parse(streakData) : { count: 0, lastPlayed: null };

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streak.lastPlayed === yesterday) {
        // Consecutive day
        streak.count += 1;
      } else if (streak.lastPlayed !== today) {
        // Streak broken or first time
        streak.count = 1;
      }
      streak.lastPlayed = today;

      await redis.set(`mojimatcher:streak:${username}`, JSON.stringify(streak));
    }

    // Get user's rank on daily leaderboard
    const leaderboardKey = `mojimatcher:daily:leaderboard:${today}`;
    const leaderboard = await redis.zRange(leaderboardKey, 0, -1, { by: 'rank', reverse: true });
    const rank = leaderboard.findIndex((entry) => entry.member.startsWith(`${username}:`)) + 1;

    res.json({
      success: true,
      rank: rank > 0 ? rank : undefined,
      isNewBest: score > existingScore,
    });
  } catch (error) {
    console.error('Error saving daily challenge score:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to save daily challenge score' },
    });
  }
});

router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// MojiMatcher: Unlock achievement
router.post('/api/achievements/unlock', async (req, res): Promise<void> => {
  try {
    const { achievementId } = req.body;

    if (!achievementId) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Achievement ID is required' },
      });
      return;
    }

    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    const achievementsKey = `mojimatcher:user:${username}:achievements`;

    // Check if already unlocked
    const achievementsData = await redis.get(achievementsKey);
    const achievements: string[] = achievementsData ? JSON.parse(achievementsData) : [];

    if (achievements.includes(achievementId)) {
      res.json({ success: true, alreadyUnlocked: true });
      return;
    }

    // Unlock achievement
    achievements.push(achievementId);
    await redis.set(achievementsKey, JSON.stringify(achievements));

    // Calculate rarity (percentage of players who have it)
    const allPlayersKey = 'mojimatcher:all:players';
    const achievementCountKey = `mojimatcher:achievement:${achievementId}:count`;

    // Add to all players
    const allPlayersData = await redis.get(allPlayersKey);
    const allPlayers = allPlayersData ? JSON.parse(allPlayersData) : [];
    if (!allPlayers.includes(username)) {
      allPlayers.push(username);
      await redis.set(allPlayersKey, JSON.stringify(allPlayers));
    }

    // Increment achievement count
    const currentCount = await redis.get(achievementCountKey);
    const newCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
    await redis.set(achievementCountKey, newCount.toString());

    const totalPlayers = allPlayers.length || 1;
    const rarity = (newCount / totalPlayers) * 100;

    res.json({
      success: true,
      alreadyUnlocked: false,
      rarity: Math.round(rarity * 10) / 10,
    });
  } catch (error) {
    console.error('Error unlocking achievement:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to unlock achievement' },
    });
  }
});

// MojiMatcher: Get user achievements
router.get('/api/achievements/:username', async (req, res): Promise<void> => {
  try {
    const { username } = req.params;

    if (!username) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Username is required' },
      });
      return;
    }

    const achievementsKey = `mojimatcher:user:${username}:achievements`;
    const achievementsData = await redis.get(achievementsKey);
    const unlockedIds: string[] = achievementsData ? JSON.parse(achievementsData) : [];

    // Note: Redis doesn't have sMembers, we're using get/set with JSON arrays instead

    // Get rarity for each achievement
    const allPlayersData = await redis.get('mojimatcher:all:players');
    const totalPlayers = allPlayersData ? JSON.parse(allPlayersData).length : 1;

    const achievements = await Promise.all(
      unlockedIds.map(async (id: string) => {
        const countKey = `mojimatcher:achievement:${id}:count`;
        const count = parseInt((await redis.get(countKey)) || '0', 10);
        const rarity = (count / totalPlayers) * 100;

        return {
          id,
          unlockedAt: Date.now(), // TODO: Store actual unlock time
          rarity: Math.round(rarity * 10) / 10,
        };
      })
    );

    res.json({ achievements });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch achievements' },
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
