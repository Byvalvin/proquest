import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ports = {
  app:4000,
  api:8080,
}

const baseURLs = {
  app:`http://localhost:${ports.app}`,
  api:`http://localhost:${ports.api}`,
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:ports.app,
    proxy:{
      '/api':{
        target:baseURLs.api,
        changeOrigin:true,
        // rewrite:(path)=>path.replace(/^\/api/,"") // /api maps to https://localhost:7000
      }
    }
  }
})
