import Mock from 'mockjs'

// ↓mock数据
const data = Mock.mock({
  'info|1': [
    {
      id: '@INCREMENT()',
      username: 'admin',
      name: '超级管理员',
      avatar: '@IMAGE(100, "#ffc72d", "Code-Bee"),',
    },
  ],
})

export default [
  // ↓登录
  {
    url: new RegExp('/login/signin'),
    type: 'post',
    result: (config: any) => {
      const obj = JSON.parse(config.body)
      // ↓校验用户名密码
      if (obj.username !== 'admin' || obj.password !== '123456') {
        return {
          code: 400,
          data: null,
          message: '用户名或者密码错误',
        }
      }
      return {
        code: 200,
        data: data.info,
        message: '登录成功',
      }
    },
  },
]
