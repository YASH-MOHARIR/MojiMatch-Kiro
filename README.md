# 🎮 MojiMatcher

A lightning-fast emoji matching game built for Reddit using Devvit. Race against the clock to find the one emoji that appears on both cards in this addictive pattern-recognition challenge!

> **Quick Summary:** Find the matching emoji between two cards before time runs out! Each card shows 8-20 emojis (depending on difficulty) with random sizes and rotations. Build combos for bonus points and time extensions. Choose from 4 difficulty levels (Easy, Medium, Hard, GOD). Compete on multiple leaderboards (All-Time, Weekly, GOD Mode) with the Reddit community. Built with React, TypeScript, HTML5 Canvas, and Redis.

**Play directly on Reddit** - MojiMatcher runs natively in Reddit posts using Devvit's webview technology. The game appears in your Reddit feed with a custom animated splash screen featuring the top player's score. Click anywhere on the splash screen to launch the full-screen game experience and start playing!

## 🎯 What is MojiMatcher?

MojiMatcher is a fast-paced visual puzzle game where players must quickly identify the single matching emoji between two cards. With only 30 seconds on the clock, players race to complete as many rounds as possible while building combos for massive point bonuses and time extensions.

**The Challenge:** Each card displays 8-20 emojis (depending on difficulty) selected from a pool of 60 unique emojis across 5 categories:
- **Faces** (20 emojis): 😀 😎 🥳 😍 🤩 😜 🤪 😇 🥰 🤗 😂 🤣 😊 😋 😌 😏 🤓 🥸 🤠 🥶
- **Party & Celebration** (10 emojis): 🎉 🎈 🎁 🎊 🎆 🎇 ✨ 🎀 🎗️ 🏆
- **Games & Entertainment** (20 emojis): 🎮 🎯 🎨 🎭 🎪 🎸 🎺 🎻 🎹 🎲 🃏 🎰 🎳 🎬 🎤 🎧 🎼 🎵 🎶 🎙️
- **Sports** (10 emojis): ⚽ 🏀 🎾 🏈 ⚾ 🥎 🏐 🏉 🎱 🏓
- **Space & Nature** (10 emojis): 🚀 ⭐ 🌟 💫 ✨ 🌙 ☀️ 🌈 ⚡ 🔥

Every emoji has **random sizes (0.7x-2.8x)** and **rotations (0-360°)**, making the same emoji look completely different on each card. You must use pattern recognition skills to spot the one matching emoji before time runs out. Every correct match generates new cards with fresh challenges, while wrong clicks cost precious seconds and reset your combo multiplier.

**The Goal:** Build the highest combo streak possible to maximize your score and earn time bonuses. The longer your combo, the more time you earn per match (4-13+ seconds), creating a snowball effect where skilled players can extend their games significantly. Compete on multiple leaderboards (All-Time, Weekly, GOD Mode) as you master the game.

**Built for Reddit:** MojiMatcher is a native Reddit app that runs directly in Reddit posts using Devvit's webview technology. Players can compete with the Reddit community on leaderboards, with scores automatically tied to their Reddit usernames for seamless social gaming. The game features a custom animated splash screen with the top player's score that appears in the Reddit feed, inviting users to click and play in full-screen mode.

## 🎯 What is MojiMatcher?

MojiMatcher is a fast-paced visual puzzle game where players must quickly identify the single matching emoji between two cards. With only 30 seconds on the clock, players race to complete as many rounds as possible while building combos for massive point bonuses and time extensions.

**The Challenge:** Each card displays 8-20 emojis (depending on difficulty) selected from a pool of 60 unique emojis across 5 categories:
- **Faces** (20 emojis): 😀 😎 🥳 😍 🤩 😜 🤪 😇 🥰 🤗 😂 🤣 😊 😋 😌 😏 🤓 🥸 🤠 🥶
- **Party & Celebration** (10 emojis): 🎉 🎈 🎁 🎊 🎆 🎇 ✨ 🎀 🎗️ 🏆
- **Games & Entertainment** (20 emojis): 🎮 🎯 🎨 🎭 🎪 🎸 🎺 🎻 🎹 🎲 🃏 🎰 🎳 🎬 🎤 🎧 🎼 🎵 🎶 🎙️
- **Sports** (10 emojis): ⚽ 🏀 🎾 🏈 ⚾ 🥎 🏐 🏉 🎱 🏓
- **Space & Nature** (10 emojis): 🚀 ⭐ 🌟 💫 ✨ 🌙 ☀️ 🌈 ⚡ 🔥

Every emoji has random sizes (0.7x-2.8x) and rotations (0-360°), making the same emoji look completely different on each card. You must use pattern recognition skills to spot the one matching emoji before time runs out. Every correct match generates new cards with fresh challenges, while wrong clicks cost precious seconds and reset your combo multiplier.

**The Goal:** Build the highest combo streak possible to maximize your score and earn time bonuses. The longer your combo, the more time you earn per match (4-13+ seconds), creating a snowball effect where skilled players can extend their games significantly. Compete on multiple leaderboards (All-Time, Weekly, GOD Mode) as you master the game.

**Built for Reddit:** MojiMatcher is a native Reddit app that runs directly in Reddit posts using Devvit's webview technology. Players can compete with the Reddit community on leaderboards, with scores automatically tied to their Reddit usernames for seamless social gaming. The game features a custom animated splash screen (splash-background.gif) with the app logo (logo.png) that appears in the Reddit feed, inviting users to click anywhere on the splash to launch the game in full-screen mode.

**What Makes It Unique:** MojiMatcher combines fast-paced pattern recognition with strategic combo building. The game uses 60 unique emojis with weighted randomization (0.7x-2.8x sizes, smart rotation system) and advanced spatial positioning algorithms to prevent overlaps. Moving emojis in Hard/GOD modes add a dynamic challenge, while the escalating combo system (4-13+ second time bonuses) creates a snowball effect where skilled players can extend 30-second games indefinitely. Built with React, TypeScript, and HTML5 Canvas, the game runs at 60 FPS with procedurally generated Web Audio API sounds and a satisfying button click sound effect (btn-click.mp3).

## 🎯 What is MojiMatcher?

MojiMatcher is a fast-paced visual puzzle game where players must quickly identify the single matching emoji between two cards. With only 30 seconds on the clock, players race to complete as many rounds as possible while building combos for massive point bonuses and time extensions.

