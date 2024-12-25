import path from 'path';
const { resolve } = path;
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default function defineConfig () {
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      port: 5000,
      host: '0.0.0.0',
      strictPort: true,
      hmr: false
    },
    preview: {
      port: 5000,
      host: '0.0.0.0',
      strictPort: true,
      hmr: true
    },
    build: {
      emptyOutDir: true,
      polyfillDynamicImport: false,
      outDir: 'public',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      }
    }
  }
}


