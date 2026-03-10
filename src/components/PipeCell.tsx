'use client';

import React, { memo } from 'react';
import { Cell } from '@/types/game';
import { getConnections } from '@/utils/pipeUtils';

interface PipeCellProps {
  cell: Cell;
  cellSize: number;
  isKeyboardCursor: boolean;
  onClick: () => void;
}

const SOURCE_COLOR = '#ff00ff';
const SINK_COLOR = '#ff6b00';
const SINK_CONNECTED_COLOR = '#39ff14';
const PIPE_UNLIT = '#1e3a5f';
const PIPE_FLOWING = '#39ff14';
const HUB_UNLIT = '#0d2040';
const HUB_FLOWING = '#003300';

export const PipeCell = memo(function PipeCell({ cell, cellSize, isKeyboardCursor, onClick }: PipeCellProps) {
  const S = cellSize;
  const half = S / 2;
  const spokeW = S * 0.22; // spoke width as fraction of cell
  const hubR = S * 0.14;   // hub radius

  const conn = getConnections(cell.shape, cell.rotation);

  // Determine colors
  let pipeColor: string;
  let hubColor: string;
  let glowColor: string | null = null;

  if (cell.isSource) {
    pipeColor = SOURCE_COLOR;
    hubColor = '#660066';
    glowColor = SOURCE_COLOR;
  } else if (cell.isSink) {
    if (cell.isSinkConnected) {
      pipeColor = SINK_CONNECTED_COLOR;
      hubColor = '#003300';
      glowColor = SINK_CONNECTED_COLOR;
    } else {
      pipeColor = SINK_COLOR;
      hubColor = '#442200';
      glowColor = SINK_COLOR;
    }
  } else if (cell.isConnected) {
    pipeColor = PIPE_FLOWING;
    hubColor = HUB_FLOWING;
    glowColor = PIPE_FLOWING;
  } else {
    pipeColor = PIPE_UNLIT;
    hubColor = HUB_UNLIT;
  }

  const filterStr = glowColor
    ? `drop-shadow(0 0 ${S * 0.06}px ${glowColor}) drop-shadow(0 0 ${S * 0.12}px ${glowColor})`
    : undefined;

  const spokeHalf = spokeW / 2;

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer select-none transition-all duration-150
        ${isKeyboardCursor ? 'ring-2 ring-neon-blue ring-offset-1 ring-offset-dark-bg' : ''}
        hover:brightness-125 active:scale-95`}
      style={{
        width: S,
        height: S,
        background: cell.isConnected ? '#050e05' : '#050a1a',
        border: `1px solid ${isKeyboardCursor ? '#00d4ff44' : '#0d1a3a'}`,
        transition: 'background 0.3s',
      }}
    >
      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        style={{
          filter: filterStr,
          transition: 'filter 0.3s',
          display: 'block',
        }}
      >
        {/* North spoke */}
        {conn.N && (
          <rect
            x={half - spokeHalf}
            y={0}
            width={spokeW}
            height={half + spokeHalf}
            fill={pipeColor}
            rx={spokeHalf}
          />
        )}
        {/* East spoke */}
        {conn.E && (
          <rect
            x={half - spokeHalf}
            y={half - spokeHalf}
            width={half + spokeHalf}
            height={spokeW}
            fill={pipeColor}
            rx={spokeHalf}
          />
        )}
        {/* South spoke */}
        {conn.S && (
          <rect
            x={half - spokeHalf}
            y={half - spokeHalf}
            width={spokeW}
            height={half + spokeHalf}
            fill={pipeColor}
            rx={spokeHalf}
          />
        )}
        {/* West spoke */}
        {conn.W && (
          <rect
            x={0}
            y={half - spokeHalf}
            width={half + spokeHalf}
            height={spokeW}
            fill={pipeColor}
            rx={spokeHalf}
          />
        )}

        {/* Hub circle */}
        <circle
          cx={half}
          cy={half}
          r={hubR}
          fill={pipeColor}
        />

        {/* Source indicator: glowing ring + dot */}
        {cell.isSource && (
          <>
            <circle cx={half} cy={half} r={hubR * 1.6} fill="none" stroke={SOURCE_COLOR} strokeWidth={2} opacity={0.7} />
            <circle cx={half} cy={half} r={hubR * 0.6} fill="#ffffff" opacity={0.9} />
          </>
        )}

        {/* Sink indicator: target rings */}
        {cell.isSink && !cell.isSinkConnected && (
          <>
            <circle cx={half} cy={half} r={hubR * 1.6} fill="none" stroke={SINK_COLOR} strokeWidth={1.5} opacity={0.6} strokeDasharray="3 2" />
          </>
        )}
        {cell.isSink && cell.isSinkConnected && (
          <>
            <circle cx={half} cy={half} r={hubR * 1.8} fill="none" stroke={SINK_CONNECTED_COLOR} strokeWidth={2} opacity={0.8} />
          </>
        )}
      </svg>
    </div>
  );
});
