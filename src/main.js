import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Icon from './components/common/Icon.vue'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/main.scss'

const app = createApp(App)
app.component('icon', Icon)

app.use(createPinia())
app.use(router)

app.mount('#app')
