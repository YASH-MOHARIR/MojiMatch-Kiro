# 🎮 MojiMatcher

A lightning-fast emoji matching game built for Reddit using Devvit. Race against the clock to find the one emoji that appears on both cards in this addictive pattern-recognition challenge!

## 🎯 What is MojiMatcher?

MojiMatcher is a fast-paced visual puzzle game where players must quickly identify the single matching emoji between two cards containing 8 emojis each. With only 30 seconds on the clock, players race to complete as many rounds as possible while building combos for massive point bonuses and time extensions.

### Core Features

- **Two-Card Challenge**: Each card displays 8 emojis with exactly one matching emoji hidden between them
- **30-Second Sprint**: Fast-paced countdown timer that creates urgency and excitement
- **Dynamic Combo System**: Build consecutive match streaks for escalating points (25 → 35 → 45 → 65 → 115+)
- **Time Bonuses**: Earn 4-13 seconds per match based on your combo level (higher combos = more time)
- **Visual Chaos**: Every emoji has random size (0.8x-2.5x) and rotation (0-360°) for unique challenges
- **Daily Challenge Mode**: Compete with the Reddit community on the same deterministic puzzle each day
- **Animated Splash Screen**: Eye-catching entry screen with live player stats and daily challenge preview
- **Multi-Tier Leaderboards**: All-Time, Daily, and Weekly leaderboards with Reddit username integration
- **Audio Feedback**: Web Audio API-powered sound effects with pitch variation based on combo level
- **Mobile Optimized**: Touch-friendly controls and responsive design for seamless mobile gameplay

## 🌟 What Makes MojiMatcher Innovative

**MojiMatcher** stands out from traditional matching games through several unique design choices:

1. **Dynamic Visual Chaos**: Unlike static matching games, every emoji has random size and rotation, making pattern recognition genuinely challenging and preventing memorization strategies

2. **Escalating Combo System**: The combo system doesn't just increase points - it also increases time bonuses (3 + combo level seconds), creating a snowball effect where skilled players can extend their games significantly

3. **Risk-Reward Balance**: Wrong clicks cost 2 seconds AND reset your combo, making every decision meaningful. High combos are valuable but risky to maintain

4. **Daily Challenge Mode**: Every player gets the same deterministic puzzle each day using seeded random generation, enabling fair competition and community discussion

5. **30-Second Sprint Format**: Quick, intense sessions designed for "one more game" appeal - perfect for Reddit's mobile-first browsing experience

6. **Physics-Based Layout**: Smart emoji positioning with 60px minimum spacing prevents overlaps while maintaining visual complexity

7. **Progressive Difficulty**: As combos build, the stakes get higher - lose your 10x combo and you lose 13 seconds of potential time bonus

8. **Reddit-Native Experience**: Built specifically for Reddit with automatic username integration, Redis-backed leaderboards, and a custom splash screen that stands out in the feed

9. **Streak Tracking**: Daily challenge mode tracks consecutive days played, encouraging regular engagement

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

1. **View Splash Screen**: When you first open the game, you'll see an animated splash screen with:
   - Floating emoji particles in the background
   - Live stats showing players today and total games played
   - Today's daily challenge emoji preview
   - A large "Play Now" button

2. **Enter Main Menu**: Click "Play Now" to access the main menu with options:
   - **📅 Daily Challenge**: Play today's challenge (same puzzle for all players)
   - **▶️ Play Game**: Start a standard game with random cards
   - **🏆 Leaderboard**: View All-Time, Daily, and Weekly top scores
   - **⚙️ Settings**: Toggle sound effects and music

3. **Choose Your Mode**:
   - **Daily Challenge**: Compete on the same puzzle as everyone else, track your streak
   - **Standard Game**: Play with randomly generated cards for practice

### The Challenge

**What You See:**
- Two white cards displayed side-by-side on your screen
- 8 emojis on each card (16 total visible emojis)
- Emojis with random sizes - some tiny (0.8x), some huge (2.5x)
- Emojis rotated at random angles (0-360°) - upside down, sideways, or diagonal
- A countdown timer at the top center (starts at 30 seconds)
- Your current score (top left) and rounds completed (top right)
- Combo indicator appears when you reach 3x or higher

**Your Goal:**
- Find the ONE emoji that appears on BOTH cards
- Click or tap it as fast as possible
- Build combos by making consecutive correct matches
- Extend your time by earning time bonuses
- Score as many points as possible before time runs out

