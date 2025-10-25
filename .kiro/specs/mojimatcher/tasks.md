# Implementation Plan - MVP

## Phase 1: Core Game Mechanics (MVP)

- [x] 1. Set up project structure and emoji pool

  - Create emoji pool constant with 30 unique emojis
  - Set up TypeScript interfaces for Card and EmojiInstance
  - Create basic project structure (client/server/shared)
  - _Requirements: 2.4_

- [x] 2. Implement card generation logic

  - Implement card pair generation algorithm ensuring exactly 1 matching emoji
  - Select 1 matching emoji + 7 unique emojis for each card
  - Shuffle emoji positions on each card
  - Add unit tests to verify exactly 1 matching emoji per pair
  - _Requirements: 2.2, 2.3, 2.4_

- [x] 3. Add random size and rotation to emojis

  - Implement random size generation (0.8x to 2.5x scale)
  - Implement random rotation (0-360 degrees)
  - Apply transformations to each emoji instance
  - _Requirements: 2.5, 2.6_

- [x] 4. Implement basic positioning (no overlap prevention yet)

  - Create simple random positioning within card boundaries
  - Ensure emojis stay within card bounds
  - _Requirements: 2.7_

- [x] 5. Set up canvas rendering

  - [x] 5.1 Create basic canvas setup

    - Set up HTML5 Canvas element

    - Configure canvas dimensions (800px max width)
    - Create two-card side-by-side layout
    - _Requirements: 2.1, 8.1_

  - [x] 5.2 Implement emoji rendering with transformations

    - Render emojis with rotation using ctx.rotate()
    - Render emojis with scaling using ctx.scale()
    - Apply transformations correctly with save/restore
    - _Requirements: 2.5, 2.6_

  - [x] 5.3 Add basic card styling

    - Draw card backgrounds
    - Add rounded corners
    - Add simple borders
    - _Requirements: 2.1_

- [x] 6. Implement click detection



  - Create click event listener on canvas
  - Map click coordinates to emoji positions
  - Identify which emoji was clicked
  - Handle rotated emoji hit detection (basic bounding box)
  - _Requirements: 2.8_

- [x] 7. Implement basic game logic



  - Create GameState manager with essential state
  - Implement correct match detection (clicked emoji matches the common emoji)
  - Implement wrong click detection
  - Generate new card pair after correct match
  - Add console logging for debugging match detection
  - _Requirements: 9.1, 9.5_

- [x] 8. Add basic visual feedback



  - Show simple text feedback for correct/wrong clicks
  - Display current score on screen
  - Display which emoji is the matching one (for testing/debugging)
  - _Requirements: 5.1, 5.2_

- [-] 9. Implement basic timer


  - Create countdown timer starting at 150 seconds
  - Display timer on screen
  - Stop game when timer reaches 0
  - Add time (+10s) on correct match
  - Subtract time (-1s) on wrong click
  - _Requirements: 3.1, 3.2, 3.9, 3.10_

- [ ] 10. Implement basic scoring

  - Award 25 base points for correct matches
  - Display total score
  - Track number of rounds completed
  - _Requirements: 4.1_

- [ ] 11. Create simple game flow

  - Add "Start Game" button
  - Show game screen when started
  - Show "Game Over" screen when timer expires
  - Display final score and rounds completed
  - Add "Play Again" button
  - _Requirements: 1.1, 1.2, 1.4, 1.5, 3.8_

- [ ] 12. Test MVP functionality
  - Verify emojis render with correct sizes and rotations
  - Verify exactly 1 common emoji exists between cards
  - Verify click detection works
  - Verify correct/wrong match detection works
  - Verify new cards generate after correct match
  - Verify timer counts down and game ends at 0
  - Verify score increases on correct matches
  - _Requirements: 2.2, 2.3, 2.5, 2.6, 2.8, 3.1, 3.8, 4.1_

## Phase 2: Enhanced Features (Post-MVP)

- [ ] 13. Implement combo system

  - Add combo multiplier logic
  - Calculate points with combo formula
  - Reset combo on wrong clicks
  - Display combo indicator
  - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [ ] 14. Add visual animations

  - Green flash for correct matches
  - Red shake for wrong clicks
  - Score popup animations
  - _Requirements: 5.1, 5.2, 5.5, 5.6_

- [ ] 15. Implement timer color states

  - Green for >75s
  - Yellow for 30-75s
  - Red for <30s
  - _Requirements: 3.3, 3.4, 3.5_

- [ ] 16. Add audio system

  - Game sounds (correct, wrong, start, end)
  - Combo sounds
  - Timer warning sounds
  - Background music
  - Audio toggles
  - _Requirements: 6.1-6.12_

- [ ] 17. Improve positioning with overlap prevention

  - Implement physics-based positioning
  - Prevent emoji overlapping
  - _Requirements: 2.7_

- [ ] 18. Create full menu system

  - Main menu with multiple options
  - Leaderboard screen
  - Settings screen
  - _Requirements: 1.1, 1.3_

- [ ] 19. Implement server API and leaderboard

  - Set up Express server
  - Create save score endpoint
  - Create leaderboard endpoint
  - Integrate with Redis
  - _Requirements: 7.1, 7.2, 7.3, 7.5, 9.1, 9.2, 9.3_

- [ ] 20. Add responsive design and mobile optimization

  - Optimize for mobile screens
  - Improve touch targets
  - Test on multiple devices
  - _Requirements: 8.2, 8.3, 8.4_

- [ ] 21. Performance optimization and polish
  - Optimize rendering performance
  - Add error handling
  - Write comprehensive tests
  - Create splash screen
  - Final testing and polish
  - _Requirements: 8.4, 8.5_
