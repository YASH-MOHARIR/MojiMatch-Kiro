import { useState, useEffect } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { generateCardPair, verifyCardPair } from './utils/cardGenerator';
import { Card } from '../shared/types/game';

export const App = () => {
  const [cards, setCards] = useState<[Card, Card] | null>(null);
  const [matchingEmoji, setMatchingEmoji] = useState<string | null>(null);

  // Generate initial cards on mount
  useEffect(() => {
    generateNewCards();
  }, []);

  const generateNewCards = () => {
    const { cards: newCards, matchingEmoji: newMatch } = generateCardPair();
    setCards(newCards);
    setMatchingEmoji(newMatch);

    // Verify card pair (for testing)
    const verification = verifyCardPair(newCards[0], newCards[1]);
    console.log('Card verification:', verification);
    console.log('Matching emoji:', newMatch);
  };

  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-4 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-900">MojiMatcher MVP</h1>

      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-center text-gray-700">
          Find the matching emoji! (Hint: <span className="text-2xl">{matchingEmoji}</span>)
        </p>

        {cards && <GameCanvas cards={cards} />}

        <button
          className="px-6 py-3 bg-[#d93900] text-white rounded-lg font-semibold hover:bg-[#c13300] transition-colors"
          onClick={generateNewCards}
        >
          Generate New Cards
        </button>

        <div className="text-sm text-gray-600 text-center max-w-md">
          <p>✅ Task 1-5 Complete:</p>
          <ul className="list-disc list-inside text-left mt-2">
            <li>30 emoji pool created</li>
            <li>Card generation with exactly 1 matching emoji</li>
            <li>Random sizes (0.8x - 2.5x)</li>
            <li>Random rotations (0-360°)</li>
            <li>Canvas rendering with transformations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
