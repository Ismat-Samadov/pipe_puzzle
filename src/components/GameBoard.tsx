'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { Cell, Position } from '@/types/game';
import { PipeCell } from './PipeCell';
import { useKeyboard } from '@/hooks/useKeyboard';

interface GameBoardProps {
  grid: Cell[][];
  sourcePos: Position;
  onRotate: (row: number, col: number) => void;
  isPaused: boolean;
  isComplete: boolean;
}

function useCellSize(gridSize: number): number {
  const [cellSize, setCellSize] = useState(60);

  useEffect(() => {
    function compute() {
      const maxW = Math.min(window.innerWidth - 32, 640);
      const maxH = Math.min(window.innerHeight - 200, 640);
      const maxCell = Math.floor(Math.min(maxW, maxH) / gridSize);
      setCellSize(Math.min(72, Math.max(40, maxCell)));
    }
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [gridSize]);

  return cellSize;
}

export function GameBoard({ grid, sourcePos, onRotate, isPaused, isComplete }: GameBoardProps) {
  const gridSize = grid.length;
  const [cursor, setCursor] = useState<Position>({ row: 0, col: 0 });
  const cellSize = useCellSize(gridSize);

  const handleRotate = useCallback(() => {
    if (!isPaused && !isComplete) onRotate(cursor.row, cursor.col);
  }, [cursor, isPaused, isComplete, onRotate]);

  const handlePause = useCallback(() => {
    // handled by parent
  }, []);

  useKeyboard({
    cursor,
    gridSize,
    onMove: setCursor,
    onRotate: handleRotate,
    onPause: handlePause,
  });

  return (
    <div
      className="inline-block rounded-lg overflow-hidden"
      style={{
        boxShadow: '0 0 40px #00d4ff22, 0 0 80px #00d4ff11, inset 0 0 30px #00000088',
        background: '#030818',
        border: '1px solid #1a2a5a',
      }}
    >
      {grid.map((row, r) => (
        <div key={r} className="flex">
          {row.map((cell, c) => (
            <PipeCell
              key={`${r}-${c}`}
              cell={cell}
              cellSize={cellSize}
              isKeyboardCursor={cursor.row === r && cursor.col === c}
              onClick={() => onRotate(r, c)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
