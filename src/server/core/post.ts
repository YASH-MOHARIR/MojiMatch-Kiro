import { context, reddit } from '@devvit/web/server';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  // Get current user for personalization
  const username = await reddit.getCurrentUsername();
  const displayName = username ? `u/${username}` : 'Redditor';

  return await reddit.submitCustomPost({
    splash: {
      // Engaging splash screen with animated background and personalized message
      appDisplayName: 'MojiMatcher',
      appIconUri: 'logo.png',
      backgroundUri: 'splash-background.gif',
      heading: `Welcome, ${displayName}! 👋`,
      description:
        "Think you're quick? This game isn't as easy as it looks! 😏\n\n" +
        '⚡ 30-second rounds • 🎯 Build combos • 🏆 Beat the leaderboard\n\n' +
        "Find the ONE emoji that appears on both cards. Can you handle the pressure? Let's see what you've got! 🔥",
      buttonLabel: '🎮 I Accept the Challenge!',
    },
    postData: {
      gameState: 'ready',
      version: '1.0.0',
    },
    subredditName: subredditName,
    title: '🎮 MojiMatcher - Think You Can Beat the High Score? 🏆',
  });
};