### The Challenge

Each card displays **8-20 emojis** (depending on difficulty) selected from a pool of **60 unique emojis** across 5 categories:
- **Faces** (20): 😀 😎 🥳 😍 🤩 😜 🤪 😇 🥰 🤗 😂 🤣 😊 😋 😌 😏 🤓 🥸 🤠 🥶
- **Party & Celebration** (10): 🎉 🎈 🎁 🎊 🎆 🎇 ✨ 🎀 🎗️ 🏆
- **Games & Entertainment** (20): 🎮 🎯 🎨 🎭 🎪 🎸 🎺 🎻 🎹 🎲 🃏 🎰 🎳 🎬 🎤 🎧 🎼 🎵 🎶 🎙️
- **Sports** (10): ⚽ 🏀 🎾 🏈 ⚾ 🥎 🏐 🏉 🎱 🏓
- **Space & Nature** (10): 🚀 ⭐ 🌟 💫 ✨ 🌙 ☀️ 🌈 ⚡ 🔥

Every emoji has **random sizes (0.7x-2.8x)** and **rotations (0-360°)**, making the same emoji look completely different on each card. You must use pattern recognition skills to spot the one matching emoji before time runs out. Every correct match generates new cards with fresh challenges, while wrong clicks cost precious seconds and reset your combo multiplier.

### The Goal

Build the highest combo streak possible to maximize your score and earn time bonuses. The longer your combo, the more time you earn per match (4-13+ seconds), creating a snowball effect where skilled players can extend their games significantly. Compete on multiple leaderboards (All-Time, Weekly, GOD Mode) as you master the game.

### Built for Reddit

MojiMatcher is a native Reddit app that runs directly in Reddit posts using Devvit's webview technology. Players can compete with the Reddit community on leaderboards, with scores automatically tied to their Reddit usernames for seamless social gaming. The game features a custom animated splash screen with the top player's score that appears in the Reddit feed, inviting users to click and play in full-screen mode.

## 🎯 Game Overview

MojiMatcher is a fast-paced visual puzzle game where players race against a 30-second timer to identify matching emojis between two cards. Each card displays 8-20 emojis (depending on difficulty) selected from a pool of 60 unique emojis across 5 categories, with randomized sizes (0.7x-2.8x) and rotations (0-360°), creating a unique visual challenge every round. The game features a sophisticated combo system that rewards consecutive correct matches with escalating points and time bonuses, allowing skilled players to extend their games indefinitely.

The game is built as a native Reddit app using Devvit's platform, featuring seamless Reddit username integration, Redis-backed leaderboards, and a custom animated splash screen that appears in the Reddit feed. Players can compete across three leaderboard types (All-Time, Weekly, GOD Mode) and choose from four difficulty levels, each with unique mechanics including moving emojis in Hard and GOD modes. The game uses React, TypeScript, HTML5 Canvas for rendering, and Web Audio API for procedural sound generation.

## 🌟 What Makes MojiMatcher Innovative

MojiMatcher stands out from traditional matching games through several unique design choices that create a genuinely challenging and addictive experience:

### 1. **Progressive Difficulty System with Moving Emojis**
Unlike static matching games, MojiMatcher offers four distinct difficulty levels that fundamentally change the gameplay:
- **Easy Mode**: 8 stationary emojis selected from a 60-emoji pool for learning the mechanics
- **Medium Mode**: 12 stationary emojis with 1.5x score multiplier
- **Hard Mode**: 16 emojis that drift smoothly across the cards in circular patterns at moderate speed (0.8x movement)
- **GOD Mode**: 20 fast-moving emojis with 3x score multiplier for the ultimate challenge (1.2x movement speed)

The moving emoji mechanic in Hard and GOD modes adds a dynamic layer of difficulty, requiring players to track targets while they drift in smooth circular patterns. Each emoji moves at a different phase and speed using sine/cosine functions (`Math.sin(phase)` and `Math.cos(phase * 0.7)`) with unique phase offsets, creating a mesmerizing yet challenging visual experience that tests both pattern recognition and hand-eye coordination. The animation runs at 60 FPS using requestAnimationFrame for smooth movement with 10px radius (Hard) or 15px radius (GOD).

### 2. **Dynamic Visual Chaos with 60 Unique Emojis**
Every emoji is selected from a pool of 60 unique emojis across 5 categories:
- **Faces** (20 emojis): 😀 😎 🥳 😍 🤩 😜 🤪 😇 🥰 🤗 😂 🤣 😊 😋 😌 😏 🤓 🥸 🤠 🥶
- **Party & Celebration** (10 emojis): 🎉 🎈 🎁 🎊 🎆 🎇 ✨ 🎀 🎗️ 🏆
- **Games & Entertainment** (20 emojis): 🎮 🎯 🎨 🎭 🎪 🎸 🎺 🎻 🎹 🎲 🃏 🎰 🎳 🎬 🎤 🎧 🎼 🎵 🎶 🎙️
- **Sports** (10 emojis): ⚽ 🏀 🎾 🏈 ⚾ 🥎 🏐 🏉 🎱 🏓
- **Space & Nature** (10 emojis): 🚀 ⭐ 🌟 💫 ✨ 🌙 ☀️ 🌈 ⚡ 🔥

Each emoji has random size (0.7x-2.8x) and rotation (0-360°), making pattern recognition genuinely challenging. The same emoji might appear tiny and upside-down on one card, then huge and sideways on the other. This prevents memorization strategies and keeps every round fresh with maximum variety.

### 3. **Escalating Combo System with Time Rewards**
The combo system doesn't just increase points - it also increases time bonuses using the formula: **3 + combo level seconds**. This creates a snowball effect:
- 1x combo: +4 seconds
- 5x combo: +8 seconds  
- 10x combo: +13 seconds

Skilled players can extend their games indefinitely by maintaining high combos, turning a 30-second sprint into a marathon.

### 4. **High-Stakes Risk-Reward Balance**
Wrong clicks cost **2 seconds AND reset your combo**, making every decision meaningful. At 10x combo, a wrong click doesn't just cost 2 seconds - it costs the potential for 13-second time bonuses. This creates intense pressure as combos build.

