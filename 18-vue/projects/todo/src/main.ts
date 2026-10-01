import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// React: createRoot(document.getElementById('root')).render(<App />)
// Здесь же подключают плагины: app.use(router), app.use(createPinia())
createApp(App).mount('#app')
