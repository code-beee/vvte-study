import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface CustomOptions {
  customConfig?: AxiosRequestConfig;
  interceptorRequest?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  interceptorRequestError?: (error: any) => any
  interceptorResponse?: ((value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>)
  interceptorResponseError?: (error: any) => any
}

export class CustomAxios {
  private instance: AxiosInstance;
  private customConfig?: AxiosRequestConfig;

  constructor(customOptions: CustomOptions = {}) {
    const { customConfig, interceptorRequest, interceptorRequestError, interceptorResponse, interceptorResponseError } = customOptions;
    this.customConfig = customConfig
    this.instance = axios.create(customConfig)


    // ↓请求拦截器。在请求发送前，对请求配置做一些处理
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (interceptorRequest) {
        return interceptorRequest(config)
      }
      // console.log('执行请求拦截器...');
      return config;
    }, (error: any) => {
      if (interceptorRequestError) {
        return interceptorRequestError(error)
      }
      return Promise.reject(error);
    })


    // ↓响应拦截器。在then、catch之前对响应数据做一些处理
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      if (interceptorResponse) {
        return interceptorResponse(response)
      }
      // console.log('执行响应拦截器...');
      return response;
    }, error => {
      if (interceptorResponseError) {
        return interceptorResponseError(error)
      }
      return Promise.reject(error);
    })
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.instance.request(config)
  }

  public get(url: string, params?: object): Promise<AxiosResponse<any>> {
    return this.instance.get(url, { params: params })
  }

  public post(url: string, params?: object): Promise<AxiosResponse<any>> {
    return this.instance.post(url, { data: params })
  }

  public put(url: string, params?: object): Promise<AxiosResponse<any>> {
    return this.instance.put(url, { data: params })
  }

  public delete(url: string, params?: object): Promise<AxiosResponse<any>> {
    return this.instance.delete(url, { data: params })
  }

  // public getCustomConfig(): AxiosRequestConfig | undefined {
  //   return this.customConfig;
  // }

}