### 5. **Advanced Emoji Positioning System**
Sophisticated algorithms ensure emojis never overlap:
- **Spatial Grid Partitioning**: O(1) collision detection using 80px grid cells instead of O(n²) brute force
- **Progressive Relaxation**: Three-phase placement strategy (100% → 85% → 70% distance requirements)
- **Poisson Disk Sampling**: Fallback algorithm guarantees non-overlapping placement even with 20 emojis
- **Dynamic Padding**: Adjusts based on emoji count (40px → 30px → 25px)
- **Size-Aware Collision**: Calculates actual visual radius accounting for scale factor

### 6. **Canvas-Based Rendering with Interactive Feedback**
High-performance HTML5 Canvas rendering with:
- **60 FPS Animation**: Smooth movement in Hard/GOD modes using requestAnimationFrame
- **Interactive Hover**: Emojis glow blue (rgba(59, 130, 246, 0.8)) and scale up 15% + 5% pulse when hovered
- **Selection Feedback**: Green glow and 30% bounce for correct, red shake for wrong
- **Game-End Highlight**: Golden pulsing glow (opacity 0.6-1.0) reveals matching emoji on both cards
- **Circular Motion**: Emojis move using `Math.sin(phase)` and `Math.cos(phase * 0.7)` with unique offsets

### 7. **Multi-Tier Competition**
Three separate leaderboards create multiple ways to compete:
- **All-Time**: Eternal glory for the best scores ever (top 10)
- **Weekly**: Medium-term competition that resets Monday-Sunday (top 10)
- **GOD Mode**: Elite leaderboard for the ultimate difficulty (top 10)

### 8. **Reddit-Native Experience**
Built specifically for Reddit with seamless integration:
- **Automatic Username**: No login required, uses Reddit authentication via Devvit's Reddit API
- **Redis Persistence**: Sorted sets for efficient leaderboard queries with sub-100ms response times
- **Custom Splash Screen**: Animated background (splash-background.gif) with app icon (logo.png) and live top player showcase
- **Full-Screen Gameplay**: Launches from Reddit feed into immersive experience with click-anywhere activation
- **Post Title**: "🎮 MojiMatch - Most Players can't make it past 4 rounds, No one Dares to open GOD mode..can you?"

### 9. **Procedural Audio System**
Web Audio API-powered sound effects without external audio files:
- **Oscillator-Based Tones**: Dynamic sound generation using AudioContext
- **Pitch Variation**: Frequencies increase with combo level (523Hz-1046Hz) for progressive feedback
- **Multiple Waveforms**: Sine for success, sawtooth for errors, square for warnings
- **Button Click Sound**: MP3 audio file (btn-click.mp3) plays on all button interactions at 50% volume
- **Persistent Settings**: Audio preferences stored in localStorage

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
- **Audio Feedback**: Web Audio API-powered sound effects with pitch variation based on combo level, plus MP3 button click sound
- **Game-End Emoji Reveal**: See the matching emoji highlighted with a golden pulsing glow when time expires
- **Combo Celebrations**: Special animated badges at 3x (✨ COMBO!), 5x (⚡ AMAZING!), and 10x (🔥 LEGENDARY!)
- **Interactive Hover Effects**: Emojis glow blue and scale up 15% when you hover over them for better targeting
- **Mobile Optimized**: Touch-friendly controls and responsive design for seamless mobile gameplay
- **React-Powered UI**: Built with React, TypeScript, and HTML5 Canvas for smooth 60 FPS rendering

## 🌟 What Makes MojiMatcher Innovative

MojiMatcher stands out from traditional matching games through several unique design choices that create a genuinely challenging and addictive experience:

### 1. **Progressive Difficulty System with Moving Emojis**
Unlike static matching games, MojiMatcher offers four distinct difficulty levels that fundamentally change the gameplay:
- **Easy Mode**: 8 stationary emojis selected from a 30-emoji pool for learning the mechanics
- **Medium Mode**: 12 stationary emojis with 1.5x score multiplier
- **Hard Mode**: 16 emojis that drift smoothly across the cards in circular patterns at moderate speed (0.8x movement)
- **GOD Mode**: 20 fast-moving emojis with 3x score multiplier for the ultimate challenge (1.2x movement speed)

The moving emoji mechanic in Hard and GOD modes adds a dynamic layer of difficulty, requiring players to track targets while they drift in smooth circular patterns. Each emoji moves at a different phase and speed using sine/cosine functions (`Math.sin(phase)` and `Math.cos(phase * 0.7)`) with unique phase offsets, creating a mesmerizing yet challenging visual experience that tests both pattern recognition and hand-eye coordination. The animation runs at 60 FPS using requestAnimationFrame for smooth movement with 10px radius (Hard) or 15px radius (GOD).

### 2. **Dynamic Visual Chaos with 60 Unique Emojis**
Every emoji is selected from a pool of 60 unique emojis across 5 categories:
- **Faces** (20 emojis): 😀 😎 🥳 😍 🤩 😜 🤪 😇 🥰 🤗 😂 🤣 😊 😋 😌 😏 🤓 🥸 🤠 🥶
- **Party & Celebration** (10 emojis): 🎉 🎈 🎁 🎊 🎆 🎇 ✨ 🎀 🎗️ 🏆
- **Games & Entertainment** (20 emojis): 🎮 🎯 🎨 🎭 🎪 🎸 🎺 🎻 🎹 🎲 🃏 🎰 🎳 🎬 🎤 🎧 🎼 🎵 🎶 🎙️
- **Sports** (10 emojis): ⚽ 🏀 🎾 🏈 ⚾ 🥎 🏐 🏉 🎱 🏓
- **Space & Nature** (10 emojis): 🚀 ⭐ 🌟 💫 ✨ 🌙 ☀️ 🌈 ⚡ 🔥

Each emoji has random size (0.7x-2.8x) and rotation (0-360°), making pattern recognition genuinely challenging. The same emoji might appear tiny and upside-down on one card, then huge and sideways on the other. This prevents memorization strategies and keeps every round fresh with maximum variety.

### 3. **Escalating Combo System with Time Rewards**
The combo system doesn't just increase points - it also increases time bonuses using the formula: **3 + combo level seconds**. This creates a snowball effect:
- 1x combo: +4 seconds
- 5x combo: +8 seconds  
- 10x combo: +13 seconds

Skilled players can extend their games indefinitely by maintaining high combos, turning a 30-second sprint into a marathon.

