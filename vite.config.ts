import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/gothic-npc-maker/' : '/'
  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
