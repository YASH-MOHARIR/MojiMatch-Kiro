# 🎮 MojiMatcher

**A fast-paced emoji matching game built for Reddit using Devvit**

MojiMatcher is an addictive pattern-recognition game where players race against time to find the one common emoji between two cards. With 150 seconds on the clock, progressive difficulty through visual variations, and instant feedback, it's designed for quick 2-3 minute play sessions perfect for Reddit's mobile-first audience.

## 🎯 What Makes MojiMatcher Unique

### Visual Chaos Meets Pattern Recognition
Unlike traditional matching games with static grids, MojiMatcher presents emojis with:
- **Random sizes** (0.8x to 2.5x scale) - making some emojis tiny and others huge
- **Random rotations** (0-360 degrees) - forcing players to recognize patterns at any angle
- **Dynamic positioning** - no two games look the same

This creates a uniquely challenging visual puzzle where your brain must filter through size and rotation variations to identify the matching emoji.

### Pressure-Driven Gameplay
- **150-second countdown timer** creates urgency and excitement
- **Time rewards** (+10 seconds per correct match) keep skilled players in the game longer
- **Time penalties** (-1 second per wrong click) punish hasty decisions
- **Continuous rounds** - no breaks, just pure adrenaline-fueled matching

### Built for Reddit
- Runs directly in Reddit posts using Devvit's web platform
- No external apps or downloads required
- Optimized for both mobile and desktop Reddit browsing
- Seamless integration with Reddit's UI

## 🕹️ How to Play

### Starting the Game
1. Click the **"▶️ Play Game"** button from the main menu
2. The timer starts immediately at 150 seconds
3. Two cards appear side-by-side, each containing 8 emojis

### Finding the Match
1. **Look at both cards** - each card has 8 emojis with random sizes and rotations
2. **Find the ONE emoji** that appears on BOTH cards
3. **Click the matching emoji** on either card (doesn't matter which)
4. **New cards appear instantly** - keep going until time runs out!

### Scoring System
- **Correct match**: +25 points, +10 seconds to timer
- **Wrong click**: -1 second from timer (no point penalty)
- **Combo system** (coming soon): Build streaks for bonus points

### Game Over
When the timer reaches 0, you'll see your final stats:
- **Final Score** - total points earned
- **Rounds Completed** - how many matches you found
- **Accuracy** - percentage of correct clicks
- **Best Combo** - highest streak achieved
- **Total Clicks** - all clicks made during the game

### Tips for Success
- **Don't rush** - wrong clicks cost you precious time
- **Scan systematically** - develop a pattern for checking emojis
- **Ignore size and rotation** - focus on the emoji shape itself
- **Build combos** - consecutive correct matches will multiply your score (coming soon)
- **Stay calm** - panic leads to mistakes and wasted time

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
