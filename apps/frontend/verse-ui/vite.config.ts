import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/IZAKAYA-BFF/', // GitHub Pages リポジトリ名
  server: {
    port: 1398, // Verse UI 固定ポート
  },
  build: {
    outDir: '../../../docs', // リポジトリルートの docs に出力 (Lite UIを上書き)
    emptyOutDir: true, // docs 内を空にしてからビルド
  },
})
