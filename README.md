# 🎮 MojiMatcher

A lightning-fast emoji matching game built for Reddit using Devvit. Race against the clock to find the one emoji that appears on both cards in this addictive pattern-recognition challenge!

> **Quick Summary:** Find the matching emoji between two cards before time runs out! Each card shows 8-20 emojis (depending on difficulty) with random sizes and rotations. Build combos for bonus points and time extensions. Choose from 4 difficulty levels (Easy, Medium, Hard, GOD). Compete on multiple leaderboards (All-Time, Weekly, GOD Mode) with the Reddit community. Built with React, TypeScript, HTML5 Canvas, and Redis.

**Play directly on Reddit** - MojiMatcher runs natively in Reddit posts using Devvit's webview technology. Click the custom splash screen to launch the full-screen game experience!

## 🎯 What is MojiMatcher?

MojiMatcher is a fast-paced visual puzzle game where players must quickly identify the single matching emoji between two cards. With only 30 seconds on the clock, players race to complete as many rounds as possible while building combos for massive point bonuses and time extensions.

**The Challenge:** Each card displays 8-20 emojis (depending on difficulty) with random sizes (0.8x-2.5x) and rotations (0-360°), making the same emoji look completely different on each card. You must use pattern recognition skills to spot the one matching emoji before time runs out. Every correct match generates new cards with fresh challenges, while wrong clicks cost precious seconds and reset your combo multiplier.

**The Goal:** Build the highest combo streak possible to maximize your score and earn time bonuses. The longer your combo, the more time you earn per match (4-13+ seconds), creating a snowball effect where skilled players can extend their games significantly. Compete on multiple leaderboards (All-Time, Weekly, GOD Mode) as you master the game.

**Built for Reddit:** MojiMatcher is a native Reddit app that runs directly in Reddit posts using Devvit's webview technology. Players can compete with the Reddit community on leaderboards, with scores automatically tied to their Reddit usernames for seamless social gaming.

## 🎯 Game Overview

MojiMatcher is a fast-paced visual puzzle game where players race against a 30-second timer to identify matching emojis between two cards. Each card displays 8-20 emojis (depending on difficulty) with randomized sizes (0.8x-2.5x) and rotations (0-360°), creating a unique visual challenge every round. The game features a sophisticated combo system that rewards consecutive correct matches with escalating points and time bonuses, allowing skilled players to extend their games indefinitely.

The game is built as a native Reddit app using Devvit's platform, featuring seamless Reddit username integration, Redis-backed leaderboards, and a custom splash screen that appears in the Reddit feed. Players can compete across three leaderboard types (All-Time, Weekly, GOD Mode) and choose from four difficulty levels, each with unique mechanics including moving emojis in Hard and GOD modes.

## 🎯 What is MojiMatcher?

MojiMatcher is a fast-paced visual puzzle game where players must quickly identify the single matching emoji between two cards. With only 30 seconds on the clock, players race to complete as many rounds as possible while building combos for massive point bonuses and time extensions.

**The Challenge:** Each card displays emojis with random sizes (0.8x-2.5x) and rotations (0-360°), making the same emoji look completely different on each card. You must use pattern recognition skills to spot the one matching emoji before time runs out. Every correct match generates new cards with fresh challenges, while wrong clicks cost precious seconds and reset your combo multiplier.

**Four Difficulty Levels:**
- **Easy Mode** (8 emojis per card, 1x score multiplier): Perfect for beginners learning the game mechanics with stationary emojis
- **Medium Mode** (12 emojis per card, 1.5x score multiplier): A balanced challenge for intermediate players with stationary emojis
- **Hard Mode** (16 emojis per card, 2x score multiplier, moving emojis): For experienced players seeking a challenge with emojis that drift in circular patterns
- **GOD Mode** (20 emojis per card, 3x score multiplier, faster moving emojis): The ultimate test of skill and speed with rapidly moving emojis

**The Goal:** Build the highest combo streak possible to maximize your score and earn time bonuses. The longer your combo, the more time you earn per match (4-13+ seconds), creating a snowball effect where skilled players can extend their games significantly. Compete on multiple leaderboards (All-Time, Weekly, GOD Mode) as you master the game.

**Built for Reddit:** MojiMatcher is a native Reddit app that runs directly in Reddit posts using Devvit's webview technology. Players can compete with the Reddit community on leaderboards, with scores automatically tied to their Reddit usernames for seamless social gaming. The game features a custom splash screen that appears in the Reddit feed with a personalized challenge message: "Hey [username]! Think You're Fast Enough? 🔥" inviting users to click "🎮 I Accept the Challenge!" and play in full-screen mode.

### Core Features

- **Four Difficulty Levels**: Choose from Easy (8 emojis), Medium (12 emojis), Hard (16 moving emojis), or GOD Mode (20 fast-moving emojis)
- **Two-Card Challenge**: Each card displays emojis with exactly one matching emoji hidden between them
- **30-Second Sprint**: Fast-paced countdown timer with 3-2-1-GO! countdown animation
- **Dynamic Combo System**: Build consecutive match streaks for escalating points (25 → 35 → 45 → 65 → 115+)
- **Difficulty Multipliers**: Earn 1x (Easy), 1.5x (Medium), 2x (Hard), or 3x (GOD) score multipliers
- **Time Bonuses**: Earn 4-13+ seconds per match based on your combo level (higher combos = more time)
- **Visual Chaos**: Every emoji has random size (0.8x-2.5x) and rotation (0-360°) for unique challenges
- **Moving Emojis**: Hard and GOD modes feature emojis that drift smoothly across the cards in circular patterns
- **Multi-Tier Leaderboards**: All-Time, Weekly, and GOD Mode leaderboards with Reddit username integration
- **Audio Feedback**: Web Audio API-powered sound effects with pitch variation based on combo level
- **Game-End Emoji Reveal**: See the matching emoji highlighted with a golden pulsing glow when time expires
- **Combo Celebrations**: Special animated badges at 3x (✨ COMBO!), 5x (⚡ AMAZING!), and 10x (🔥 LEGENDARY!)
- **Interactive Hover Effects**: Emojis glow blue and scale up 15% when you hover over them for better targeting
- **Mobile Optimized**: Touch-friendly controls and responsive design for seamless mobile gameplay
- **React-Powered UI**: Built with React, TypeScript, and HTML5 Canvas for smooth 60 FPS rendering

