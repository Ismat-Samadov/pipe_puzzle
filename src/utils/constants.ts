import { DifficultyConfig, Difficulty } from '@/types/game';

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    gridSize: 5,
    numSinks: 1,
    label: 'Easy',
    description: '5×5 grid · 1 endpoint',
    scoreMultiplier: 1,
  },
  medium: {
    gridSize: 7,
    numSinks: 2,
    label: 'Medium',
    description: '7×7 grid · 2 endpoints',
    scoreMultiplier: 2.5,
  },
  hard: {
    gridSize: 10,
    numSinks: 3,
    label: 'Hard',
    description: '10×10 grid · 3 endpoints',
    scoreMultiplier: 5,
  },
};

export const CELL_SIZE = 60; // base cell size in px
export const MAX_HIGH_SCORES = 5;
