import Mock from 'mockjs'
import userMock from './sys/user'

userMock.forEach((item) => {
  Mock.mock(item.url, item.type, item.result)
})