## 🌟 What Makes MojiMatcher Innovative

MojiMatcher stands out from traditional matching games through several unique design choices that create a genuinely challenging and addictive experience:

### 1. **Progressive Difficulty System with Moving Emojis**
Unlike static matching games, MojiMatcher offers four distinct difficulty levels that fundamentally change the gameplay:
- **Easy Mode**: 8 stationary emojis for learning the mechanics
- **Medium Mode**: 12 stationary emojis with 1.5x score multiplier
- **Hard Mode**: 16 emojis that drift smoothly across the cards in circular patterns at moderate speed (0.8x movement)
- **GOD Mode**: 20 fast-moving emojis with 3x score multiplier for the ultimate challenge (1.2x movement speed)

The moving emoji mechanic in Hard and GOD modes adds a dynamic layer of difficulty, requiring players to track targets while they drift in smooth circular patterns. Each emoji moves at a different phase and speed using sine/cosine functions with phase offsets, creating a mesmerizing yet challenging visual experience that tests both pattern recognition and hand-eye coordination. The animation runs at 60 FPS using requestAnimationFrame for smooth movement.

### 2. **Dynamic Visual Chaos**
Every emoji has random size (0.8x-2.5x) and rotation (0-360°), making pattern recognition genuinely challenging. The same emoji might appear tiny and upside-down on one card, then huge and sideways on the other. This prevents memorization strategies and keeps every round fresh.

### 3. **Escalating Combo System with Time Rewards**
The combo system doesn't just increase points - it also increases time bonuses using the formula: **3 + combo level seconds**. This creates a snowball effect:
- 1x combo: +4 seconds
- 5x combo: +8 seconds  
- 10x combo: +13 seconds

Skilled players can extend their games indefinitely by maintaining high combos, turning a 30-second sprint into a marathon.

### 4. **High-Stakes Risk-Reward Balance**
Wrong clicks cost **2 seconds AND reset your combo**, making every decision meaningful. At 10x combo, a wrong click doesn't just cost 2 seconds - it costs the potential for 13-second time bonuses. This creates intense pressure as combos build.

### 5. **Seeded Random Generation**
The game uses a sophisticated seeded random number generator (Linear Congruential Generator) that enables:
- Deterministic card generation for testing and debugging
- Consistent emoji distribution across difficulty levels
- Fair gameplay with predictable randomness
- Reproducible game states for development

### 6. **30-Second Sprint Format**
Quick, intense sessions designed for "one more game" appeal - perfect for Reddit's mobile-first browsing experience. Games last 30-90 seconds, making it easy to play during short breaks.

### 7. **Physics-Based Layout with Overlap Prevention**
Smart emoji positioning with 60px minimum spacing prevents overlaps while maintaining visual complexity. Emojis are strategically placed to avoid clustering, ensuring every emoji is visible and clickable.

### 8. **Progressive Difficulty Through Stakes**
As combos build, the stakes get higher. Lose your 10x combo and you lose:
- 13 seconds of potential time bonus per match
- 90+ points per match (vs 25 base points)
- The psychological momentum of a hot streak

### 9. **Reddit-Native Experience**
Built specifically for Reddit with:
- Automatic username integration (no login required) via Devvit's Reddit API
- Redis-backed leaderboards (All-Time, Weekly, GOD Mode) with sorted sets for efficient queries
- Custom splash screen with personalized challenge message: "Hey [username]! Think You're Fast Enough? 🔥"
- Game-end emoji reveal with golden pulsing glow effect (opacity cycles 0.6-1.0) that helps players learn
- Seamless integration with Reddit's Devvit platform using Express server and React client
- Runs directly in Reddit posts using Devvit's webview technology
- Full-screen gameplay experience launched from Reddit feed with custom splash background

### 10. **Multi-Tier Competition**
Three separate leaderboards create multiple ways to compete:
- **All-Time**: Eternal glory for the best scores ever (top 10)
- **Weekly**: Medium-term competition that resets Monday-Sunday (top 10)
- **GOD Mode**: Elite leaderboard for the ultimate difficulty (top 10)

### 11. **Visual & Audio Feedback**
- **Combo Celebrations**: Special animated badges at 3x (✨ COMBO!), 5x (⚡ AMAZING!), and 10x (🔥 LEGENDARY!)
- **Timer Colors**: Green (>15s), Yellow (8-15s), Red (<8s) for visual urgency
- **Audio Pitch Variation**: Web Audio API generates dynamic sound effects where pitch increases with combo level
- **Game-End Emoji Reveal**: After time expires, the game shows both cards with golden pulsing circles highlighting the matching emoji on each card, helping players learn what they missed
- **Interactive Hover Effects**: Emojis glow blue and scale up 15% when you hover over them for better targeting
- **Selection Feedback**: Emojis glow green and bounce when clicked correctly, red shake when wrong

