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
      heading: `Hey ${displayName}! Think You're Fast Enough? 🔥`,
      description:
        "Most players can't beat the top score. 😏\n\n" +
        '⚡ 30 seconds • 🎯 Lightning reflexes required • 🏆 Prove yourself\n\n' +
        "Can you handle the pressure? Let's see what you've got! 💪",
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
