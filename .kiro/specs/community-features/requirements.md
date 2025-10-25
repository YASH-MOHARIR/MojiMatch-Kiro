# Requirements Document

## Introduction

This specification defines the community-driven enhancements for MojiMatcher to transform it from a single-player game into a Reddit-native community experience. These features are designed to maximize the app's competitiveness in the Reddit x Kiro Hackathon by addressing all judging criteria: Community Play, Polish, Reddit-y characteristics, and Delightful UX.

The enhancements build upon the existing MojiMatcher game (which already has basic gameplay, scoring, timer, and a simple leaderboard) to add:
1. Custom animated splash screen (required for polish)
2. Game-end emoji highlighting (UX improvement)
3. Daily Challenge Mode (community play)
4. Enhanced multi-view leaderboards (competition)
5. Achievement & badge system (progression)
6. Celebration animations & particle effects (delight)

## Requirements

### Requirement 1: Custom Animated Splash Screen

**User Story:** As a Reddit user browsing my feed, I want to see an eye-catching, animated splash screen that invites me to play and shows live community activity, so that I'm excited to click "Play" and join the game.

#### Acceptance Criteria

1. WHEN the app loads in a Reddit post THEN the system SHALL display a custom splash screen before the main menu
2. WHEN the splash screen is displayed THEN the system SHALL show animated emoji particles floating across the screen
3. WHEN the splash screen is displayed THEN the system SHALL show a prominent "🎮 Play MojiMatcher" button with hover/press effects
4. WHEN the splash screen is displayed THEN the system SHALL show live statistics including "X players online today" and "Today's Daily Challenge: [emoji]"
5. WHEN the splash screen is displayed THEN the system SHALL use vibrant gradients and modern design that stands out in the Reddit feed
6. WHEN the user clicks the play button THEN the system SHALL animate the transition to the main menu
7. WHEN the splash screen is displayed THEN the system SHALL be fully responsive on mobile and desktop
8. WHEN the splash screen is displayed THEN the system SHALL show the current daily challenge streak if the user has one

### Requirement 2: Game-End Emoji Highlighting

**User Story:** As a player who just finished a game, I want to see which emoji was the correct match highlighted on both cards, so that I can learn from my mistakes and understand what I missed.

#### Acceptance Criteria

1. WHEN the game timer reaches zero THEN the system SHALL freeze the current card state
2. WHEN the game ends THEN the system SHALL highlight the matching emoji on both cards with a glowing border or circle
3. WHEN the game ends THEN the system SHALL display the matching emoji prominently in the game over screen
4. WHEN the matching emoji is highlighted THEN the system SHALL use a distinct color (e.g., gold or green glow) that stands out
5. WHEN the game ends THEN the system SHALL keep the highlighted cards visible for 2-3 seconds before showing the game over screen
6. WHEN the game ends THEN the system SHALL animate the highlight effect (pulse or glow animation)
7. WHEN the user views the game over screen THEN the system SHALL show "The match was: [emoji]" with the emoji displayed large

### Requirement 3: Daily Challenge Mode

**User Story:** As a Reddit community member, I want to play the same daily challenge as everyone else in my subreddit, so that we can compare scores and discuss strategies in the comments.

#### Acceptance Criteria

1. WHEN a new day begins (UTC midnight) THEN the system SHALL generate a new daily challenge with a deterministic seed
2. WHEN any user plays the daily challenge on the same day THEN the system SHALL generate identical emoji sequences for all players
3. WHEN the user opens the menu THEN the system SHALL display a "📅 Daily Challenge" button prominently
4. WHEN the user selects daily challenge mode THEN the system SHALL indicate it's a daily challenge with special UI styling
5. WHEN the user completes a daily challenge THEN the system SHALL save their score to a separate daily leaderboard
6. WHEN the user completes a daily challenge THEN the system SHALL show their rank on today's daily leaderboard
7. WHEN the user has already completed today's daily challenge THEN the system SHALL allow them to play again but only count their best score
8. WHEN the user completes a daily challenge THEN the system SHALL show a special badge or indicator on the game over screen
9. WHEN the user plays consecutive daily challenges THEN the system SHALL track and display their streak (e.g., "5 day streak! 🔥")
10. WHEN the daily challenge resets THEN the system SHALL archive yesterday's leaderboard and start fresh

### Requirement 4: Enhanced Multi-View Leaderboards

**User Story:** As a competitive player, I want to see multiple leaderboards (all-time, daily, weekly, personal stats) with Reddit usernames and badges, so that I have multiple ways to compete and feel accomplished.

#### Acceptance Criteria

