import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1d1d1b',
        parchment: '#f4efe6',
        vermilion: '#b7472a',
        moss: '#60745d',
        ultramarine: '#244b7a',
      },
      boxShadow: {
        line: '0 1px 0 rgba(29,29,27,0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
