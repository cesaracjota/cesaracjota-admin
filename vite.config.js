import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path'
import react from '@vitejs/plugin-react';

const env = loadEnv(process.env.MODE, process.cwd(), '');

// https://vitejs.dev/config/
export default defineConfig(() => ({
  rollupOptions: {
    input: {
      main: resolve(__dirname, 'index.html'),
      nested: resolve(__dirname, 'nested/index.html'),
    },
  },
  plugins: [react()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  define: {
    __APP_ENV__: JSON.stringify(env.APP_ENV),
    'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL),
  },
}));
