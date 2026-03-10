import { useEffect } from 'react';
import { Position } from '@/types/game';

interface KeyboardOptions {
  cursor: Position;
  gridSize: number;
  onMove: (pos: Position) => void;
  onRotate: () => void;
  onPause: () => void;
}

export function useKeyboard({ cursor, gridSize, onMove, onRotate, onPause }: KeyboardOptions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const N = gridSize;
      switch (e.key) {
        case 'ArrowUp':    e.preventDefault(); onMove({ row: Math.max(0, cursor.row - 1), col: cursor.col }); break;
        case 'ArrowDown':  e.preventDefault(); onMove({ row: Math.min(N - 1, cursor.row + 1), col: cursor.col }); break;
        case 'ArrowLeft':  e.preventDefault(); onMove({ row: cursor.row, col: Math.max(0, cursor.col - 1) }); break;
        case 'ArrowRight': e.preventDefault(); onMove({ row: cursor.row, col: Math.min(N - 1, cursor.col + 1) }); break;
        case ' ':
        case 'Enter':      e.preventDefault(); onRotate(); break;
        case 'Escape':
        case 'p':
        case 'P':          onPause(); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cursor, gridSize, onMove, onRotate, onPause]);
}
