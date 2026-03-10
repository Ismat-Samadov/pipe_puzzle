'use client';

import React from 'react';
import { Difficulty } from '@/types/game';
import { DIFFICULTY_CONFIGS } from '@/utils/constants';
import { formatTime } from '@/utils/scoring';

interface GameHUDProps {
  difficulty: Difficulty;
  moves: number;
  timeElapsed: number;
  connectedSinks: number;
  totalSinks: number;
  onPause: () => void;
  onRestart: () => void;
  onMenu: () => void;
  isPaused: boolean;
}

export function GameHUD({
  difficulty, moves, timeElapsed, connectedSinks, totalSinks,
  onPause, onRestart, onMenu, isPaused
}: GameHUDProps) {
  const config = DIFFICULTY_CONFIGS[difficulty];

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-2 px-2 py-2 mb-3">
      {/* Left: difficulty + sinks */}
      <div className="flex items-center gap-3">
        <span
          className="text-xs font-cyber font-bold px-2 py-1 rounded border"
          style={{
            color: difficulty === 'easy' ? '#39ff14' : difficulty === 'medium' ? '#00d4ff' : '#ff00ff',
            borderColor: difficulty === 'easy' ? '#39ff14' : difficulty === 'medium' ? '#00d4ff' : '#ff00ff',
            textShadow: `0 0 8px ${difficulty === 'easy' ? '#39ff14' : difficulty === 'medium' ? '#00d4ff' : '#ff00ff'}`,
          }}
        >
          {config.label.toUpperCase()}
        </span>
        <div className="flex gap-1 items-center">
          {Array.from({ length: totalSinks }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border"
              style={{
                background: i < connectedSinks ? '#39ff14' : 'transparent',
                borderColor: i < connectedSinks ? '#39ff14' : '#ff6b00',
                boxShadow: i < connectedSinks ? '0 0 6px #39ff14' : '0 0 4px #ff6b00',
                transition: 'all 0.3s',
              }}
            />
          ))}
          <span className="text-xs ml-1 font-cyber" style={{ color: '#8899aa' }}>
            {connectedSinks}/{totalSinks}
          </span>
        </div>
      </div>

      {/* Center: moves + time */}
      <div className="flex gap-4 font-cyber">
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: '#00d4ff', textShadow: '0 0 8px #00d4ff' }}>{moves}</div>
          <div className="text-xs" style={{ color: '#445566' }}>MOVES</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: '#00d4ff', textShadow: '0 0 8px #00d4ff' }}>{formatTime(timeElapsed)}</div>
          <div className="text-xs" style={{ color: '#445566' }}>TIME</div>
        </div>
      </div>

      {/* Right: controls */}
      <div className="flex gap-2">
        <button
          onClick={onPause}
          className="px-3 py-1 text-xs font-cyber rounded border transition-all hover:brightness-125"
          style={{ borderColor: '#00d4ff44', color: '#00d4ff', background: '#00d4ff11' }}
        >
          {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
        </button>
        <button
          onClick={onRestart}
          className="px-3 py-1 text-xs font-cyber rounded border transition-all hover:brightness-125"
          style={{ borderColor: '#ff6b0044', color: '#ff6b00', background: '#ff6b0011' }}
        >
          ↺ NEW
        </button>
        <button
          onClick={onMenu}
          className="px-3 py-1 text-xs font-cyber rounded border transition-all hover:brightness-125"
          style={{ borderColor: '#ffffff22', color: '#889aaa', background: '#ffffff08' }}
        >
          ⌂ MENU
        </button>
      </div>
    </div>
  );
}
