import Mock from 'mockjs'
import { getToken } from '@/utils/token/index'

// ↓mock数据
const data = Mock.mock({
  'adminToken|1': [
    {
      token: '@STRING( "lower", 24 )',
    },
  ],
  'zhangsanToken|1': [
    {
      token: '@STRING( "lower", 12 )',
    },
  ],
  'adminInfo|1': [
    {
      id: '@INCREMENT()',
      username: 'admin',
      name: '超级管理员',
      avatar: '@IMAGE(100, "#ffc72d", "Code-Bee"),',
      menus: [
        {
          id: 1,
          name: '权限管理',
          icon: 'el-icon-menu',
          children: [
            { id: 2, name: '用户管理', routeName: 'sys-user', path: '/sys/user', component: '/sys/User.vue' },
            { id: 3, name: '角色管理', routeName: 'sys-role', path: '/sys/role', component: '/sys/Role.vue' },
            { id: 4, name: '菜单管理', path: '/sys/menu' },
          ],
        },
        {
          id: 5,
          name: '系统管理',
          icon: 'el-icon-setting',
          children: [
            { id: 6, name: '系统字典', path: '/sys/dict' },
            { id: 7, name: '参数配置', path: '/sys/config' },
            { id: 8, name: '通知公告', path: '/sys/notice' },
            { id: 9, name: '日志审计', path: '/sys/log' },
          ],
        },
      ],
    },
  ],
  'zhangsanInfo|1': [
    {
      id: '@INCREMENT()',
      username: 'zhangsan',
      name: '张三',
      avatar: '@IMAGE(100, "#ffc72d", "张三"),',
      menus: [
        {
          id: 1,
          name: '权限管理',
          icon: 'el-icon-menu',
          children: [{ id: 2, name: '用户管理', routeName: 'sys-user', path: '/sys/user', component: '/sys/User.vue' }],
        },
      ],
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
      if ((obj.username !== 'admin' && obj.username !== 'zhangsan') || obj.password !== '123456') {
        return {
          code: 400,
          data: null,
          message: '用户名或者密码错误',
        }
      }
      if (obj.username === 'admin') {
        return {
          code: 200,
          data: data.adminToken,
          message: '登录成功',
        }
      } else {
        return {
          code: 200,
          data: data.zhangsanToken,
          message: '登录成功',
        }
      }
    },
  },
  // ↓查询用户信息
  {
    url: new RegExp('/login/userInfo'),
    type: 'get',
    result: (config: any) => {
      if (getToken().length === 24) {
        return {
          code: 200,
          data: data.adminInfo,
          message: '查询成功',
        }
      } else {
        return {
          code: 200,
          data: data.zhangsanInfo,
          message: '查询成功',
        }
      }
    },
  },
]
