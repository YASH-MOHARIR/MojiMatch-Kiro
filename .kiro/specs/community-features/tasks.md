# Implementation Plan

- [x] 1. Create custom animated splash screen

  - Create `SplashScreen.tsx` component with gradient background and animated emoji particles
  - Implement floating emoji animations using CSS keyframes
  - Add "Play Now" button with hover effects and scale animation
  - Fetch and display global stats (players today, total games) from new `/api/stats/global` endpoint
  - Display daily challenge preview with featured emoji
  - Implement responsive design for mobile and desktop
  - Add transition animation when user clicks play button
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

- [x] 2. Implement game-end emoji highlighting

  - Create `EmojiHighlight.tsx` component that overlays the game canvas
  - Implement canvas-based glow effect around matching emojis on both cards
  - Add pulsing animation for the glow effect (opacity 0.6 → 1.0 → 0.6)
  - Display large matching emoji in center with "The Match!" label
  - Implement auto-dismiss after 2.5 seconds with callback
  - Integrate with `useGameState` to trigger on game end
  - Update `GameCanvas` to freeze state when game ends
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x] 3. Build seeded random number generator

  - Create `SeededRandom` class in `src/shared/utils/seededRandom.ts`
  - Implement linear congruential generator algorithm
  - Add unit tests to verify deterministic output
  - Test that same seed produces identical sequences
  - _Requirements: 3.1, 3.2_

- [-] 4. Implement daily challenge system

- [x] 4.1 Create server-side daily challenge endpoints

  - Add `GET /api/daily-challenge` endpoint to return today's seed and date
  - Generate seed from current date (format: YYYYMMDD as number)
  - Add `POST /api/daily-challenge/score` endpoint to save daily scores
  - Create Redis key structure: `daily:challenge:{date}` and `daily:leaderboard:{date}`
  - Implement daily leaderboard as Redis sorted set
  - _Requirements: 3.1, 3.2, 3.5, 3.10_

- [x] 4.2 Create client-side daily challenge hook

  - Create `useDailyChallenge.ts` hook to fetch and manage daily challenge data
  - Implement streak tracking (consecutive days played)
  - Add logic to check if user has played today
  - Store user's best daily score
  - _Requirements: 3.3, 3.6, 3.9_

- [x] 4.3 Integrate seeded RNG with card generation


  - Modify `cardGenerator.ts` to accept optional seed parameter
  - Use `SeededRandom` for emoji selection, positions, sizes, and rotations when seed provided
  - Ensure deterministic card generation for same seed
  - Add unit tests to verify identical cards from same seed
  - _Requirements: 3.1, 3.2_

- [ ] 4.4 Add daily challenge UI components

  - Add "📅 Daily Challenge" button to `MenuScreen.tsx`
  - Create `DailyChallengeIndicator.tsx` component for in-game UI
  - Display special styling during daily challenge mode
  - Show daily challenge badge on game over screen
  - Display user's streak and best daily score
  - _Requirements: 3.3, 3.4, 3.7, 3.8, 3.9_

- [ ] 5. Build enhanced multi-view leaderboard system
- [ ] 5.1 Create server-side leaderboard endpoints

  - Add `GET /api/leaderboard/daily` endpoint for today's scores
  - Add `GET /api/leaderboard/weekly` endpoint for current week's scores
  - Add `GET /api/leaderboard/alltime` endpoint for top 10 all-time scores
  - Add `GET /api/stats/:username` endpoint for personal statistics
  - Implement Redis sorted sets for each leaderboard type
  - Add logic to calculate weekly key (YYYY-Www format)
  - _Requirements: 4.4, 4.5, 4.6, 4.7_