### 4. **High-Stakes Risk-Reward Balance**
Wrong clicks cost **2 seconds AND reset your combo**, making every decision meaningful. At 10x combo, a wrong click doesn't just cost 2 seconds - it costs the potential for 13-second time bonuses. This creates intense pressure as combos build.

### 5. **Seeded Random Generation with 60-Emoji Pool**
The game uses a sophisticated seeded random number generator (Linear Congruential Generator) with a pool of 60 unique emojis that enables:
- Deterministic card generation for testing and debugging
- Consistent emoji distribution across difficulty levels (8, 12, 16, or 20 emojis per card)
- Fair gameplay with predictable randomness from the 60-emoji pool
- Reproducible game states for development
- LCG parameters: a=1664525, c=1013904223, m=2^32 for optimal randomness
- Weighted size distribution (0.7x-2.8x) favoring medium sizes with extremes for variety

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
- Custom splash screen with animated background (splash-background.gif) and app icon (logo.png)
- Live top player showcase on splash screen with score and rounds
- Post title: "🎮 MojiMatch - Most Players can't make it past 4 rounds, No one Dares to open GOD mode..can you?"
- Game-end emoji reveal with golden pulsing glow effect (opacity cycles 0.6-1.0) that helps players learn
- Seamless integration with Reddit's Devvit platform using Express server and React client
- Runs directly in Reddit posts using Devvit's webview technology
- Full-screen gameplay experience launched from Reddit feed with custom splash background
- Click anywhere on splash screen to launch (no specific button required)

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

## 🎮 Game Mechanics

### How It Works

1. **Two Cards Appear**: Each card shows 8-20 emojis (based on difficulty) with random sizes and rotations
2. **Find the Match**: Exactly ONE emoji appears on both cards - but it looks different due to random transformations
3. **Click to Match**: Tap/click the matching emoji on either card
4. **Earn Points & Time**: Correct matches give you points and bonus time based on your combo
5. **Build Combos**: Consecutive correct matches increase your combo multiplier
6. **Avoid Mistakes**: Wrong clicks cost 2 seconds and reset your combo to 0
7. **Beat the Clock**: Keep playing until the 30-second timer runs out

### Scoring System

- **Base Points**: 25 points per match
- **Combo Formula**: (25 + (combo - 1) × 10) × difficulty multiplier
- **Examples**:
  - Easy 1x combo: 25 points
  - Easy 5x combo: 65 points
  - GOD 5x combo: 195 points (3x multiplier)

### Time Management

- **Starting Time**: 30 seconds
- **Time Bonus**: 3 + combo level seconds per correct match
  - 1x combo: +4 seconds
  - 5x combo: +8 seconds
  - 10x combo: +13 seconds
- **Time Penalty**: -2 seconds per wrong click
- **Strategy**: Build high combos to earn more time and extend your game

## 🎮 Game Features

### Core Gameplay
- **30-Second Sprint**: Fast-paced countdown timer with 3-2-1-GO! countdown animation (audio beeps at 800Hz, final GO at 1200Hz)
- **Two-Card System**: Each card displays 8-20 emojis (depending on difficulty) selected from a 60-emoji pool with exactly one matching emoji between them
- **Visual Variety**: Every emoji has random size (0.7x-2.8x) and rotation (0-360°) for unique challenges
- **Advanced Positioning**: Spatial grid partitioning with progressive relaxation prevents overlaps
  - Dynamic padding based on emoji count (40px → 30px → 25px)
  - Poisson disk sampling as fallback for guaranteed placement
- **Moving Emojis**: Hard and GOD modes feature emojis that drift in smooth circular patterns at different speeds (10px/15px radius)
- **Interactive Hover**: Emojis glow blue (rgba(59, 130, 246, 0.8)) and scale up 15% + 5% pulse when you hover over them
- **Visual Timer Progress Bar**: Full-width color-coded progress bar shows remaining time at a glance with smooth transitions

### Scoring & Progression
- **Base Points**: 25 points per correct match
- **Combo Multiplier**: Build streaks for bonus points using formula: (25 + (combo-1) × 10) × difficulty multiplier
  - Easy 1x combo: 25 points
  - Easy 5x combo: 65 points
  - GOD 5x combo: 195 points (3x multiplier)
- **Dynamic Time Bonuses**: Earn 3 + combo level seconds per match (4-13+ seconds)
- **Penalty System**: Wrong clicks cost 2 seconds and reset your combo

### Visual & Audio Feedback
- **Combo Celebrations**: Special animated badges at 3x (✨ COMBO!), 5x (⚡ AMAZING!), and 10x (🔥 LEGENDARY!) with bounceIn animations
- **Selection Feedback**: Emojis glow green (rgba(34, 197, 94, 0.9)) and bounce 30% when clicked correctly, red shake when wrong
- **Audio System**: Web Audio API-powered oscillator-based sound effects with pitch variation (523Hz-1046Hz) based on combo level
- **Button Click Sound**: MP3 audio file (btn-click.mp3) plays on all button interactions at 30% volume with preload and error handling
- **Timer Colors**: Green (>15s), Yellow (8-15s), Red (<8s) for visual urgency cues with smooth 300ms color transitions
- **Visual Progress Bar**: Full-width timer bar with color-coded gradients and pulse animation when time drops below 5 seconds
- **Audio Warnings**: Ticking sound at 10 seconds (440Hz), fast ticking in final 5 seconds (554Hz)
- **Game-End Highlight**: Golden pulsing glow (opacity cycles 0.6-1.0) reveals the matching emoji on both cards when time expires

### Reddit Integration
- **Custom Splash Screen**: Animated entry screen with custom background GIF and app icon
- **Post Title**: Eye-catching title inviting players to compete
- **Multi-Tier Leaderboards**: All-Time, Weekly, and GOD Mode leaderboards (top 10 each) with tab navigation
- **Automatic Username**: Your Reddit username appears automatically on leaderboards via Reddit API
- **Game Statistics**: Track rounds completed, accuracy percentage, highest combo, and total clicks
- **Redis Persistence**: Scores stored in Redis sorted sets for reliable leaderboard tracking across players
- **Rank Badges**: Medal colors for top 3 (🥇 gold, 🥈 silver, 🥉 bronze) with gradient backgrounds
- **Special Visual Treatment**: Top 3 positions get distinctive medal-colored gradient backgrounds

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

