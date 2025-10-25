# 🎮 MojiMatcher

A lightning-fast emoji matching game built for Reddit using Devvit. Race against the clock to find the one emoji that appears on both cards in this addictive pattern-recognition challenge!

## 🎯 What is MojiMatcher?

MojiMatcher is a fast-paced visual puzzle game where players must quickly identify the single matching emoji between two cards containing 8 emojis each. With only 30 seconds on the clock, players race to complete as many rounds as possible while building combos for massive point bonuses and time extensions.

**The Challenge:** Each card displays 8 emojis with random sizes (0.8x-2.5x) and rotations (0-360°), making the same emoji look completely different on each card. You must use pattern recognition skills to spot the one matching emoji before time runs out. Every correct match generates new cards with fresh challenges, while wrong clicks cost precious seconds and reset your combo multiplier.

**The Goal:** Build the highest combo streak possible to maximize your score and earn time bonuses. The longer your combo, the more time you earn per match (4-13 seconds), creating a snowball effect where skilled players can extend their games significantly. Compete on multiple leaderboards (All-Time, Daily, Weekly) and unlock achievements as you master the game.

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

**MojiMatcher** stands out from traditional matching games through several unique design choices that create a genuinely challenging and addictive experience:

### 1. **Dynamic Visual Chaos**
Unlike static matching games, every emoji has random size (0.8x-2.5x) and rotation (0-360°), making pattern recognition genuinely challenging. The same emoji might appear tiny and upside-down on one card, then huge and sideways on the other. This prevents memorization strategies and keeps every round fresh.

### 2. **Escalating Combo System with Time Rewards**
The combo system doesn't just increase points - it also increases time bonuses using the formula: **3 + combo level seconds**. This creates a snowball effect:
- 1x combo: +4 seconds
- 5x combo: +8 seconds  
- 10x combo: +13 seconds

Skilled players can extend their games indefinitely by maintaining high combos, turning a 30-second sprint into a marathon.

### 3. **High-Stakes Risk-Reward Balance**
Wrong clicks cost **2 seconds AND reset your combo**, making every decision meaningful. At 10x combo, a wrong click doesn't just cost 2 seconds - it costs the potential for 13-second time bonuses. This creates intense pressure as combos build.

### 4. **Daily Challenge Mode with Seeded Generation**
Every player gets the **same deterministic puzzle each day** using seeded random generation. This enables:
- Fair competition on daily leaderboards
- Community discussion about strategies
- Streak tracking for consecutive days played
- Comparison of different approaches to the same puzzle

### 5. **30-Second Sprint Format**
Quick, intense sessions designed for "one more game" appeal - perfect for Reddit's mobile-first browsing experience. Games last 30-90 seconds, making it easy to play during short breaks.

### 6. **Physics-Based Layout with Overlap Prevention**
Smart emoji positioning with 60px minimum spacing prevents overlaps while maintaining visual complexity. Emojis are strategically placed to avoid clustering, ensuring every emoji is visible and clickable.

### 7. **Progressive Difficulty Through Stakes**
As combos build, the stakes get higher. Lose your 10x combo and you lose:
- 13 seconds of potential time bonus per match
- 90+ points per match (vs 25 base points)
- The psychological momentum of a hot streak

### 8. **Reddit-Native Experience**
Built specifically for Reddit with:
- Automatic username integration (no login required)
- Redis-backed leaderboards (All-Time, Daily, Weekly)
- Custom animated splash screen that stands out in the feed
- Achievement system with rarity tracking
- Personal stats dashboard

### 9. **Multi-Tier Competition**
Three separate leaderboards create multiple ways to compete:
- **All-Time**: Eternal glory for the best scores ever
- **Daily**: Fresh competition every 24 hours
- **Weekly**: Medium-term competition that resets Monday-Sunday

### 10. **Audio Feedback with Pitch Variation**
Web Audio API generates dynamic sound effects where pitch increases with combo level, creating an escalating sense of excitement as you build streaks.

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

