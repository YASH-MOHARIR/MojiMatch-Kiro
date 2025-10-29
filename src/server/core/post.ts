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
      backgroundUri: 'splash-background.gif',
      appIconUri: 'logo.png',
      heading: ``,
      description: '',
      buttonLabel: 'PAST',
    },
    postData: {
      gameState: 'ready',
      version: '1.0.0',
    },
    subredditName: subredditName,
    title:
      "🎮 MojiMatcher - Most Players can't malke it past 4 rounds, No one Dares to open GOD mode..can you? ",
  });
};