### Advanced Collision Detection
Sophisticated emoji positioning system with multiple algorithms:
- **Spatial Grid Partitioning**: O(1) collision checks using 80px grid cells instead of O(n²) brute force
- **Progressive Relaxation**: Three-phase placement strategy
  - Phase 1: 100% distance requirement (50 attempts)
  - Phase 2: 85% distance requirement (30 attempts)
  - Phase 3: 70% distance requirement (20 attempts)
- **Poisson Disk Sampling**: Fallback algorithm guarantees non-overlapping placement
  - Creates grid of valid positions
  - Marks occupied cells and surrounding cells
  - Picks random available cell for guaranteed placement
- **Dynamic Padding**: Adjusts based on emoji count
  - ≤12 emojis: 40px padding
  - ≤16 emojis: 30px padding
  - 20 emojis: 25px padding
- **Size-Aware Collision**: Calculates actual visual radius accounting for scale factor
- **Hover Detection**: Real-time distance calculations with rotation and scale compensation

### Audio System
Web Audio API implementation with dynamic sound generation:
- **Oscillator-based tones** (no audio files needed) using AudioContext
- **Pitch variation** based on combo level for progressive feedback (frequencies: 523Hz-1046Hz)
- **Multiple waveforms** (sine for success, sawtooth for errors, square for warnings) for different sound effects
- **Exponential gain ramping** using `exponentialRampToValueAtTime()` for smooth fade-outs
- **Button click sound**: MP3 audio file (btn-click.mp3) plays on all button interactions at 30% volume
- **Persistent settings**: Audio preferences stored in localStorage as `mojimatcher:audio-settings`

### State Management
React hooks-based architecture:
- **useGameState**: Central game logic with combo calculations, score management, and difficulty handling
- **useTimer**: Countdown timer with tick callbacks, expiration handling, and audio warnings at 10s and 5s
- **useAchievements**: Achievement tracking and unlock detection (prepared for future use)
- **Separation of concerns** between game logic (hooks), rendering (Canvas), and UI (React components)
- **State persistence**: Game state includes screen, score, timer, combo, cards, and statistics

## 📖 How to Play

### Quick Start Guide

1. **Launch the Game**: Find MojiMatcher in a Reddit post and click anywhere on the animated splash screen to open in full-screen mode
2. **Select Difficulty**: Choose from 4 difficulty levels:
   - **Easy** (8 emojis, 1x multiplier) - Perfect for beginners
   - **Medium** (12 emojis, 1.5x multiplier) - A balanced challenge
   - **Hard** (16 moving emojis, 2x multiplier) - For experienced players
   - **GOD** (20 fast-moving emojis, 3x multiplier) - Ultimate challenge!
3. **Watch Countdown**: 3-2-1-GO! countdown with audio beeps prepares you for action
4. **Find the Match**: Identify the ONE emoji that appears on BOTH cards
5. **Click It Fast**: Tap/click the matching emoji on either card before time expires
6. **Build Combos**: Chain correct matches for escalating points and time bonuses
7. **Compete**: Your score automatically saves to leaderboards with your Reddit username

### Step-by-Step Gameplay Instructions

#### Step 1: Launch from Reddit Feed
When you encounter MojiMatcher in a Reddit post, you'll see:

- **Custom Splash Screen**: Animated background GIF that stands out in your feed
- **App Icon**: MojiMatcher logo (logo.png) displayed as the post icon
- **Top Player Showcase**: Live display of the current top player's username, score, and rounds completed
- **Post Title**: "🎮 MojiMatch - Most Players can't make it past 4 rounds, No one Dares to open GOD mode..can you?"
- **Click to Play**: Simply click anywhere on the splash screen to launch the game

The game opens in Devvit's full-screen webview where you can play without distractions. Your Reddit username is automatically recognized for leaderboard integration.

#### Step 2: Navigate the Main Menu
After launching the game, you'll see the main menu with five options:

1. **▶️ Play Game** (Primary Red Button)
   - Click to open difficulty selector modal
   - Choose from 4 difficulty levels:
     - **Easy**: 8 stationary emojis, 1x score multiplier (green button)
     - **Medium**: 12 stationary emojis, 1.5x score multiplier (blue button)
     - **Hard**: 16 moving emojis, 2x score multiplier (orange button)
     - **GOD**: 20 fast-moving emojis, 3x score multiplier (purple button)
   - Selected difficulty is highlighted with a blue ring
   - Click your chosen difficulty to start the game

2. **🏆 Leaderboard** (Blue Button)
   - View top scores across three leaderboard types
   - Tab navigation: All-Time | Weekly | GOD Mode
   - Each leaderboard shows top 10 players
   - Medal colors for top 3 (🥇 gold, 🥈 silver, 🥉 bronze)
   - Your entry is highlighted if you're on the leaderboard
   - Displays: Rank, Username, Score, Rounds, Date

3. **❓ How to Play** (Green Button)
   - Interactive tutorial with animated demo
   - Shows two cards with emojis
   - Highlights the matching emoji
   - Demonstrates click interaction
   - Quick tips section with game rules
   - Auto-cycles through tutorial steps every 3 seconds

4. **⚙️ Settings** (Gray Button)
   - Toggle Sound Effects on/off
   - Toggle Music on/off
   - Settings persist in localStorage
   - Toggle switches show current state (green = on, gray = off)

5. **Back Button** (Top-left corner during gameplay)
   - Returns to main menu from any screen
   - Ends current game session

#### Step 3: Watch the Countdown
After selecting your difficulty:

1. **3-2-1 Countdown**: Large numbers appear on screen
2. **Audio Beeps**: 800Hz beep for 3-2-1, 1200Hz beep for GO!
3. **GO! Animation**: Final "GO!" text with scale animation
4. **Game Starts**: Cards appear and timer begins at 30 seconds

#### Step 4: Understand the Game Board
The game board consists of:

**Two Cards** (side-by-side on desktop, stacked on mobile):
- Each card has a white background with dashed border
- Contains 8-20 emojis (depending on difficulty)
- Emojis have random sizes (0.7x-2.8x) and rotations (0-360°)
- In Hard/GOD modes, emojis drift in circular patterns

**Top UI Bar** (displays game stats):
- **Score**: Current points with combo multiplier (e.g., "850" with "5x" below)
- **Timer**: Countdown in seconds with color coding:
  - Green (>15s): Safe zone
  - Yellow (8-15s): Warning zone
  - Red (<8s): Danger zone
