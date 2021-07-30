import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Cancel, Canceler } from "axios";
import { AxiosCancel } from "./axios-cancel";

// ↓自定义请求接口
interface CustomRequest {
  // ↓axios配置
  customConfig?: AxiosRequestConfig;
  // ↓请求拦截器
  interceptorRequest?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  // ↓请求拦截器异常处理
  interceptorRequestRejected?: (error: any) => any
  // ↓响应拦截器
  interceptorResponse?: ((value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>)
  // ↓响应拦截器异常处理
  interceptorResponseRejected?: (error: any) => any
}

// ↓自定义响应接口
export interface CustomResponse {
  // ↓消息
  message: string;
  // ↓状态码
  code: number;
  // ↓数据集
  result: any
}

// ↓自定义axios类
export class CustomAxios<T extends CustomResponse> {
  private instance: AxiosInstance;
  private axiosCancel: AxiosCancel

  constructor(customRequest: CustomRequest = {}) {
    // ↓获取自定义请求配置
    const { customConfig, interceptorRequest, interceptorRequestRejected, interceptorResponse, interceptorResponseRejected } = customRequest;
    // ↓实例化axios对象
    this.instance = axios.create(customConfig)
    // ↓实例化取消axios请求对象
    this.axiosCancel = new AxiosCancel()

    // ↓请求拦截器。在请求发送前，对请求配置做一些处理
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const pendingKey = this.axiosCancel.genPendingKey(config)
      if (this.axiosCancel.cancelRequest(pendingKey)) {
        this.axiosCancel.addPending(config)
      }
      if (interceptorRequest) {
        console.log('进入请求拦截器...')
        return interceptorRequest(config)
      }
      return config;
    }, (error: any) => {
      console.log('请求拦截器抛出异常...')
      if (interceptorRequestRejected) {
        return interceptorRequestRejected(error)
      }
      return Promise.reject(error);
    })

    // ↓响应拦截器。在then、catch之前对响应数据做一些处理
    this.instance.interceptors.response.use((response: AxiosResponse<T>) => {
      const pendingKey = this.axiosCancel.genPendingKey(response.config)
      this.axiosCancel.removePending(pendingKey)
      if (interceptorResponse) {
        console.log('进入响应拦截器...')
        return interceptorResponse(response)
      }
      return response;
    }, error => {
      console.log('响应拦截器抛出异常...')
      if (interceptorResponseRejected) {
        return interceptorResponseRejected(error)
      }
      return Promise.reject(error);
    })
  }

  // ↓自定义请求
  request(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then((response) => {
        resolve(response)
      }).catch((error) => {
        // TODO 魔法值需配置化
        const msg = error || '程序内部错误'
        alert(msg);
        reject(msg)
      })
    })
  }

  // ↓get请求
  get(url: string, params?: object): Promise<AxiosResponse<T>> {
    return this.request({ url, method: 'GET', params })
  }

  // ↓post请求
  post(url: string, params?: object): Promise<AxiosResponse<T>> {
    return this.request({ url, method: 'POST', data: params })
  }

  // ↓put请求
  put(url: string, params?: object): Promise<AxiosResponse<T>> {
    return this.request({ url, method: 'PUT', data: params })
  }

  // ↓delete请求
  delete(url: string, params?: object): Promise<AxiosResponse<T>> {
    return this.request({ url, method: 'DELETE', data: params })
  }

}