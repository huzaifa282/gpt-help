// Main CSS
import './assets/css/main.css'

// Imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vue App
const app = createApp(App)
app.use(router)
app.mount('#app')
