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
    const today = new Date().toISOString().split('T')[0];
    await redis.sAdd(`mojimatcher:players:${today}`, username);
    // Set expiration for tomorrow
    await redis.expire(`mojimatcher:players:${today}`, 86400);

    // Check if score made top 5
    const rank = leaderboard.findIndex(entry => entry.username === username && entry.score === score);

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

// MojiMatcher: Get leaderboard
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

// MojiMatcher: Get global stats for splash screen
router.get('/api/stats/global', async (_req, res): Promise<void> => {
  try {
    // Get or initialize global stats
    const statsData = await redis.get('mojimatcher:global:stats');
    let stats = statsData ? JSON.parse(statsData) : { totalGames: 0, playersToday: 0 };

    // Get today's date for daily challenge
    const today = new Date().toISOString().split('T')[0];
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
      await redis.set(`mojimatcher:daily:challenge:${today}`, JSON.stringify(dailyChallenge), {
        expiration: new Date(new Date().setHours(24, 0, 0, 0)),
      });
    }

    // Get unique players today from a set
    const playersToday = (await redis.sCard(`mojimatcher:players:${today}`)) || 0;

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
