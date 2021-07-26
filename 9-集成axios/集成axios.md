# 集成axios

## 安装依赖

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

安装axios：

```bash
npm install -S axios
```

## 创建目录和文件

在 `src` 目录下创建 `utils` 文件夹，用来存放封装的各种工具类和方法。除了 axios 工具外，以后还会有其它工具，最好按功能划分到不同目录，故将 axios 工具放到 http 目录下。

utils文件目录结构如下：

📁 src

----📁 utils

--------📁 http

------------📄 index.ts



## 实例化接口说明

实例化 axios 对象的接口为 `create(config?: AxiosRequestConfig): AxiosInstance`，接受一个 AxiosRequestConfig 参数，返回axios 实例 AxiosInstance。

AxiosRequestConfig 的接口属性说明：

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

AxiosInstance 的接口属性说明：

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

## 🌈Coding

根据上面的实例化接口，在 `/utils/http/index.ts` 创建 axios 实例，代码如下：

```typescript
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

```

------

在 Home 页面添加测试功能，导入 axios 对象，提供get和post方法，点击按钮发送请求。同时将响应数据显示到页面，为了方便查看响应数据，对样式也做了点调整，修改后的 `Home.vue` 代码如下：

```vue
<template>
  <!-- ↓内容区域 -->
  <div class="flex">
    <!-- ↓左侧内容 -->
    <div class="yellow-border">
      <!-- ↓环境变量demo -->
      <div>
        <h1 class="red">环境变量</h1>
        host: {{ host }} <br />
        port: {{ port }} <br />
        open: {{ open }} <br />
        baseUrl: {{ baseUrl }}
      </div>
      <!-- ↓路由demo -->
      <div>
        <h1 class="blue">路由</h1>
        <!-- ↓匹配路由path进行跳转 -->
        <router-link to="/sys/user">Go to User 嵌套路由</router-link> <br />
        <!-- ↓匹配路由name进行跳转，防止硬编码的URL -->
        <router-link :to="{ name: 'login' }"
          >Go to Login 非嵌套路由</router-link
        >
      </div>
      <!-- ↓HTTP请求demo -->
      <div>
        <h1>HTTP请求</h1>
        <button @click="httpGet">get请求</button>
        <button @click="httpPost">post请求</button>
      </div>
    </div>
    <!-- ↓右侧内容 -->
    <div class="flex-1 grey-border">
      {{ state.responseData }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import "@/styles/index.scss";
import { axiosInstance } from "@/utils/http/index";

export default defineComponent({
  name: "Home",
  setup() {
    // ↓读取环境变量
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;
    const open = import.meta.env.VITE_OPEN;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    // ↓响应式reactive变量
    const state = reactive({
      // ↓请求响应数据
      responseData: {},
    });
    // ↓发送get请求
    const httpGet = () => {
      axiosInstance
        .get("https://jsonplaceholder.typicode.com/posts/1")
        .then((response: any) => {
          state.responseData = response;
        })
        .catch((error: any) => {
          alert(error);
        });
    };
    // ↓发送post请求
    const httpPost = () => {
      axiosInstance
        .post("https://jsonplaceholder.typicode.com/posts", {
          keyword: "奥运会",
        })
        .then((response: any) => {
          state.responseData = response;
        })
        .catch((error: any) => {
          alert(error);
        });
    };

    // ↓返回变量，使其在html元素中能够读取
    return {
      host,
      port,
      open,
      baseUrl,
      state,
      httpGet,
      httpPost,
    };
  },
});
</script>
```

> http://jsonplaceholder.typicode.com/ 是个免费的开放API网站。

------

新增了两个边框样式，`box.scss` 代码如下：

```scss
......

.yellow-border {
  border: 1px solid $color-yellow
}

.grey-border {
  border: 1px solid $color-grey
}
```

> 最后到 Home 页面去测试 ，不出意外的话在页面能看到请求的响应数据。

