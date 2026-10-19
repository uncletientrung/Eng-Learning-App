import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { vocabularyDictionaryProxy } from './vocabularyDictionaryProxy.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // k khai bao proxy : fe -> localhost:5173/api
  // khai bao proxy: fe -> localhost:5173/api -> proxy -> dict.minhqnd.com
  server: { proxy: vocabularyDictionaryProxy() },
  preview: { proxy: vocabularyDictionaryProxy() },
})
