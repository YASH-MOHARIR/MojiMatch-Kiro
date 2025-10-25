import { useEffect, useRef, useState } from 'react';
import { CardPair, CardEmoji } from '../../shared/types/game';

interface EmojiHighlightProps {
  matchingEmoji: string;
  cards: CardPair;
  onComplete: () => void;
}

export function EmojiHighlight({ matchingEmoji, cards, onComplete }: EmojiHighlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in
    setOpacity(1);

    // Auto-dismiss after 2.5 seconds
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 300); // Wait for fade out
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Animation loop for pulsing glow
    let animationFrame: number;
    let pulsePhase = 0;

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Calculate pulsing opacity (0.6 → 1.0 → 0.6)
      pulsePhase += 0.05;
      const pulseOpacity = 0.6 + Math.sin(pulsePhase) * 0.4;

      // Draw highlights on both cards
      [cards.card1, cards.card2].forEach((card, cardIndex) => {
        const cardX = cardIndex === 0 ? rect.width * 0.25 : rect.width * 0.75;
        const cardWidth = rect.width * 0.4;
        const cardHeight = rect.height * 0.8;
        const cardY = rect.height * 0.5;

        // Find matching emoji in this card
        const matchingEmojiData = card.emojis.find((e: CardEmoji) => e.emoji === matchingEmoji);
        if (!matchingEmojiData) return;

        // Calculate emoji position relative to card
        const emojiX = cardX + matchingEmojiData.x * cardWidth;
        const emojiY = cardY + matchingEmojiData.y * cardHeight;
        const emojiSize = matchingEmojiData.size * 40;

        // Draw glowing circle
        ctx.save();
        ctx.globalAlpha = pulseOpacity;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 30;
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(emojiX, emojiY, emojiSize * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Draw inner glow
        ctx.save();
        ctx.globalAlpha = pulseOpacity * 0.3;
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(emojiX, emojiY, emojiSize * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [matchingEmoji, cards]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 0.3s ease',
        zIndex: 100,
      }}
    >
      {/* Canvas for glow effects */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Center display of matching emoji */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          border: '4px solid #FFD700',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{matchingEmoji}</div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          The Match!
        </div>
      </div>
    </div>
  );
}
