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
