# 🎮 MojiMatcher

A fast-paced emoji matching game built for Reddit using Devvit. Find the one emoji that appears on both cards before time runs out!

## 🎯 Game Features

- **Fast-Paced Gameplay**: 150-second countdown timer with dynamic time bonuses
- **Combo System**: Build combos for bonus points (up to 10x multiplier)
- **Visual Variety**: Random emoji sizes (0.8x-2.5x) and rotations (0-360°)
- **Audio Feedback**: Sound effects and music with toggle controls
- **Leaderboard**: Top 5 high scores with Reddit integration
- **Mobile Optimized**: Responsive design with touch support
- **Smooth Animations**: Green flash for correct, red shake for wrong clicks

## 🎲 How to Play

1. Look at two cards, each containing 8 emojis
2. Find the ONE emoji that appears on both cards
3. Click it before time runs out!
4. **Correct match**: +25 base points, +10 seconds, combo builds
5. **Wrong click**: -1 second, combo resets
6. Build combos for bonus points: 2x = 35pts, 3x = 45pts, 5x = 65pts, 10x = 115pts

## 🚀 Getting Started

### Prerequisites

- Node.js 22.2.0 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the Devvit playtest environment and provide a URL to test the game.

### Building

```bash
npm run build
```

### Deployment

```bash
npm run launch
```

## 📁 Project Structure

```
src/
├── client/              # Frontend React application
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   └── main.tsx         # Entry point
├── server/              # Express server
│   ├── core/            # Business logic
│   └── index.ts         # Server entry point
└── shared/              # Shared types
    ├── types/
    └── constants/
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - Run linting and type checking
- `npm run launch` - Submit for review

## 📝 License

Built with ❤️ using Devvit
