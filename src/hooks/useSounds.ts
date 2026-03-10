import { useRef, useCallback } from 'react';

export function useSounds(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  function getCtx(): AudioContext {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    return ctxRef.current;
  }

  const playTone = useCallback((freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.3) => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(gain, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch { /* ignore */ }
  }, [enabled]);

  const playRotate = useCallback(() => playTone(440, 0.08, 'square', 0.15), [playTone]);
  const playConnect = useCallback(() => {
    playTone(523, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(659, 0.1, 'sine', 0.2), 100);
  }, [playTone]);
  const playWin = useCallback(() => {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.25), i * 150));
  }, [playTone]);
  const playError = useCallback(() => playTone(220, 0.15, 'sawtooth', 0.1), [playTone]);

  return { playRotate, playConnect, playWin, playError };
}
