import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface InterceptorConfig<T> {
  // ↓是否开启中止请求功能
  enableAbortRequest?: boolean
  // ↓请求拦截器
  interceptorRequest?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  // ↓请求拦截器异常处理
  interceptorRequestRejected?: (error: any) => any
  // ↓响应拦截器
  interceptorResponse?: (value: AxiosResponse<T>) => AxiosResponse<any> | Promise<AxiosResponse<T>>
  // ↓响应拦截器异常处理
  interceptorResponseRejected?: (error: any) => any
}

// ↓自定义请求配置
export interface CustomRequest<T> {
  // ↓原生axios配置
  customConfig?: AxiosRequestConfig
  // ↓拦截器配置
  interceptorConfig: InterceptorConfig<T>
}

// ↓自定义响应内容
export interface CustomResponse {
  // ↓消息
  message: string
  // ↓状态码
  code: number
  // ↓数据集
  result: any
}