### 12. **Mobile-First Responsive Design**
- **Adaptive Layout**: Cards stack vertically on mobile (<768px width), side-by-side on desktop with automatic dimension detection
- **Responsive Card Sizing**: On mobile, cards automatically resize to fit screen width using `Math.min(canvasWidth - 40, 350)` ensuring emojis are always visible
- **Touch-Optimized**: Touch events work seamlessly with proper hit detection, touch-action manipulation, and preventDefault to avoid scrolling
- **60 FPS Canvas Rendering**: Smooth HTML5 Canvas rendering on both mobile and desktop devices using requestAnimationFrame
- **Viewport Optimization**: Meta viewport tag with `maximum-scale=1.0, user-scalable=no` prevents zooming and ensures consistent mobile experience
- **Dynamic Canvas Scaling**: Canvas dimensions update on window resize for seamless orientation changes

## 🎮 Game Features

### Core Gameplay
- **30-Second Sprint**: Fast-paced countdown timer with 3-2-1-GO! countdown animation that creates urgency and excitement
- **Two-Card System**: Each card displays 8-20 emojis (depending on difficulty) with exactly one matching emoji between them
- **Visual Variety**: Every emoji has random size (0.8x-2.5x) and rotation (0-360°) for unique challenges
- **Smart Positioning**: Physics-based emoji placement with 60px minimum spacing prevents overlaps
- **Moving Emojis**: Hard and GOD modes feature emojis that drift in smooth circular patterns at different speeds
- **Interactive Hover**: Emojis glow blue and scale up 15% when you hover over them for better targeting
- **Visual Timer Progress Bar**: Full-width color-coded progress bar shows remaining time at a glance

### Scoring & Progression
- **Base Points**: 25 points per correct match
- **Combo Multiplier**: Build streaks for bonus points using formula: (25 + (combo-1) × 10) × difficulty multiplier
  - Easy 1x combo: 25 points
  - Easy 5x combo: 65 points
  - GOD 5x combo: 195 points (3x multiplier)
- **Dynamic Time Bonuses**: Earn 3 + combo level seconds per match (4-13+ seconds)
- **Penalty System**: Wrong clicks cost 2 seconds and reset your combo

### Visual & Audio Feedback
- **Combo Celebrations**: Special animated badges at 3x (✨ COMBO!), 5x (⚡ AMAZING!), and 10x (🔥 LEGENDARY!) with bouncing animations
- **Selection Feedback**: Emojis glow green and bounce when clicked correctly, red shake when wrong
- **Audio System**: Web Audio API-powered sound effects with pitch variation based on combo level
- **Timer Colors**: Green (>15s), Yellow (8-15s), Red (<8s) for visual urgency cues with smooth color transitions
- **Visual Progress Bar**: Full-width timer bar with color-coded gradients and pulse animation when time is critical
- **Audio Warnings**: Ticking sound at 10 seconds, fast ticking in final 5 seconds
- **Game-End Highlight**: Golden pulsing glow reveals the matching emoji on both cards when time expires, helping players learn

### Reddit Integration
- **Custom Splash Screen**: Personalized entry screen with "Hey [username]! Think You're Fast Enough? 🔥" challenge message
- **Multi-Tier Leaderboards**: All-Time, Weekly, and GOD Mode leaderboards (top 10 each) with tab navigation
- **Automatic Username**: Your Reddit username appears automatically on leaderboards with no login required
- **Game Statistics**: Track rounds completed, accuracy percentage, highest combo, and total clicks
- **Redis Persistence**: Scores stored in Redis for reliable leaderboard tracking across all players
- **Rank Badges**: Special visual treatment for top 3 positions (🥇🥈🥉) with gradient backgrounds

### Mobile & Accessibility
- **Touch Optimized**: Responsive design with touch-friendly hit detection and touch-action manipulation
- **60 FPS Rendering**: Smooth HTML5 Canvas rendering on mobile and desktop with requestAnimationFrame
- **Responsive Layout**: Cards stack vertically on mobile (<768px), side-by-side on desktop with adaptive card sizing
- **Responsive Card Sizing**: On mobile, cards automatically resize to fit screen width (min 320px with 20px padding)
- **Error Handling**: Comprehensive error boundary with graceful fallbacks and detailed error messages
- **Settings Panel**: Toggle sound effects and music independently with persistent localStorage settings

## 🎨 Technical Innovation

### Canvas-Based Rendering
MojiMatcher uses HTML5 Canvas for high-performance emoji rendering with:
- **60 FPS animation loop** using requestAnimationFrame for smooth movement in Hard/GOD modes
- **Circular motion patterns** using `Math.sin(phase)` and `Math.cos(phase * 0.7)` with unique phase offsets for each emoji
- **Rotation transformations** applied via canvas context transforms using `ctx.rotate((rotation * Math.PI) / 180)`
- **Dynamic scaling** with hover effects (15% scale increase + 5% pulse) and selection animations (30% bounce)
- **Responsive canvas sizing** that adapts to mobile (vertical layout, 400x950) and desktop (horizontal layout, 800x500)
- **Movement offsets** calculated per emoji with radius of 10px (Hard) or 15px (GOD) for challenging gameplay

### Seeded Random Generation
The game uses a custom Linear Congruential Generator (LCG) for deterministic randomness:
- **Reproducible card generation** for testing and debugging using seed values
- **Consistent emoji distribution** across all difficulty levels with shuffle algorithm
- **Fair gameplay** with predictable randomness patterns using formula: `(a * seed + c) % m`
- **LCG parameters**: a=1664525, c=1013904223, m=2^32 for optimal randomness
- **Seed-based generation** enables future daily challenge features with date-based seeds

### Smart Collision Detection
Advanced emoji positioning system prevents overlaps:
- **60px minimum distance** between emoji centers using distance formula `sqrt(dx² + dy²)`
- **Size-aware hit detection** with scaled hit radius (30px base × emoji size) for accurate clicking
- **Physics-based placement** with up to 50 attempts to find non-overlapping positions using `getRandomPositionWithoutOverlap()`
- **Hover detection** that accounts for emoji rotation and scale with real-time distance calculations
- **Padding system**: 40px padding from card edges ensures emojis stay within visible bounds

