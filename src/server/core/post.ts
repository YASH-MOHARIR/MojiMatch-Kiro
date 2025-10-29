import { context, reddit } from '@devvit/web/server';

export const createPost = async () => {
  const { subredditName } = context;
  if (!subredditName) {
    throw new Error('subredditName is required');
  }

  return await reddit.submitCustomPost({
    splash: {
      // Minimal splash - only required field and background
      appDisplayName: ' ', // Space character to minimize text
      backgroundUri: 'splash-background-mobile.gif', // Mobile-first approach
    },
    postData: {
      gameState: 'ready',
      version: '1.0.0',
    },
    subredditName: subredditName,
    title: 'MojiMatcher', // Minimal title
  });
};
