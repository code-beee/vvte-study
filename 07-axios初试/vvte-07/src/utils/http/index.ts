import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// ↓取消令牌类
export const CancelToken = axios.CancelToken;

// ↓创建axios对象
export const axiosInstance: AxiosInstance = axios.create({
  // ↓从环境变量读取VITE_BASE_URL
  baseURL: import.meta.env.VITE_BASE_URL as string,
  // ↓超时时间（10s）
  timeout: 10 * 1000,
})

// ↓请求拦截器。在请求发送前，对请求配置做一些处理
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log('执行请求拦截器...');
  return config
}, error => {
  return Promise.reject(error);
})

// ↓响应拦截器。在then、catch之前对响应数据做一些处理
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  console.log('执行响应拦截器...');
  return response;
}, error => {
  return Promise.reject(error);
})