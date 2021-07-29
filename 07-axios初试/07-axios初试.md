[TOC]

# 小试axios

## 🎯 目标

- 创建 axios 实例，配置请求拦截器和响应拦截器。
- 发送get、post请求，控制台输出响应数据。

## 😴 功课

axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

可以直接使用 axios 静态对象，也可以自己创建一个实例，为防止静态对象被修改，最好自己创建个实例。

创建 axios 实例的接口为 `create(config?: AxiosRequestConfig): AxiosInstance`，接受一个 AxiosRequestConfig 参数，返回axios 实例 AxiosInstance。

<br/>

`AxiosRequestConfig` 的接口属性说明：

```typescript
export interface AxiosRequestConfig {
  // ↓请求地址
  url?: string;
  // ↓请求方法，比如get、post、put、delete等。（默认：get）
  method?: Method;
  // ↓将自动在url前面加上baseURL，除非url是一个绝对地址，便于发送请求时传递相对url
  baseURL?: string;
  // ↓允许在将请求数据发送到服务器之前对其进行更改。仅适用于请求方法post、put、delete、patch
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  // ↓允许在将响应数据传递给then/catch前进行更改
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  // ↓自定义请求头
  headers?: any;
  // ↓接在URL中的请求参数
  params?: any;
  // ↓负责请求参数序列化
  paramsSerializer?: (params: any) => string;
  // ↓request body中的请求参数。仅适用于请求方法post、put、delete、patch
  data?: any;
  // ↓指定请求超时的毫秒数，0表示无超时时间。（默认：0）
  timeout?: number;
  // ↓请求超时提示信息。
  timeoutErrorMessage?: string;
  // ↓跨域请求时是否需要使用凭证。（默认：false）
  withCredentials?: boolean;
  // ↓允许自定义处理请求，以使测试更轻松。返回promise并提供有效响应
  adapter?: AxiosAdapter;
  // ↓使用HTTP基础验证，并提供凭据。会设置Authorization请求头，覆盖任何现有的Authorization自定义请求头。只有HTTP基本身份验证可通过此参数进行配置
  auth?: AxiosBasicCredentials;
  // ↓服务器响应的数据类型，可以是arraybuffer, blob, document, json, text, stream。（默认：json)
  responseType?: ResponseType;
  // ↓xsrf token的cookie名称
  xsrfCookieName?: string;
  // ↓携带xsrf token值的请求头的名称
  xsrfHeaderName?: string;
  // ↓处理上传进度事件，仅浏览器
  onUploadProgress?: (progressEvent: any) => void;
  // ↓处理下载进度事件，仅浏览器
  onDownloadProgress?: (progressEvent: any) => void;
  // ↓响应内容的最大大小，单位bit，仅node
  maxContentLength?: number;
  // ↓设置响应结果成功码，如果返回true、null、undefined，则promise执行resolve，否则执行reject
  validateStatus?: ((status: number) => boolean) | null;
  // ↓ 请求内容的最大大小，单位bit
  maxBodyLength?: number;
  // ↓最大重定向数，设置为0将不会执行重定向。（默认：5）
  maxRedirects?: number;
  // ↓在node.js中使用的UNIX Socket路径。（默认：null）
  socketPath?: string | null;
  // ↓定义了在node.js中执行http请求时要使用的自定义代理，可以添加默认情况下未启用的选项，比如keepAlive。
  httpAgent?: any;
  // ↓同上，https请求
  httpsAgent?: any;
  // ↓设置请求代理
  proxy?: AxiosProxyConfig | false;
  // ↓用于取消请求的token
  cancelToken?: CancelToken;
  // ↓是否应自动解压缩响应内容，仅node
  decompress?: boolean;
}
```

<br/>

`AxiosInstance` 的接口属性说明：

```typescript
export interface AxiosInstance {
  // ↓带有AxiosRequestConfig的构造函数
  (config: AxiosRequestConfig): AxiosPromise;
  // ↓带有url和AxiosRequestConfig的构造函数
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  // ↓给axios实例设置默认AxiosRequestConfig配置的属性
  defaults: AxiosRequestConfig;
  // ↓给axios实例设置interceptors的属性
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  // ↓获取URI
  getUri(config?: AxiosRequestConfig): string;
  // ↓以下是发送各种请求的API
  request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}
```

## 🍸 准备

### 安装依赖

```bash
npm install -S axios
```

### 调整文件&目录

在 `src` 目录下创建 `utils` 文件夹，用来存放工具类和工具方法。

utils文件目录结构如下：

📁 src

----📁 utils

--------📁 http

------------📄 index.ts

<br/>

添加 `components/demos/Axios.vue` 文件，用来测试axios。

## 🌈 Coding

### 创建 axios 实例

在 `utils/http/index.ts` 创建 axios 实例，并配置拦截器：

```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

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

```

### Demo组件

在 `Axios.vue` 测试 axios 发送请求：

```vue
<template>
  <!-- ↓HTTP请求demo -->
  <div>
    <h2>HTTP请求</h2>
    <button @click="httpGet">get请求</button>
    <button @click="httpPost">post请求</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axiosInstance } from "@/utils/http/index";

export default defineComponent({
  name: "Axios",
  setup() {
    // ↓发送get请求
    const httpGet = () => {
      axiosInstance
        .get("https://jsonplaceholder.typicode.com/posts/1")
        .then((response: any) => {
          console.log(response);
        })
        .catch((error: any) => {
          alert(error);
        });
    };
    // ↓发送post请求
    const httpPost = () => {
      axiosInstance
        .post("https://jsonplaceholder.typicode.com/posts", {
          keyword: "code",
        })
        .then((response: any) => {
          console.log(response);
        })
        .catch((error: any) => {
          alert(error);
        });
    };

    return {
      httpGet,
      httpPost,
    };
  },
});
</script>
```

> 💡 接口地址是调用的 [免费开放API](http://jsonplaceholder.typicode.com/)

### Demo汇聚

将 Axios.vue 导入 Home.vue：

```vue
<template>
  <Env />
  <Router />
  <Axios />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Env from "@/components/demos/Env.vue";
import Router from "@/components/demos/Router.vue";
import Axios from "@/components/demos/Axios.vue";

export default defineComponent({
  name: "Home",
  components: {
    Env,
    Router,
    Axios,
  },
});
</script>
```

## 🎭 结果

点击按钮发送get和post请求，在控制台输出日志。顺序为：“执行请求拦截器...” > "执行响应拦截器... " > 响应数据。