#### Step 1: View the Splash Screen
When you first open MojiMatcher in a Reddit post, you'll see an eye-catching animated splash screen featuring:
- **Floating emoji particles** drifting across a vibrant gradient background
- **Live community stats**: "X players online today" and "Total games played"
- **Today's daily challenge preview**: Shows the featured emoji for today's challenge
- **Your current streak**: If you've played consecutive days (e.g., "🔥 5 day streak!")
- **Large "🎮 Play Now" button**: Click to enter the game

#### Step 2: Navigate the Main Menu
After clicking "Play Now", you'll see the main menu with four options:

1. **📅 Daily Challenge** (Featured Button)
   - Play today's challenge - same puzzle for all players
   - Shows today's featured emoji
   - Displays your current streak (e.g., "🔥 5 day streak!")
   - Shows your best score for today if you've already played
   - Gradient purple-to-pink styling to stand out

2. **▶️ Play Game** (Standard Mode)
   - Start a game with randomly generated cards
   - Great for practice and casual play
   - Scores count toward All-Time leaderboard

3. **🏆 Leaderboard**
   - View top scores across multiple timeframes
   - Four tabs: All-Time, Daily, Weekly, My Stats
   - See where you rank against the community

4. **⚙️ Settings**
   - Toggle sound effects on/off
   - Toggle music on/off
   - Settings persist across sessions

#### Step 3: Choose Your Game Mode

**Daily Challenge Mode:**
- Everyone gets the **same puzzle** each day (resets at UTC midnight)
- Build your streak by playing consecutive days
- Compete on the daily leaderboard
- Your best score counts (you can replay to improve)
- Special indicator shows during gameplay

**Standard Game Mode:**
- Randomly generated cards each round
- Great for practice and skill building
- Scores count toward All-Time leaderboard
- No streak tracking

### Understanding the Game Screen

When you start playing, here's what you'll see:

#### Top Bar (Game Stats)
- **Score (Top Left)**: Your current point total
  - Below score: Current combo multiplier (e.g., "5x Combo")
- **Timer (Top Center)**: Countdown in seconds
  - **Green** (>15s): Safe zone
  - **Yellow** (8-15s): Caution
  - **Red** (<8s): Danger zone
- **Rounds (Top Right)**: Number of rounds completed

#### Main Play Area
- **Two white cards** displayed side-by-side
- **8 emojis per card** (16 total visible)
- **Random sizes**: Emojis range from tiny (0.8x) to huge (2.5x)
- **Random rotations**: Emojis can be upside-down, sideways, or at any angle (0-360°)
- **Smart spacing**: Emojis positioned to avoid overlaps (60px minimum distance)

#### Special Indicators
- **Combo Badge** (appears at 3x+): Shows your current combo level
  - 3x: ✨ COMBO! (blue gradient)
  - 5x: ⚡ AMAZING! (orange-red gradient)
  - 10x: 🔥 LEGENDARY! (purple-pink gradient)
- **Daily Challenge Banner** (if playing daily challenge): Shows at top with featured emoji and streak

### The Core Challenge

**Your Mission:**
Find the **ONE emoji that appears on BOTH cards** and click/tap it before time runs out.

**The Difficulty:**
- Emojis have random sizes and rotations, making the same emoji look completely different on each card
- A 🎯 might appear tiny and upside-down on the left card, then huge and sideways on the right card
- You must recognize the emoji by its shape and pattern, not by size or orientation
- Visual chaos increases difficulty - no two rounds look the same

**The Strategy:**
- **Scan systematically**: Develop a pattern (left-to-right, top-to-bottom)
- **Look for distinctive shapes**: Unique emojis like 🚀 or ⭐ are easier to spot
- **Use peripheral vision**: Try to scan both cards simultaneously
- **Build combos carefully**: Higher combos are valuable but risky to maintain
- **Manage your time**: Balance speed with accuracy

### Scoring System Explained

