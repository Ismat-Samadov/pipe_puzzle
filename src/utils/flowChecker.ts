import { Cell, Position } from '@/types/game';
import { cellsConnect } from './pipeUtils';

type Dir = 'N' | 'E' | 'S' | 'W';
const DIRS: [Dir, number, number][] = [
  ['N', -1, 0],
  ['E',  0, 1],
  ['S',  1, 0],
  ['W',  0,-1],
];

/**
 * BFS from source. Returns updated grid with isConnected flags set,
 * plus a count of connected sinks.
 */
export function checkFlow(
  grid: Cell[][],
  sourcePos: Position,
  sinkPositions: Position[]
): { newGrid: Cell[][]; connectedSinks: number; isComplete: boolean } {
  const N = grid.length;

  // Reset flags
  const newGrid: Cell[][] = grid.map(row =>
    row.map(cell => ({ ...cell, isConnected: false, isSinkConnected: false }))
  );

  // BFS
  const visited: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));
  const queue: Position[] = [sourcePos];
  visited[sourcePos.row][sourcePos.col] = true;
  newGrid[sourcePos.row][sourcePos.col].isConnected = true;

  while (queue.length) {
    const { row, col } = queue.shift()!;
    const cell = newGrid[row][col];

    for (const [dir, dr, dc] of DIRS) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
      if (visited[nr][nc]) continue;
      const neighbour = newGrid[nr][nc];
      if (cellsConnect(cell, neighbour, dir)) {
        visited[nr][nc] = true;
        neighbour.isConnected = true;
        queue.push({ row: nr, col: nc });
      }
    }
  }

  // Check sinks
  let connectedSinks = 0;
  for (const { row, col } of sinkPositions) {
    if (newGrid[row][col].isConnected) {
      newGrid[row][col].isSinkConnected = true;
      connectedSinks++;
    }
  }

  const isComplete = connectedSinks === sinkPositions.length;
  return { newGrid, connectedSinks, isComplete };
}
