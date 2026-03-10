# Pipe Puzzle — Neon Cyberpunk

A classic pipe-rotating puzzle game with a neon cyberpunk aesthetic. Rotate pipe pieces on a grid to create a continuous path connecting the source to all sinks.

![Pipe Puzzle Screenshot](screenshot.png)

## Features

- 🎮 Three difficulty levels: Easy (5×5), Medium (7×7), Hard (10×10)
- 🌈 Neon cyberpunk theme with glowing pipe effects
- ⌨️ Full keyboard navigation (arrow keys + space/enter to rotate)
- 📱 Mobile-friendly touch controls
- 🔊 Synthetic Web Audio API sound effects (no audio files needed)
- 💾 Local high score persistence
- ⏸ Pause/resume functionality
- ⚡ Procedurally generated, always-solvable puzzles
- 🏆 Score system based on moves and time
- 🎯 Visual flow propagation from source through connected pipes

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3 + inline neon glow styles
- **Animations**: Framer Motion 11
- **Fonts**: Orbitron + Rajdhani (Google Fonts)
- **Audio**: Web Audio API (no external files)
- **State**: React hooks only (no external state library)

## Controls

### Keyboard
| Key | Action |
|-----|--------|
| Arrow Keys | Move cursor |
| Space / Enter | Rotate pipe at cursor |
| P / Escape | Pause / Resume |

### Mouse / Touch
- **Click / Tap** a pipe to rotate it 90° clockwise
- Buttons in the HUD for pause, new game, and menu

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/pipe-puzzle.git
cd pipe-puzzle

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click **Deploy** — no configuration needed!

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## How the Puzzle Works

1. The grid is generated using a **recursive-backtracker maze algorithm**, which creates a spanning tree — guaranteeing a unique solution path exists.
2. Sinks are placed at dead-ends farthest from the source for maximum challenge.
3. All pipe rotations are randomized after generation.
4. A **BFS flood-fill** runs from the source after each rotation to detect which cells are connected, updating the visual state in real time.

## License

MIT © 2024