### Audio System
Web Audio API implementation with dynamic sound generation:
- **Oscillator-based tones** (no audio files needed) using AudioContext
- **Pitch variation** based on combo level for progressive feedback (frequencies: 523Hz-1046Hz)
- **Multiple waveforms** (sine for success, sawtooth for errors, square for warnings) for different sound effects
- **Exponential gain ramping** using `exponentialRampToValueAtTime()` for smooth fade-outs
- **Persistent settings**: Audio preferences stored in localStorage as `mojimatcher:audio-settings`

### State Management
React hooks-based architecture:
- **useGameState**: Central game logic with combo calculations, score management, and difficulty handling
- **useTimer**: Countdown timer with tick callbacks, expiration handling, and audio warnings at 10s and 5s
- **useAchievements**: Achievement tracking and unlock detection (prepared for future use)
- **Separation of concerns** between game logic (hooks), rendering (Canvas), and UI (React components)
- **State persistence**: Game state includes screen, score, timer, combo, cards, and statistics

## 📖 How to Play

### Quick Start

1. **Find MojiMatcher** in a Reddit post - you'll see a custom splash screen with a personalized challenge message
2. **Click "🎮 I Accept the Challenge!"** button to launch the game in full-screen webview mode
3. **Choose a difficulty level** from the main menu (Easy, Medium, Hard, or GOD)
4. **Watch the 3-2-1-GO countdown** as the game starts with audio beeps
5. **Find the matching emoji** between two cards before time runs out
6. **Click/tap the matching emoji** on either card (works on both desktop and mobile)
7. **Build combos** for bonus points and time extensions
8. **Compete** on leaderboards with the Reddit community using your Reddit username

### Detailed Instructions

#### Step 0: Custom Splash Screen
When you first open MojiMatcher in a Reddit post, you'll see a custom splash screen with:

- **Personalized Message**: "Hey [your Reddit username]! Think You're Fast Enough? 🔥"
- **Challenge Text**: "Most players can't beat the top score. 😏 Can you handle the pressure? Let's see what you've got! 💪"
- **Launch Button**: "🎮 I Accept the Challenge!" button to start the game
- **Custom Background**: Eye-catching logo.png background that makes the post stand out in the Reddit feed

Click the **"🎮 I Accept the Challenge!"** button to launch the game in full-screen webview mode! The game opens in Devvit's webview where you can play without distractions. The splash screen is configured in `src/server/core/post.ts` using Devvit's `submitCustomPost()` API.

#### Step 1: Navigate the Main Menu
After launching the game, you'll see the main menu with four options:

1. **▶️ Play Game** (Primary Red Button)
   - Click to open difficulty selector modal
   - Choose from 4 difficulty levels (Easy, Medium, Hard, GOD)
   - Each difficulty shows emoji count and score multiplier
   - Start a game with randomly generated cards
   - Scores count toward All-Time and difficulty-specific leaderboards

2. **🏆 Leaderboard** (Blue Button)
   - View top scores across multiple timeframes
   - Three tabs: All-Time (top 10), Weekly (top 10), GOD Mode (top 10)
   - See where you rank against the community
   - Your entry highlighted with blue gradient background
   - Refresh button to fetch latest scores from Redis
   - Rank badges: 🥇 (1st), 🥈 (2nd), 🥉 (3rd), #4-10

3. **❓ How to Play** (Green Button)
   - Comprehensive instructions on game mechanics
   - Scoring system explanation with examples
   - Time management tips
   - Pro tips for improving your gameplay

4. **⚙️ Settings** (Gray Button)
   - Expandable settings panel
   - Toggle sound effects on/off (correct, wrong, combo sounds, timer warnings)
   - Toggle music on/off
   - Settings persist in browser localStorage as `mojimatcher:audio-settings`

**Visual Elements:**
- Large MojiMatcher logo at the top (logo.png, 320x320px)
- "Find the matching emoji!" tagline
- Gradient background (from-orange-50 to-orange-100)
- Animated entrance effects (fadeIn, slideDown, stagger) for all UI elements
- 3D pushable button styles with shadow and edge effects

#### Step 2: Choose Your Difficulty Level

When you click "Play Game", a difficulty selector modal appears with four options in a 2x2 grid:

**Easy Mode (8 emojis, 1x multiplier) - Green Button:**
- 8 stationary emojis per card
- Perfect for beginners learning the mechanics
- Base scoring with no multiplier
- Great for practicing pattern recognition
- Description: "Perfect for beginners"

**Medium Mode (12 emojis, 1.5x multiplier) - Blue Button:**
- 12 stationary emojis per card
- Balanced challenge for intermediate players
- 1.5x score multiplier on all points
- More visual complexity
- Description: "A balanced challenge"

**Hard Mode (16 emojis, 2x multiplier) - Orange Button:**
- 16 moving emojis per card
- Emojis drift smoothly in circular patterns at 0.8x speed
- 2x score multiplier on all points
- Requires tracking moving targets
- Description: "For experienced players"

**GOD Mode (20 emojis, 3x multiplier) - Purple Button:**
- 20 fast-moving emojis per card
- Faster movement speed (1.2x) than Hard mode
- 3x score multiplier on all points
- Ultimate challenge for expert players
- Separate GOD Mode leaderboard
- Description: "Ultimate challenge!"

Click your chosen difficulty to start the game! The modal closes and the game begins with a 3-2-1-GO countdown.

#### Step 3: Understanding the Game Screen

After the 3-2-1-GO countdown (with audio beeps at 800Hz, final GO at 1200Hz), the game begins. Here's what you'll see:

#### Top Bar (Game Stats)
Three white cards display your game statistics in a responsive grid:

