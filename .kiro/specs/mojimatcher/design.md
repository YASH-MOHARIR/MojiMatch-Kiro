# Design Document

## Overview

MojiMatcher is a timed matching game built on the Reddit Devvit platform using a client-server architecture. The game presents players with two cards containing 8 emojis each, where exactly one emoji appears on both cards. Players race against a 150-second countdown timer to find matching emojis, building combos for higher scores. The game features progressive difficulty through visual variations (size and rotation), audio feedback, and a local leaderboard system ready for backend integration.

The architecture follows Devvit's standard structure with a React client for the game UI and an Express server for API endpoints, data persistence via Redis, and Reddit integration.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Reddit Post                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Devvit Webview Container                  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           React Client Application              │  │  │
│  │  │  - Game UI (Menu, Game, Leaderboard)           │  │  │
│  │  │  - Canvas Rendering (Cards & Emojis)           │  │  │
│  │  │  - Audio System                                 │  │  │
│  │  │  - Local State Management                       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                        ↕ fetch(/api/*)                 │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │           Express Server (Node.js)              │  │  │
│  │  │  - API Endpoints (/api/*)                       │  │  │
│  │  │  - Score Management                             │  │  │
│  │  │  - Leaderboard Logic                            │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                        ↕                                │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │              Devvit Platform                    │  │  │
│  │  │  - Redis (Data Persistence)                     │  │  │
│  │  │  - Reddit API (User Context)                    │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend**: React with TypeScript, HTML5 Canvas for rendering
- **Backend**: Express.js with TypeScript
- **Data Storage**: Redis (via Devvit SDK)
- **Build Tool**: Vite for both client and server
- **Platform**: Devvit Web (Reddit's app platform)

### Key Architectural Decisions

1. **Client-Side Game Logic**: All game mechanics (card generation, emoji matching, timer, scoring) run on the client for instant feedback and smooth gameplay
2. **Server-Side Persistence**: Leaderboard and score data stored via server endpoints using Redis
3. **Stateless Server**: Each API call is independent, no session state maintained on server
4. **Local Storage Fallback**: Settings and temporary data stored in browser localStorage
5. **Canvas Rendering**: HTML5 Canvas for efficient emoji rendering with transformations (rotation, scaling)

## Components and Interfaces

### Client Components

#### 1. Game State Manager
**Responsibility**: Central state management for the entire game

**State Structure**:
```typescript
interface GameState {
  screen: 'menu' | 'game' | 'gameover' | 'leaderboard';
  score: number;
  timer: number;
  combo: number;
  roundsCompleted: number;
  currentCards: [Card, Card] | null;
  matchingEmoji: string | null;
  isGameActive: boolean;
  stats: GameStats;
  settings: Settings;
}

interface GameStats {
  totalClicks: number;
  correctClicks: number;
  highestCombo: number;
  startTime: number;
}

interface Settings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
}
```

**Key Methods**:
- `startGame()`: Initialize game state and timer
- `endGame()`: Stop timer, calculate final stats, save score
- `handleCorrectMatch()`: Update score, combo, timer, generate new cards
- `handleWrongClick()`: Reset combo, subtract time
- `navigateToScreen(screen)`: Change active screen

#### 2. Card Generator
**Responsibility**: Generate card pairs with matching emoji logic

**Interface**:
```typescript
interface Card {
  emojis: EmojiInstance[];
}

interface EmojiInstance {
  emoji: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

class CardGenerator {
  private emojiPool: string[]; // 30 emojis
  
  generateCardPair(): [Card, Card];
  private selectRandomEmojis(count: number): string[];
  private positionEmojis(emojis: string[]): EmojiInstance[];
  private checkOverlap(e1: EmojiInstance, e2: EmojiInstance): boolean;
}
```

**Algorithm**:
1. Select 1 matching emoji from pool
2. Select 7 unique emojis for card 1 (excluding matching emoji)
3. Select 7 unique emojis for card 2 (excluding matching emoji and card 1 emojis)
4. Add matching emoji to both cards
5. Shuffle emoji order on each card
6. Apply random size (0.8x - 2.5x) and rotation (0-360°)
7. Position emojis using physics-based placement to avoid overlap

#### 3. Canvas Renderer
**Responsibility**: Render cards and emojis on HTML5 Canvas

**Interface**:
```typescript
class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private cardWidth: number;
  private cardHeight: number;
  
  renderCards(card1: Card, card2: Card): void;
  renderEmoji(emoji: EmojiInstance, cardX: number, cardY: number): void;
  getClickedEmoji(x: number, y: number, cards: [Card, Card]): string | null;
  playAnimation(type: 'correct' | 'wrong', x: number, y: number): void;
}
```

**Rendering Details**:
- Two cards side-by-side with 20px gap
- Each card: 350px × 450px with rounded corners and shadow
- Emojis rendered with `ctx.save()`, `ctx.translate()`, `ctx.rotate()`, `ctx.scale()`
- Click detection using bounding box calculations with rotation

#### 4. Timer Component
**Responsibility**: Countdown timer with visual states

**Interface**:
```typescript
class Timer {
  private timeRemaining: number;
  private intervalId: number | null;
  private onTick: (time: number) => void;
  private onExpire: () => void;
  
  start(): void;
  stop(): void;
  addTime(seconds: number): void;
  subtractTime(seconds: number): void;
  getColorState(): 'green' | 'yellow' | 'red';
}
```

**Visual States**:
- Green: > 75 seconds
- Yellow: 30-75 seconds
- Red: < 30 seconds

**Audio Triggers**:
- 20 seconds: Start clock ticking
- 10 seconds: Faster ticking
- 0 seconds: Game over fanfare

#### 5. Scoring System
**Responsibility**: Calculate points and manage combos

**Interface**:
```typescript
class ScoringSystem {
  private score: number;
  private combo: number;
  
  calculatePoints(combo: number): number;
  addCorrectMatch(): number;
  resetCombo(): void;
  getComboMultiplier(): number;
}
```

**Formula**:
- Base points: 25
- Combo bonus: (combo - 1) × 10
- Examples: 2x = 35, 3x = 45, 5x = 65, 10x = 115

#### 6. Audio Manager
**Responsibility**: Play sounds and music with toggle controls

**Interface**:
```typescript
class AudioManager {
  private sounds: Map<string, HTMLAudioElement>;
  private music: HTMLAudioElement;
  private sfxEnabled: boolean;
  private musicEnabled: boolean;
  
  playSound(name: 'start' | 'correct' | 'wrong' | 'combo3' | 'combo5' | 'combo10' | 'tick' | 'fasttick' | 'gameover'): void;
  playMusic(): void;
  stopMusic(): void;
  toggleSFX(enabled: boolean): void;
  toggleMusic(enabled: boolean): void;
}
```

**Sound Assets**:
- Game start chime
- Correct match ding
- Wrong click buzz
- Combo sounds (3x, 5x, 10x)
- Timer ticking (normal and fast)
- Game over fanfare
- Background music loop

#### 7. UI Components

**MenuScreen**:
- Play Game button
- Leaderboard button
- Settings icon (music/sfx toggles)

**GameScreen**:
- Canvas for cards
- Timer display (top center)
- Score display (top left)
- Combo indicator (appears at 3x+)
- Score popup animations

**GameOverScreen**:
- Final score (large display)
- Stats: Rounds completed, highest combo, accuracy
- Play Again button
- Return to Menu button

**LeaderboardScreen**:
- Top 5 scores list
- Rank, score display
- Back to Menu button

### Server Components

#### 1. Score API Endpoint
**Endpoint**: `POST /api/save-score`

**Request**:
```typescript
interface SaveScoreRequest {
  score: number;
  rounds: number;
  highestCombo: number;
  accuracy: number;
}
```

**Response**:
```typescript
interface SaveScoreResponse {
  success: boolean;
  rank?: number; // If score made top 5
}
```

**Logic**:
1. Get Reddit user context from Devvit
2. Fetch current leaderboard from Redis
3. Check if score qualifies for top 5
4. If yes, insert score and maintain top 5 only
5. Save updated leaderboard to Redis
6. Return rank if applicable

#### 2. Leaderboard API Endpoint
**Endpoint**: `GET /api/leaderboard`

**Response**:
```typescript
interface LeaderboardResponse {
  scores: LeaderboardEntry[];
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  rounds: number;
  timestamp: number;
}
```

**Logic**:
1. Fetch leaderboard from Redis key: `mojimatcher:leaderboard`
2. Parse and return top 5 scores
3. Include Reddit username for each entry

#### 3. User Stats Endpoint (Future)
**Endpoint**: `GET /api/user-stats`

**Response**:
```typescript
interface UserStatsResponse {
  gamesPlayed: number;
  highScore: number;
  averageScore: number;
  totalRounds: number;
}
```

## Data Models

### Redis Data Structure

**Leaderboard** (Sorted Set):
```
Key: mojimatcher:leaderboard
Type: Sorted Set (ZADD)
Score: Game score (for sorting)
Member: JSON string of LeaderboardEntry
```

**User Stats** (Hash):
```
Key: mojimatcher:user:{userId}
Type: Hash
Fields:
  - gamesPlayed: number
  - highScore: number
  - totalScore: number
  - totalRounds: number
```

### Local Storage

**Settings**:
```
Key: mojimatcher:settings
Value: JSON string of Settings object
```

**Temporary Leaderboard** (before backend integration):
```
Key: mojimatcher:local-leaderboard
Value: JSON array of LeaderboardEntry
```

## Error Handling

### Client-Side Errors

1. **Canvas Rendering Failure**:
   - Fallback to DOM-based rendering
   - Display error message to user
   - Log error for debugging

2. **Audio Loading Failure**:
   - Continue game without audio
   - Show notification: "Audio unavailable"
   - Don't block gameplay

3. **API Call Failure**:
   - Retry once with exponential backoff
   - Fall back to local storage for scores
   - Show user-friendly error message

4. **Timer Drift**:
   - Use `performance.now()` for accurate timing
   - Recalculate on each tick to prevent drift

### Server-Side Errors

1. **Redis Connection Failure**:
   - Return error response with status 503
   - Log error for monitoring
   - Client falls back to local storage

2. **Invalid Request Data**:
   - Validate all inputs
   - Return 400 Bad Request with error details
   - Don't process invalid data

3. **Reddit API Failure**:
   - Use anonymous user if context unavailable
   - Log warning
   - Continue with degraded functionality

### Error Response Format

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
```

## Testing Strategy

### Unit Tests

**Card Generator**:
- Test emoji pool has 30 unique emojis
- Verify exactly 1 matching emoji per card pair
- Verify 8 emojis per card
- Test size range (0.8x - 2.5x)
- Test rotation range (0-360°)
- Test no overlapping emojis

**Scoring System**:
- Test base points (25)
- Test combo calculations (2x=35, 3x=45, 5x=65, 10x=115)
- Test combo reset on wrong click
- Test score accumulation

**Timer**:
- Test countdown accuracy
- Test time addition (+10s on correct)
- Test time subtraction (-1s on wrong)
- Test color state transitions
- Test expiration callback

**Canvas Renderer**:
- Test click detection with rotation
- Test emoji positioning
- Test animation triggers

### Integration Tests

**Game Flow**:
- Test menu → game → game over → menu navigation
- Test continuous round generation
- Test game end when timer reaches 0

**API Integration**:
- Test score saving to server
- Test leaderboard retrieval
- Test error handling for failed API calls

**Audio System**:
- Test sound playback on events
- Test music loop
- Test toggle functionality

### End-to-End Tests

**Complete Game Session**:
1. Start game from menu
2. Make correct matches (verify score, combo, time bonus)
3. Make wrong clicks (verify combo reset, time penalty)
4. Let timer expire
5. Verify game over screen with stats
6. Verify score saved to leaderboard
7. Return to menu

**Leaderboard Flow**:
1. Play multiple games with different scores
2. Verify top 5 ranking
3. Verify scores persist across sessions

### Performance Tests

**Rendering Performance**:
- Maintain 60 FPS during gameplay
- Test on mobile devices (iOS Safari, Android Chrome)
- Test with maximum emoji count (16 emojis visible)

**Memory Usage**:
- Monitor for memory leaks during extended play
- Test audio asset loading and cleanup

**Load Testing** (Server):
- Test concurrent score submissions
- Test Redis connection pooling
- Verify response times < 200ms

### Manual Testing Checklist

- [ ] Game plays smoothly on desktop Chrome
- [ ] Game plays smoothly on mobile Safari
- [ ] Game plays smoothly on mobile Chrome
- [ ] All sounds play correctly
- [ ] Music loops without gaps
- [ ] Audio toggles work
- [ ] Timer color changes at correct thresholds
- [ ] Combo indicator appears at 3x
- [ ] Score popups display correctly
- [ ] Animations are smooth (correct/wrong)
- [ ] Leaderboard updates after game
- [ ] Settings persist across sessions
- [ ] Game fits within 800px width
- [ ] Touch interactions work on mobile
- [ ] No emoji overlapping on cards

## Performance Considerations

### Client Optimization

1. **Canvas Rendering**:
   - Use `requestAnimationFrame` for smooth animations
   - Only redraw when state changes
   - Pre-render emoji glyphs if possible

2. **Memory Management**:
   - Reuse canvas contexts
   - Clean up audio elements when not needed
   - Limit animation queue size

3. **Event Handling**:
   - Debounce click events (prevent double-clicks)
   - Use event delegation where possible

### Server Optimization

1. **Redis Operations**:
   - Use pipelining for multiple operations
   - Keep leaderboard size limited (top 5 only)
   - Use appropriate data structures (sorted sets)

2. **API Response**:
   - Minimize payload size
   - Use compression if available
   - Cache leaderboard data (short TTL)

### Mobile Optimization

1. **Touch Targets**:
   - Minimum 44px × 44px for emoji hit areas
   - Add padding around clickable elements

2. **Asset Loading**:
   - Lazy load audio assets
   - Optimize emoji rendering for mobile GPUs

3. **Battery Efficiency**:
   - Pause animations when tab not visible
   - Stop timer when game not active

## Deployment Considerations

### Devvit Configuration

**devvit.json**:
```json
{
  "name": "mojimatcher",
  "version": "1.0.0",
  "permissions": ["redis"],
  "post": {
    "type": "web",
    "title": "MojiMatcher - Find the Match!",
    "description": "A fast-paced emoji matching game"
  }
}
```

### Build Process

1. Client build: `npm run build:client` → `dist/client/`
2. Server build: `npm run build:server` → `dist/server/`
3. Devvit upload: `npm run launch`

### Environment Variables

None required for initial version (all configuration in code)

### Monitoring

**Key Metrics**:
- Games played per day
- Average game duration
- Average score
- Completion rate (games finished vs abandoned)
- API error rate
- Redis connection health

## Future Enhancements

### Phase 2 Features

1. **Multiplayer Mode**:
   - Real-time head-to-head matches
   - Shared card pairs
   - Race to find match first

2. **Power-ups**:
   - Time freeze (5 seconds)
   - Hint (highlight matching emoji)
   - Score multiplier (2x for 30 seconds)

3. **Difficulty Levels**:
   - Easy: 10 emojis per card, less rotation
   - Normal: Current settings
   - Hard: 12 emojis per card, more rotation, smaller sizes

4. **Achievements**:
   - "Speed Demon": Complete 10 rounds in 60 seconds
   - "Combo Master": Achieve 15x combo
   - "Marathon": Play for 5 minutes straight

5. **Global Leaderboard**:
   - Subreddit-wide rankings
   - Daily/weekly/all-time boards
   - Reddit flair for top players

### Technical Debt

- Refactor card generation to use Web Workers for better performance
- Implement proper state management library (Redux/Zustand)
- Add comprehensive error tracking (Sentry integration)
- Optimize bundle size (code splitting)
- Add accessibility features (keyboard navigation, screen reader support)