#### Correct Match Rewards
When you click the matching emoji, you receive:

1. **Base Points**: 25 points (always)
2. **Combo Bonus**: (combo - 1) × 10 additional points
3. **Time Bonus**: 3 + combo level seconds added to timer

**Scoring Formula:** `25 + (combo - 1) × 10`

#### Scoring Examples

| Combo Level | Points Earned | Time Added | Visual Feedback | Total Benefit |
|-------------|--------------|------------|-----------------|---------------|
| 1x          | 25 points    | +4 seconds | Green flash     | First match   |
| 2x          | 35 points    | +5 seconds | Green flash     | Building up   |
| 3x          | 45 points    | +6 seconds | ✨ COMBO!       | Combo starts  |
| 5x          | 65 points    | +8 seconds | ⚡ AMAZING!     | Hot streak    |
| 10x         | 115 points   | +13 seconds| 🔥 LEGENDARY!   | Maximum bonus |
| 15x         | 165 points   | +18 seconds| 🔥 LEGENDARY!   | Elite level   |
| 20x         | 215 points   | +23 seconds| 🔥 LEGENDARY!   | Master level  |

#### Wrong Click Penalties
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

#### 1. Splash Screen (Entry Point)
**First impression when opening the game:**
- Vibrant gradient background (purple → blue → pink)
- 15+ floating emoji particles with random speeds and sizes
- Live community statistics:
  - "X players online today"
  - "Total games: X,XXX"
- Today's daily challenge preview with featured emoji
- Your current streak (if applicable): "🔥 5 day streak!"
- Large pulsing "🎮 Play Now" button
- Quick info footer: "⚡ 30-second rounds • 🎯 Build combos • 🏆 Compete on leaderboards"

**Action:** Click "Play Now" to enter the main menu

#### 2. Main Menu (Game Hub)
**Four main options:**

**📅 Daily Challenge** (Featured)
- Gradient purple-to-pink button with pulse animation
- Shows today's featured emoji (e.g., 🎯)
- Displays your streak: "🔥 5 day streak!"
- Shows best score if you've played today: "Best today: 850 pts"
- Click to start today's challenge

**▶️ Play Game** (Standard)
- Red button for standard random mode
- No streak tracking
- Scores count toward All-Time leaderboard
- Click to start a random game

**🏆 Leaderboard**
- Blue button to view rankings
- Access All-Time, Daily, Weekly, and My Stats
- Click to view leaderboards

**⚙️ Settings**
- Gray button that expands settings panel
- Toggle sound effects on/off
- Toggle music on/off
- Settings persist in browser storage

**Bottom Section:**
- "How to play" instructions with bullet points
- Quick reference for game rules

#### 3. Active Gameplay
**Screen Layout:**
- **Top Bar**: Score (left), Timer (center), Rounds (right)
- **Combo Badge** (appears at 3x+): Floating badge showing combo level
- **Daily Challenge Banner** (if applicable): Purple gradient banner at top
- **Two Cards**: Side-by-side white cards with 8 emojis each
- **Canvas Rendering**: Smooth 60 FPS HTML5 Canvas

**Gameplay Loop:**
1. Cards appear with 8 emojis each (random sizes and rotations)
2. Timer starts counting down from 30 seconds
3. You scan both cards looking for the matching emoji
4. Click/tap the matching emoji on either card
5. **If correct:**
   - Green flash animation
   - "+X points" popup floats upward
   - Score increases
   - Timer increases (4-13 seconds based on combo)
   - Combo increases by 1
   - New cards generate instantly
   - Success sound plays (pitch increases with combo)
6. **If wrong:**
   - Red shake animation
   - Timer decreases by 2 seconds
   - Combo resets to 0
   - Buzzer sound plays
   - Same cards remain (try again)
7. Repeat until timer reaches 0

**Visual Feedback:**
- **Combo Celebrations:**
  - 3x: ✨ COMBO! (blue gradient badge, bouncing)
  - 5x: ⚡ AMAZING! (orange-red gradient badge, bouncing)
  - 10x: 🔥 LEGENDARY! (purple-pink gradient badge, bouncing, larger)