- **Score (Left Card)**: Your current point total in large bold text (text-2xl)
  - Below score: Current combo multiplier (e.g., "5x" in orange-600)
  - Below combo: Difficulty name and multiplier (e.g., "GOD 3x" in gray-500)
- **Timer (Center Card)**: Countdown in seconds with color-coded background
  - **Green background** (>15s): Safe zone (bg-green-50, text-green-600)
  - **Yellow background** (8-15s): Caution (bg-yellow-50, text-yellow-600)
  - **Red background** (<8s): Danger zone (bg-red-50, text-red-600)
  - Timer text also changes color to match with smooth transitions (duration-300)
  - Audio warnings: Tick sound at 10s (440Hz), fast tick in final 5s (554Hz)
- **Rounds (Right Card)**: Number of rounds completed
  - Below rounds: Difficulty score multiplier (e.g., "3x")

**Visual Timer Progress Bar:**
- Full-width progress bar below the stat cards shows remaining time visually
- Color-coded to match timer state (green/yellow/red gradient)
- Smooth 1-second transitions as time decreases
- Pulses when timer drops below 5 seconds for urgency
- Width represents percentage of time remaining (0-100%)

**Controls:**
- **Audio Controls**: Volume (🔊) and music (🎵) toggle buttons in top right corner (w-10 h-10 rounded buttons)
- **Back Button**: Return to menu (top left with arrow icon and "Back" text)

#### Main Play Area
Two white cards with dashed borders display the emojis on HTML5 Canvas:

- **Layout**: Side-by-side on desktop (800x500 canvas), stacked vertically on mobile (400x950 canvas)
- **Card dimensions**: 350x450px on desktop, responsive width on mobile (min 320px with 20px padding)
- **8-20 emojis per card** depending on difficulty (16-40 total visible)
- **Random sizes**: Emojis range from tiny (0.8x) to huge (2.5x) scale using `getRandomSize()`
- **Random rotations**: Emojis can be upside-down, sideways, or at any angle (0-360°) using `getRandomRotation()`
- **Smart spacing**: Emojis positioned to avoid overlaps (60px minimum distance between centers) using `checkOverlap()`
- **Moving emojis** (Hard/GOD modes): Emojis drift in smooth circular patterns using `Math.sin(phase)` and `Math.cos(phase * 0.7)`
  - Hard mode: 10px radius, 0.8x speed
  - GOD mode: 15px radius, 1.2x speed
- **HTML5 Canvas rendering**: Smooth 60 FPS rendering using requestAnimationFrame with responsive scaling for mobile
- **Interactive hover**: Emojis glow blue (rgba(59, 130, 246, 0.8)) and scale up 15% + 5% pulse when you hover over them
- **Selection feedback**: Emojis glow green (rgba(34, 197, 94, 0.9)) and bounce 30% when clicked correctly, red shake when wrong

#### Special Indicators
- **Combo Badge** (appears at 3x+): Floating animated badge at top center with bounceIn animation
  - 3x: ✨ COMBO! (from-blue-400 to-cyan-400 gradient, text-2xl, bouncing animation)
  - 5x: ⚡ AMAZING! (from-orange-400 to-red-400 gradient, text-2xl, bouncing animation)
  - 10x: 🔥 LEGENDARY! (from-purple-400 to-pink-400 gradient, text-3xl, bouncing animation)
  - Badge includes emoji icon, text, and combo count (e.g., "10x COMBO!")

#### Step 4: The Core Challenge

**Your Mission:**
Find the **ONE emoji that appears on BOTH cards** and click/tap it before time runs out.

**The Difficulty:**
- Emojis have random sizes and rotations, making the same emoji look completely different on each card
- A 🎯 might appear tiny and upside-down on the left card, then huge and sideways on the right card
- In Hard/GOD modes, emojis are constantly moving in circular patterns at different speeds
- You must recognize the emoji by its shape and pattern, not by size or orientation
- Visual chaos increases difficulty - no two rounds look the same
- 30 unique emojis in the pool (😀, 🎉, 🚀, ⭐, 🎮, 🎯, etc.) ensure variety across games

**The Strategy:**
- **Scan systematically**: Develop a pattern (left-to-right, top-to-bottom)
- **Look for distinctive shapes**: Unique emojis like 🚀 or ⭐ are easier to spot
- **Use hover effects**: Hover over emojis to see them glow and scale up 15%
- **Track movement** (Hard/GOD): Anticipate where moving emojis will be
- **Build combos carefully**: Higher combos are valuable but risky to maintain
- **Manage your time**: Balance speed with accuracy
- **Watch the progress bar**: Visual timer bar shows remaining time with color coding

#### Step 5: Scoring System Explained

**Correct Match Rewards**
When you click the matching emoji, you receive:

1. **Base Points**: 25 points (always)
2. **Combo Bonus**: (combo - 1) × 10 additional points
3. **Difficulty Multiplier**: Points multiplied by difficulty (1x, 1.5x, 2x, or 3x)
4. **Time Bonus**: 3 + combo level seconds added to timer

**Scoring Formula:** `(25 + (combo - 1) × 10) × difficulty multiplier`

**Example Calculations:**
- Easy 1x combo: (25 + 0) × 1 = 25 points
- Easy 5x combo: (25 + 40) × 1 = 65 points
- GOD 5x combo: (25 + 40) × 3 = 195 points

**Scoring Examples**

| Combo Level | Points Earned | Time Added | Visual Feedback | Total Benefit |
|-------------|--------------|------------|-----------------|---------------|
| 1x          | 25 points    | +4 seconds | Green flash     | First match   |
| 2x          | 35 points    | +5 seconds | Green flash     | Building up   |
| 3x          | 45 points    | +6 seconds | ✨ COMBO!       | Combo starts  |
| 5x          | 65 points    | +8 seconds | ⚡ AMAZING!     | Hot streak    |
| 10x         | 115 points   | +13 seconds| 🔥 LEGENDARY!   | Maximum bonus |
| 15x         | 165 points   | +18 seconds| 🔥 LEGENDARY!   | Elite level   |
| 20x         | 215 points   | +23 seconds| 🔥 LEGENDARY!   | Master level  |

