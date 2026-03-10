import { Difficulty } from '@/types/game';
import { DIFFICULTY_CONFIGS } from './constants';

export function calculateScore(difficulty: Difficulty, moves: number, timeSeconds: number): number {
  const { scoreMultiplier, gridSize } = DIFFICULTY_CONFIGS[difficulty];
  const baseScore = gridSize * gridSize * 100;
  const movePenalty = Math.max(1, moves);
  const timePenalty = Math.max(1, Math.floor(timeSeconds / 10));
  return Math.max(100, Math.floor((baseScore * scoreMultiplier) / (movePenalty * timePenalty) * 1000));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
