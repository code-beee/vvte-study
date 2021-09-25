import http from '@/utils/http/index'

export default {
  // ↓分页查询
  page: (params?: any) => {
    return http.get('/sys/user', params)
  },
  // ↓新增
  add: (data?: any) => {
    return http.post('/sys/user', data)
  },
  // ↓修改
  modify: (data?: any) => {
    return http.put('/sys/user', data)
  },
  // ↓删除
  del: (id: number | string, data?: any) => {
    return http.delete('/sys/user/' + id, data)
  },
}
