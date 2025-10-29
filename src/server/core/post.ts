import { context, reddit } from '@devvit/web/server';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  return await reddit.submitCustomPost({
    splash: {
      // Engaging splash screen with animated background
      appDisplayName: 'MojiMatcher',
      backgroundUri: 'splash-background-mobile.gif',
      heading: ``,
      description:
        "", 
      buttonLabel: '',
    },
    postData: {
      gameState: 'ready',
      version: '1.0.0',
    },
    subredditName: subredditName,
    title: '🎮 MojiMatcher - Think You Can Beat the High Score? 🏆',
  });
};
