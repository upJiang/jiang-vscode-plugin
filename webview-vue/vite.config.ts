import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [vue(), vueJsx()],
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 7979,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
      },
    },
    outDir: '../webview-dist',
  },
})