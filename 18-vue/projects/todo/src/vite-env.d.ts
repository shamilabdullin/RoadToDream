/// <reference types="vite/client" />

// Чтобы TypeScript понимал импорт .vue-файлов
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
