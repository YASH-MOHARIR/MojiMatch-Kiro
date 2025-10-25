# 🎮 MojiMatcher

A lightning-fast emoji matching game built for Reddit using Devvit. Race against the clock to find the one emoji that appears on both cards in this addictive pattern-recognition challenge!

## 🌟 What Makes MojiMatcher Unique

**MojiMatcher** combines classic spot-the-difference gameplay with modern game design to create an addictive, skill-based experience perfect for Reddit's mobile-first audience:

- **Dynamic Visual Chaos**: Every emoji has random size (0.8x-2.5x) and rotation (0-360°), making each round a fresh visual puzzle
- **Escalating Combo System**: Build streaks for exponentially increasing rewards - both points AND time bonuses scale with your combo
- **Risk-Reward Balance**: Wrong clicks cost precious seconds and reset your combo, creating tension in every decision
- **30-Second Sprint Format**: Quick, intense sessions designed for "one more game" appeal - perfect for Reddit browsing
- **Physics-Based Layout**: Smart emoji positioning prevents overlaps while maintaining visual complexity
- **Progressive Difficulty**: As you build combos, the pressure intensifies with faster time drain and higher stakes

## 🎯 Game Features

- **Intense 30-Second Gameplay**: Fast-paced countdown with dynamic time bonuses that scale with combos
- **Intelligent Combo System**: Earn 25 base points + (combo-1) × 10 bonus points per match
- **Dynamic Time Rewards**: Get 3 seconds + 1 second per combo level (up to 13 seconds at 10x!)
- **Visual Variety**: Random emoji sizes and rotations create unique challenges every round
- **Audio Feedback**: Web Audio API-powered sound effects with toggle controls
- **Reddit Integration**: Top 5 leaderboard with Reddit usernames and Redis persistence
- **Mobile Optimized**: Touch-friendly responsive design with smooth 60 FPS rendering
- **Smooth Animations**: Green flash for correct matches, red shake for mistakes
- **Combo Indicators**: Visual celebration at 3x (✨ COMBO!), 5x (⚡ AMAZING!), and 10x (🔥 LEGENDARY!)

## 🎲 How to Play

### Basic Rules

1. **The Challenge**: Two cards appear, each containing 8 emojis
2. **Your Goal**: Find the ONE emoji that appears on BOTH cards
3. **The Catch**: You have 30 seconds to score as many points as possible
4. **The Twist**: Emojis are randomly sized and rotated - look carefully!

### Scoring System

**Correct Match:**
- Base points: 25
- Combo bonus: (combo - 1) × 10
- Examples:
  - 1x combo: 25 points
  - 2x combo: 35 points (25 + 10)
  - 3x combo: 45 points (25 + 20)
  - 5x combo: 65 points (25 + 40)
  - 10x combo: 115 points (25 + 90)

**Time Bonuses:**
- Base time: +3 seconds
- Combo bonus: +1 second per combo level
- Examples:
  - 1x combo: +3 seconds
  - 3x combo: +6 seconds
  - 5x combo: +8 seconds
  - 10x combo: +13 seconds

**Wrong Click:**
- Time penalty: -2 seconds
- Combo reset: Back to 0x
- No point deduction

### Strategy Tips

1. **Build Your Combo**: The longer your streak, the more time you earn per match
2. **Speed vs Accuracy**: Balance quick clicks with careful observation
3. **Visual Scanning**: Develop a systematic pattern for checking emojis
4. **Combo Protection**: At high combos, take an extra moment to verify - the time bonus is worth it
5. **Time Management**: Watch the timer color (green → yellow → red) to gauge urgency

### Game Progression

- **Timer starts**: 30 seconds
- **Green timer**: >15 seconds remaining (safe zone)
- **Yellow timer**: 8-15 seconds (caution zone)
- **Red timer**: <8 seconds (danger zone)
- **Audio warnings**: Ticking at 10s, fast ticking at 5s
- **Game ends**: When timer reaches 0

### Controls

- **Desktop**: Click emojis with mouse
- **Mobile**: Tap emojis with finger
- **Settings**: Toggle sound effects and music from menu

## 🎮 Playing the Game

### On Reddit

1. Find a MojiMatcher post in a subreddit where it's installed
2. Click the "Launch App" button on the splash screen
3. Click "▶️ Play Game" from the menu
4. Start matching emojis!

### Game Screens

- **Menu Screen**: Start game, view leaderboard, adjust settings
- **Game Screen**: Active gameplay with timer, score, and combo display
- **Game Over Screen**: Final stats including score, rounds, accuracy, and best combo
- **Leaderboard Screen**: Top 5 high scores with Reddit usernames

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
