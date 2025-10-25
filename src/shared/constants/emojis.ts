// Emoji pool for MojiMatcher game
// 30 unique emojis for variety

export const EMOJI_POOL = [
  '😀', // Grinning Face
  '😎', // Smiling Face with Sunglasses
  '🥳', // Partying Face
  '😍', // Smiling Face with Heart-Eyes
  '🤩', // Star-Struck
  '😜', // Winking Face with Tongue
  '🤪', // Zany Face
  '😇', // Smiling Face with Halo
  '🥰', // Smiling Face with Hearts
  '🤗', // Hugging Face
  '🎉', // Party Popper
  '🎈', // Balloon
  '🎁', // Wrapped Gift
  '🎮', // Video Game
  '🎯', // Direct Hit
  '🎨', // Artist Palette
  '🎭', // Performing Arts
  '🎪', // Circus Tent
  '🎸', // Guitar
  '🎺', // Trumpet
  '⚽', // Soccer Ball
  '🏀', // Basketball
  '🎾', // Tennis
  '🎳', // Bowling
  '🎲', // Game Die
  '🃏', // Joker
  '🎰', // Slot Machine
  '🚀', // Rocket
  '⭐', // Star
  '🌟', // Glowing Star
] as const;

export type EmojiType = typeof EMOJI_POOL[number];
