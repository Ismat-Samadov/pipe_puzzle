'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Difficulty, HighScore } from '@/types/game';
import { DIFFICULTY_CONFIGS } from '@/utils/constants';
import { formatTime } from '@/utils/scoring';

interface DifficultySelectProps {
  onSelect: (d: Difficulty) => void;
  highScores: HighScore[];
}

const DIFF_COLORS: Record<Difficulty, { main: string; shadow: string }> = {
  easy:   { main: '#39ff14', shadow: '#39ff1466' },
  medium: { main: '#00d4ff', shadow: '#00d4ff66' },
  hard:   { main: '#ff00ff', shadow: '#ff00ff66' },
};

const DIFF_ICONS: Record<Difficulty, string> = {
  easy: '◈',
  medium: '◉',
  hard: '✦',
};

export function DifficultySelect({ onSelect, highScores }: DifficultySelectProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ background: '#050510' }}>
      {/* Scan line effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
        }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1
          className="text-5xl md:text-7xl font-cyber font-black tracking-widest mb-2"
          style={{
            color: '#00d4ff',
            textShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff88, 0 0 80px #00d4ff44',
          }}
        >
          PIPE
        </h1>
        <h1
          className="text-5xl md:text-7xl font-cyber font-black tracking-widest"
          style={{
            color: '#39ff14',
            textShadow: '0 0 20px #39ff14, 0 0 40px #39ff1488, 0 0 80px #39ff1444',
          }}
        >
          PUZZLE
        </h1>
        <p className="mt-4 text-sm font-cyber tracking-widest" style={{ color: '#445566' }}>
          CONNECT THE FLOW — ROTATE THE PIPES
        </p>
      </motion.div>

      {/* Difficulty cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full max-w-2xl">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((d, i) => {
          const cfg = DIFFICULTY_CONFIGS[d];
          const { main, shadow } = DIFF_COLORS[d];
          const best = highScores.filter(s => s.difficulty === d).sort((a, b) => b.score - a.score)[0];
          return (
            <motion.button
              key={d}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(d)}
              className="flex-1 p-5 rounded-xl text-left transition-all"
              style={{
                background: `linear-gradient(135deg, ${main}0a, ${main}05)`,
                border: `1px solid ${main}44`,
                boxShadow: `0 0 20px ${shadow}, inset 0 0 20px ${main}08`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl" style={{ color: main, textShadow: `0 0 10px ${main}` }}>
                  {DIFF_ICONS[d]}
                </span>
                <span className="text-xl font-cyber font-bold tracking-wider" style={{ color: main, textShadow: `0 0 10px ${main}` }}>
                  {cfg.label.toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-cyber mb-3" style={{ color: `${main}99` }}>
                {cfg.description}
              </p>
              {best && (
                <div className="text-xs font-cyber" style={{ color: `${main}77` }}>
                  BEST: {best.score.toLocaleString()} pts · {best.moves} moves · {formatTime(best.time)}
                </div>
              )}
              {!best && (
                <div className="text-xs font-cyber" style={{ color: `${main}44` }}>
                  NO RECORD YET
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Controls hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-xs font-cyber tracking-widest" style={{ color: '#334455' }}>
          CLICK / TAP TO ROTATE  ·  ARROW KEYS TO NAVIGATE  ·  SPACE TO ROTATE  ·  P TO PAUSE
        </p>
      </motion.div>
    </div>
  );
}
