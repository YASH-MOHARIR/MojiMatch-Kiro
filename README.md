# 🎮 MojiMatcher

A lightning-fast emoji matching game built for Reddit using Devvit. Race against the clock to find the one emoji that appears on both cards in this addictive pattern-recognition challenge!

## 🎯 What is MojiMatcher?

MojiMatcher is a fast-paced visual puzzle game where players must quickly identify the single matching emoji between two cards containing 8 emojis each. With only 30 seconds on the clock, players race to complete as many rounds as possible while building combos for massive point bonuses and time extensions. The game features:

- **Two cards** displayed side-by-side, each containing 8 emojis
- **Exactly one matching emoji** hidden between the cards
- **30-second countdown timer** that can be extended by making correct matches
- **Dynamic combo system** that rewards consecutive correct matches with bonus points and time
- **Visual variety** with randomly sized (0.8x-2.5x) and rotated (0-360°) emojis
- **Engaging splash screen** with live player stats and daily challenge preview
- **Global leaderboard** showing top 5 high scores with Reddit usernames

## 🌟 What Makes MojiMatcher Innovative

**MojiMatcher** stands out from traditional matching games through several unique design choices:

1. **Dynamic Visual Chaos**: Unlike static matching games, every emoji has random size and rotation, making pattern recognition genuinely challenging and preventing memorization strategies

2. **Escalating Combo System**: The combo system doesn't just increase points - it also increases time bonuses, creating a snowball effect where skilled players can extend their games significantly

3. **Risk-Reward Balance**: Wrong clicks cost 2 seconds AND reset your combo, making every decision meaningful. High combos are valuable but risky to maintain

4. **30-Second Sprint Format**: Quick, intense sessions designed for "one more game" appeal - perfect for Reddit's mobile-first browsing experience

5. **Physics-Based Layout**: Smart emoji positioning with 60px minimum spacing prevents overlaps while maintaining visual complexity

6. **Progressive Difficulty**: As combos build, the stakes get higher - lose your 10x combo and you lose 13 seconds of potential time bonus

7. **Reddit-Native Experience**: Built specifically for Reddit with automatic username integration, Redis-backed leaderboards, and a custom splash screen that stands out in the feed

## 🎮 Game Features

### Core Gameplay
- **30-Second Sprint**: Fast-paced countdown timer that creates urgency and excitement
- **Two-Card System**: Each card displays 8 emojis with exactly one matching emoji between them
- **Visual Variety**: Every emoji has random size (0.8x-2.5x) and rotation (0-360°) for unique challenges
- **Smart Positioning**: Physics-based emoji placement with 60px minimum spacing prevents overlaps

### Scoring & Progression
- **Base Points**: 25 points per correct match
- **Combo Multiplier**: Build streaks for bonus points using formula: 25 + (combo-1) × 10
  - 1x combo: 25 points
  - 3x combo: 45 points
  - 5x combo: 65 points
  - 10x combo: 115 points
- **Dynamic Time Bonuses**: Earn 3 + combo level seconds per match (4-13 seconds)
- **Penalty System**: Wrong clicks cost 2 seconds and reset your combo

### Visual & Audio Feedback
- **Combo Celebrations**: Special indicators at 3x (✨ COMBO!), 5x (⚡ AMAZING!), and 10x (🔥 LEGENDARY!)
- **Smooth Animations**: Green flash for correct matches, red shake for wrong clicks
- **Audio System**: Web Audio API-powered sound effects with pitch variation based on combo level
- **Timer Colors**: Green (>15s), Yellow (8-15s), Red (<8s) for visual urgency cues
- **Audio Warnings**: Ticking sound at 10 seconds, fast ticking in final 5 seconds

### Reddit Integration
- **Custom Splash Screen**: Eye-catching entry screen with live player stats and daily challenge preview
- **Global Leaderboard**: Top 5 high scores with Reddit usernames stored in Redis
- **Automatic Username**: Your Reddit username appears automatically on the leaderboard
- **Game Statistics**: Track rounds completed, accuracy, highest combo, and total clicks

### Mobile & Accessibility
- **Touch Optimized**: Responsive design with touch-friendly hit detection
- **60 FPS Rendering**: Smooth HTML5 Canvas rendering on mobile and desktop
- **Error Handling**: Comprehensive error boundary with graceful fallbacks
- **Settings Panel**: Toggle sound effects and music independently

## 📖 How to Play

### Getting Started

1. **Launch the Game**: Click the "Play Now" button on the splash screen
2. **Main Menu**: Click "▶️ Play Game" to start a new game
3. **Game Screen**: Two cards appear side-by-side, each with 8 emojis
4. **Find the Match**: Identify the ONE emoji that appears on BOTH cards
5. **Click It**: Tap or click the matching emoji before time runs out
6. **Keep Going**: New cards appear instantly after each correct match

