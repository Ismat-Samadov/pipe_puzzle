import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pipe Puzzle — Neon Cyberpunk',
  description: 'Rotate the pipes to connect the flow. A neon-themed pipe puzzle game.',
  icons: { icon: '/favicon.svg' },
  keywords: ['pipe puzzle', 'game', 'neon', 'cyberpunk', 'puzzle'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ background: '#050510', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
