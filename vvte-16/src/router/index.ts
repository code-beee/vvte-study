import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserInfoStore } from '@/store/user-info'
import { existToken, removeToken } from '@/utils/token/index'
import NProgress from '../utils/progress'
import loginApi from '@/api/login'

// ↓定义路由
const routes = [
  // ↓layout父路由
  {
    // ↓路由地址
    path: '/',
    // ↓路由名称（唯一值），在路由跳转时能用到
    name: 'root',
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
        component: () => import('@/views/Home.vue'),
      },
      // ↓用户管理
      // {
      //   path: '/sys/user',
      //   name: 'sys-user',
      //   component: () => import('@/views/sys/User.vue'),
      // },
    ],
  },
  // ↓登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  // ↓404
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/error/404.vue'),
  },
]

// ↓创建路由实例并传递routes
const router = createRouter({
  // ↓router内部提供了history模式的实现，使用hash模式
  history: createWebHashHistory(),
  routes,
})

// ↓白名单
const whiteList = ['/login']

// ↓全局前置守卫
router.beforeEach(async (to) => {
  NProgress.start()
  // ↓如果请求地址不是白名单
  if (whiteList.indexOf(to.path) === -1) {
    // ↓如果token存在检查store，否则跳转到登录页
    if (existToken()) {
      // ↓从store获取用户信息
      const userInfoStore = useUserInfoStore()
      // ↓如果没有用户信息，查询用户信息
      if (!userInfoStore.id) {
        // ↓查询成功保存用户信息且跳转到目标页
        try {
          await loginApi.userInfo().then((res: any) => {
            userInfoStore.setAll(res.data)
          })
        } catch (error) {
          // ↓移除token无效
          removeToken()
          return { name: 'login', query: { redirect: `${to.path}` } }
        }
      }
    } else {
      // ↓非白名单且token不存在
      return { name: 'login', query: { redirect: `${to.path}` } }
    }
  }
})

// ↓全局后置钩子
router.afterEach(() => {
  NProgress.done()
})

export default router
