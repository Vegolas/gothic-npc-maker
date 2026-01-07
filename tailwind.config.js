/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Gothic-inspired color palette
      colors: {
        gothic: {
          dark: '#1a1a2e',
          darker: '#16213e',
          accent: '#e94560',
          gold: '#c9a227',
          stone: '#4a4a4a',
          parchment: '#f5e6d3',
        }
      }
    },
  },
  plugins: [],
}