**The Twist:**
- Emojis are randomly sized and rotated, making visual matching challenging
- The same emoji might look completely different on each card due to size/rotation
- You only have 30 seconds initially, but correct matches add time
- Higher combos give you more time per match (4-13 seconds)

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
   - Animated floating emojis in the background
   - Shows live player stats (players today, total games)
   - Displays today's daily challenge emoji
   - Click "Play Now" to enter the main menu

2. **Main Menu**
   - **📅 Daily Challenge** - Play today's challenge (shows your streak and best score)
   - **▶️ Play Game** - Start a standard random game
   - **🏆 Leaderboard** - View All-Time, Daily, and Weekly leaderboards
   - **⚙️ Settings** - Toggle sound effects and music on/off

3. **Active Game**
   - Timer counts down from 30 seconds (displayed at top center)
   - Score and rounds displayed at top corners
   - Find and click/tap the matching emoji on both cards
   - Build combos for bonus points and time extensions
   - Watch for combo celebrations:
     - **3x**: ✨ COMBO! (blue gradient badge)
     - **5x**: ⚡ AMAZING! (orange-red gradient badge)
     - **10x**: 🔥 LEGENDARY! (purple-pink gradient badge)
   - Timer changes color as time runs low:
     - **Green** (>15 seconds): Safe zone
     - **Yellow** (8-15 seconds): Caution
     - **Red** (<8 seconds): Danger
   - Audio warnings at 10 seconds (tick) and last 5 seconds (fast tick)

4. **Game Over Sequence**
   - **Emoji Highlight** (2.5 seconds): The matching emoji glows with a golden circle on both cards
   - **Game Over Screen**: Shows final statistics
     - Final score (large display)
     - Rounds completed
     - Accuracy percentage
     - Best combo achieved
     - Total clicks
   - Choose "🔄 Play Again" or "← Back to Menu"

5. **Leaderboard Screen**
   - **Tabs**: All-Time, Daily, Weekly, My Stats
   - **All-Time**: Top 10 scores ever recorded
   - **Daily**: Top 10 scores from today
   - **Weekly**: Top 10 scores from current week
   - **My Stats**: Personal statistics dashboard
   - Rank badges: 🥇 (1st), 🥈 (2nd), 🥉 (3rd), #4-10
   - Shows Reddit usernames, scores, rounds, and timestamps
   - Your entry is highlighted if you made the leaderboard

### Pro Tips & Strategy

**For Beginners:**
- Take your time on the first few matches to build confidence
- Look for distinctive emojis first (unique colors or shapes like 🚀 or ⭐)
- Don't panic when the timer turns yellow - you still have 8-15 seconds
- Focus on accuracy over speed initially - wrong clicks cost 2 seconds AND reset your combo

**For Intermediate Players:**
- Develop a systematic scanning pattern (left-to-right, top-to-bottom)
- Build combos to 3x or 5x for significant time extensions (6-8 seconds per match)
- Balance speed with accuracy - wrong clicks are very costly
- Learn to recognize emoji shapes even when rotated or scaled

**For Advanced Players:**
- Protect high combos (10x+) by taking an extra moment to verify
- At 10x combo, you get 13 seconds per match - use this to extend games indefinitely
- Use peripheral vision to scan both cards simultaneously
- Memorize the 30-emoji pool to quickly eliminate non-matches

**Time Management:**
- **Green Timer (>15s)**: Safe zone - focus on building combos steadily
- **Yellow Timer (8-15s)**: Caution - maintain your combo but stay alert
- **Red Timer (<8s)**: Danger - prioritize speed, but don't panic-click

**Combo Strategy:**
- **1x-2x**: Build foundation, don't rush (4-5 seconds per match)
- **3x-5x**: Sweet spot for consistent time extensions (6-8 seconds per match)
- **6x-9x**: High risk, high reward - be careful (9-12 seconds per match)
- **10x+**: Maximum time bonus (13 seconds per match) - verify before clicking to protect your streak

**Daily Challenge Tips:**
- Everyone gets the same puzzle, so compare strategies in comments
- Your best score counts, so you can replay to improve
- Build your streak by playing every day for bonus achievements
- Check the leaderboard to see how you rank against the community

### Controls

**Desktop:**
- **Mouse Click**: Click on emojis to select them
- **Menu Navigation**: Click buttons to navigate screens
- **Hover**: Buttons show hover effects for visual feedback

**Mobile:**
- **Tap**: Tap emojis to select them
- **Touch-Friendly**: Large hit areas (60px minimum) for easy tapping
- **No Scrolling**: Game prevents accidental scrolling during gameplay
- **Touch Action**: Optimized touch response for immediate feedback

