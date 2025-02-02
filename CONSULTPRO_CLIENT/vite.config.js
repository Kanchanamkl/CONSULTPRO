import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import polyfillNode from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window", // Polyfill 'global' to use 'window' in the browser
  },
  resolve: {
    alias: {
      util: "rollup-plugin-polyfill-node/polyfills/util",
    },
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNode()],
    },
  },
});