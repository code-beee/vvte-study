import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios"

interface RequestConfig {
  baseURL: string,
  timeout: number
}

export class HttpAxios {
  private requestConfig: RequestConfig
  private requestInterceptor: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  private responseInterceptor: (value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>
  private axiosInstance: AxiosInstance

  constructor(
    requestConfig: RequestConfig,
    requestInterceptor: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    responseInterceptor: (value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>
  ) {
    this.requestConfig = requestConfig
    this.requestInterceptor = requestInterceptor
    this.responseInterceptor = responseInterceptor

    this.axiosInstance = axios.create(requestConfig)
    this.axiosInstance.interceptors.request.use(requestInterceptor)
    this.axiosInstance.interceptors.response.use(responseInterceptor)
  }

  public request<T = any>(url: string, method: Method, params?: any): Promise<T> {
    return this.axiosInstance.request({ url, method, params })
  }

  public get<T = any>(url: string): Promise<T> {
    return this.request(url, 'get')
  }

}