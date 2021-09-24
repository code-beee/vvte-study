import Mock from 'mockjs'

// ↓mock数据
const data = Mock.mock({
  'list|1-10': [
    {
      id: '@INCREMENT()',
      username: '@STRING("lower", 6, 24)',
      name: '@CNAME',
      email: '@EMIAL',
    },
  ],
})

export default [
  // ↓分页
  {
    url: new RegExp('/sys/user'),
    type: 'get',
    result: () => {
      return {
        code: 200,
        data: data.list,
        message: '请求成功',
      }
    },
  },
  // ↓新增
  {
    url: new RegExp('/sys/user'),
    type: 'post',
    result: (config: any) => {
      const obj = JSON.parse(config.body)
      obj.id = data.list.length + 1
      data.list.unshift(obj)
      return {
        code: 200,
        data: data.list,
        message: '新增成功',
      }
    },
  },
  // ↓修改
  {
    url: new RegExp('/sys/user'),
    type: 'put',
    result: (config: any) => {
      const obj = JSON.parse(config.body)
      for (let i = 0; i < data.list.length; i++) {
        const item = data.list[i]
        if (item.id === obj.id) {
          data.list[i] = obj
        }
      }
      return {
        code: 200,
        data: data.list,
        message: '修改成功',
      }
    },
  },
  // ↓删除
  {
    url: new RegExp('/sys/user'),
    type: 'delete',
    result: (config: any) => {
      const arr = config.url.split('/')
      const id = parseInt(arr[arr.length - 1])
      data.list = data.list.filter((item: any) => item.id !== id)
      return {
        code: 200,
        data: data.list,
        message: '删除成功',
      }
    },
  },
]