### The Challenge

**What You See:**
- Two cards displayed side-by-side
- 8 emojis on each card (16 total)
- Emojis with random sizes (some tiny, some huge)
- Emojis rotated at random angles (0-360°)
- A countdown timer at the top
- Your current score and combo multiplier

**Your Goal:**
- Find the ONE emoji that appears on BOTH cards
- Click it as fast as possible
- Build combos for massive point bonuses
- Extend your time by making correct matches
- Score as many points as possible before time runs out

**The Twist:**
- Emojis are randomly sized (0.8x to 2.5x) - some are tiny, some are huge!
- Emojis are randomly rotated (0-360°) - they might be upside down or sideways
- Visual chaos makes pattern recognition genuinely challenging
- You only have 30 seconds, but correct matches add time

### Scoring Breakdown

**Correct Match Rewards:**
- **Base Points**: 25 points
- **Combo Bonus**: (combo - 1) × 10 additional points
- **Time Bonus**: 3 + combo level seconds added to timer

**Examples:**
| Combo | Points Earned | Time Added | Total Benefit |
|-------|--------------|------------|---------------|
| 1x    | 25 points    | +4 seconds | First match   |
| 2x    | 35 points    | +5 seconds | Building up   |
| 3x    | 45 points    | +6 seconds | ✨ COMBO!     |
| 5x    | 65 points    | +8 seconds | ⚡ AMAZING!   |
| 10x   | 115 points   | +13 seconds| 🔥 LEGENDARY! |

**Wrong Click Penalties:**
- **Time Penalty**: -2 seconds from timer
- **Combo Reset**: Combo drops back to 0x
- **No Points Lost**: Your score stays the same

### Game Flow

1. **Splash Screen** (First time only)
   - Shows live player stats
   - Displays today's daily challenge emoji
   - Click "Play Now" to enter

2. **Main Menu**
   - ▶️ Play Game - Start a new game
   - 🏆 Leaderboard - View top 5 scores
   - ⚙️ Settings - Toggle sound effects and music

3. **Active Game**
   - Timer counts down from 30 seconds
   - Find and click matching emojis
   - Build combos for bonus points and time
   - Watch for combo celebrations (3x, 5x, 10x)
   - Timer changes color as time runs low

4. **Game Over**
   - See the matching emoji highlighted on both cards
   - View final statistics (score, rounds, accuracy, best combo)
   - Choose "🔄 Play Again" or "← Back to Menu"

5. **Leaderboard**
   - Top 5 high scores with Reddit usernames
   - Your rank if you made the top 5
   - Timestamps for each score

### Pro Tips & Strategy

**For Beginners:**
- Take your time on the first few matches to build confidence
- Look for distinctive emojis first (unique colors or shapes)
- Don't panic when the timer turns yellow - you still have time

**For Intermediate Players:**
- Develop a systematic scanning pattern (left-to-right, top-to-bottom)
- Build combos to 3x or 5x for significant time extensions
- Balance speed with accuracy - wrong clicks are costly

**For Advanced Players:**
- Protect high combos (10x+) by taking an extra moment to verify
- At 10x combo, you get 13 seconds per match - use this to extend games indefinitely
- Learn to recognize emoji shapes even when rotated
- Use peripheral vision to scan both cards simultaneously

**Time Management:**
- **Green Timer (>15s)**: Safe zone - focus on building combos
- **Yellow Timer (8-15s)**: Caution - maintain your combo but stay alert
- **Red Timer (<8s)**: Danger - prioritize speed, protect your score

**Combo Strategy:**
- 1x-2x: Build foundation, don't rush
- 3x-5x: Sweet spot for consistent time extensions
- 6x-9x: High risk, high reward - be careful
- 10x+: Maximum time bonus - verify before clicking

### Controls

**Desktop:**
- **Mouse Click**: Click on emojis to select them
- **Menu Navigation**: Click buttons to navigate screens

**Mobile:**
- **Tap**: Tap emojis to select them
- **Touch-Friendly**: Large hit areas for easy tapping
- **No Scrolling**: Game prevents accidental scrolling

**Settings:**
- **Sound Effects Toggle**: Turn game sounds on/off
- **Music Toggle**: Turn background music on/off (when implemented)
- **Settings Persist**: Your preferences are saved locally

## 🎮 Playing on Reddit

### Installation & Access

