/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Gothic palette
        void: 'rgb(var(--color-void) / <alpha-value>)',
        obsidian: 'rgb(var(--color-obsidian) / <alpha-value>)',
        stone: 'rgb(var(--color-stone) / <alpha-value>)',
        slate: 'rgb(var(--color-slate) / <alpha-value>)',
        iron: 'rgb(var(--color-iron) / <alpha-value>)',

        // Warm accents
        ember: 'rgb(var(--color-ember) / <alpha-value>)',
        flame: 'rgb(var(--color-flame) / <alpha-value>)',
        candle: 'rgb(var(--color-candle) / <alpha-value>)',

        // Aged materials
        parchment: 'rgb(var(--color-parchment) / <alpha-value>)',
        leather: 'rgb(var(--color-leather) / <alpha-value>)',
        blood: 'rgb(var(--color-blood) / <alpha-value>)',
        rust: 'rgb(var(--color-rust) / <alpha-value>)',

        // Text
        text: 'rgb(var(--color-text) / <alpha-value>)',
        'text-dim': 'rgb(var(--color-text-dim) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',

        // Legacy compatibility
        gothic: {
          dark: '#0c0c12',
          darker: '#08080c',
          accent: '#d4a84b',
          gold: '#d4a84b',
          stone: '#1c1c24',
          parchment: '#e8dcc4',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['0.9375rem', { lineHeight: '1.6' }],
        'lg': ['1.0625rem', { lineHeight: '1.5' }],
        'xl': ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      boxShadow: {
        'ember': '0 0 20px rgba(212, 168, 75, 0.15)',
        'ember-lg': '0 0 40px rgba(212, 168, 75, 0.2)',
        'deep': '0 8px 32px rgba(0, 0, 0, 0.6)',
        'inset': 'inset 0 2px 8px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'iron-vertical': 'linear-gradient(180deg, rgb(45, 45, 55) 0%, rgb(68, 68, 78) 50%, rgb(45, 45, 55) 100%)',
        'iron-horizontal': 'linear-gradient(90deg, transparent, rgb(28, 28, 36), rgb(68, 68, 78), rgb(28, 28, 36), transparent)',
      },
      animation: {
        'flicker': 'flicker 3s ease-in-out infinite',
        'ember-pulse': 'ember-pulse 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [],
}
