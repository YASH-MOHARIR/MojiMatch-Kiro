import { useEffect, useRef, useState } from 'react';
import { Card } from '../../shared/types/game';

interface GameCanvasProps {
  cards: [Card, Card] | null;
  onEmojiClick?: (emoji: string, isCorrect: boolean) => void;
}

interface ClickAnimation {
  x: number;
  y: number;
  type: 'correct' | 'wrong';
  timestamp: number;
}

export function GameCanvas({ cards, onEmojiClick }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clickAnimation, setClickAnimation] = useState<ClickAnimation | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !cards) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render both cards
    renderCards(ctx, cards);

    // Render click animation if active
    if (clickAnimation) {
      const elapsed = Date.now() - clickAnimation.timestamp;
      if (elapsed < 500) {
        renderClickAnimation(ctx, clickAnimation, elapsed);
        // Request next frame
        requestAnimationFrame(() => {
          setClickAnimation({ ...clickAnimation });
        });
      } else {
        setClickAnimation(null);
      }
    }
  }, [cards, clickAnimation]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cards || !onEmojiClick) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Get click coordinates relative to canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    // Find which emoji was clicked
    const clickedEmoji = getClickedEmoji(x, y, cards);
    if (clickedEmoji) {
      onEmojiClick(clickedEmoji, false);
    }
  };

  const handleCanvasTouch = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cards || !onEmojiClick) return;

    event.preventDefault(); // Prevent scrolling

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0] || event.changedTouches[0];
    
    if (!touch) return;

    // Get touch coordinates relative to canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

    // Find which emoji was touched
    const clickedEmoji = getClickedEmoji(x, y, cards);
    if (clickedEmoji) {
      onEmojiClick(clickedEmoji, false);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      onClick={handleCanvasClick}
      onTouchEnd={handleCanvasTouch}
      style={{
        maxWidth: '100%',
        width: '100%',
        height: 'auto',
        border: '2px solid #333',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        cursor: 'pointer',
        touchAction: 'manipulation', // Improve touch responsiveness
      }}
    />
  );
}

/**
 * Renders both cards side-by-side on the canvas
 */
function renderCards(ctx: CanvasRenderingContext2D, cards: [Card, Card]) {
  const cardWidth = 350;
  const cardHeight = 450;
  const gap = 20;
  const canvasWidth = 800;
  const canvasHeight = 500;

  // Calculate positions to center cards
  const totalWidth = cardWidth * 2 + gap;
  const startX = (canvasWidth - totalWidth) / 2;
  const startY = (canvasHeight - cardHeight) / 2;

  // Card 1 position
  const card1X = startX;
  const card1Y = startY;

  // Card 2 position
  const card2X = startX + cardWidth + gap;
  const card2Y = startY;

  // Render card 1
  renderCard(ctx, cards[0], card1X, card1Y, cardWidth, cardHeight);

  // Render card 2
  renderCard(ctx, cards[1], card2X, card2Y, cardWidth, cardHeight);
}

/**
 * Renders a single card with its background and emojis
 */
function renderCard(
  ctx: CanvasRenderingContext2D,
  card: Card,
  x: number,
  y: number,
  width: number,
  height: number
) {
  // Draw card background
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2;

  // Draw rounded rectangle for card
  const radius = 12;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  // Fill and stroke
  ctx.fill();
  ctx.stroke();

  // Add shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.restore();

  // Render emojis on this card
  card.emojis.forEach((emojiInstance) => {
    renderEmoji(ctx, emojiInstance, x, y);
  });
}

/**
 * Renders a single emoji with rotation and scaling
 */
function renderEmoji(
  ctx: CanvasRenderingContext2D,
  emojiInstance: { emoji: string; x: number; y: number; size: number; rotation: number },
  cardX: number,
  cardY: number
) {
  
  ctx.save();

  // Calculate absolute position
  const absoluteX = cardX + emojiInstance.x;
  const absoluteY = cardY + emojiInstance.y;

  // Move to emoji position
  ctx.translate(absoluteX, absoluteY);

  // Apply rotation
  ctx.rotate((emojiInstance.rotation * Math.PI) / 180);

  // Apply scaling
  ctx.scale(emojiInstance.size, emojiInstance.size);

  // Set font and render emoji
  const baseFontSize = 40;
  ctx.font = `${baseFontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(emojiInstance.emoji, 0, 0);

  ctx.restore();
}

/**
 * Detects which emoji was clicked based on click coordinates
 */
function getClickedEmoji(clickX: number, clickY: number, cards: [Card, Card]): string | null {
  const cardWidth = 350;
  const cardHeight = 450;
  const gap = 20;
  const canvasWidth = 800;
  const canvasHeight = 500;

  // Calculate card positions
  const totalWidth = cardWidth * 2 + gap;
  const startX = (canvasWidth - totalWidth) / 2;
  const startY = (canvasHeight - cardHeight) / 2;

  const card1X = startX;
  const card1Y = startY;
  const card2X = startX + cardWidth + gap;
  const card2Y = startY;

  // Check card 1
  const emoji1 = checkEmojiClick(clickX, clickY, cards[0], card1X, card1Y);
  if (emoji1) return emoji1;

  // Check card 2
  const emoji2 = checkEmojiClick(clickX, clickY, cards[1], card2X, card2Y);
  if (emoji2) return emoji2;

  return null;
}

/**
 * Checks if click hit any emoji on a specific card
 */
function checkEmojiClick(
  clickX: number,
  clickY: number,
  card: Card,
  cardX: number,
  cardY: number
): string | null {
  const hitRadius = 30; // Approximate hit area radius

  // Check each emoji (in reverse order to match rendering order)
  for (let i = card.emojis.length - 1; i >= 0; i--) {
    const emoji = card.emojis[i];
    if (!emoji) continue;
    
    const absoluteX = cardX + emoji.x;
    const absoluteY = cardY + emoji.y;

    // Calculate distance from click to emoji center
    const dx = clickX - absoluteX;
    const dy = clickY - absoluteY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if click is within hit radius (scaled by emoji size)
    const scaledHitRadius = hitRadius * emoji.size;
    if (distance <= scaledHitRadius) {
      return emoji.emoji;
    }
  }

  return null;
}

/**
 * Renders click animation (green flash or red shake)
 */
function renderClickAnimation(
  ctx: CanvasRenderingContext2D,
  animation: ClickAnimation,
  elapsed: number
) {
  const progress = elapsed / 500; // 500ms animation
  const opacity = 1 - progress;

  ctx.save();

  if (animation.type === 'correct') {
    // Green flash animation
    const radius = 50 + progress * 100;
    const gradient = ctx.createRadialGradient(
      animation.x,
      animation.y,
      0,
      animation.x,
      animation.y,
      radius
    );
    gradient.addColorStop(0, `rgba(34, 197, 94, ${opacity * 0.6})`);
    gradient.addColorStop(1, `rgba(34, 197, 94, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  } else {
    // Red shake animation
    const shakeAmount = Math.sin(elapsed * 0.05) * 10 * (1 - progress);
    ctx.translate(shakeAmount, 0);

    const radius = 50;
    const gradient = ctx.createRadialGradient(
      animation.x,
      animation.y,
      0,
      animation.x,
      animation.y,
      radius
    );
    gradient.addColorStop(0, `rgba(239, 68, 68, ${opacity * 0.6})`);
    gradient.addColorStop(1, `rgba(239, 68, 68, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  ctx.restore();
}
