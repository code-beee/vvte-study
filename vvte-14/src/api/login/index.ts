import http from '@/utils/http/index'

export default {
  // ↓登录
  signin: (data?: any) => {
    return http.post('/login/signin', data)
  },

  // ↓查询用户信息
  userInfo: () => {
    return http.get('/login/userInfo')
  },
}
