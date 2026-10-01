/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#090A0C',
        surface: {
          subtle: '#0D0F13',
          DEFAULT: '#121419',
          card: '#15171E',
          hover: '#191C24',
          elevated: '#1E212B',
        },
        warm: {
          white: '#F6F6F2',
          ivory: '#E9E9E2',
          muted: '#A2A299',
          dim: '#6B6B63',
          border: 'rgba(246, 246, 242, 0.08)',
        },
        accent: {
          DEFAULT: '#E2B36F',
          hover: '#EDC388',
          muted: '#B89255',
          subtle: 'rgba(226, 179, 111, 0.10)',
          glow: 'rgba(226, 179, 111, 0.20)',
          border: 'rgba(226, 179, 111, 0.25)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.4)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        glow: '0 0 35px -5px rgba(226, 179, 111, 0.15)',
        'glow-lg': '0 0 60px -10px rgba(226, 179, 111, 0.20)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
