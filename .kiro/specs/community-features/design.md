# Design Document

## Overview

This design document outlines the technical architecture and implementation approach for the community-driven enhancements to MojiMatcher. The design builds upon the existing game infrastructure while adding new components for community play, enhanced UX, and Reddit integration.

The enhancements are designed to be modular and can be implemented incrementally, with each feature adding value independently while also working synergistically with others.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
├─────────────────────────────────────────────────────────────┤
│  SplashScreen → MenuScreen → GameCanvas → GameOverScreen    │
│                      ↓                                       │
│              LeaderboardScreen (Multi-tab)                   │
│              AchievementScreen                               │
│              StatsScreen                                     │
├─────────────────────────────────────────────────────────────┤
│                    New Components                            │
├─────────────────────────────────────────────────────────────┤
│  • ParticleSystem (canvas-based particles)                   │
│  • CelebrationOverlay (milestone celebrations)               │
│  • AchievementPopup (unlock notifications)                   │
│  • EmojiHighlight (game-end highlighting)                    │
│  • DailyChallengeIndicator (special UI for daily mode)      │
├─────────────────────────────────────────────────────────────┤
│                    Enhanced Hooks                            │
├─────────────────────────────────────────────────────────────┤
│  • useGameState (extended with daily challenge mode)         │
│  • useAchievements (track and unlock achievements)           │
│  • useParticles (manage particle effects)                    │
│  • useLeaderboard (multi-view leaderboard data)              │
├─────────────────────────────────────────────────────────────┤
│                      API Layer                               │
├─────────────────────────────────────────────────────────────┤
│  Client ←→ Fetch API ←→ Express Server ←→ Redis             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        Server Layer                          │
├─────────────────────────────────────────────────────────────┤
│                    New API Endpoints                         │
├─────────────────────────────────────────────────────────────┤
│  • GET  /api/daily-challenge (get today's seed)             │
│  • POST /api/daily-challenge/score (save daily score)       │
│  • GET  /api/leaderboard/daily (daily leaderboard)          │
│  • GET  /api/leaderboard/weekly (weekly leaderboard)        │
│  • GET  /api/leaderboard/alltime (all-time top 10)          │
│  • GET  /api/stats/:username (personal statistics)          │
│  • POST /api/achievements/unlock (unlock achievement)       │
│  • GET  /api/achievements/:username (user achievements)     │
│  • GET  /api/stats/global (global stats for splash)         │
├─────────────────────────────────────────────────────────────┤
│                    Redis Data Structure                      │
├─────────────────────────────────────────────────────────────┤
│  • daily:challenge:{date} → {seed, date}                    │
│  • daily:leaderboard:{date} → sorted set                    │
│  • weekly:leaderboard:{week} → sorted set                   │
│  • alltime:leaderboard → sorted set                         │
│  • user:{username}:stats → hash                             │
│  • user:{username}:achievements → set                       │
│  • user:{username}:streak → {count, lastPlayed}             │
│  • global:stats → hash (total games, players today)         │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Splash Screen Component

**Component: `SplashScreen.tsx`**

```typescript
interface SplashScreenProps {
  onStart: () => void;
}

interface GlobalStats {
  playersToday: number;
  totalGames: number;
  dailyChallengeEmoji: string;
  dailyChallengeDate: string;
}
```

**Design Details:**
- Full-screen overlay with gradient background (purple to blue)
- Animated emoji particles using CSS animations or canvas
- Central "MojiMatcher" logo with glow effect
- Live stats fetched from `/api/stats/global`
- Large "🎮 Play Now" button with hover scale effect
- Daily challenge preview: "Today's Challenge: 🎯"
- User's current streak if logged in
- Responsive design: stacks vertically on mobile

**Animation Strategy:**
- 15-20 floating emojis with random positions, sizes, and speeds
- CSS `@keyframes` for float animation (translateY + rotate)
- Staggered animation delays for natural feel
- Button pulse animation on hover

### 2. Game-End Emoji Highlighting

**Component: `EmojiHighlight.tsx`**

```typescript
interface EmojiHighlightProps {
  matchingEmoji: string;
  card1Emojis: CardEmoji[];
  card2Emojis: CardEmoji[];
  onComplete: () => void;
}

interface CardEmoji {
  emoji: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}
```

**Design Details:**
- Renders on top of frozen game canvas
- Draws glowing circles around matching emojis on both cards
- Uses canvas `arc()` with gradient fill for glow effect
- Animates glow with pulsing opacity (0.6 → 1.0 → 0.6)
- Displays large matching emoji in center with label "The Match!"
- Auto-dismisses after 2.5 seconds, calls `onComplete()`

**Canvas Rendering:**
```typescript
// Pseudo-code for glow effect
ctx.save();
ctx.shadowColor = '#FFD700';
ctx.shadowBlur = 20;
ctx.strokeStyle = '#FFD700';
ctx.lineWidth = 4;
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.stroke();
ctx.restore();
```

### 3. Daily Challenge System

**Hook: `useDailyChallenge.ts`**

```typescript
interface DailyChallengeData {
  seed: number;
  date: string;
  emoji: string;
  hasPlayed: boolean;
  bestScore: number | null;
  streak: number;
}

interface UseDailyChallengeReturn {
  dailyChallenge: DailyChallengeData | null;
  loading: boolean;
  startDailyChallenge: () => void;
  isDailyChallengeMode: boolean;
}
```

**Design Details:**
- Fetch daily challenge data on app load
- Seed format: `YYYYMMDD` converted to number (e.g., 20251025)
- Use seeded RNG for deterministic emoji generation
- Track user's best score for the day
- Calculate streak based on consecutive days played
- Display special UI indicator during daily challenge gameplay

**Seeded RNG Implementation:**
```typescript
class SeededRandom {
  private seed: number;
  
  constructor(seed: number) {
    this.seed = seed;
  }
  
  next(): number {
    // Linear congruential generator
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}
```

**Card Generation with Seed:**
- Pass seed to `generateCards()` function
- Use seeded random for emoji selection, positions, sizes, rotations
- Ensures all players get identical cards for the day

### 4. Enhanced Multi-View Leaderboards

**Component: `EnhancedLeaderboard.tsx`**

```typescript
interface LeaderboardTab {
  id: 'alltime' | 'daily' | 'weekly' | 'stats';
  label: string;
  icon: string;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  rounds: number;
  timestamp: number;
  badges: string[]; // Achievement badge IDs
  isCurrentUser: boolean;
}

interface PersonalStats {
  totalGames: number;
  bestScore: number;
  averageScore: number;
  totalPlaytime: number; // seconds
  achievementCount: number;
  totalAchievements: number;
  dailyStreak: number;
  weeklyRank: number | null;
}
```

**Design Details:**
- Tab navigation at top: All-Time | Daily | Weekly | My Stats
- Each tab fetches data from respective endpoint
- Leaderboard entries show rank badge (🥇🥈🥉 or #4-10)
- Achievement badges displayed as small icons next to username
- Current user's entry highlighted with gradient background
- "My Stats" tab shows personal dashboard with progress bars
- Refresh button to fetch latest data
- Empty state with encouraging message

**Tab Switching:**
- Use React state for active tab
- Lazy load data when tab is first selected
- Cache data for 30 seconds to reduce API calls

### 5. Achievement & Badge System

**Hook: `useAchievements.ts`**

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'speed' | 'combo' | 'accuracy' | 'score' | 'participation' | 'daily';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
  unlockedAt?: number;
  progress?: number; // 0-100
  rarity?: number; // percentage of players who have it
}

interface UseAchievementsReturn {
  achievements: Achievement[];
  checkAchievements: (gameStats: GameStats) => Achievement[];
  unlockAchievement: (achievementId: string) => Promise<void>;
}
```

**Achievement Definitions:**

```typescript
const ACHIEVEMENTS: Achievement[] = [
  // Speed
  { id: 'speed_demon', name: 'Speed Demon', description: '10 matches in 20 seconds', 
    icon: '⚡', category: 'speed', tier: 'silver', condition: { matches: 10, time: 20 } },
  { id: 'lightning_fast', name: 'Lightning Fast', description: '15 matches in 25 seconds',
    icon: '⚡⚡', category: 'speed', tier: 'gold', condition: { matches: 15, time: 25 } },
  
  // Combo
  { id: 'combo_starter', name: 'Combo Starter', description: 'Reach 5x combo',
    icon: '🔥', category: 'combo', tier: 'bronze', condition: { combo: 5 } },
  { id: 'combo_master', name: 'Combo Master', description: 'Reach 10x combo',
    icon: '🔥🔥', category: 'combo', tier: 'silver', condition: { combo: 10 } },
  { id: 'combo_legend', name: 'Combo Legend', description: 'Reach 20x combo',
    icon: '🔥🔥🔥', category: 'combo', tier: 'gold', condition: { combo: 20 } },
  { id: 'combo_god', name: 'Combo God', description: 'Reach 30x combo',
    icon: '👑', category: 'combo', tier: 'platinum', condition: { combo: 30 } },
  
  // Accuracy
  { id: 'sharp_eye', name: 'Sharp Eye', description: '90% accuracy for 10 rounds',
    icon: '👁️', category: 'accuracy', tier: 'silver', condition: { accuracy: 90, rounds: 10 } },
  { id: 'perfect_vision', name: 'Perfect Vision', description: '100% accuracy for 5 rounds',
    icon: '💎', category: 'accuracy', tier: 'gold', condition: { accuracy: 100, rounds: 5 } },
  
  // Score
  { id: 'rising_star', name: 'Rising Star', description: 'Score 500 points',
    icon: '⭐', category: 'score', tier: 'bronze', condition: { score: 500 } },
  { id: 'high_scorer', name: 'High Scorer', description: 'Score 1000 points',
    icon: '⭐⭐', category: 'score', tier: 'silver', condition: { score: 1000 } },
  { id: 'elite_player', name: 'Elite Player', description: 'Score 2000 points',
    icon: '⭐⭐⭐', category: 'score', tier: 'gold', condition: { score: 2000 } },
  
  // Participation
  { id: 'dedicated', name: 'Dedicated', description: 'Play 3 days in a row',
    icon: '📅', category: 'participation', tier: 'bronze', condition: { streak: 3 } },
  { id: 'committed', name: 'Committed', description: 'Play 7 days in a row',
    icon: '📅📅', category: 'participation', tier: 'silver', condition: { streak: 7 } },
  { id: 'legendary', name: 'Legendary', description: 'Play 30 days in a row',
    icon: '👑', category: 'participation', tier: 'platinum', condition: { streak: 30 } },
  
  // Daily Challenge
  { id: 'daily_warrior', name: 'Daily Warrior', description: 'Complete 10 daily challenges',
    icon: '🗡️', category: 'daily', tier: 'silver', condition: { dailyCount: 10 } },
  { id: 'daily_champion', name: 'Daily Champion', description: 'Rank #1 on daily leaderboard',
    icon: '🏆', category: 'daily', tier: 'gold', condition: { dailyRank: 1 } },
];
```

**Component: `AchievementPopup.tsx`**

```typescript
interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}
```

**Design Details:**
- Modal overlay with semi-transparent background
- Achievement card with icon, name, description
- Tier badge (bronze/silver/gold/platinum)
- Celebration animation (scale + fade in)
- Auto-dismiss after 4 seconds
- Sound effect on unlock
- Queue multiple achievements if unlocked simultaneously

### 6. Celebration Animations & Particle System

**Component: `ParticleSystem.tsx`**

```typescript
interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'circle' | 'emoji' | 'confetti';
  emoji?: string;
  rotation?: number;
  rotationSpeed?: number;
}

