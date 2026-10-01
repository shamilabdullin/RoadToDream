import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Плагин учит Vite понимать .vue-файлы (компилирует шаблоны в render-функции)
export default defineConfig({
  plugins: [vue()],
})
