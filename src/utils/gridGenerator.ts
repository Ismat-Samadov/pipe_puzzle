import { Cell, Difficulty, DifficultyConfig, Position } from '@/types/game';
import { DIFFICULTY_CONFIGS } from './constants';
import { findPipe } from './pipeUtils';

interface GeneratedGrid {
  grid: Cell[][];
  sourcePos: Position;
  sinkPositions: Position[];
}

type Dir = 'N' | 'E' | 'S' | 'W';
const DIRS: [Dir, number, number][] = [
  ['N', -1, 0],
  ['E',  0, 1],
  ['S',  1, 0],
  ['W',  0,-1],
];
const OPP: Record<Dir, Dir> = { N: 'S', S: 'N', E: 'W', W: 'E' };

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateGrid(difficulty: Difficulty): GeneratedGrid {
  const config: DifficultyConfig = DIFFICULTY_CONFIGS[difficulty];
  const N = config.gridSize;

  // -- Step 1: Generate a spanning tree via recursive-backtracker DFS --
  type ConnMap = { N: boolean; E: boolean; S: boolean; W: boolean };
  const connections: ConnMap[][] = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => ({ N: false, E: false, S: false, W: false }))
  );
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  // Source: random cell
  const srcRow = Math.floor(Math.random() * N);
  const srcCol = Math.floor(Math.random() * N);
  visited[srcRow][srcCol] = true;

  // Iterative DFS with shuffled neighbours
  const stack: [number, number][] = [[srcRow, srcCol]];
  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const neighbours = shuffle(
      DIRS
        .map(([d, dr, dc]) => ({ d, nr: r + dr, nc: c + dc }))
        .filter(({ nr, nc }) => nr >= 0 && nr < N && nc >= 0 && nc < N && !visited[nr][nc])
    );
    if (!neighbours.length) { stack.pop(); continue; }
    const { d, nr, nc } = neighbours[0];
    connections[r][c][d] = true;
    connections[nr][nc][OPP[d]] = true;
    visited[nr][nc] = true;
    stack.push([nr, nc]);
  }

  // -- Step 2: Build solved grid cells --
  const solvedGrid: Cell[][] = Array.from({ length: N }, (_, r) =>
    Array.from({ length: N }, (_, c) => {
      const conn = connections[r][c];
      const { shape, rotation } = findPipe(conn.N, conn.E, conn.S, conn.W);
      return { shape, rotation, isSource: false, isSink: false, isConnected: false, isSinkConnected: false, row: r, col: c };
    })
  );

  // Mark source
  solvedGrid[srcRow][srcCol].isSource = true;

  // -- Step 3: Pick sinks from dead-ends farthest from source --
  const deadEnds: { pos: Position; dist: number }[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (r === srcRow && c === srcCol) continue;
      const conn = connections[r][c];
      const degree = [conn.N, conn.E, conn.S, conn.W].filter(Boolean).length;
      if (degree === 1) {
        deadEnds.push({ pos: { row: r, col: c }, dist: Math.abs(r - srcRow) + Math.abs(c - srcCol) });
      }
    }
  }
  deadEnds.sort((a, b) => b.dist - a.dist);

  const numSinks = Math.min(config.numSinks, deadEnds.length);
  const sinkPositions: Position[] = deadEnds.slice(0, numSinks).map(d => d.pos);
  sinkPositions.forEach(({ row, col }) => {
    solvedGrid[row][col].isSink = true;
  });

  // -- Step 4: Scramble rotations (all non-source cells) --
  const grid: Cell[][] = solvedGrid.map(row =>
    row.map(cell => {
      if (cell.isSource) return { ...cell };
      // Random rotation
      const rot = Math.floor(Math.random() * 4);
      return { ...cell, rotation: rot };
    })
  );

  return { grid, sourcePos: { row: srcRow, col: srcCol }, sinkPositions };
}