- **Rounds**: Number of rounds completed
- **Progress Bar**: Visual timer bar below stats (full-width, color-coded)

**Interactive Elements**:
- **Hover Effect**: Emojis glow blue and scale up 15% when you hover over them
- **Sound Toggle**: Volume icon (top-right) to toggle sound effects
- **Music Toggle**: Music note icon (top-right) to toggle background music

#### Step 5: Find the Matching Emoji
Your goal is to identify the ONE emoji that appears on BOTH cards:

1. **Scan Both Cards**: Look at all emojis on both cards
2. **Identify the Match**: Find the emoji that appears on both (it will look different due to size/rotation)
3. **Visual Clues**: 
   - Same emoji shape/character
   - Different size and rotation
   - Different position on each card
4. **Time Pressure**: You have 30 seconds initially, but can earn more time

**Tips for Finding Matches**:
- Start with distinctive emojis (faces, unique shapes)
- Ignore size and rotation - focus on the emoji itself
- In Hard/GOD modes, track moving emojis carefully
- Build a mental map of emojis on each card

#### Step 6: Click the Matching Emoji
Once you've identified the match:

1. **Click Either Card**: You can click the matching emoji on either the left or right card
2. **Touch Support**: On mobile, tap the emoji with your finger
3. **Hover Feedback**: Emoji glows blue when you hover over it
4. **Click Feedback**: 
   - **Correct**: Green glow, 30% bounce animation, success sound
   - **Wrong**: Red shake animation, buzzer sound

**What Happens on Correct Match**:
- **Points Earned**: 25 base points + combo bonus × difficulty multiplier
  - Example: 5x combo on GOD mode = (25 + 40) × 3 = 195 points
- **Time Bonus**: 3 + combo level seconds added to timer
  - 1x combo: +4 seconds
  - 5x combo: +8 seconds
  - 10x combo: +13 seconds
- **Combo Increases**: Your combo multiplier goes up by 1
- **New Cards**: Fresh cards appear with new emojis
- **Combo Celebrations**: Special badges at 3x (✨ COMBO!), 5x (⚡ AMAZING!), 10x (🔥 LEGENDARY!)

**What Happens on Wrong Click**:
- **Time Penalty**: -2 seconds from timer
- **Combo Reset**: Your combo drops back to 0
- **No Points**: No points earned
- **Same Cards**: Cards remain the same, try again

#### Step 7: Build Your Combo
The combo system is key to high scores:

**Combo Multiplier**:
- Starts at 0, increases by 1 with each correct match
- Displayed below your score (e.g., "5x")
- Resets to 0 on wrong clicks
- No maximum limit - keep building!

**Combo Benefits**:
- **More Points**: Formula = (25 + (combo-1) × 10) × difficulty multiplier
  - 1x: 25 points (Easy) / 75 points (GOD)
  - 5x: 65 points (Easy) / 195 points (GOD)
  - 10x: 115 points (Easy) / 345 points (GOD)
- **More Time**: 3 + combo level seconds per match
  - 1x: +4 seconds
  - 5x: +8 seconds
  - 10x: +13 seconds
  - 20x: +23 seconds

**Combo Strategy**:
- **Early Game**: Focus on accuracy to build combo
- **Mid Game**: Balance speed and accuracy to maintain combo
- **Late Game**: High combos give massive time bonuses - extend your game indefinitely!
- **Risk Management**: At high combos, be extra careful - wrong clicks are very costly

#### Step 8: Manage Your Time
Time management is crucial:

**Timer Mechanics**:
- **Starting Time**: 30 seconds
- **Time Bonus**: 3 + combo level seconds per correct match
- **Time Penalty**: -2 seconds per wrong click
- **Visual Cues**: 
  - Green timer (>15s): Plenty of time
  - Yellow timer (8-15s): Time running low
  - Red timer (<8s): Critical - hurry!
- **Audio Warnings**:
  - Ticking sound at 10 seconds (440Hz)
  - Fast ticking in final 5 seconds (554Hz)
- **Progress Bar**: Full-width bar shows remaining time visually

**Time Strategy**:
- **Build Combos Early**: Higher combos = more time per match
- **Avoid Wrong Clicks**: -2 seconds is very costly
- **Watch the Timer**: Glance at timer between matches
- **Speed Up**: As timer drops, increase your pace
- **Snowball Effect**: High combos can extend 30-second games to several minutes

#### Step 9: Game Over
When the timer reaches 0:

1. **Game Ends**: Timer hits 0, game freezes
2. **Emoji Reveal**: Golden pulsing glow highlights the matching emoji on both cards
3. **Learn**: See what you missed to improve next time
4. **See Results Button**: Click to view your final stats

**Game Over Screen**:
- **Final Score**: Large display of your total points
- **Statistics**:
  - **Rounds**: Number of rounds completed
  - **Accuracy**: Percentage of correct clicks (correct / total clicks)
  - **Best Combo**: Highest combo multiplier achieved
  - **Total Clicks**: Total number of clicks made
- **New Achievements**: If you unlocked any achievements, they appear here
- **Leaderboard Status**: Notification if you made the top 10

**Options**:
- **🔄 Play Again**: Start a new game with the same difficulty
- **🏠 Back to Menu**: Return to main menu to change difficulty or view leaderboards

#### Step 10: Compete on Leaderboards
Your score is automatically saved:

**Leaderboard Types**:
1. **All-Time**: Top 10 scores ever recorded
2. **Weekly**: Top 10 scores this week (resets Monday)
3. **GOD Mode**: Top 10 scores on GOD difficulty only

