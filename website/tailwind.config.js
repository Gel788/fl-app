/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0c0b09',
          lift: '#12100e',
          card: '#181512',
          line: '#2a2622',
        },
        ink: {
          950: '#0c0b09',
          900: '#12100e',
          800: '#181512',
        },
        lime: {
          DEFAULT: '#dfff1c',
          dim: '#9fb814',
          glow: '#f4ff7a',
        },
        sand: {
          DEFAULT: '#e8e4dc',
          muted: '#9c9690',
          dim: '#5c5854',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem,6vw+1rem,5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2rem,3vw+1rem,3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'grid-fine':
          'linear-gradient(to right, rgba(232,228,220,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,228,220,0.06) 1px, transparent 1px)',
        'stripe-diag':
          'repeating-linear-gradient(-12deg, transparent, transparent 2px, rgba(223,255,28,0.04) 2px, rgba(223,255,28,0.04) 3px)',
      },
      animation: {
        'spin-slow': 'spin 28s linear infinite',
        'pulse-line': 'pulseLine 4s ease-in-out infinite',
      },
      keyframes: {
        pulseLine: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.9' },
        },
      },
      ringOffsetColor: {
        base: '#0c0b09',
      },
    },
  },
  plugins: [],
}
