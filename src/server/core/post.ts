import { context, reddit } from '@devvit/web/server';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  return await reddit.submitCustomPost({
    splash: {
      // Eye-catching Splash Screen for Reddit Feed
      appDisplayName: 'MojiMatcher',
      buttonLabel: '🎮 Play Now',
      description:
        '⚡ 30-second rounds • 🎯 Build combos • 🏆 Daily challenges • 📊 Compete on leaderboards\n\nFind the ONE emoji that appears on both cards before time runs out!',
      heading: '🎮 MojiMatcher - Lightning-Fast Emoji Matching!',
    },
    postData: {
      gameState: 'ready',
      version: '1.0.0',
    },
    subredditName: subredditName,
    title: '🎮 MojiMatcher - Find the Matching Emoji! [Daily Challenge Available]',
  });
};