interface ParticleSystemProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

interface UseParticlesReturn {
  spawnParticles: (config: ParticleConfig) => void;
  spawnConfetti: (x: number, y: number) => void;
  spawnScorePopup: (x: number, y: number, points: number) => void;
}
```

**Particle Types:**

1. **Click Particles** (correct match):
   - 8-12 particles radiating from click point
   - Circular particles with gradient colors
   - Velocity based on angle from center
   - Gravity effect (vy += 0.5)
   - Fade out over 0.5 seconds

2. **Confetti** (personal best):
   - 50-100 rectangular particles
   - Random colors (red, blue, yellow, green, purple)
   - Spawn from top of screen
   - Fall with gravity and rotation
   - Last 2-3 seconds

3. **Score Popup**:
   - Text particle showing "+[points]"
   - Floats upward (vy = -2)
   - Fades out over 1 second
   - Font size scales with points

4. **Emoji Trail** (cursor/touch):
   - Small emoji particles following cursor
   - Fade quickly (0.3 seconds)
   - Low spawn rate to avoid clutter

**Component: `CelebrationOverlay.tsx`**

```typescript
interface CelebrationOverlayProps {
  milestone: 5 | 10 | 15 | 20 | null;
  onComplete: () => void;
}
```

**Design Details:**
- Full-screen overlay for combo milestones
- Large text with emoji: "⚡ AMAZING!" (5x), "🔥 ON FIRE!" (10x), "💫 UNSTOPPABLE!" (15x), "👑 LEGENDARY!" (20x)
- Scale animation (0.5 → 1.2 → 1.0)
- Particle burst in background
- Screen shake effect (translate canvas by ±5px)
- Auto-dismiss after 1 second
- Pauses timer briefly (0.5s)

**Sound Pitch Variation:**

```typescript
// In audioManager.ts
playSuccessSound(comboLevel: number) {
  const baseFrequency = 440; // A4
  const frequency = baseFrequency * Math.pow(1.06, comboLevel); // Semitone increase
  // ... play sound at calculated frequency
}
```

## Data Models

### Redis Schema

**Daily Challenge:**
```typescript
// Key: daily:challenge:2025-10-25
{
  seed: 20251025,
  date: "2025-10-25",
  emoji: "🎯" // Featured emoji for the day
}
```

**Daily Leaderboard:**
```typescript
// Sorted Set: daily:leaderboard:2025-10-25
// Score: points, Member: username:score:rounds:timestamp
"user123:850:12:1729900800000" → 850
"user456:720:10:1729901000000" → 720
```

**Weekly Leaderboard:**
```typescript
// Sorted Set: weekly:leaderboard:2025-W43
// Score: points, Member: username:score:rounds:timestamp
"user123:850:12:1729900800000" → 850
```

**All-Time Leaderboard:**
```typescript
// Sorted Set: alltime:leaderboard
// Score: points, Member: username:score:rounds:timestamp
"user123:2150:25:1729900800000" → 2150
```

**User Stats:**
```typescript
// Hash: user:user123:stats
{
  totalGames: "45",
  bestScore: "2150",
  totalScore: "38500",
  totalPlaytime: "3600", // seconds
  totalRounds: "450",
  totalCorrect: "380",
  totalWrong: "70",
  lastPlayed: "1729900800000"
}
```

**User Achievements:**
```typescript
// Set: user:user123:achievements
["speed_demon", "combo_master", "rising_star", "dedicated"]
```

**User Streak:**
```typescript
// Hash: user:user123:streak
{
  count: "5",
  lastPlayed: "2025-10-25"
}
```

**Global Stats:**
```typescript
// Hash: global:stats
{
  totalGames: "15000",
  totalPlayers: "1250",
  playersToday: "87",
  lastUpdated: "1729900800000"
}
```

## Error Handling

### Client-Side Error Handling

1. **API Failures:**
   - Wrap all fetch calls in try-catch
   - Show user-friendly error messages
   - Fallback to localStorage for leaderboards
   - Retry logic for transient failures

2. **Animation Performance:**
   - Monitor FPS using `requestAnimationFrame`
   - Reduce particle count if FPS drops below 30
   - Disable non-essential animations on low-end devices

3. **Achievement Sync:**
   - Queue achievement unlocks if offline
   - Sync when connection restored
   - Prevent duplicate unlocks with client-side tracking

### Server-Side Error Handling

1. **Redis Failures:**
   - Log errors with context
   - Return graceful error responses
   - Don't crash server on Redis errors

2. **Data Validation:**
   - Validate all incoming scores
   - Prevent score manipulation (basic sanity checks)
   - Rate limit score submissions

3. **Leaderboard Integrity:**
   - Validate timestamp is recent (within 5 minutes)
   - Check score is achievable (max points per second)
   - Remove suspicious entries

## Testing Strategy

### Unit Tests

1. **Seeded RNG:**
   - Test deterministic output
   - Verify same seed produces same sequence
   - Test edge cases (seed = 0, negative)

2. **Achievement Logic:**
   - Test each achievement condition
   - Test progress calculation
   - Test unlock prevention (no duplicates)

3. **Particle System:**
   - Test particle lifecycle
   - Test collision detection (if needed)
   - Test performance with many particles

### Integration Tests

1. **Daily Challenge Flow:**
   - Test challenge generation
   - Test score submission
   - Test leaderboard updates
   - Test streak calculation

2. **Leaderboard Views:**
   - Test data fetching for each tab
   - Test sorting and ranking
   - Test user highlighting

3. **Achievement Unlocking:**
   - Test end-to-end unlock flow
   - Test popup display
   - Test persistence

### Manual Testing

1. **Visual Polish:**
   - Test animations on different devices
   - Test responsive design
   - Test color contrast and accessibility

2. **User Experience:**
   - Test complete game flow
   - Test error states
   - Test loading states

3. **Performance:**
   - Test with many particles
   - Test on mobile devices
   - Test with slow network

## Performance Considerations

### Client Performance

1. **Canvas Rendering:**
   - Use `requestAnimationFrame` for smooth 60 FPS
   - Clear only dirty regions if possible
   - Batch draw calls

2. **Particle Management:**
   - Remove dead particles from array
   - Limit max particles (200-300)
   - Use object pooling for particles

3. **Memory Management:**
   - Clean up event listeners
   - Cancel pending animations on unmount
   - Avoid memory leaks in intervals/timeouts

### Server Performance

1. **Redis Optimization:**
   - Use pipelining for multiple operations
   - Set TTL on temporary data
   - Use sorted sets for efficient leaderboards

2. **API Response Time:**
   - Cache global stats (update every 5 minutes)
   - Limit leaderboard size (top 10/50)
   - Use Redis ZRANGE for efficient queries

3. **Rate Limiting:**
   - Limit score submissions (1 per 10 seconds)
   - Limit leaderboard fetches (1 per 5 seconds)
   - Prevent spam

## Mobile Optimization

1. **Touch Events:**
   - Use `touchstart` for immediate response
   - Prevent default to avoid scrolling
   - Handle multi-touch gracefully

2. **Responsive Design:**
   - Scale UI elements based on screen size
   - Adjust particle count on mobile
   - Optimize animations for mobile GPUs

3. **Performance:**
   - Reduce particle effects on mobile
   - Use CSS transforms for hardware acceleration
   - Minimize repaints and reflows

## Accessibility

1. **Keyboard Navigation:**
   - Tab through menu items
   - Enter to select
   - Escape to go back

2. **Screen Readers:**
   - ARIA labels on buttons
   - Announce score changes
   - Announce achievement unlocks

3. **Visual Accessibility:**
   - High contrast mode support
   - Colorblind-friendly colors
   - Adjustable text size

## Security Considerations

1. **Score Validation:**
   - Server-side validation of scores
   - Check timestamp is recent
   - Sanity check: max points per second

2. **Rate Limiting:**
   - Prevent spam submissions
   - Limit API calls per user
   - Throttle leaderboard updates

3. **Data Privacy:**
   - Only store necessary user data
   - Use Reddit usernames (already public)
   - No sensitive data collection

