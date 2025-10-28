import { useEffect, useRef, useState } from 'react';
import { Card } from '../../shared/types/game';
import { Difficulty } from '../../shared/types/game';

interface GameCanvasProps {
  cards: [Card, Card] | null;
  onEmojiClick?: (emoji: string, isCorrect: boolean) => void;
  difficulty: Difficulty;
  highlightEmoji?: string;
}

interface ClickAnimation {
  x: number;
  y: number;
  type: 'correct' | 'wrong';
  timestamp: number;
}

interface HoverState {
  emoji: string;
  cardIndex: number;
  emojiIndex: number;
}

interface SelectionState {
  emoji: string;
  timestamp: number;
}

export function GameCanvas({ cards, onEmojiClick, difficulty = 'easy', highlightEmoji }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [clickAnimation, setClickAnimation] = useState<ClickAnimation | null>(null);
  const [hoveredEmoji, setHoveredEmoji] = useState<HoverState | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<SelectionState | null>(null);
  const [emojiOffsets, setEmojiOffsets] = useState<Map<string, { x: number; y: number }>>(new Map());
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 500 });
  
  // Enable movement for Hard and GOD modes
  const shouldMove = difficulty === 'hard' || difficulty === 'god';
  const movementSpeed = difficulty === 'god' ? 1.2 : 0.8;

  // Update canvas dimensions based on window size
  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Mobile: vertical layout
        const width = Math.min(window.innerWidth - 32, 400);
        setCanvasDimensions({ width, height: 950 });
      } else {
        // Desktop: horizontal layout
        setCanvasDimensions({ width: 800, height: 500 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initial render - force canvas to draw when cards or dimensions change
  useEffect(() => {
    if (!canvasRef.current || !cards) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Force an immediate render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderCards(ctx, cards, null, null, emojiOffsets, highlightEmoji);
  }, [cards, canvasDimensions]);

  // Movement animation for Hard/GOD modes
  useEffect(() => {
    if (!shouldMove || !cards) return;

    const animate = () => {
      const time = Date.now() * 0.001; // Convert to seconds
      const newOffsets = new Map<string, { x: number; y: number }>();

      cards.forEach((card, cardIndex) => {
        card.emojis.forEach((_emoji, emojiIndex) => {
          const key = `${cardIndex}-${emojiIndex}`;
          // Larger movement radius for more challenge
          const radius = difficulty === 'god' ? 15 : 10;
          // Use smoother easing functions for fluid movement
          const phase = time * movementSpeed + emojiIndex;
          const offsetX = Math.sin(phase) * radius;
          const offsetY = Math.cos(phase * 0.7) * radius;
          newOffsets.set(key, { x: offsetX, y: offsetY });
        });
      });

      setEmojiOffsets(newOffsets);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldMove, cards, movementSpeed, difficulty]);

  useEffect(() => {
    if (!canvasRef.current || !cards) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render both cards with hover and selection states
    renderCards(ctx, cards, hoveredEmoji, selectedEmoji, emojiOffsets, highlightEmoji);

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

    // Clear selection after animation
    if (selectedEmoji) {
      const elapsed = Date.now() - selectedEmoji.timestamp;
      if (elapsed > 300) {
        setSelectedEmoji(null);
      } else {
        requestAnimationFrame(() => {
          setSelectedEmoji({ ...selectedEmoji });
        });
      }
    }
  }, [cards, clickAnimation, hoveredEmoji, selectedEmoji, emojiOffsets, highlightEmoji, canvasDimensions]);

  // Continuous animation for highlighted emoji
  useEffect(() => {
    if (!highlightEmoji) return;

    const animate = () => {
      // Trigger re-render for pulsing effect
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx && cards) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          renderCards(ctx, cards, hoveredEmoji, selectedEmoji, emojiOffsets, highlightEmoji);
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [highlightEmoji, cards, hoveredEmoji, selectedEmoji, emojiOffsets]);

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
    const clickedEmoji = getClickedEmoji(x, y, cards, canvas.width, canvas.height);
    if (clickedEmoji) {
      setSelectedEmoji({ emoji: clickedEmoji, timestamp: Date.now() });
      onEmojiClick(clickedEmoji, false);
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cards) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Get mouse coordinates relative to canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    // Find which emoji is being hovered
    const hoverInfo = getHoveredEmoji(x, y, cards, canvas.width, canvas.height);
    setHoveredEmoji(hoverInfo);
  };

  const handleCanvasMouseLeave = () => {
    setHoveredEmoji(null);
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
    const clickedEmoji = getClickedEmoji(x, y, cards, canvas.width, canvas.height);
    if (clickedEmoji) {
      setSelectedEmoji({ emoji: clickedEmoji, timestamp: Date.now() });
      onEmojiClick(clickedEmoji, false);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      onMouseLeave={handleCanvasMouseLeave}
      onTouchEnd={handleCanvasTouch}
      style={{
        maxWidth: '100%',
        width: '100%',
        height: 'auto',
        borderRadius: '12px',
        backgroundColor: '#f5f5f5',
        cursor: hoveredEmoji ? 'pointer' : 'default',
        touchAction: 'manipulation',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    />
  );
}

/**
 * Renders both cards side-by-side on the canvas
 */
function renderCards(
  ctx: CanvasRenderingContext2D,
  cards: [Card, Card],
  hoveredEmoji: HoverState | null,
  selectedEmoji: SelectionState | null,
  emojiOffsets?: Map<string, { x: number; y: number }>,
  highlightEmoji?: string
) {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  // Check if we should use vertical layout (mobile)
  const isVertical = canvasWidth < 768;

  if (isVertical) {
    // Vertical layout for mobile - make cards fit the canvas width
    const cardWidth = Math.min(canvasWidth - 40, 350); // Leave 20px padding on each side
    const cardHeight = 450;
    const gap = 20;
    const totalHeight = cardHeight * 2 + gap;
    const startX = (canvasWidth - cardWidth) / 2;
    const startY = (canvasHeight - totalHeight) / 2;

    // Card 1 position (top)
    const card1X = startX;
    const card1Y = startY;

    // Card 2 position (bottom)
    const card2X = startX;
    const card2Y = startY + cardHeight + gap;

    // Render cards
    renderCard(ctx, cards[0], card1X, card1Y, cardWidth, cardHeight, 0, hoveredEmoji, selectedEmoji, emojiOffsets, highlightEmoji);
    renderCard(ctx, cards[1], card2X, card2Y, cardWidth, cardHeight, 1, hoveredEmoji, selectedEmoji, emojiOffsets, highlightEmoji);
  } else {
    // Horizontal layout for desktop
    const cardWidth = 350;
    const cardHeight = 450;
    const gap = 20;
    const totalWidth = cardWidth * 2 + gap;
    const startX = (canvasWidth - totalWidth) / 2;
    const startY = (canvasHeight - cardHeight) / 2;

    // Card 1 position (left)
    const card1X = startX;
    const card1Y = startY;

    // Card 2 position (right)
    const card2X = startX + cardWidth + gap;
    const card2Y = startY;

    // Render cards
    renderCard(ctx, cards[0], card1X, card1Y, cardWidth, cardHeight, 0, hoveredEmoji, selectedEmoji, emojiOffsets, highlightEmoji);
    renderCard(ctx, cards[1], card2X, card2Y, cardWidth, cardHeight, 1, hoveredEmoji, selectedEmoji, emojiOffsets, highlightEmoji);
  }
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
  height: number,
  cardIndex: number,
  hoveredEmoji: HoverState | null,
  selectedEmoji: SelectionState | null,
  emojiOffsets?: Map<string, { x: number; y: number }>,
  highlightEmoji?: string
) {
  // Draw card background
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]); // Dashed border

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
  ctx.setLineDash([]); // Reset line dash

  // Add shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.restore();

  // Render emojis on this card
  card.emojis.forEach((emojiInstance, emojiIndex) => {
    const isHovered =
      hoveredEmoji?.cardIndex === cardIndex && hoveredEmoji?.emojiIndex === emojiIndex;
    const isSelected = selectedEmoji?.emoji === emojiInstance.emoji;
    const isHighlighted = highlightEmoji === emojiInstance.emoji;
    const key = `${cardIndex}-${emojiIndex}`;
    const movementOffset = emojiOffsets?.get(key);
    renderEmoji(ctx, emojiInstance, x, y, isHovered, isSelected, selectedEmoji?.timestamp, movementOffset, isHighlighted);
  });
}

/**
 * Renders a single emoji with rotation and scaling
 */
function renderEmoji(
  ctx: CanvasRenderingContext2D,
  emojiInstance: { emoji: string; x: number; y: number; size: number; rotation: number },
  cardX: number,
  cardY: number,
  isHovered: boolean,
  isSelected: boolean,
  selectionTimestamp?: number,
  movementOffset?: { x: number; y: number },
  isHighlighted?: boolean
) {
  ctx.save();

  // Calculate absolute position with optional movement offset
  const offsetX = movementOffset?.x || 0;
  const offsetY = movementOffset?.y || 0;
  const absoluteX = cardX + emojiInstance.x + offsetX;
  const absoluteY = cardY + emojiInstance.y + offsetY;

  // Move to emoji position
  ctx.translate(absoluteX, absoluteY);

  // Apply rotation
  ctx.rotate((emojiInstance.rotation * Math.PI) / 180);

  // Calculate scale with hover and selection effects
  let scale = emojiInstance.size;
  
  if (isSelected && selectionTimestamp) {
    // Selection animation: quick scale up then down
    const elapsed = Date.now() - selectionTimestamp;
    const progress = Math.min(elapsed / 300, 1);
    const bounce = Math.sin(progress * Math.PI);
    scale = emojiInstance.size * (1 + bounce * 0.3);
  } else if (isHovered) {
    // Hover animation: gentle scale up with pulse
    const pulse = Math.sin(Date.now() * 0.005) * 0.05;
    scale = emojiInstance.size * (1.15 + pulse);
  }

  // Apply scaling
  ctx.scale(scale, scale);

  // Add glow effect for highlight (game over)
  if (isHighlighted) {
    ctx.shadowColor = 'rgba(255, 215, 0, 1)';
    ctx.shadowBlur = 30;
    // Add pulsing effect
    const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
    ctx.globalAlpha = 0.8 + pulse * 0.2;
  }
  // Add glow effect for hover
  else if (isHovered) {
    ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
    ctx.shadowBlur = 15;
  }
  // Add glow effect for selection
  else if (isSelected) {
    ctx.shadowColor = 'rgba(34, 197, 94, 0.9)';
    ctx.shadowBlur = 20;
  }

  // Set font and render emoji
  const baseFontSize = 40;
  ctx.font = `${baseFontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(emojiInstance.emoji, 0, 0);

  ctx.restore();
}

/**
 * Detects which emoji is being hovered based on mouse coordinates
 */
function getHoveredEmoji(mouseX: number, mouseY: number, cards: [Card, Card], canvasWidth: number, canvasHeight: number): HoverState | null {
  // Check if we should use vertical layout (mobile)
  const isVertical = canvasWidth < 768;

  if (isVertical) {
    // Vertical layout - responsive card width
    const cardWidth = Math.min(canvasWidth - 40, 350);
    const cardHeight = 450;
    const gap = 20;
    const totalHeight = cardHeight * 2 + gap;
    const startX = (canvasWidth - cardWidth) / 2;
    const startY = (canvasHeight - totalHeight) / 2;

    const card1X = startX;
    const card1Y = startY;
    const card2X = startX;
    const card2Y = startY + cardHeight + gap;

    // Check card 1
    const hover1 = checkEmojiHover(mouseX, mouseY, cards[0], card1X, card1Y, 0);
    if (hover1) return hover1;

    // Check card 2
    const hover2 = checkEmojiHover(mouseX, mouseY, cards[1], card2X, card2Y, 1);
    if (hover2) return hover2;
  } else {
    // Horizontal layout
    const cardWidth = 350;
    const cardHeight = 450;
    const gap = 20;
    const totalWidth = cardWidth * 2 + gap;
    const startX = (canvasWidth - totalWidth) / 2;
    const startY = (canvasHeight - cardHeight) / 2;

    const card1X = startX;
    const card1Y = startY;
    const card2X = startX + cardWidth + gap;
    const card2Y = startY;

    // Check card 1
    const hover1 = checkEmojiHover(mouseX, mouseY, cards[0], card1X, card1Y, 0);
    if (hover1) return hover1;

    // Check card 2
    const hover2 = checkEmojiHover(mouseX, mouseY, cards[1], card2X, card2Y, 1);
    if (hover2) return hover2;
  }

  return null;
}

/**
 * Checks if mouse is hovering over any emoji on a specific card
 */
function checkEmojiHover(
  mouseX: number,
  mouseY: number,
  card: Card,
  cardX: number,
  cardY: number,
  cardIndex: number
): HoverState | null {
  const hitRadius = 30; // Approximate hit area radius

  // Check each emoji (in reverse order to match rendering order)
  for (let i = card.emojis.length - 1; i >= 0; i--) {
    const emoji = card.emojis[i];
    if (!emoji) continue;

    const absoluteX = cardX + emoji.x;
    const absoluteY = cardY + emoji.y;

    // Calculate distance from mouse to emoji center
    const dx = mouseX - absoluteX;
    const dy = mouseY - absoluteY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check if mouse is within hit radius (scaled by emoji size)
    const scaledHitRadius = hitRadius * emoji.size;
    if (distance <= scaledHitRadius) {
      return { emoji: emoji.emoji, cardIndex, emojiIndex: i };
    }
  }

  return null;
}

/**
 * Detects which emoji was clicked based on click coordinates
 */
function getClickedEmoji(clickX: number, clickY: number, cards: [Card, Card], canvasWidth: number, canvasHeight: number): string | null {
  // Check if we should use vertical layout (mobile)
  const isVertical = canvasWidth < 768;

  if (isVertical) {
    // Vertical layout - responsive card width
    const cardWidth = Math.min(canvasWidth - 40, 350);
    const cardHeight = 450;
    const gap = 20;
    const totalHeight = cardHeight * 2 + gap;
    const startX = (canvasWidth - cardWidth) / 2;
    const startY = (canvasHeight - totalHeight) / 2;

    const card1X = startX;
    const card1Y = startY;
    const card2X = startX;
    const card2Y = startY + cardHeight + gap;

    // Check card 1
    const emoji1 = checkEmojiClick(clickX, clickY, cards[0], card1X, card1Y);
    if (emoji1) return emoji1;

    // Check card 2
    const emoji2 = checkEmojiClick(clickX, clickY, cards[1], card2X, card2Y);
    if (emoji2) return emoji2;
  } else {
    // Horizontal layout
    const cardWidth = 350;
    const cardHeight = 450;
    const gap = 20;
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
  }

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
