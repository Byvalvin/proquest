import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ports = {
  applocal:4000,
  apilocal:8080,
  app:4000,
  api:8080,
}

const baseURLs = {
  applocal:`http://localhost:${ports.applocal}`,
  apilocal:`http://localhost:${ports.apilocal}`,
  app:"https://proquest-pspc.onrender.com/",
  api:"https://proquest-pspc.onrender.com/",
}

// https://vitejs.dev/config/
export default defineConfig({
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

