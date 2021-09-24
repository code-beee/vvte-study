import http from '@/utils/http/index'

export default {
  // ↓登录
  signin: (data?: any) => {
    return http.post('/login/signin', data)
  },
}
