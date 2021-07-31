[TOC]

> 源码地址：[GitHub](https://github.com/code-beee/vvte-study)	/	[码云](https://gitee.com/code-beee/vvte-study/tree/master/)

# axios封装

## 🎯 目标

封装axios工具类，实现功能包含axios配置、拦截器、发送请求、中止请求。

## 🍸 准备

### 调整文件&目录

在 `/src/utils` 目录下创建 axios 封装类。

utils文件目录结构如下：

📁 src

----📁 utils

--------📁 http

------------📄 abort-request.ts

------------📄 custom-axios.ts

------------📄 index.ts

------------📄 types.ts

## 🌈 Coding

### 定义类型

`types.ts` 代码如下：

```typescript
import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface InterceptorConfig<T> {
  // ↓是否开启中止请求功能
  enableAbortRequest?: boolean,
  // ↓请求拦截器
  interceptorRequest?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  // ↓请求拦截器异常处理
  interceptorRequestRejected?: (error: any) => any
  // ↓响应拦截器
  interceptorResponse?: ((value: AxiosResponse<T>) => AxiosResponse<any> | Promise<AxiosResponse<T>>)
  // ↓响应拦截器异常处理
  interceptorResponseRejected?: (error: any) => any
}

// ↓自定义请求配置
export interface CustomRequest<T> {
  // ↓原生axios配置
  customConfig?: AxiosRequestConfig;
  // ↓拦截器配置
  interceptorConfig: InterceptorConfig<T>
}

// ↓自定义响应内容
export interface CustomResponse {
  // ↓消息
  message: string;
  // ↓状态码
  code: number;
  // ↓数据集
  result: any
}
```

### 中止请求类

`abort-request.ts` **结构** 如下（*代码不全，文章顶部有源码地址*）：

```typescript
// ↓中止axios请求类
export class AbortRequest {
  // ↓执行中的请求map集合。key=请求识别号，value=请求取消器
  private pendingMap = new Map<string, Canceler>()

  // ↓生成请求key
  genPendingKey(config: AxiosRequestConfig): string

  // ↓添加执行中请求
  addPending(config: AxiosRequestConfig) 

  // ↓移除执行中请求
  removePending(pendingKey: string) 

  // ↓清空执行中请求
  clearPending()

  // ↓中止执行中请求
  abort(pendingKey: string): boolean 
}
```

### 自定义 axios 类

`custom-axios.ts` **结构** 如下（*代码不全，文章顶部有源码地址*）：

```typescript
// ↓自定义axios类
export class CustomAxios<T> {
  // ↓原生axios对象
  private instance: AxiosInstance
  // ↓axios请求中止对象
  private abortRequest: AbortRequest

  // ↓构造函数
  constructor(customRequest: CustomRequest<T>)

  // ↓使用拦截器
  useInterceptors(config: InterceptorConfig<T>)

  // ↓request请求
  request(config: AxiosRequestConfig): Promise<AxiosResponse<T>>

  // ↓get请求
  get(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> 

  // ↓post请求
  post(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>

  // ↓put请求
  put(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>

  // ↓delete请求
  delete(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
}
```

### 实例化自定义 axios 对象

上面已经将工具类代码封装好，现在我们需要实例化一个对象，并对外暴露使用。`index.ts` 代码如下：

```typescript
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
    enableAbortRequest: true,
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
```

### Demo 组件

最后让 Demo 组件来调用和验证，代码如下：

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
import http from "@/utils/http/index";

export default defineComponent({
  name: "Axios",
  setup() {
    // ↓发送get请求
    const httpGet = () => {
      http
        .get("https://jsonplaceholder.typicode.com/posts/1")
        .then((response: any) => {
          console.log(response);
        });
    };
    // ↓发送post请求，快速双击可测试重复请求
    const httpPost = () => {
      http
        .post("https://jsonplaceholder.typicode.com/posts", {
          keyword: "code",
        })
        .then((response: any) => {
          console.log(response);
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

## 🎭 结果

- 点击按钮发送get和post请求，控制台输出如下日志：

  ```
  addPending:  post&https://jsonplaceholder.typicode.com/posts
  custom-axios.ts:41 进入请求拦截器...
  index.ts:22 执行请求拦截器...
  abort-request.ts:27 removePending:  post&https://jsonplaceholder.typicode.com/posts
  custom-axios.ts:62 进入响应拦截器...
  index.ts:27 执行响应拦截器...
  {data: {…}, status: 201, statusText: "", headers: {…}, config: {…}, …}
  ```

- 快速点击两次按钮，会弹出“重复请求被取消”的提示框，控制台输出如下日志：

  ```
  addPending:  post&https://jsonplaceholder.typicode.com/posts
  custom-axios.ts:41 进入请求拦截器...
  index.ts:22 执行请求拦截器...
  abort-request.ts:42 abortRequest:  post&https://jsonplaceholder.typicode.com/posts
  custom-axios.ts:41 进入请求拦截器...
  index.ts:22 执行请求拦截器...
  custom-axios.ts:67 响应拦截器抛出异常...
  :3000/#/home:1 Uncaught (in promise) Cancel {message: "重复请求被取消"}
  Promise.then (async)
  httpPost @ Axios.vue:31
  _createVNode.onClick._cache.<computed>._cache.<computed> @ Axios.vue:6
  callWithErrorHandling @ runtime-core.esm-bundler.js:155
  callWithAsyncErrorHandling @ runtime-core.esm-bundler.js:164
  invoker @ runtime-dom.esm-bundler.js:349
  abort-request.ts:27 removePending:  post&https://jsonplaceholder.typicode.com/posts
  custom-axios.ts:62 进入响应拦截器...
  index.ts:27 执行响应拦截器...
  Axios.vue:32 {data: {…}, status: 201, statusText: "", headers: {…}, config: {…}, …}
  ```

- 配置 `enableAbortRequest：false` 关闭中止请求功能，点击按钮发送请求，控制台输出如下日志：

  ```
  进入请求拦截器...
  index.ts:22 执行请求拦截器...
  custom-axios.ts:62 进入响应拦截器...
  index.ts:27 执行响应拦截器...
  Axios.vue:22 {data: {…}, status: 200, statusText: "", headers: {…}, config: {…}, …}
  ```

  
