import Mock from 'mockjs'
import userMock from './sys/user'
import loginMock from './login/index'

userMock.concat(loginMock).forEach((item) => {
  Mock.mock(item.url, item.type, item.result)
})