**Leaderboard Display**:
- **Rank**: Position (🥇🥈🥉 for top 3, #4-10 for others)
- **Username**: Your Reddit username (automatically detected)
- **Score**: Total points earned
- **Rounds**: Number of rounds completed
- **Date**: When the score was achieved

**Medal Colors** (Top 3):
- **🥇 Gold (1st)**: Yellow gradient background, yellow border
- **🥈 Silver (2nd)**: Gray gradient background, gray border
- **🥉 Bronze (3rd)**: Orange gradient background, orange border

**Your Entry**:
- Highlighted with special background if you're on the leaderboard
- Shows "You" badge next to your username

### Difficulty Modes Explained

#### Easy Mode (8 emojis, 1x multiplier)
- **Best For**: Beginners, learning the game
- **Emojis**: 8 stationary emojis per card
- **Movement**: None - emojis stay in place
- **Score Multiplier**: 1x (base points)
- **Challenge**: Pattern recognition with moderate visual complexity
- **Strategy**: Take your time, build accuracy, learn emoji patterns

#### Medium Mode (12 emojis, 1.5x multiplier)
- **Best For**: Players comfortable with Easy mode
- **Emojis**: 12 stationary emojis per card
- **Movement**: None - emojis stay in place
- **Score Multiplier**: 1.5x (50% bonus)
- **Challenge**: More emojis = more visual clutter
- **Strategy**: Scan systematically, maintain combos for time bonuses

#### Hard Mode (16 emojis, 2x multiplier)
- **Best For**: Experienced players seeking a challenge
- **Emojis**: 16 moving emojis per card
- **Movement**: Smooth circular drift at 0.8x speed (10px radius)
- **Score Multiplier**: 2x (double points)
- **Challenge**: Track moving targets while pattern matching
- **Strategy**: Predict emoji movement, click when they're in good positions

#### GOD Mode (20 emojis, 3x multiplier)
- **Best For**: Elite players, ultimate challenge
- **Emojis**: 20 fast-moving emojis per card
- **Movement**: Fast circular drift at 1.2x speed (15px radius)
- **Score Multiplier**: 3x (triple points)
- **Challenge**: Maximum visual chaos with fast movement
- **Strategy**: Stay calm, focus on distinctive emojis, build combos for massive scores
- **Special**: Separate GOD Mode leaderboard for bragging rights

### Scoring System

**Base Points**: 25 points per correct match

**Combo Formula**: (25 + (combo - 1) × 10) × difficulty multiplier

**Examples**:
- Easy 1x combo: 25 × 1 = 25 points
- Easy 5x combo: 65 × 1 = 65 points
- Medium 5x combo: 65 × 1.5 = 97 points
- Hard 5x combo: 65 × 2 = 130 points
- GOD 5x combo: 65 × 3 = 195 points
- GOD 10x combo: 115 × 3 = 345 points

**Time Bonuses**: 3 + combo level seconds
- 1x: +4 seconds
- 5x: +8 seconds
- 10x: +13 seconds
- 20x: +23 seconds

**Penalties**: -2 seconds per wrong click, combo resets to 0

### Tips for High Scores

1. **Build Combos Early**: Higher combos = more time and points
2. **Accuracy Over Speed**: Wrong clicks are very costly (-2s + combo reset)
3. **Learn Emoji Patterns**: Familiarize yourself with the 60 emojis
4. **Use Hover Effect**: Blue glow helps confirm your target
5. **Watch the Timer**: Glance at timer color to gauge urgency
6. **Start with Easy**: Master mechanics before trying harder modes
7. **Distinctive Emojis First**: Look for unique shapes (🚀, 🏆, 🎮)
8. **Ignore Size/Rotation**: Focus on the emoji itself, not its appearance
9. **Stay Calm**: Panic leads to mistakes - breathe and focus
10. **Practice GOD Mode**: Triple multiplier = massive scores if you can handle it

### Mobile vs Desktop

**Desktop** (>768px width):
- Cards displayed side-by-side horizontally
- Larger canvas (800px × 500px)
- Mouse hover effects for targeting
- Keyboard shortcuts (if implemented)

**Mobile** (<768px width):
- Cards stacked vertically
- Responsive canvas sizing (fits screen width)
- Touch-optimized hit detection
- Larger touch targets for easier tapping
- Viewport locked (no zooming)

Both platforms offer the same gameplay experience with optimized controls for each device type.Easy, Medium, Hard, GOD)
   - Each difficulty shows emoji count and score multiplier
   - Start a game with randomly generated cards from a pool of 60 unique emojis
   - Scores count toward All-Time and difficulty-specific leaderboards
   - Button click sound effect plays when pressed

2. **🏆 Leaderboard** (Blue Button)
   - View top scores across multiple timeframes
   - Three tabs: All-Time (top 10), Weekly (top 10), GOD Mode (top 10)
   - See where you rank against the community
   - Your entry highlighted with gradient background
   - Rank badges: 🥇 (1st), 🥈 (2nd), 🥉 (3rd), #4-10
   - Medal colors: Gold gradient (1st), Silver gradient (2nd), Bronze gradient (3rd)
   - Four-column layout: Rank Badge | Username | Score | Rounds (highlighted in blue)

3. **❓ How to Play** (Green Button)
   - Interactive animated tutorial with demo cards
   - Auto-cycling tutorial steps every 3 seconds
   - Step-by-step visual guide showing how to find matching emojis
   - Scoring system explanation with examples
   - Quick tips section with game mechanics (correct match, wrong click, combos, timer)
   - Fully responsive design for mobile and desktop

4. **⚙️ Settings** (Gray Button)
   - Expandable settings panel with toggle switches
   - Toggle sound effects on/off (correct, wrong, combo sounds, timer warnings, button clicks)
   - Toggle music on/off
   - Settings persist in browser localStorage as `mojimatcher:audio-settings`

**Visual Elements:**
- Large MojiMatcher logo at the top (logo.png with bounce animation)
- "Find the matching emoji!" tagline
- Gradient background (orange-50 to orange-100)
- Animated entrance effects (fadeIn, slideDown, stagger) for all UI elements
- 3D pushable button styles with shadow and edge effects
- Custom fonts: Fredoka for headings, Press Start 2P for retro elements
- Button click sound effect (btn-click.mp3) plays on all button interactions with error handling and preload

#### Step 2: Choose Your Difficulty Level

When you click "Play Game", a difficulty selector modal appears with four options in a 2x2 grid:

**Easy Mode (8 emojis, 1x multiplier) - Green Button:**
- 8 stationary emojis per card selected from 60-emoji pool across 5 categories
- Perfect for beginners learning the mechanics
- Base scoring: 25 points per match
- Emojis stay still for easier targeting
- Best for: Learning pattern recognition fundamentals

**Medium Mode (12 emojis, 1.5x multiplier) - Blue Button:**
- 12 stationary emojis per card
- Balanced challenge for intermediate players
- 1.5x score multiplier: 37 points per match at 1x combo
- More visual complexity without movement
- Best for: Players comfortable with basic mechanics

