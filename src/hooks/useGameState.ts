'use client';

import { useState, useCallback } from 'react';
import { Difficulty, GameState } from '@/types/game';
import { generateGrid } from '@/utils/gridGenerator';
import { checkFlow } from '@/utils/flowChecker';
import { rotateCell } from '@/utils/pipeUtils';

function makeInitialState(): GameState {
  return {
    grid: [],
    difficulty: 'easy',
    moves: 0,
    timeElapsed: 0,
    isPaused: false,
    isComplete: false,
    isStarted: false,
    sourcePos: { row: 0, col: 0 },
    sinkPositions: [],
    connectedSinks: 0,
  };
}

export function useGameState() {
  const [state, setState] = useState<GameState>(makeInitialState);

  const startGame = useCallback((difficulty: Difficulty) => {
    const { grid, sourcePos, sinkPositions } = generateGrid(difficulty);
    const { newGrid, connectedSinks } = checkFlow(grid, sourcePos, sinkPositions);
    setState({
      grid: newGrid,
      difficulty,
      moves: 0,
      timeElapsed: 0,
      isPaused: false,
      isComplete: false,
      isStarted: true,
      sourcePos,
      sinkPositions,
      connectedSinks,
    });
  }, []);

  const rotateAt = useCallback((row: number, col: number) => {
    setState(prev => {
      if (prev.isPaused || prev.isComplete) return prev;
      const cell = prev.grid[row][col];
      if (cell.isSource) return prev; // source cannot be rotated
      const newGrid = prev.grid.map(r => r.map(c => ({ ...c })));
      newGrid[row][col] = rotateCell(cell);
      const { newGrid: checkedGrid, connectedSinks, isComplete } = checkFlow(newGrid, prev.sourcePos, prev.sinkPositions);
      return {
        ...prev,
        grid: checkedGrid,
        moves: prev.moves + 1,
        connectedSinks,
        isComplete,
      };
    });
  }, []);

  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const restartGame = useCallback(() => {
    setState(prev => {
      const { grid, sourcePos, sinkPositions } = generateGrid(prev.difficulty);
      const { newGrid, connectedSinks } = checkFlow(grid, sourcePos, sinkPositions);
      return {
        ...prev,
        grid: newGrid,
        moves: 0,
        timeElapsed: 0,
        isPaused: false,
        isComplete: false,
        sourcePos,
        sinkPositions,
        connectedSinks,
      };
    });
  }, []);

  const goToMenu = useCallback(() => {
    setState(makeInitialState());
  }, []);

  const tickTime = useCallback(() => {
    setState(prev => {
      if (prev.isPaused || prev.isComplete || !prev.isStarted) return prev;
      return { ...prev, timeElapsed: prev.timeElapsed + 1 };
    });
  }, []);

  return { state, startGame, rotateAt, togglePause, restartGame, goToMenu, tickTime };
}
