import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './locales/I18n'
import router from './router'
import App from './App.vue'

import './assets/Style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
