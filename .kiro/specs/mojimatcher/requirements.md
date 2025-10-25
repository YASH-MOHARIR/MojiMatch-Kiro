# Requirements Document

## Introduction

MojiMatcher is a fast-paced, timed matching game built for Reddit using Devvit. Players must quickly identify the one common emoji between two cards containing 8 emojis each. The game features a 150-second countdown timer, progressive difficulty through visual variations (size and rotation), a combo scoring system, and a local leaderboard. The game is designed to be addictive with "one more game" appeal, targeting 2-3 minute play sessions that are perfect for Reddit's mobile-first audience.

## Requirements

### Requirement 1: Game Menu System

**User Story:** As a player, I want a clear menu system so that I can easily navigate between playing the game and viewing the leaderboard.

#### Acceptance Criteria

1. WHEN the game loads THEN the system SHALL display a main menu with "Play Game" and "Leaderboard" options
2. WHEN the player clicks "Play Game" THEN the system SHALL transition to the game screen and start the timer
3. WHEN the player clicks "Leaderboard" THEN the system SHALL display the top 5 high scores
4. WHEN the game ends THEN the system SHALL display a game over screen with final score and stats
5. WHEN the player is on the game over screen THEN the system SHALL provide options to "Play Again" or "Return to Menu"

### Requirement 2: Card Display and Emoji Matching

**User Story:** As a player, I want to see two cards with emojis so that I can find the matching emoji between them.

#### Acceptance Criteria

1. WHEN a round begins THEN the system SHALL display exactly 2 cards side-by-side
2. WHEN cards are displayed THEN each card SHALL contain exactly 8 emojis
3. WHEN cards are generated THEN exactly ONE emoji SHALL appear on both cards
4. WHEN cards are generated THEN the system SHALL select emojis from a pool of at least 30 different emojis
5. WHEN emojis are displayed THEN each emoji SHALL have a random size between 0.8x and 2.5x scale
6. WHEN emojis are displayed THEN each emoji SHALL have a random rotation between 0 and 360 degrees
7. WHEN emojis are positioned THEN the system SHALL use physics-based placement to prevent overlapping
8. WHEN the player clicks an emoji THEN the system SHALL detect which emoji was clicked

### Requirement 3: Timer System

**User Story:** As a player, I want a visible countdown timer so that I know how much time I have left to play.

#### Acceptance Criteria

1. WHEN the game starts THEN the system SHALL initialize the timer at 150 seconds
2. WHEN the timer is running THEN the system SHALL count down by 1 second intervals
3. WHEN the timer is above 75 seconds THEN the system SHALL display the timer in green
4. WHEN the timer is between 30 and 75 seconds THEN the system SHALL display the timer in yellow
5. WHEN the timer is below 30 seconds THEN the system SHALL display the timer in red
6. WHEN the timer reaches 20 seconds THEN the system SHALL play a clock ticking sound
7. WHEN the timer reaches 10 seconds THEN the system SHALL play a faster ticking sound
8. WHEN the timer reaches 0 seconds THEN the system SHALL end the game and display the game over screen
9. WHEN the player makes a correct match THEN the system SHALL add 10 seconds to the timer
10. WHEN the player makes a wrong click THEN the system SHALL subtract 1 second from the timer

### Requirement 4: Scoring System

**User Story:** As a player, I want to earn points for correct matches with combo bonuses so that I can achieve high scores.

#### Acceptance Criteria

1. WHEN the player clicks the correct matching emoji THEN the system SHALL award 25 base points
2. WHEN the player makes consecutive correct matches THEN the system SHALL build a combo multiplier
3. WHEN the player has a 2x combo THEN the system SHALL award 35 points (25 + 10)
4. WHEN the player has a 3x combo THEN the system SHALL award 45 points (25 + 20)
5. WHEN the player has a 5x combo THEN the system SHALL award 65 points (25 + 40)
6. WHEN the player has a 10x combo THEN the system SHALL award 115 points (25 + 90)
7. WHEN the player makes a wrong click THEN the system SHALL reset the combo multiplier to 0
8. WHEN the player makes a wrong click THEN the system SHALL NOT deduct points from the score
9. WHEN the player earns points THEN the system SHALL display the points earned in a popup animation

### Requirement 5: Visual Feedback

