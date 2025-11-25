import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/verse/', // サブディレクトリ運用 (/verse/)
  server: {
    port: 1398, // Verse UI 固定ポート
  },
  build: {
    outDir: '../../../docs/verse', // リポジトリルートの docs/verse に出力
    emptyOutDir: true, // docs/verse 内を空にしてからビルド
  },
})