1. **Find MojiMatcher**: Look for a MojiMatcher post in a subreddit where it's installed
2. **View Splash Screen**: See the animated splash screen with live stats in your Reddit feed
3. **Launch App**: Click the "Play Now" button to open the game in full screen
4. **Start Playing**: Navigate the menu and start your first game!

### Game Screens Explained

**Splash Screen** (Entry Point)
- Animated floating emojis in the background
- Live statistics: players today, total games played
- Daily challenge preview with featured emoji
- Large "Play Now" button to enter the game
- Quick info about game features

**Menu Screen** (Main Hub)
- 🎮 MojiMatcher title with emoji icon
- ▶️ Play Game - Start a new 30-second game
- 🏆 Leaderboard - View top 5 high scores
- ⚙️ Settings - Toggle sound effects and music
- How to Play instructions at the bottom

**Game Screen** (Active Gameplay)
- Top bar: Score (left), Timer (center), Rounds (right)
- Combo indicator appears at 3x or higher
- Two cards displayed side-by-side with 8 emojis each
- Debug mode shows matching emoji (for testing)
- Smooth animations for correct/wrong clicks

**Game Over Screen** (Results)
- Emoji highlight showing the final matching emoji
- Large final score display
- Statistics grid: Rounds, Accuracy, Best Combo, Total Clicks
- 🔄 Play Again button (quick restart)
- ← Back to Menu button

**Leaderboard Screen** (Competition)
- Top 5 high scores with rank badges (🥇🥈🥉)
- Reddit usernames for each entry
- Score, rounds, and timestamp for each entry
- Your entry highlighted if you made top 5
- ← Back to Menu button

## 🚀 Development Setup

### Prerequisites

- Node.js 22.2.0 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts the Devvit playtest environment and provides a URL to test the game in a Reddit-like environment.

### Building

```bash
npm run build
```

### Deployment

```bash
npm run launch
```

Submits the app to Reddit for review and deployment.

## 📁 Project Structure

```
src/
├── client/                      # Frontend React application
│   ├── components/              # React components
│   │   ├── ErrorBoundary.tsx    # Error handling wrapper
│   │   ├── MenuScreen.tsx       # Main menu with settings
│   │   ├── GameCanvas.tsx       # HTML5 Canvas rendering
│   │   ├── GameUI.tsx           # Score/timer/rounds display
│   │   ├── GameOverScreen.tsx   # End game stats
│   │   ├── LeaderboardScreen.tsx # Top 5 scores
│   │   ├── ComboIndicator.tsx   # Combo celebration UI
│   │   └── ScorePopup.tsx       # Point animation
│   ├── hooks/                   # Custom React hooks
│   │   ├── useGameState.ts      # Game state management
│   │   └── useTimer.ts          # Countdown timer logic
│   ├── utils/                   # Utility functions
│   │   ├── cardGenerator.ts     # Card generation algorithm
│   │   ├── cardGenerator.test.ts # Automated tests
│   │   └── audioManager.ts      # Web Audio API sounds
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── server/                      # Express server
│   ├── core/                    # Business logic
│   │   └── post.ts              # Post creation
│   └── index.ts                 # API endpoints
└── shared/                      # Shared types
    ├── types/
    │   ├── game.ts              # Game type definitions
    │   └── api.ts               # API interfaces
    └── constants/
        └── emojis.ts            # 30 emoji pool
```

## 🎨 Technical Highlights

### Client Architecture

- **React + TypeScript**: Type-safe component architecture
- **HTML5 Canvas**: High-performance emoji rendering with transformations
- **Custom Hooks**: Modular state management (useGameState, useTimer)
- **Web Audio API**: Dynamic sound generation without external assets
- **Responsive Design**: Mobile-first with touch event support

### Game Algorithm

- **Card Generation**: Guarantees exactly 1 matching emoji between cards
- **Overlap Prevention**: Physics-based positioning prevents emoji collisions
- **Click Detection**: Accurate hit detection accounting for rotation and scale
- **Combo System**: Dynamic scoring formula: 25 + (combo - 1) × 10

### Server Integration

- **Redis Leaderboard**: Top 5 scores persisted across sessions
- **Reddit API**: Automatic username integration
- **Express Endpoints**: RESTful API for score management
- **Fallback Storage**: localStorage backup when server unavailable

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run check` - Run linting and type checking
- `npm run launch` - Submit for Reddit review

## 📊 Game Statistics

Based on testing and design:

- **Average game duration**: 30-60 seconds
- **Average rounds per game**: 8-15 rounds
- **Beginner score**: 200-400 points
- **Intermediate score**: 500-800 points
- **Expert score**: 1000+ points
- **Theoretical maximum**: Unlimited with sustained 10x combo

## 📝 License

Built with ❤️ using Devvit for Reddit
