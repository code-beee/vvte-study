import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import { useElementComponents } from '@/config/element'

import '@/mock/index'

createApp(App).use(router).use(useElementComponents).mount('#app')
