// Emoji pool for MojiMatcher game
// 60 unique emojis for maximum variety

export const EMOJI_POOL = [
  // Faces
  '😀', '😎', '🥳', '😍', '🤩', '😜', '🤪', '😇', '🥰', '🤗',
  '😂', '🤣', '😊', '😋', '😌', '😏', '🤓', '🥸', '🤠', '🥶',
  // Party & Celebration
  '🎉', '🎈', '🎁', '🎊', '🎆', '🎇', '✨', '🎀', '🎗️', '🏆',
  // Games & Entertainment
  '🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺', '🎻', '🎹', '🎲',
  '🃏', '🎰', '🎳', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🎙️',
  // Sports
  '⚽', '🏀', '🎾', '🏈', '⚾', '🥎', '🏐', '🏉', '🎱', '🏓',
  // Space & Nature
  '🚀', '⭐', '🌟', '💫', '✨', '🌙', '☀️', '🌈', '⚡', '🔥',
] as const;

export type EmojiType = (typeof EMOJI_POOL)[number];
