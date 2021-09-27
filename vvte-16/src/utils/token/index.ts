import Cookies from 'js-cookie'

// ↓cookie 中保存 token 的键
export const tokenKey = 'bee-token'

// ↓获取token
export const getToken = (): string | undefined => {
  return Cookies.get(tokenKey)
}

// ↓设置token
export const setToken = (token: string): string | undefined => {
  return Cookies.set(tokenKey, token)
}

// ↓删除token
export const removeToken = (): void => {
  return Cookies.remove(tokenKey)
}

// ↓判断token是否存在
export const existToken = (): boolean => {
  return getToken() !== undefined
}
