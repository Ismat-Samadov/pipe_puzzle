'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Difficulty, HighScore } from '@/types/game';
import { useGameState } from '@/hooks/useGameState';
import { useTimer } from '@/hooks/useTimer';
import { useSounds } from '@/hooks/useSounds';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { calculateScore } from '@/utils/scoring';
import { MAX_HIGH_SCORES } from '@/utils/constants';
import { GameBoard } from './GameBoard';
import { GameHUD } from './GameHUD';
import { DifficultySelect } from './DifficultySelect';
import { WinScreen } from './WinScreen';
import { PauseMenu } from './PauseMenu';
import { SoundToggle } from './SoundToggle';

export function Game() {
  const { state, startGame, rotateAt, togglePause, restartGame, goToMenu, tickTime } = useGameState();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playRotate, playConnect, playWin } = useSounds(soundEnabled);
  const [highScores, setHighScores] = useLocalStorage<HighScore[]>('pipe-puzzle-scores', []);

  // Timer
  const timerRunning = state.isStarted && !state.isPaused && !state.isComplete;
  const { seconds, reset: resetTimer } = useTimer(timerRunning);

  // Sync timer into state
  useEffect(() => {
    if (timerRunning) tickTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // Win detection & high score
  const prevComplete = useRef(false);
  useEffect(() => {
    if (state.isComplete && !prevComplete.current) {
      playWin();
      const score = calculateScore(state.difficulty, state.moves, state.timeElapsed);
      const entry: HighScore = {
        difficulty: state.difficulty,
        score,
        moves: state.moves,
        time: state.timeElapsed,
        date: new Date().toLocaleDateString(),
      };
      const updated = [...highScores, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_HIGH_SCORES);
      setHighScores(updated);
    }
    prevComplete.current = state.isComplete;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isComplete]);

  // Prev connected sinks for sound
  const prevConnected = useRef(0);
  useEffect(() => {
    if (!state.isStarted) { prevConnected.current = 0; return; }
    if (state.connectedSinks > prevConnected.current) playConnect();
    prevConnected.current = state.connectedSinks;
  }, [state.connectedSinks, state.isStarted, playConnect]);

  const handleRotate = (row: number, col: number) => {
    rotateAt(row, col);
    playRotate();
  };

  const handleRestart = () => {
    restartGame();
    resetTimer();
  };

  const handleStart = (d: Difficulty) => {
    startGame(d);
    resetTimer();
  };

  const handleMenu = () => {
    goToMenu();
    resetTimer();
  };

  if (!state.isStarted) {
    return (
      <>
        <SoundToggle enabled={soundEnabled} onToggle={() => setSoundEnabled(e => !e)} />
        <DifficultySelect onSelect={handleStart} highScores={highScores} />
      </>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-2 py-4"
      style={{ background: '#050510' }}
    >
      {/* CRT scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.012) 2px, rgba(0,212,255,0.012) 4px)',
        }}
      />

      <SoundToggle enabled={soundEnabled} onToggle={() => setSoundEnabled(e => !e)} />

      <div className="w-full max-w-3xl">
        <GameHUD
          difficulty={state.difficulty}
          moves={state.moves}
          timeElapsed={state.timeElapsed}
          connectedSinks={state.connectedSinks}
          totalSinks={state.sinkPositions.length}
          onPause={togglePause}
          onRestart={handleRestart}
          onMenu={handleMenu}
          isPaused={state.isPaused}
        />

        <div className="flex justify-center">
          <GameBoard
            grid={state.grid}
            sourcePos={state.sourcePos}
            onRotate={handleRotate}
            isPaused={state.isPaused}
            isComplete={state.isComplete}
          />
        </div>

        {/* Mobile touch hint */}
        <p className="text-center mt-3 text-xs font-cyber" style={{ color: '#223344' }}>
          TAP PIPE TO ROTATE  ·  P TO PAUSE
        </p>
      </div>

      <PauseMenu
        isPaused={state.isPaused}
        onResume={togglePause}
        onRestart={handleRestart}
        onMenu={handleMenu}
      />

      {state.isComplete && (
        <WinScreen
          difficulty={state.difficulty}
          moves={state.moves}
          timeElapsed={state.timeElapsed}
          onRestart={handleRestart}
          onMenu={handleMenu}
        />
      )}
    </div>
  );
}
