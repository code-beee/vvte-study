import { createRouter, createWebHashHistory } from 'vue-router'

// ↓定义路由
const routes = [
	// ↓首页
  {
    // ↓路由地址
    path: '/home',
    // ↓路由名称（唯一值），在路由跳转时能用到
    name: 'home',
    // ↓路由渲染组件
    component: () => import('@/views/Home.vue')
  },
	// ↓登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
]

// ↓创建路由实例并传递routes
const router = createRouter({
  // ↓router内部提供了history模式的实现，使用hash模式
  history: createWebHashHistory(),
  routes,
})

export default router