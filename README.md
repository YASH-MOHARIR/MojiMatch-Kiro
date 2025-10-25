# 🎮 MojiMatcher

**A fast-paced emoji matching game built for Reddit using Devvit**

MojiMatcher is an addictive pattern-recognition game where players race against time to find the one common emoji between two cards. With 150 seconds on the clock, a combo multiplier system, and visual chaos through random transformations, it's designed for quick 2-3 minute play sessions perfect for Reddit's mobile-first audience.

## 🎯 What Makes MojiMatcher Unique

### Visual Chaos Meets Pattern Recognition
Unlike traditional matching games with static grids, MojiMatcher presents emojis with:
- **Random sizes** (0.8x to 2.5x scale) - making some emojis tiny and others huge
- **Random rotations** (0-360 degrees) - forcing players to recognize patterns at any angle
- **Dynamic positioning with overlap prevention** - physics-based placement ensures clean, playable layouts
- **30 unique emojis** - diverse pool including faces, objects, and symbols (😀, 🎉, ⚽, 🚀, and more)

This creates a uniquely challenging visual puzzle where your brain must filter through size and rotation variations to identify the matching emoji.

### Combo Multiplier System
Build streaks for massive score bonuses:
- **Base points**: 25 per match
- **2x combo**: 35 points (25 + 10 bonus)
- **3x combo**: 45 points (25 + 20 bonus) - ✨ COMBO! indicator appears
- **5x combo**: 65 points (25 + 40 bonus) - ⚡ AMAZING! indicator appears
- **10x combo**: 115 points (25 + 90 bonus) - 🔥 LEGENDARY! indicator appears

The combo system rewards consistency and accuracy, turning skilled players into high scorers. One wrong click resets your combo to zero, adding strategic tension to every decision.

### Dynamic Timer System
- **150-second countdown** creates urgency and excitement
- **Color-coded warnings**: Green (>75s) → Yellow (30-75s) → Red (<30s)
- **Time rewards** (+10 seconds per correct match) keep skilled players in the game longer
- **Time penalties** (-1 second per wrong click) punish hasty decisions
- **Audio cues**: Clock ticking at 20s, faster ticking at 10s
- **Continuous rounds** - no breaks, just pure adrenaline-fueled matching

### Immersive Audio Feedback
- **Sound effects** for correct matches, wrong clicks, and combo achievements
- **Progressive combo sounds** - different tones for 3x, 5x, and 10x combos
- **Timer warnings** - audible ticking as time runs low
- **Toggleable audio** - control sound effects and music independently in settings

### Built for Reddit
- Runs directly in Reddit posts using Devvit's web platform
- No external apps or downloads required
- Optimized for both mobile and desktop Reddit browsing
- Seamless integration with Reddit's UI
- HTML5 Canvas rendering for smooth, high-performance gameplay
- Local leaderboard tracking your top 5 scores

## 🕹️ How to Play

### Starting the Game
1. Open MojiMatcher from a Reddit post
2. Click the **"▶️ Play Game"** button from the main menu
3. The timer starts immediately at 150 seconds
4. Two cards appear side-by-side, each containing 8 emojis

### Finding the Match
1. **Examine both cards** - each card displays 8 emojis with random sizes and rotations
2. **Identify the matching emoji** - exactly ONE emoji appears on BOTH cards
3. **Click the matching emoji** on either card (doesn't matter which side)
4. **New cards generate instantly** - keep matching until time runs out!

### Scoring System
**Correct match:**
- Earn points based on your combo: 25 + (combo - 1) × 10
- Add 10 seconds to your timer
- Increase combo multiplier by 1
- See a green flash animation and score popup
- New cards appear immediately

**Wrong click:**
- Lose 1 second from timer
- Reset combo multiplier to 0
- See a red shake animation
- No point deduction (but you lose your combo streak!)

### Combo Indicators
Watch for special indicators as you build streaks:
- **3x-4x combo**: ✨ COMBO! (blue gradient, animated bounce)
- **5x-9x combo**: ⚡ AMAZING! (orange-red gradient, larger size)
- **10x+ combo**: 🔥 LEGENDARY! (purple-pink gradient, bouncing animation)

### Timer Color States
The timer changes color to warn you:
- **Green** (>75 seconds): You're doing great, plenty of time
- **Yellow** (30-75 seconds): Time is running low, stay focused
- **Red** (<30 seconds): Critical! Every second counts

### Game Over
When the timer reaches 0, you'll see your final stats:
- **Final Score** - total points earned from all matches
- **Rounds Completed** - how many successful matches you made
- **Accuracy** - percentage of correct clicks vs total clicks
- **Best Combo** - highest streak achieved during the game
- **Total Clicks** - all clicks made during the session

Your score is automatically saved to the local leaderboard if it ranks in the top 5!

### Menu Options
- **Play Game** - Start a new game session
- **🏆 Leaderboard** - View your top 5 high scores with dates
- **⚙️ Settings** - Toggle sound effects and music on/off

### Pro Tips for High Scores
- **Build combos early** - the multiplier makes a huge difference (10x combo = 115 points per match!)
- **Don't rush** - wrong clicks cost you time AND reset your combo
- **Scan systematically** - develop a consistent pattern for checking emojis
- **Ignore transformations** - focus on the emoji itself, not its size or rotation
- **Protect high combos** - at 5x+, take an extra moment to verify before clicking
- **Stay calm under pressure** - panic leads to mistakes and wasted time
- **Balance speed and accuracy** - fast rounds build time, but accuracy builds combos
- **Use audio cues** - listen for timer warnings to manage your pace

## 🛠️ Technology Stack

- [Devvit](https://developers.reddit.com/): Reddit's developer platform for immersive games
- [React](https://react.dev/): UI framework with hooks for state management
- [TypeScript](https://www.typescriptlang.org/): Type-safe development
- [Vite](https://vite.dev/): Fast build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/): Utility-first styling
- [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API): High-performance emoji rendering
- [Express](https://expressjs.com/): Backend API (for future leaderboard features)

## 🚀 Getting Started

> Make sure you have Node 22 downloaded on your machine before running!

### Installation
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open the provided Reddit playtest URL in your browser

### First Time Setup
If you haven't used Devvit before:
1. Run `npm create devvit@latest --template=react`
2. Go through the installation wizard
3. Create a Reddit account and connect it to Reddit developers
4. Follow the authentication prompts

## Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit.
- `npm run build`: Builds your client and server projects
- `npm run deploy`: Uploads a new version of your app
- `npm run launch`: Publishes your app for review
- `npm run login`: Logs your CLI into Reddit
- `npm run check`: Type checks, lints, and prettifies your app

## Cursor Integration

This template comes with a pre-configured cursor environment. To get started, [download cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted.
