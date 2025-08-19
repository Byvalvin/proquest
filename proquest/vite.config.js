import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ports = {
  applocal:4000,
  apilocal:8080,
  app:4000,
  api:8080,
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/proquest/',
  plugins: [react()],
  server: {
    port: ports.app,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // for local dev
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})

