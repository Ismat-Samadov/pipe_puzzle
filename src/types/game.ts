export type Direction = 'N' | 'E' | 'S' | 'W';

export interface PipeConnections {
  N: boolean;
  E: boolean;
  S: boolean;
  W: boolean;
}

// Pipe shapes - rotation is stored separately
export type PipeShape = 'STRAIGHT' | 'ELBOW' | 'TEE' | 'CROSS' | 'DEAD_END' | 'EMPTY';

export interface Cell {
  shape: PipeShape;
  rotation: number; // 0=0°, 1=90°CW, 2=180°, 3=270°CW
  isSource: boolean;
  isSink: boolean;
  isConnected: boolean;   // true = part of path connected to source
  isSinkConnected: boolean; // true = this sink is connected
  row: number;
  col: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  gridSize: number;
  numSinks: number;
  label: string;
  description: string;
  scoreMultiplier: number;
}

export interface GameState {
  grid: Cell[][];
  difficulty: Difficulty;
  moves: number;
  timeElapsed: number;
  isPaused: boolean;
  isComplete: boolean;
  isStarted: boolean;
  sourcePos: Position;
  sinkPositions: Position[];
  connectedSinks: number;
}

export interface Position {
  row: number;
  col: number;
}

export interface HighScore {
  difficulty: Difficulty;
  score: number;
  moves: number;
  time: number;
  date: string;
}
