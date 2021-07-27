import axios, { AxiosInstance } from 'axios'

// ↓创建axios对象
export const axiosInstance: AxiosInstance = axios.create({
  // ↓从环境变量读取VITE_BASE_URL
  baseURL: import.meta.env.VITE_BASE_URL as string,
  // ↓超时时间
  timeout: 5000,
  // ↓超时提示信息
  timeoutErrorMessage: '请求超时，请稍后尝试。'
})
