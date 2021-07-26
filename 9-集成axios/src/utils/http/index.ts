import axios, { AxiosInstance } from 'axios'

// ↓创建axios对象
export const axiosInstance: AxiosInstance = axios.create({
  // ↓从环境变量读取VITE_BASE_URL，转换成string类型
  baseURL: import.meta.env.VITE_BASE_URL as string,
  // ↓从环境变量读取VITE_BASE_TIMEOUT，转换成number类型
  timeout: new Number(import.meta.env.VITE_BASE_TIMEOUT).valueOf(),
  // ↓从环境变量读取VITE_BASE_TIMEOUT_MSG，转换成string类型
  timeoutErrorMessage: import.meta.env.VITE_BASE_TIMEOUT_MSG as string
})
