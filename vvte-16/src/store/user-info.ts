import { defineStore } from 'pinia'

import router from '@/router/index'
const modulesRoutes = import.meta.glob('/src/views/*/*.vue')

// 定义用户信息Store
export const useUserInfoStore = defineStore('user-info', {
  state: () => ({
    id: 0,
    username: '',
    name: '',
    avatar: '',
    menus: [],
  }),
  actions: {
    setAll(userinfo: any) {
      const { id, username, name, avatar, menus } = userinfo
      this.id = id
      this.username = username
      this.name = name
      this.avatar = avatar
      this.menus = menus
      menus.forEach((menu: any) => {
        if (menu.children) {
          menu.children.forEach((sub: any) => {
            // ↓动态添加路由
            router.addRoute('root', {
              path: sub.path,
              component: modulesRoutes[`/src/views${sub.component}`],
            })
          })
        }
      })
    },
  },
})
