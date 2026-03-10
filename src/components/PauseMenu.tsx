'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PauseMenuProps {
  isPaused: boolean;
  onResume: () => void;
  onRestart: () => void;
  onMenu: () => void;
}

export function PauseMenu({ isPaused, onResume, onRestart, onMenu }: PauseMenuProps) {
  return (
    <AnimatePresence>
      {isPaused && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="text-center px-10 py-8 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #050518, #050510)',
              border: '1px solid #00d4ff33',
              boxShadow: '0 0 40px #00d4ff22',
            }}
          >
            <div
              className="text-4xl font-cyber font-black tracking-widest mb-6"
              style={{ color: '#00d4ff', textShadow: '0 0 20px #00d4ff' }}
            >
              PAUSED
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              {[
                { label: '▶ RESUME', onClick: onResume, color: '#00d4ff' },
                { label: '↺ RESTART', onClick: onRestart, color: '#ff6b00' },
                { label: '⌂ MAIN MENU', onClick: onMenu, color: '#889aaa' },
              ].map(({ label, onClick, color }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="py-3 px-6 rounded-xl font-cyber font-bold text-sm tracking-wider transition-all hover:brightness-125 active:scale-95"
                  style={{
                    border: `1px solid ${color}33`,
                    color,
                    background: `${color}11`,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
