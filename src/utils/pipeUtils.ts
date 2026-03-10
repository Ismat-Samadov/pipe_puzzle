import { Direction, PipeConnections, PipeShape, Cell } from '@/types/game';

// Base connections for each pipe shape at rotation 0
export const BASE_CONNECTIONS: Record<PipeShape, PipeConnections> = {
  STRAIGHT: { N: true,  E: false, S: true,  W: false },
  ELBOW:    { N: true,  E: true,  S: false, W: false },
  TEE:      { N: true,  E: true,  S: false, W: true  },
  CROSS:    { N: true,  E: true,  S: true,  W: true  },
  DEAD_END: { N: true,  E: false, S: false, W: false },
  EMPTY:    { N: false, E: false, S: false, W: false },
};

/** Rotate connections 90° clockwise once */
function rotateConnOnce(c: PipeConnections): PipeConnections {
  return { N: c.W, E: c.N, S: c.E, W: c.S };
}

/** Get effective connections for a shape + rotation combo */
export function getConnections(shape: PipeShape, rotation: number): PipeConnections {
  let c = { ...BASE_CONNECTIONS[shape] };
  for (let i = 0; i < (rotation & 3); i++) c = rotateConnOnce(c);
  return c;
}

/** Return (shape, rotation) for a given set of connections */
export function findPipe(n: boolean, e: boolean, s: boolean, w: boolean): { shape: PipeShape; rotation: number } {
  const count = [n, e, s, w].filter(Boolean).length;

  if (count === 0) return { shape: 'EMPTY', rotation: 0 };

  if (count === 1) {
    if (n) return { shape: 'DEAD_END', rotation: 0 };
    if (e) return { shape: 'DEAD_END', rotation: 1 };
    if (s) return { shape: 'DEAD_END', rotation: 2 };
    return   { shape: 'DEAD_END', rotation: 3 };
  }

  if (count === 2) {
    if (n && s) return { shape: 'STRAIGHT', rotation: 0 };
    if (e && w) return { shape: 'STRAIGHT', rotation: 1 };
    if (n && e) return { shape: 'ELBOW', rotation: 0 };
    if (e && s) return { shape: 'ELBOW', rotation: 1 };
    if (s && w) return { shape: 'ELBOW', rotation: 2 };
    return       { shape: 'ELBOW', rotation: 3 }; // w && n
  }

  if (count === 3) {
    if (!s) return { shape: 'TEE', rotation: 0 }; // N-E-W
    if (!w) return { shape: 'TEE', rotation: 1 }; // N-E-S
    if (!n) return { shape: 'TEE', rotation: 2 }; // E-S-W
    return   { shape: 'TEE', rotation: 3 }; // N-S-W
  }

  return { shape: 'CROSS', rotation: 0 };
}

const OPPOSITE: Record<Direction, Direction> = { N: 'S', S: 'N', E: 'W', W: 'E' };

/** Do two adjacent cells connect? a→b in given direction */
export function cellsConnect(a: Cell, b: Cell, dir: Direction): boolean {
  if (a.shape === 'EMPTY' || b.shape === 'EMPTY') return false;
  const ca = getConnections(a.shape, a.rotation);
  const cb = getConnections(b.shape, b.rotation);
  return ca[dir] && cb[OPPOSITE[dir]];
}

/** Rotate a cell 90° clockwise */
export function rotateCell(cell: Cell): Cell {
  return { ...cell, rotation: (cell.rotation + 1) & 3 };
}
