'use client';

import React from 'react';

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
      style={{
        background: enabled ? '#00d4ff22' : '#ffffff11',
        border: `1px solid ${enabled ? '#00d4ff44' : '#ffffff22'}`,
        color: enabled ? '#00d4ff' : '#445566',
        fontSize: '18px',
      }}
      title={enabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
