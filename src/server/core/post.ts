import { context, reddit } from '@devvit/web/server';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  return await reddit.submitCustomPost({
    splash: {
      // Splash Screen Configuration
      appDisplayName: 'MojiMatcher',
      backgroundUri: 'default-splash.png',
      buttonLabel: '🎮 Play Now',
      description: 'Find the matching emoji between two cards before time runs out! Build combos for bonus points!',
      entryUri: 'index.html',
      heading: '🎮 MojiMatcher',
      appIconUri: 'default-icon.png',
    },
    postData: {
      gameState: 'ready',
      version: '1.0.0',
    },
    subredditName: subredditName,
    title: '🎮 MojiMatcher - Find the Matching Emoji!',
  });
};
