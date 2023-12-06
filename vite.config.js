import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path'
import react from '@vitejs/plugin-react';

const env = loadEnv(process.env.MODE, process.cwd(), '');

// https://vitejs.dev/config/
export default defineConfig(() => ({
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
