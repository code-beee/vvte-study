import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AbortRequest } from './abort-request'
import { CustomRequest, InterceptorConfig } from './types'

// ↓自定义axios类
export class CustomAxios<T> {
  // ↓原生axios对象
  private instance: AxiosInstance
  // ↓axios请求中止对象
  private abortRequest: AbortRequest

  // ↓构造函数
  constructor(customRequest: CustomRequest<T>) {
    this.instance = axios.create(customRequest.customConfig)
    this.abortRequest = new AbortRequest()
    this.useInterceptors(customRequest.interceptorConfig)
  }

  // ↓使用拦截器
  useInterceptors(config: InterceptorConfig<T>) {
    // ↓从自定义请求配置获取属性
    const {
      enableAbortRequest,
      interceptorRequest,
      interceptorRequestRejected,
      interceptorResponse,
      interceptorResponseRejected,
    } = config

    // ↓请求拦截器。在请求发送前，对请求配置做一些处理
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // ↓如果开启中止请求功能
        if (enableAbortRequest) {
          const pendingKey = this.abortRequest.genPendingKey(config)
          if (this.abortRequest.cancelRequest(pendingKey)) {
            this.abortRequest.addPending(config)
          }
        }

        if (interceptorRequest) {
          return interceptorRequest(config)
        }
        return config
      },
      (error: any) => {
        console.log('请求拦截器抛出异常...')
        if (interceptorRequestRejected) {
          return interceptorRequestRejected(error)
        }
        return Promise.reject(error)
      }
    )

    // ↓响应拦截器。在then、catch之前对响应数据做一些处理
    this.instance.interceptors.response.use(
      (response: AxiosResponse<T>) => {
        // ↓如果开启中止请求功能
        if (enableAbortRequest) {
          const pendingKey = this.abortRequest.genPendingKey(response.config)
          this.abortRequest.removePending(pendingKey)
        }

        if (interceptorResponse) {
          return interceptorResponse(response)
        }
        return response
      },
      (error) => {
        console.log('响应拦截器抛出异常...')
        if (interceptorResponseRejected) {
          return interceptorResponseRejected(error)
        }
        return Promise.reject(error)
      }
    )
  }

  // ↓request请求
  request(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          // TODO 魔法值需配置化
          const msg = error || '程序内部错误'
          reject(msg)
        })
    })
  }

  // ↓get请求
  get(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ url, method: 'GET', params, ...config })
  }

  // ↓post请求
  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ url, method: 'POST', data, ...config })
  }

  // ↓put请求
  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ url, method: 'PUT', data, ...config })
  }

  // ↓delete请求
  delete(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request({ url, method: 'DELETE', data, ...config })
  }
}