**Settings:**
- **Sound Effects Toggle**: Turn game sounds on/off (correct, wrong, combo sounds)
- **Music Toggle**: Turn background music on/off
- **Settings Persist**: Your preferences are saved in browser localStorage
- **Audio System**: Web Audio API generates tones dynamically (no external audio files needed)

## 🎮 Playing on Reddit

### Installation & Access

1. **Find MojiMatcher**: Look for a MojiMatcher post in a subreddit where it's installed
2. **View Splash Screen**: See the animated splash screen with live stats directly in your Reddit feed
3. **Launch App**: Click the "Play Now" button to open the game in full screen webview
4. **Start Playing**: Navigate the menu and choose your game mode!

### Game Screens Explained

**Splash Screen** (Entry Point)
- Animated floating emojis in the background (15+ emojis with random speeds)
- Live statistics: players today, total games played
- Daily challenge preview with featured emoji
- Large "🎮 Play Now" button with pulse animation
- Quick info: "⚡ 30-second rounds • 🎯 Build combos • 🏆 Compete on leaderboards"

**Menu Screen** (Main Hub)
- 🎮 MojiMatcher title with emoji icon
- **📅 Daily Challenge** - Featured button with gradient (shows streak and best score)
- **▶️ Play Game** - Start a standard random game
- **🏆 Leaderboard** - View All-Time, Daily, and Weekly leaderboards
- **⚙️ Settings** - Toggle sound effects and music (expandable panel)
- How to Play instructions at the bottom with bullet points

**Game Screen** (Active Gameplay)
- **Top bar**: Score (left), Timer (center with color coding), Rounds (right)
- **Combo indicator**: Appears at 3x or higher with animated badge
- **Daily Challenge indicator**: Shows at top if playing daily challenge mode
- **Two cards**: Displayed side-by-side with 8 emojis each
- **Canvas rendering**: HTML5 Canvas with smooth 60 FPS rendering
- **Animations**: Green flash for correct, red shake for wrong clicks
- **Audio feedback**: Pitch-varied sounds based on combo level

**Game Over Screen** (Results)
- **Emoji highlight phase** (2.5 seconds): Golden glow around matching emoji on both cards
- **Large final score display**: Prominent score with "⏰ Time's Up!" header
- **Statistics grid**: 
  - Rounds completed
  - Accuracy percentage
  - Best combo achieved
  - Total clicks
- **🔄 Play Again** button (quick restart)
- **← Back to Menu** button

**Leaderboard Screen** (Competition)
- **Tab navigation**: All-Time, Daily, Weekly, My Stats
- **All-Time**: Top 10 scores ever with rank badges (🥇🥈🥉 or #4-10)
- **Daily**: Top 10 scores from today (resets at UTC midnight)
- **Weekly**: Top 10 scores from current week (Monday-Sunday UTC)
- **My Stats**: Personal dashboard with total games, best score, average score, achievements
- **Reddit usernames** for each entry (automatically pulled from Reddit context)
- **Your entry highlighted** with gradient background if you made the leaderboard
- **Refresh button** to fetch latest scores
- **← Back to Menu** button

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

- **React + TypeScript**: Type-safe component architecture with strict type checking
- **HTML5 Canvas**: High-performance emoji rendering with transformations (rotation, scaling)
- **Custom Hooks**: Modular state management
  - `useGameState`: Central game state with combo logic and daily challenge support
  - `useTimer`: Countdown timer with audio warnings
  - `useDailyChallenge`: Daily challenge data fetching and streak tracking
- **Web Audio API**: Dynamic sound generation using oscillators (no external audio files)
- **Responsive Design**: Mobile-first with touch event support and viewport optimization
- **Error Boundary**: Comprehensive error handling with graceful fallbacks

### Game Algorithm

- **Card Generation**: Guarantees exactly 1 matching emoji between cards using set theory
- **Seeded Random**: Deterministic random generation for daily challenges using Linear Congruential Generator
- **Overlap Prevention**: Physics-based positioning with 60px minimum distance between emojis
- **Click Detection**: Accurate hit detection accounting for rotation, scale, and touch areas
- **Combo System**: Dynamic scoring formula: 25 + (combo - 1) × 10
- **Time Bonus**: Dynamic time rewards: 3 + combo level seconds (4-13 seconds range)

### Server Integration

- **Redis Leaderboards**: Multiple sorted sets for All-Time, Daily, and Weekly leaderboards
- **Reddit API**: Automatic username integration via Devvit context
- **Express Endpoints**: RESTful API for score management, leaderboards, and daily challenges
- **Daily Challenge System**: Server-side seed generation based on UTC date
- **Streak Tracking**: Redis-based consecutive day tracking with automatic reset
- **Global Stats**: Real-time player count and game statistics
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
