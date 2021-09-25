import { defineStore } from 'pinia'

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
      this.id = userinfo.id
      this.username = userinfo.username
      this.name = userinfo.name
      this.avatar = userinfo.avatar
      this.menus = userinfo.menus
    },
  },
})
