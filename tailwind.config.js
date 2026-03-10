/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00d4ff',
        'neon-green': '#39ff14',
        'neon-pink': '#ff00ff',
        'neon-orange': '#ff6b00',
        'dark-bg': '#050510',
        'dark-cell': '#0d0d2b',
        'dark-border': '#1a1a4a',
      },
      fontFamily: {
        cyber: ['"Orbitron"', '"Rajdhani"', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'rotate-cw': 'rotateCW 0.15s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%,100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        rotateCW: {
          '0%': { transform: 'rotate(-5deg) scale(0.95)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
