import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import { useElementComponents } from '@/config/element'
import '@/mock/index'

/* ---------------------------- 导入 pinia 创建实例的函数 ---------------------------- */
import { createPinia } from 'pinia'

/* ----------------------------- 创建pinia实例并注册使用 ----------------------------- */
createApp(App).use(router).use(useElementComponents).use(createPinia()).mount('#app')
