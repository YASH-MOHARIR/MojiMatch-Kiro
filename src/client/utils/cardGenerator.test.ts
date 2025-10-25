import { generateCardPair, verifyCardPair } from './cardGenerator';
import { EMOJI_POOL } from '../../shared/constants/emojis';

/**
 * Basic tests for card generation
 * Run these in the browser console or with a test runner
 */

export function runCardGeneratorTests() {
  console.log('🧪 Running Card Generator Tests...\n');

  let passedTests = 0;
  let totalTests = 0;

  // Test 1: Emoji pool has 30 emojis
  totalTests++;
  if (EMOJI_POOL.length === 30) {
    console.log('✅ Test 1: Emoji pool has 30 emojis');
    passedTests++;
  } else {
    console.log(`❌ Test 1: Expected 30 emojis, got ${EMOJI_POOL.length}`);
  }

  // Test 2: Each card has 8 emojis
  totalTests++;
  const { cards } = generateCardPair();
  if (cards[0].emojis.length === 8 && cards[1].emojis.length === 8) {
    console.log('✅ Test 2: Each card has 8 emojis');
    passedTests++;
  } else {
    console.log(
      `❌ Test 2: Expected 8 emojis per card, got ${cards[0].emojis.length} and ${cards[1].emojis.length}`
    );
  }

  // Test 3: Exactly 1 matching emoji
  totalTests++;
  const verification = verifyCardPair(cards[0], cards[1]);
  if (verification.isValid && verification.matchingEmojis.length === 1) {
    console.log('✅ Test 3: Exactly 1 matching emoji between cards');
    passedTests++;
  } else {
    console.log(
      `❌ Test 3: Expected 1 matching emoji, got ${verification.matchingEmojis.length}`,
      verification.matchingEmojis
    );
  }

  // Test 4: Size range (0.8 - 2.5)
  totalTests++;
  const allSizesValid = [...cards[0].emojis, ...cards[1].emojis].every(
    e => e.size >= 0.8 && e.size <= 2.5
  );
  if (allSizesValid) {
    console.log('✅ Test 4: All emoji sizes are within 0.8 - 2.5 range');
    passedTests++;
  } else {
    console.log('❌ Test 4: Some emoji sizes are outside valid range');
  }

  // Test 5: Rotation range (0 - 360)
  totalTests++;
  const allRotationsValid = [...cards[0].emojis, ...cards[1].emojis].every(
    e => e.rotation >= 0 && e.rotation <= 360
  );
  if (allRotationsValid) {
    console.log('✅ Test 5: All emoji rotations are within 0 - 360 range');
    passedTests++;
  } else {
    console.log('❌ Test 5: Some emoji rotations are outside valid range');
  }

  // Test 6: Multiple generations produce valid results
  totalTests++;
  let allGenerationsValid = true;
  for (let i = 0; i < 10; i++) {
    const { cards: testCards } = generateCardPair();
    const testVerification = verifyCardPair(testCards[0], testCards[1]);
    if (!testVerification.isValid) {
      allGenerationsValid = false;
      break;
    }
  }
  if (allGenerationsValid) {
    console.log('✅ Test 6: 10 consecutive generations all produce valid card pairs');
    passedTests++;
  } else {
    console.log('❌ Test 6: Some generations produced invalid card pairs');
  }

  // Summary
  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️ Some tests failed');
  }

  return { passedTests, totalTests };
}

// Auto-run tests in development
if (import.meta.env.DEV) {
  console.log('Running card generator tests...');
  runCardGeneratorTests();
}