- [ ] 5.2 Create enhanced leaderboard component

  - Create `EnhancedLeaderboard.tsx` with tab navigation
  - Implement tabs: All-Time, Daily, Weekly, My Stats
  - Add tab switching logic with lazy loading
  - Display rank badges (🥇🥈🥉 or #4-10)
  - Highlight current user's entry with gradient background
  - Add refresh button to fetch latest data
  - Implement empty state with encouraging message
  - _Requirements: 4.1, 4.2, 4.8, 4.10, 4.11_

- [ ] 5.3 Create personal stats dashboard

  - Create `StatsScreen.tsx` component for "My Stats" tab
  - Display total games, best score, average score
  - Display total playtime and achievement progress
  - Add progress bars for visual representation
  - Show daily streak and weekly rank
  - _Requirements: 4.7, 4.12_

- [ ] 5.4 Integrate achievement badges with leaderboard

  - Modify leaderboard entries to include user badges
  - Display highest-tier badge next to username
  - Add tooltip on hover to show badge name
  - _Requirements: 4.3_

- [ ] 6. Implement achievement and badge system
- [ ] 6.1 Define achievement data structure

  - Create achievement definitions in `src/shared/constants/achievements.ts`
  - Define 15 achievements across 6 categories (speed, combo, accuracy, score, participation, daily)
  - Include achievement metadata: id, name, description, icon, category, tier, condition
  - _Requirements: 5.7_

- [ ] 6.2 Create server-side achievement endpoints

  - Add `POST /api/achievements/unlock` endpoint to unlock achievements
  - Add `GET /api/achievements/:username` endpoint to fetch user achievements
  - Implement Redis set for user achievements: `user:{username}:achievements`
  - Add logic to calculate achievement rarity (% of players who have it)
  - Prevent duplicate unlocks
  - _Requirements: 5.5, 5.9_

- [ ] 6.3 Create achievement tracking hook

  - Create `useAchievements.ts` hook to manage achievements
  - Implement `checkAchievements()` function to evaluate conditions after each game
  - Track progress for incomplete achievements
  - Queue newly unlocked achievements for display
  - Call server endpoint to persist unlocks
  - _Requirements: 5.1, 5.2_

- [ ] 6.4 Create achievement popup component

  - Create `AchievementPopup.tsx` for unlock notifications
  - Display achievement icon, name, description, and tier badge
  - Implement celebration animation (scale + fade in)
  - Add sound effect on unlock
  - Auto-dismiss after 4 seconds
  - Queue multiple achievements if unlocked simultaneously
  - _Requirements: 5.2, 5.6_

- [ ] 6.5 Create achievement gallery screen

  - Create `AchievementScreen.tsx` to display all achievements
  - Show unlocked achievements with unlock date
  - Show locked achievements with hints
  - Display progress bars for incomplete achievements
  - Show rarity percentage for each achievement
  - Group achievements by category
  - _Requirements: 5.3, 5.8, 5.9_

- [ ] 7. Build particle system and celebration animations
- [ ] 7.1 Create particle system foundation

  - Create `ParticleSystem.tsx` component with canvas rendering
  - Define `Particle` interface with position, velocity, life, size, color, type
  - Implement particle update loop using `requestAnimationFrame`
  - Add particle spawning and removal logic
  - Implement gravity and fade-out effects
  - Limit max particles to 300 for performance
  - _Requirements: 6.9_

- [ ] 7.2 Implement click particle effects

  - Create `spawnParticles()` function for correct match clicks
  - Spawn 8-12 circular particles radiating from click point
  - Use gradient colors (green, yellow, gold)
  - Apply velocity based on angle from center
  - Add gravity effect and fade out over 0.5 seconds
  - _Requirements: 6.1_

- [ ] 7.3 Implement score popup particles

  - Create `spawnScorePopup()` function to display "+[points]" text
  - Render text particles that float upward
  - Scale font size based on points earned
  - Fade out over 1 second
  - _Requirements: 6.2_

- [ ] 7.4 Implement confetti effect

  - Create `spawnConfetti()` function for personal best scores
  - Spawn 50-100 rectangular confetti particles
  - Use random colors (red, blue, yellow, green, purple)
  - Spawn from top of screen with gravity and rotation
  - Last 2-3 seconds
  - _Requirements: 6.4_

- [ ] 7.5 Implement emoji trail effect

  - Create cursor/touch trail with small emoji particles
  - Spawn particles following cursor movement
  - Fade quickly (0.3 seconds) to avoid clutter
  - Use low spawn rate for performance
  - _Requirements: 6.6_

- [ ] 7.6 Create combo milestone celebrations

  - Create `CelebrationOverlay.tsx` for combo milestones (5x, 10x, 15x, 20x)
  - Display full-screen text: "⚡ AMAZING!" (5x), "🔥 ON FIRE!" (10x), "💫 UNSTOPPABLE!" (15x), "👑 LEGENDARY!" (20x)
  - Implement scale animation (0.5 → 1.2 → 1.0)
  - Add particle burst in background
  - Implement screen shake effect (translate canvas by ±5px)
  - Pause timer briefly (0.5 seconds) during celebration
  - Auto-dismiss after 1 second
  - _Requirements: 6.3, 6.7, 6.13_

- [ ] 7.7 Implement sound pitch variation

  - Modify `audioManager.ts` to accept combo level parameter
  - Calculate frequency based on combo: `baseFrequency * Math.pow(1.06, comboLevel)`
  - Apply pitch variation to success sound effect
  - Test that higher combos produce higher pitch
  - _Requirements: 6.5, 6.12_

- [ ] 7.8 Add wrong click particle effect

  - Create red "X" particle effect for wrong clicks
  - Spawn particles that quickly fade (0.3 seconds)
  - Use red color to indicate error
  - _Requirements: 6.10_

- [ ] 7.9 Optimize particle performance

  - Implement object pooling for particles to reduce garbage collection
  - Monitor FPS and reduce particle count if below 30 FPS
  - Reduce particle effects on mobile devices
  - Ensure animations run at 60 FPS
  - Test performance with maximum particles
  - _Requirements: 6.9, 6.11_

- [ ] 8. Implement global stats tracking

  - Create `global:stats` Redis hash for tracking total games, players, etc.
  - Increment counters on game completion
  - Track unique players today using Redis set with TTL
  - Create `GET /api/stats/global` endpoint to fetch stats
  - Cache stats on client for 5 minutes
  - Display stats on splash screen
  - _Requirements: 1.4_

- [ ] 9. Implement user streak tracking

  - Create `user:{username}:streak` Redis hash to track consecutive days
  - Update streak on daily challenge completion
  - Reset streak if user misses a day
  - Display streak on splash screen and menu
  - Add streak achievements (3, 7, 30 days)
  - _Requirements: 1.8, 3.9_

- [ ] 10. Update game state management

  - Extend `useGameState.ts` to support daily challenge mode
  - Add flag to indicate if current game is daily challenge
  - Track additional stats needed for achievements (accuracy, speed)
  - Integrate achievement checking on game end
  - Trigger particle effects on correct/wrong clicks
  - Trigger celebration overlays on combo milestones
  - _Requirements: 3.4, 5.1, 6.1, 6.2, 6.3_

- [ ] 11. Integrate all features with existing game flow

  - Update `App.tsx` to show splash screen on initial load
  - Add navigation to achievement screen from menu
  - Update `GameOverScreen.tsx` to show matching emoji and achievement unlocks
  - Integrate particle system with `GameCanvas.tsx`
  - Update `MenuScreen.tsx` with daily challenge button
  - Ensure all features work together seamlessly
  - _Requirements: 1.1, 2.7, 3.3, 4.1, 5.2_

- [ ] 12. Add error handling and fallbacks

  - Wrap all API calls in try-catch blocks
  - Implement localStorage fallback for leaderboards when offline
  - Show user-friendly error messages
  - Add retry logic for transient failures
  - Handle Redis failures gracefully on server
  - Validate all incoming data on server
  - _Requirements: All requirements (error handling)_

- [ ] 13. Implement responsive design and mobile optimization

  - Test all new components on mobile devices
  - Adjust particle count for mobile performance
  - Ensure touch events work correctly
  - Scale UI elements based on screen size
  - Test animations on mobile GPUs
  - Optimize for mobile battery life
  - _Requirements: 1.7, 6.11_

- [ ] 14. Add accessibility features

  - Add ARIA labels to all interactive elements
  - Implement keyboard navigation for menus
  - Ensure high contrast for text and UI elements
  - Test with screen readers
  - Add focus indicators for keyboard navigation
  - _Requirements: All requirements (accessibility)_

- [ ] 15. Write tests for new features

  - Write unit tests for `SeededRandom` class
  - Write unit tests for achievement condition checking
  - Write unit tests for particle lifecycle
  - Write integration tests for daily challenge flow
  - Write integration tests for leaderboard views
  - Test achievement unlocking end-to-end
  - _Requirements: All requirements (testing)_

- [ ] 16. Performance optimization and polish

  - Profile client performance with Chrome DevTools
  - Optimize canvas rendering (batch draw calls, dirty regions)
  - Implement Redis pipelining for multiple operations
  - Add rate limiting to API endpoints
  - Cache frequently accessed data
  - Minimize repaints and reflows
  - Test on low-end devices
  - _Requirements: All requirements (performance)_

- [ ] 17. Final integration testing and bug fixes
  - Test complete game flow from splash to game over
  - Test all leaderboard views with real data
  - Test achievement unlocking for all 15 achievements
  - Test daily challenge with multiple users
  - Test particle effects at various combo levels
  - Fix any bugs discovered during testing
  - Ensure all features work on mobile and desktop
  - _Requirements: All requirements (integration)_