1. WHEN the user opens the leaderboard screen THEN the system SHALL display tabs for "All-Time", "Daily", "Weekly", and "My Stats"
2. WHEN the user views any leaderboard THEN the system SHALL display rank, username, score, rounds, and timestamp for each entry
3. WHEN the user views any leaderboard THEN the system SHALL display achievement badges next to usernames
4. WHEN the user views the daily leaderboard THEN the system SHALL show only scores from the current day (UTC)
5. WHEN the user views the weekly leaderboard THEN the system SHALL show only scores from the current week (Monday-Sunday UTC)
6. WHEN the user views the all-time leaderboard THEN the system SHALL show the top 10 scores ever recorded
7. WHEN the user views "My Stats" THEN the system SHALL display personal statistics including total games, best score, average score, total playtime, and achievement progress
8. WHEN the user's score appears on a leaderboard THEN the system SHALL highlight their entry with a distinct background color
9. WHEN the leaderboard displays usernames THEN the system SHALL use Reddit usernames from the authenticated user context
10. WHEN a leaderboard is empty THEN the system SHALL display an encouraging message like "Be the first to set a record!"
11. WHEN the user views a leaderboard THEN the system SHALL show a "Refresh" button to fetch latest scores
12. WHEN the user achieves a new personal best THEN the system SHALL display a special indicator on the game over screen

### Requirement 5: Achievement & Badge System

**User Story:** As a player seeking progression, I want to unlock achievements and earn badges for various accomplishments, so that I have goals beyond just high scores and can show off my skills.

#### Acceptance Criteria

1. WHEN the user completes specific milestones THEN the system SHALL unlock corresponding achievements
2. WHEN an achievement is unlocked THEN the system SHALL display a popup notification with the achievement name, icon, and description
3. WHEN the user views their profile/stats THEN the system SHALL display all unlocked achievements with progress bars for incomplete ones
4. WHEN the user appears on a leaderboard THEN the system SHALL display their highest-tier badge next to their username
5. WHEN the user unlocks an achievement THEN the system SHALL save it to Redis with their username
6. WHEN the user unlocks an achievement THEN the system SHALL play a special sound effect and animation
7. WHEN the system tracks achievements THEN it SHALL include the following categories:
   - Speed achievements: "Speed Demon" (10 matches in 20 seconds), "Lightning Fast" (15 matches in 25 seconds)
   - Combo achievements: "Combo Starter" (5x), "Combo Master" (10x), "Combo Legend" (20x), "Combo God" (30x)
   - Accuracy achievements: "Sharp Eye" (90% accuracy for 10 rounds), "Perfect Vision" (100% accuracy for 5 rounds)
   - Score achievements: "Rising Star" (500 points), "High Scorer" (1000 points), "Elite Player" (2000 points)
   - Participation achievements: "Dedicated" (play 3 days in a row), "Committed" (play 7 days in a row), "Legendary" (play 30 days in a row)
   - Daily challenge achievements: "Daily Warrior" (complete 10 daily challenges), "Daily Champion" (rank #1 on daily leaderboard)
8. WHEN the user views achievement details THEN the system SHALL show the unlock date and rarity percentage (% of players who have it)
9. WHEN the user has not unlocked an achievement THEN the system SHALL show it as locked with a hint about how to unlock it

### Requirement 6: Celebration Animations & Particle Effects

**User Story:** As a player making correct matches, I want to see delightful animations and particle effects that make every success feel rewarding, so that the game feels polished and fun to play.

#### Acceptance Criteria

1. WHEN the user clicks a correct emoji THEN the system SHALL trigger a particle explosion effect at the click location
2. WHEN the user clicks a correct emoji THEN the system SHALL display floating "+[points]" text that animates upward and fades out
3. WHEN the user achieves a combo milestone (5x, 10x, 15x, 20x) THEN the system SHALL display a full-screen celebration effect with text like "⚡ AMAZING!" or "🔥 LEGENDARY!"
4. WHEN the user achieves a personal best score THEN the system SHALL trigger confetti animation across the screen
5. WHEN the user's combo increases THEN the system SHALL increase the pitch of the success sound effect proportionally
6. WHEN the user moves their cursor/finger THEN the system SHALL display a subtle emoji trail effect
7. WHEN the user achieves a high combo (10x+) THEN the system SHALL add screen shake effect on correct matches
8. WHEN particles are displayed THEN the system SHALL use vibrant colors that match the game's theme
9. WHEN animations play THEN the system SHALL ensure they run at 60 FPS and don't impact game performance
10. WHEN the user clicks a wrong emoji THEN the system SHALL display a red "X" particle effect that quickly fades
11. WHEN celebration effects play THEN the system SHALL be responsive and work smoothly on mobile devices
12. WHEN the user has sound enabled THEN the system SHALL play corresponding sound effects with pitch variation based on combo level
13. WHEN combo milestone celebrations play THEN the system SHALL briefly pause the timer (0.5-1 second) to let the player enjoy the moment

