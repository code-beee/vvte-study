import { createRouter, createWebHashHistory } from 'vue-router'

// ↓定义路由
const routes = [
  // ↓layout父路由
  {
    // ↓路由地址
    path: '/',
    // ↓路由名称（唯一值），在路由跳转时能用到
    name: '',
    // ↓路由渲染组件
    component: () => import('@/components/layout/index.vue'),
    // ↓重定向
    redirect: { name: 'home' },
    // ↓子路由
    children: [
      // ↓首页
      {
        path: '/home',
        name: 'home',
        // ↓路由别名
        alias: '/',
        component: () => import('@/views/Home.vue')
      },
      // ↓用户管理
      {
        path: '/sys/user',
        name: 'sys-user',
        component: () => import('@/views/sys/User.vue')
      },
    ]
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