**User Story:** As a player, I want clear visual feedback for my actions so that I know immediately if I made the correct choice.

#### Acceptance Criteria

1. WHEN the player clicks the correct emoji THEN the system SHALL display a green flash animation
2. WHEN the player clicks the wrong emoji THEN the system SHALL display a red shake animation
3. WHEN the player achieves a 3x or higher combo THEN the system SHALL display a combo indicator
4. WHEN the combo indicator is displayed THEN it SHALL remain visible for the duration of the combo
5. WHEN the player earns points THEN the system SHALL display a score popup showing points earned
6. WHEN the score popup is displayed THEN it SHALL fade out after a brief duration

### Requirement 6: Audio System

**User Story:** As a player, I want audio feedback and background music so that the game feels more engaging and immersive.

#### Acceptance Criteria

1. WHEN the game starts THEN the system SHALL play a game start chime sound
2. WHEN the player makes a correct match THEN the system SHALL play a correct match ding sound
3. WHEN the player makes a wrong click THEN the system SHALL play a soft buzz sound
4. WHEN the player achieves a 3x combo THEN the system SHALL play a combo achievement sound
5. WHEN the player achieves a 5x combo THEN the system SHALL play a different combo achievement sound
6. WHEN the player achieves a 10x combo THEN the system SHALL play a unique combo achievement sound
7. WHEN the timer reaches warning thresholds THEN the system SHALL play appropriate timer warning sounds
8. WHEN the game ends THEN the system SHALL play a game over fanfare sound
9. WHEN the game is running THEN the system SHALL play background music on loop
10. WHEN the player accesses settings THEN the system SHALL provide a toggle for background music
11. WHEN the player accesses settings THEN the system SHALL provide a toggle for sound effects
12. WHEN audio is toggled off THEN the system SHALL mute the respective audio category

### Requirement 7: Leaderboard System

**User Story:** As a player, I want to see high scores so that I can compare my performance and compete with others.

#### Acceptance Criteria

1. WHEN the player views the leaderboard THEN the system SHALL display the top 5 high scores
2. WHEN the player completes a game THEN the system SHALL automatically save the score if it qualifies for the top 5
3. WHEN scores are displayed THEN the system SHALL show the rank, score, and any relevant metadata
4. WHEN scores are saved THEN the system SHALL persist them in local storage
5. WHEN the leaderboard is implemented THEN the system SHALL be ready for backend integration (Redis via Devvit)

### Requirement 8: Responsive Design and Platform Optimization

**User Story:** As a Reddit user, I want the game to work smoothly on both mobile and desktop so that I can play anywhere.

#### Acceptance Criteria

1. WHEN the game is displayed THEN the system SHALL optimize for a maximum width of 800px (Devvit standard)
2. WHEN the game is accessed on mobile THEN the system SHALL provide a responsive layout that works on small screens
3. WHEN the game is accessed on desktop THEN the system SHALL provide an optimized layout for larger screens
4. WHEN the game is running THEN the system SHALL maintain smooth performance on both mobile and desktop
5. WHEN the game is built THEN the system SHALL use pure HTML/CSS/JavaScript with no external dependencies (except Devvit SDK)

### Requirement 9: Game Flow and Round Progression

**User Story:** As a player, I want continuous rounds of gameplay so that I can keep playing until time runs out.

#### Acceptance Criteria

1. WHEN the player makes a correct match THEN the system SHALL immediately generate a new pair of cards
2. WHEN new cards are generated THEN the system SHALL ensure they follow all emoji display rules (size, rotation, placement)
3. WHEN the game is in progress THEN the system SHALL track the number of rounds completed
4. WHEN the game ends THEN the system SHALL display the total number of rounds completed in the game over screen
5. WHEN the game is running THEN the system SHALL continue generating new rounds until the timer reaches 0

### Requirement 10: Performance Metrics and Game Stats

**User Story:** As a player, I want to see my game statistics so that I can understand my performance.

#### Acceptance Criteria

1. WHEN the game ends THEN the system SHALL display the final score
2. WHEN the game ends THEN the system SHALL display the total number of rounds completed
3. WHEN the game ends THEN the system SHALL display the highest combo achieved
4. WHEN the game ends THEN the system SHALL display the total time played
5. WHEN the game ends THEN the system SHALL calculate and display accuracy (correct clicks / total clicks)