- **Timer Colors:**
  - Green (>15s): Safe, plenty of time
  - Yellow (8-15s): Caution, time running low
  - Red (<8s): Danger, urgent
- **Audio Warnings:**
  - Tick sound at 10 seconds remaining
  - Fast tick sound in last 5 seconds

#### 4. Game Over Sequence
**Phase 1: Emoji Highlight (2.5 seconds)**
- Game freezes with current cards visible
- Golden glowing circle appears around matching emoji on both cards
- Pulsing animation (opacity 0.6 → 1.0 → 0.6)
- Large matching emoji displayed in center with "The Match!" label
- White card with gold border in center of screen
- Auto-advances to Game Over screen after 2.5 seconds

**Phase 2: Game Over Screen**
- Header: "⏰ Time's Up!" or "📅 Daily Challenge Complete!"
- **Large Score Display**: Final score in red (e.g., "1,250")
- **Statistics Grid** (4 boxes):
  - Rounds completed
  - Accuracy percentage (correct clicks / total clicks)
  - Best combo achieved
  - Total clicks
- **Achievement Unlocks** (if any):
  - Purple-pink gradient card
  - "🎉 New Achievements Unlocked!" header
  - List of newly unlocked achievements with icons and descriptions
  - Tier badges (Bronze/Silver/Gold/Platinum)
- **Action Buttons:**
  - "🔄 Play Again" (large red button) - Restart immediately
  - "← Back to Menu" (gray button) - Return to main menu

#### 5. Leaderboard Screen
**Tab Navigation:**
- Four tabs at top: All-Time | Daily | Weekly | My Stats
- Active tab highlighted in blue
- Click tabs to switch views

**All-Time Tab:**
- Top 10 scores ever recorded
- Rank badges: 🥇 (1st), 🥈 (2nd), 🥉 (3rd), #4-10
- Each entry shows:
  - Rank badge
  - Score (large, bold)
  - Username (Reddit username)
  - Rounds completed
  - Date achieved
- Your entry highlighted with blue gradient background
- Refresh button to fetch latest scores

**Daily Tab:**
- Top 10 scores from today (resets at UTC midnight)
- Same format as All-Time
- Shows "Today's Top 10" header
- Empty state: "No scores yet! Be the first to set a record."

**Weekly Tab:**
- Top 10 scores from current week (Monday-Sunday UTC)
- Same format as All-Time
- Shows "This Week's Top 10" header

**My Stats Tab:**
- Personal statistics dashboard
- **6 stat cards** in grid layout:
  - Total Games (blue gradient)
  - Best Score (green gradient)
  - Average Score (purple gradient)
  - Daily Streak with 🔥 icon (orange gradient)
  - Achievements (X/15) (pink gradient)
  - Total Playtime in hours/minutes (yellow gradient)
- **Achievement Progress Bar:**
  - Shows percentage of achievements unlocked
  - Gradient blue-to-purple fill
  - Text: "Achievement Progress: X%"

**Bottom Section:**
- "← Back to Menu" button (gray)

#### 6. Achievement System (Integrated)
**When You Unlock an Achievement:**
- Popup appears during gameplay or on game over screen
- Achievement card with:
  - Large emoji icon
  - Achievement name (bold)
  - Description
  - Tier badge (Bronze/Silver/Gold/Platinum)
- Celebration animation (scale + fade in)
- Special sound effect
- Auto-dismisses after 4 seconds
- Multiple achievements queue if unlocked simultaneously

**Achievement Categories:**
- **Speed**: Complete X matches in Y seconds
- **Combo**: Reach X combo level
- **Accuracy**: Maintain X% accuracy for Y rounds
- **Score**: Reach X total points
- **Participation**: Play X days in a row
- **Daily Challenge**: Complete X daily challenges or rank #1

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
