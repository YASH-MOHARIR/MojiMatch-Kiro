import { context, reddit } from '@devvit/web/server';

export const createPost = async () => {
  const { subredditName, redis } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  // Get current user for personalization
  const username = await reddit.getCurrentUsername();
  const displayName = username ? `u/${username}` : 'Redditor';

  // Get top player from leaderboard
  let topPlayerInfo = '';
  try {
    const leaderboard = await redis.zRange('mojimatcher:leaderboard:alltime', 0, 0, {
      by: 'rank',
      reverse: true,
    });
    
    if (leaderboard.length > 0) {
      const [topUsername, topScore, topRounds] = leaderboard[0].member.split(':');
      topPlayerInfo = `🏆 Top Player: ${topUsername}\n💯 Score: ${topScore} | 🎯 Rounds: ${topRounds}`;
    }
  } catch (error) {
    console.error('Error fetching top player:', error);
  }

  return await reddit.submitCustomPost({
    splash: {
      // Minimal splash - only required field and background
      appDisplayName: '', // Empty string to minimize text (Reddit may show default)
      backgroundUri: 'splash-background-mobile.gif', // Mobile-first approach
    },
    postData: {
      gameState: 'ready',
      version: '1.0.0',
    },
    subredditName: subredditName,
    title: '🎮 MojiMatcher - Think You Can Beat the High Score? 🏆',
  });
};
