// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CustomAxios, CustomResponse } from './custom-axios';

// ↓实例化axios对象
const customAxios = new CustomAxios<CustomResponse>({
  customConfig: {
    // ↓从环境变量读取VITE_BASE_URL
    baseURL: import.meta.env.VITE_BASE_URL as string,
    // ↓超时时间（10s）
    timeout: 10 * 1000,
    // ↓超时提示信息
    timeoutErrorMessage: '请求超时，请稍后再试。'
  },
  interceptorRequest: (config: AxiosRequestConfig) => {
    // TODO 业务逻辑
    console.log('执行请求拦截器...');
    return config
  },
  interceptorResponse: (res: AxiosResponse) => {
    // TODO 业务逻辑
    console.log('执行响应拦截器...');
    return res
  }
});

export default customAxios;