**Hard Mode (16 emojis, 2x multiplier) - Orange Button:**
- 16 moving emojis per card
- Emojis drift in smooth circular patterns (10px radius, 0.8x speed)
- 2x score multiplier: 50 points per match at 1x combo
- Requires tracking moving targets while pattern matching
- Best for: Experienced players seeking a challenge

**GOD Mode (20 emojis, 3x multiplier) - Purple Button:**
- 20 fast-moving emojis per card
- Faster circular movement (15px radius, 1.2x speed)
- 3x score multiplier: 75 points per match at 1x combo
- Separate GOD Mode leaderboard for elite players
- Best for: Expert players who want the ultimate test

Click your chosen difficulty to start! The modal closes and a 3-2-1-GO countdown begins with audio beeps.

#### Step 3: Understanding the Game Screen

After the 3-2-1-GO countdown (audio beeps at 800Hz, final GO at 1200Hz), the game begins. Here's what you'll see:

**Top Bar - Game Statistics (3 Cards):**

1. **Score Card (Left)**
   - Current point total in large bold text
   - Combo multiplier below (e.g., "5x" in orange)
   - Difficulty name and multiplier (e.g., "GOD 3x")

2. **Timer Card (Center)**
   - Countdown in seconds with color-coded background:
     - **Green** (>15s): Safe zone
     - **Yellow** (8-15s): Caution
     - **Red** (<8s): Danger zone
   - Audio warnings: Tick at 10s, fast tick at 5s
   - Text color matches background state

3. **Rounds Card (Right)**
   - Number of rounds completed
   - Difficulty score multiplier displayed below

**Visual Timer Progress Bar:**
- Full-width bar below stat cards
- Color-coded gradient (green/yellow/red)
- Smooth transitions as time decreases
- Pulses when below 5 seconds
- Width shows percentage of time remaining

**Controls:**
- **Audio Toggles**: Sound effects (🔊) and music (🎵) buttons in top right
- **Back Button**: Arrow icon in top left returns to menu
- Settings persist in browser localStorage

**Main Play Area - Two Cards on HTML5 Canvas:**

**Layout:**
- Desktop: Side-by-side cards (800x500 canvas)
- Mobile: Stacked vertically (responsive width, min 320px)
- Cards: 350x450px on desktop, auto-sized on mobile

**Emoji Characteristics:**
- **Count**: 8-20 emojis per card (difficulty-dependent)
- **Size Range**: 0.7x to 2.8x scale with weighted distribution
- **Rotation**: 0-360° (20% chance of cardinal angles, otherwise random)
- **Spacing**: Advanced collision detection prevents overlaps
  - Spatial grid partitioning for O(1) checks
  - Progressive relaxation (100% → 85% → 70% distance)
  - Dynamic padding based on emoji count

**Movement (Hard/GOD Modes):**
- Emojis drift in smooth circular patterns
- Hard: 10px radius, 0.8x speed
- GOD: 15px radius, 1.2x speed
- Uses `Math.sin(phase)` and `Math.cos(phase * 0.7)` with unique offsets
- 60 FPS animation via requestAnimationFrame

**Interactive Feedback:**
- **Hover**: Blue glow + 15% scale + 5% pulse
- **Correct Click**: Green glow + 30% bounce animation
- **Wrong Click**: Red shake animation
- **Game End**: Golden pulsing glow reveals matching emoji

**Combo Celebrations:**
- **3x**: ✨ COMBO! (blue-cyan gradient)
- **5x**: ⚡ AMAZING! (orange-red gradient)
- **10x**: 🔥 LEGENDARY! (purple-pink gradient, larger text)
- Floating badge at top center with bounceIn animation

#### Step 4: The Core Challenge

**Your Mission:**
Find the **ONE emoji that appears on BOTH cards** and click/tap it before time runs out.

**What Makes It Challenging:**
- **Visual Transformation**: Same emoji looks completely different on each card
  - Example: 🎯 might be tiny and upside-down on left, huge and sideways on right
- **60 Emoji Pool**: Massive variety across 5 categories (Faces, Party, Games, Sports, Space)
- **Random Sizes**: 0.7x to 2.8x scale with weighted distribution
- **Random Rotations**: 0-360° with 20% bias toward cardinal angles
- **Moving Targets** (Hard/GOD): Emojis drift in circular patterns at different speeds
- **Advanced Positioning**: Spatial grid partitioning ensures no overlaps
- **Pattern Recognition**: Must identify emoji by shape, not size or orientation

**Winning Strategies:**
1. **Scan Systematically**: Develop a consistent pattern (left-to-right, top-to-bottom)
2. **Identify Distinctive Shapes**: Unique emojis like 🚀 or ⭐ are easier to spot
3. **Use Hover Effects**: Hover to see emojis glow blue and scale up 15%
4. **Track Movement** (Hard/GOD): Anticipate circular motion patterns
5. **Build Combos Carefully**: Higher combos = more points + time, but risky
6. **Balance Speed vs Accuracy**: Wrong clicks cost 2 seconds AND reset combo
7. **Watch Progress Bar**: Visual timer shows remaining time with color coding
8. **Learn Emoji Shapes**: Familiarize yourself with the 60-emoji pool

#### Step 5: Scoring System

**Points Formula:**
```
Points = (25 + (combo - 1) × 10) × difficulty_multiplier
```

**Examples by Difficulty:**

| Combo | Easy (1x) | Medium (1.5x) | Hard (2x) | GOD (3x) |
|-------|-----------|---------------|-----------|----------|
| 1x    | 25        | 37            | 50        | 75       |
| 2x    | 35        | 52            | 70        | 105      |
| 3x    | 45        | 67            | 90        | 135      |
| 5x    | 65        | 97            | 130       | 195      |
| 10x   | 115       | 172           | 230       | 345      |

**Time Bonuses:**
```
Time Bonus = 3 + combo_level seconds
```

| Combo | Time Bonus |
|-------|------------|
| 1x    | +4 seconds |
| 2x    | +5 seconds |
| 3x    | +6 seconds |
| 5x    | +8 seconds |
| 10x   | +13 seconds|

**Penalties:**
- Wrong click: -2 seconds + combo resets to 0
- No point penalty for wrong clicks

**Correct Match Rewards:**
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
