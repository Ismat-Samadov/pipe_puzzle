'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Difficulty } from '@/types/game';
import { DIFFICULTY_CONFIGS } from '@/utils/constants';
import { calculateScore, formatTime } from '@/utils/scoring';

interface WinScreenProps {
  difficulty: Difficulty;
  moves: number;
  timeElapsed: number;
  onRestart: () => void;
  onMenu: () => void;
}

export function WinScreen({ difficulty, moves, timeElapsed, onRestart, onMenu }: WinScreenProps) {
  const score = calculateScore(difficulty, moves, timeElapsed);
  const config = DIFFICULTY_CONFIGS[difficulty];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: 'rgba(5,5,16,0.92)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="text-center px-8 py-10 rounded-2xl max-w-sm w-full mx-4"
        style={{
          background: 'linear-gradient(135deg, #051505, #050510)',
          border: '1px solid #39ff1444',
          boxShadow: '0 0 60px #39ff1433, 0 0 120px #39ff1411',
        }}
      >
        {/* Victory text */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="text-5xl font-cyber font-black tracking-widest mb-1"
            style={{ color: '#39ff14', textShadow: '0 0 20px #39ff14, 0 0 40px #39ff1488' }}
          >
            SOLVED!
          </div>
          <div className="text-sm font-cyber tracking-widest mb-6" style={{ color: '#39ff1466' }}>
            PIPELINE COMPLETE
          </div>
        </motion.div>

        {/* Score */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="mb-6 py-4 rounded-xl"
          style={{ background: '#39ff1409', border: '1px solid #39ff1422' }}
        >
          <div
            className="text-4xl font-cyber font-black"
            style={{ color: '#39ff14', textShadow: '0 0 16px #39ff14' }}
          >
            {score.toLocaleString()}
          </div>
          <div className="text-xs font-cyber mt-1" style={{ color: '#39ff1466' }}>POINTS</div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-3 mb-7"
        >
          {[
            { label: 'DIFFICULTY', value: config.label.toUpperCase(), color: '#00d4ff' },
            { label: 'MOVES', value: moves.toString(), color: '#00d4ff' },
            { label: 'TIME', value: formatTime(timeElapsed), color: '#00d4ff' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <div className="text-base font-cyber font-bold" style={{ color, textShadow: `0 0 8px ${color}` }}>{value}</div>
              <div className="text-xs font-cyber" style={{ color: '#334455' }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-3"
        >
          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-xl font-cyber font-bold text-sm tracking-wider transition-all hover:brightness-125 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #39ff1422, #39ff1411)',
              border: '1px solid #39ff1455',
              color: '#39ff14',
              boxShadow: '0 0 16px #39ff1422',
            }}
          >
            PLAY AGAIN
          </button>
          <button
            onClick={onMenu}
            className="flex-1 py-3 rounded-xl font-cyber font-bold text-sm tracking-wider transition-all hover:brightness-125 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #00d4ff11, #00d4ff08)',
              border: '1px solid #00d4ff33',
              color: '#00d4ff',
            }}
          >
            MENU
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
