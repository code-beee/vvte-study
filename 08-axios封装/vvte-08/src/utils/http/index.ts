import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CustomAxios } from './custom-axios';
import { CustomResponse } from './types';

// ↓实例化自定义axios
const customAxios = new CustomAxios<CustomResponse>({
  // ↓axios原生配置
  customConfig: {
    // ↓从环境变量读取VITE_BASE_URL
    baseURL: import.meta.env.VITE_BASE_URL as string,
    // ↓超时时间（10s）
    timeout: 10 * 1000,
    // ↓超时提示信息
    timeoutErrorMessage: '请求超时，请稍后再试。'
  },
  // ↓拦截器配置
  interceptorConfig: {
    // ↓开启中止请求功能
    enableAbortRequest: false,
    interceptorRequest: (config: AxiosRequestConfig) => {
      // TODO 请求拦截业务逻辑
      console.log('执行请求拦截器...');
      return config
    },
    interceptorResponse: (res: AxiosResponse) => {
      // TODO 相应拦截业务逻辑
      console.log('执行响应拦截器...');
      return res
    }
  }
});

export default customAxios;