/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0eeff',
          100: '#ddd9ff',
          200: '#c4baff',
          300: '#a78bff',
          400: '#9c88ff',
          500: '#7c6fff',
          600: '#6052e8',
          700: '#4b3ecf',
          800: '#3a2fb0',
          900: '#2c2390',
        },
        teal: {
          400: '#00d4aa',
          500: '#00b894',
        },
        rose: {
          400: '#ff6b8a',
          500: '#ff4d70',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          hover: 'rgba(255,255,255,0.07)',
          active: 'rgba(255,255,255,0.10)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.4,0,0.2,1)',
        'fade-in': 'fadeIn 0.3s ease',
        'slide-in': 'slideIn 0.25s cubic-bezier(0.4,0,0.2,1)',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn: { from: { opacity: 0, transform: 'translateY(-6px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        glow: '0 0 24px rgba(124,111,255,0.25)',
        'glow-teal': '0 0 24px rgba(0,212,170,0.2)',
        card: '0 2px 8px rgba(0,0,0,0.2)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