**Wrong Click Penalties**

When you click the wrong emoji:

- **Time Penalty**: -2 seconds from timer (increased from -1s for higher difficulty)
- **Combo Reset**: Your combo drops back to 0x (lose all multiplier progress)
- **No Points Lost**: Your score stays the same (you don't lose points)
- **Visual Feedback**: Red shake animation
- **Audio Feedback**: Buzzer sound

**The Real Cost:** At 10x combo, a wrong click costs you:
- 2 seconds immediately
- Future 13-second time bonuses (vs 4-second bonuses at 1x)
- 90+ points per match (vs 25 base points)
- The psychological momentum of your streak

### Complete Game Flow

#### 1. Main Menu (Game Hub)
**Four main options:**

**▶️ Play Game** (Primary)
- Large red button to start playing
- Opens difficulty selector modal
- Choose from Easy, Medium, Hard, or GOD mode
- Click to begin game selection

**🏆 Leaderboard**
- Blue button to view rankings
- Access All-Time, Weekly, and GOD Mode leaderboards
- Click to view community scores

**❓ How to Play**
- Green button for instructions
- Comprehensive gameplay guide
- Scoring and time management tips
- Click to learn the game

**⚙️ Settings**
- Gray button that expands settings panel
- Toggle sound effects on/off
- Toggle music on/off
- Settings persist in browser storage

**Visual Elements:**
- Large MojiMatcher logo at top
- "Find the matching emoji!" tagline
- Gradient background (orange-50 to orange-100)

#### 2. Active Gameplay
**Screen Layout:**
- **Top Bar**: Score (left), Timer (center), Rounds (right), Audio controls (top right), Back button (top left)
- **Combo Badge** (appears at 3x+): Floating badge showing combo level
- **Two Cards**: Side-by-side white cards (or vertical on mobile) with 8-20 emojis each
- **Canvas Rendering**: Smooth 60 FPS HTML5 Canvas with responsive scaling

**Gameplay Loop:**
1. 3-2-1-GO countdown appears with beep sounds
2. Cards appear with emojis (random sizes, rotations, and positions)
3. In Hard/GOD modes, emojis begin drifting in circular patterns
4. Timer starts counting down from 30 seconds
5. You scan both cards looking for the matching emoji
6. Hover over emojis to see them glow and scale up
7. Click/tap the matching emoji on either card
8. **If correct:**
   - Green glow effect on emoji
   - Score increases (25 base + combo bonus × difficulty multiplier)
   - Timer increases (4-13+ seconds based on combo)
   - Combo increases by 1
   - New cards generate instantly
   - Success sound plays (pitch increases with combo)
9. **If wrong:**
   - Red glow effect on emoji
   - Timer decreases by 2 seconds
   - Combo resets to 0
   - Buzzer sound plays
   - Same cards remain (try again)
10. Repeat until timer reaches 0

**Visual Feedback:**
- **Combo Celebrations:**
  - 3x: ✨ COMBO! (blue gradient badge, bouncing)
  - 5x: ⚡ AMAZING! (orange-red gradient badge, bouncing)
  - 10x: 🔥 LEGENDARY! (purple-pink gradient badge, bouncing)
- **Timer Colors:**
  - Green (>15s): Safe, plenty of time
  - Yellow (8-15s): Caution, time running low
  - Red (<8s): Danger, urgent
- **Audio Warnings:**
  - Tick sound at 10 seconds remaining
  - Fast tick sound in last 5 seconds
- **Hover Effects:**
  - Emojis glow blue when hovered
  - Emojis scale up 15% when hovered
  - Smooth transitions for better targeting

#### 3. Game Over Sequence
**Phase 1: Emoji Highlight Screen**
- Game freezes with current cards visible on screen
- "Time's Up!" header appears at top (text-4xl, font-bold, animate-bounceIn)
- "The matching emoji was:" text with large emoji display (text-6xl size, animate-pulse)
- Golden glowing circles appear around matching emoji on both cards with pulsing animation
- Pulsing effect: opacity cycles between 0.6 and 1.0 using `Math.sin(Date.now() * 0.003)` with 30px shadow blur
- Canvas highlights the matching emoji with golden glow (rgba(255, 215, 0, 1)) to help you learn
- "📊 See Results" button appears at bottom (pushable btn-primary with BarChart3 icon)
- This educational moment helps you understand what you missed and improve your pattern recognition
- Click button to proceed to detailed results (sets `showResults: true` in game state)
- Game over buzzer sound plays when time expires (200Hz sawtooth + 150Hz square oscillators)

**Phase 2: Game Over Screen**
- Header: "Time's Up!" with "Game Over" subtitle
- **Large Score Display**: Final score in red (#d93900) at text-6xl size (e.g., "1,250")
- **Statistics Grid** (4 boxes in 2x2 layout with gray-50 backgrounds):
  - Rounds completed
  - Accuracy percentage (correct clicks / total clicks × 100)
  - Best combo achieved during game
  - Total clicks (correct + wrong)
- **Action Buttons:**
  - "🔄 Play Again" (large red pushable 3D button) - Restart immediately in same difficulty
  - "🏠 Back to Menu" (gray pushable 3D button) - Return to main menu
- **Score saved automatically** to appropriate leaderboards (All-Time, Weekly, and/or GOD Mode) via Redis
- Scores are tied to your Reddit username for seamless leaderboard integration

#### 4. Leaderboard Screen
**Tab Navigation:**
- Three tabs at top: All-Time | Weekly | GOD Mode
- Active tab highlighted in blue with white text
- Inactive tabs have gray background with hover effect
- Click tabs to switch views (data fetched from Redis)

**All-Time Tab:**
- Top 10 scores ever recorded (fetched from Redis sorted set)
- Rank badges: 🥇 (1st - yellow), 🥈 (2nd - gray), 🥉 (3rd - orange), #4-10 (gray text)
- Each entry shows:
  - Rank badge (2xl size, bold)
  - Score (xl size, bold, gray-900)
  - Username (Reddit username from context)
  - Rounds completed
  - Date achieved (formatted as locale date string)
- Your entry highlighted with blue gradient background (from-blue-100 to-blue-50)
- 1st place gets special yellow gradient background (from-yellow-100 to-yellow-50)
- Refresh button (🔄) to fetch latest scores
- Empty state: "No scores yet! Be the first to set a record."
- Fallback to localStorage if server fails

**Weekly Tab:**
- Top 10 scores from current week (Monday-Sunday UTC)
- Week calculated using ISO week format (YYYY-Www)
- Same format as All-Time
- Shows "This Week's Top 10" header
- Fetched from `mojimatcher:weekly:leaderboard:{week}` Redis key
- Resets every Monday at UTC midnight

**GOD Mode Tab:**
- Top 10 scores from GOD difficulty only
- Same format as All-Time
- Shows "GOD Mode Top 10" header
- Fetched from `mojimatcher:god:leaderboard` Redis key
- Only includes scores from GOD difficulty games

**Bottom Section:**
- "← Back to Menu" button (gray bg-gray-200, hover:bg-gray-300)

#### 5. How to Play Screen
**Accessed from Main Menu:**
- Click "❓ How to Play" button from main menu
- Comprehensive instructions screen with sections:

**The Goal:**
- Find the ONE emoji that appears on both cards
- Clear explanation of the core objective

**Scoring:**
- Correct match: +25 base points
- Combo bonus: Build combos for extra points
- Wrong click: Combo resets to 0

**Time Management:**
- Correct match: +3 to +13 seconds (combo bonus)
- Wrong click: -2 seconds
- Higher combos = More time added

**Pro Tips:**
- Scan both cards quickly
- Build combos to maximize score and time
- Don't rush - wrong clicks cost time
- Watch timer color changes
- Difficulty-specific strategies

**Bottom Section:**
- "← Back to Menu" button to return

### Pro Tips & Strategy Guide

#### For Beginners (0-500 points)

**Getting Started:**
- **Take your time** on the first few matches to build confidence
- **Look for distinctive emojis first**: Unique shapes like 🚀, ⭐, 💎, or 🎯 are easier to spot
- **Don't panic** when the timer turns yellow - you still have 8-15 seconds
- **Focus on accuracy over speed** initially - wrong clicks cost 2 seconds AND reset your combo
- **Develop a scanning pattern**: Try left-to-right, top-to-bottom on both cards

**Common Beginner Mistakes:**
- Clicking too fast without verifying
- Ignoring the combo system (it's crucial for time management)
- Not recognizing that size/rotation don't matter - only the emoji shape matters
- Giving up when timer turns red (you can still recover with correct matches)

#### For Intermediate Players (500-1,000 points)

**Building Skills:**
- **Develop a systematic scanning pattern**: Stick to left-to-right, top-to-bottom consistently
- **Build combos to 3x-5x**: This is the sweet spot for significant time extensions (6-8 seconds per match)
- **Balance speed with accuracy**: Wrong clicks are very costly at this level
- **Learn to recognize emoji shapes** even when rotated or scaled
- **Use the 30-emoji pool**: Start memorizing common emojis to speed up recognition

**Intermediate Strategy:**
- Aim for 10-15 rounds per game
- Maintain 3x-5x combo consistently
- Keep timer in green/yellow zone
- Practice recognizing emojis at different sizes and rotations

#### For Advanced Players (1,000-2,000 points)

**Mastering the Game:**
- **Protect high combos (10x+)** by taking an extra moment to verify before clicking
- **At 10x combo, you get 13 seconds per match** - use this to extend games indefinitely
- **Use peripheral vision** to scan both cards simultaneously
- **Memorize the 30-emoji pool** to quickly eliminate non-matches
- **Recognize patterns**: Some emoji combinations appear more frequently

**Advanced Techniques:**
- **Quick elimination**: Scan for emojis that only appear once across both cards
- **Shape recognition**: Focus on emoji outlines rather than details
- **Combo protection**: At 8x+, take 1-2 extra seconds to verify - it's worth it
- **Time banking**: Build up 20-30 seconds of buffer time at high combos

#### Time Management Strategy

**Green Timer (>15 seconds):**
- Safe zone - focus on building combos steadily
- Take your time to ensure accuracy
- Aim to reach 5x combo before timer turns yellow
- Build a time buffer for later rounds

**Yellow Timer (8-15 seconds):**
- Caution zone - maintain your combo but stay alert
- Balance speed with accuracy
- Don't panic - you have enough time for 2-3 matches
- Focus on protecting your combo

**Red Timer (<8 seconds):**
- Danger zone - prioritize speed, but don't panic-click
- If you have a high combo (5x+), one correct match gives you 8+ seconds
- Better to take 2 seconds to verify than lose 2 seconds on a wrong click
- Stay calm - red timer doesn't mean game over

#### Combo Strategy by Level

**1x-2x Combo (Building Foundation):**
- Don't rush - take 3-4 seconds per match
- Focus on accuracy to build combo
- Time bonus: 4-5 seconds per match
- Points: 25-35 per match

**3x-5x Combo (Sweet Spot):**
- Maintain steady pace - 2-3 seconds per match
- This is the most sustainable combo range
- Time bonus: 6-8 seconds per match
- Points: 45-65 per match
- Visual feedback: ✨ COMBO! or ⚡ AMAZING!

**6x-9x Combo (High Risk, High Reward):**
- Be careful - combos are valuable here
- Take an extra moment to verify
- Time bonus: 9-12 seconds per match
- Points: 75-105 per match
- One wrong click costs 90+ points per future match

**10x+ Combo (Maximum Bonus):**
- **Protect this at all costs**
- Take 2-3 seconds to verify each match
- Time bonus: 13+ seconds per match
- Points: 115+ per match
- Visual feedback: 🔥 LEGENDARY!
- At this level, you can extend games indefinitely

#### Daily Challenge Strategy

**Competitive Play:**
- **Everyone gets the same puzzle** - compare strategies in Reddit comments
- **Your best score counts** - you can replay to improve
- **Build your streak** by playing every day for bonus achievements
- **Check the leaderboard** to see how you rank against the community
- **Learn from others**: If someone scored higher, ask about their strategy

**Streak Building:**
- Play at the same time each day to build a habit
- Even a quick 1-minute game counts for your streak
- Streaks unlock participation achievements (3, 7, 30 days)
- Missing one day resets your streak to 0

#### Advanced Recognition Techniques

**Shape-Based Recognition:**
- Focus on emoji **silhouettes** rather than details
- Ignore size and rotation - train your brain to see the core shape
- Group emojis by category: faces, objects, symbols, animals

**Quick Elimination:**
- Scan for emojis that appear only once across both cards
- Eliminate obvious non-matches first
- Narrow down to 2-3 candidates, then verify

**Peripheral Vision Training:**
- Try to see both cards at once without moving your eyes
- Use your peripheral vision to spot distinctive shapes
- This takes practice but significantly speeds up recognition

**Pattern Recognition:**
- Some emoji combinations appear more frequently
- Learn which emojis are in the 30-emoji pool
- Quickly eliminate emojis not in the pool

#### Psychological Tips

**Stay Calm Under Pressure:**
- Red timer doesn't mean game over - one match can give you 8+ seconds
- Panic clicking leads to wrong clicks and combo resets
- Take a deep breath when timer turns red

**Embrace Failure:**
- Every wrong click is a learning opportunity
- Analyze what went wrong: Did you rush? Misidentify the emoji?
- Don't get tilted - stay focused on the next match

**Celebrate Wins:**
- Enjoy the combo celebrations (✨ ⚡ 🔥)
- Share your high scores in Reddit comments
- Compete with friends on the leaderboards

**"One More Game" Mentality:**
- Games are short (30-90 seconds) - perfect for quick sessions
- Each game is a fresh start
- Your next game could be your personal best

### Controls & Input

#### Desktop Controls
- **Mouse Click**: Click on any emoji to select it
- **Menu Navigation**: Click buttons to navigate between screens
- **Hover Effects**: Buttons show visual feedback when hovering
- **Cursor**: Standard pointer cursor over clickable elements

#### Mobile Controls
- **Tap**: Tap any emoji to select it
- **Touch-Friendly Hit Areas**: 60px minimum touch targets for easy tapping
- **No Accidental Scrolling**: Game prevents scrolling during gameplay
- **Touch Action**: Optimized for immediate response (no 300ms delay)
- **Responsive Layout**: UI scales to fit mobile screens
- **Portrait & Landscape**: Works in both orientations

#### Settings & Preferences
- **Sound Effects Toggle**: Turn game sounds on/off
  - Includes: correct match, wrong click, combo sounds, timer warnings
- **Music Toggle**: Turn background music on/off (when implemented)
- **Settings Persistence**: Your preferences save automatically in browser localStorage
- **Audio System**: Web Audio API generates tones dynamically (no external audio files)
- **Cross-Device**: Settings sync per browser (not across devices)

#### Accessibility Features
- **Large Touch Targets**: 60px minimum for easy clicking/tapping
- **Color-Coded Timer**: Visual feedback through color changes (green/yellow/red)
- **Audio Warnings**: Sound cues at 10 seconds and 5 seconds remaining
- **High Contrast**: White cards on colored backgrounds for visibility
- **Error Boundary**: Graceful error handling with recovery options

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
  - `useGameState`: Central game state with combo logic and difficulty modes
  - `useTimer`: Countdown timer with audio warnings
  - `useAchievements`: Achievement tracking and unlocking
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

## 🛠️ Technical Stack

### Frontend
- **React 18**: Component-based UI with hooks (useState, useCallback, useEffect)
- **TypeScript**: Strict type checking throughout
- **HTML5 Canvas**: 800x500px canvas for game rendering at 60 FPS
- **Tailwind CSS**: Utility-first styling via index.css
- **Vite**: Fast build tool with hot module replacement
- **Web Audio API**: OscillatorNode for dynamic sound generation with pitch variation

### Backend
- **Express.js**: RESTful API server with TypeScript
- **Devvit SDK**: Reddit platform integration (@devvit/web/server)
- **Redis**: Data persistence for leaderboards, stats, achievements, and streaks
- **Node.js 22.2.0+**: Server runtime

### Key Libraries & Tools
- **React Error Boundary**: Graceful error handling with recovery UI
- **Vitest**: Unit testing framework for card generation and seeded RNG
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

### Architecture Patterns
- **Monorepo**: Client, server, and shared code in single repository
- **Custom Hooks**: useGameState, useTimer, useAchievements
- **Canvas Rendering**: Efficient emoji rendering with transformations (rotation, scale)
- **Difficulty Modes**: 4 difficulty levels with different emoji counts and score multipliers
- **Redis Data Structures**: Sorted sets for leaderboards, hashes for stats, sets for achievements

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
