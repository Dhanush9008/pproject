import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'IMPORT_IS_UNDEFINED' && warning.message.includes('FaceMesh')) return;
        warn(warning);
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tensorflow')) return 'tfjs';
            if (id.includes('react')) return 'vendor';
            return 'vendor';
          }
        }
      }
    }
  }
})
