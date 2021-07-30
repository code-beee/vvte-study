<template>
  <!-- ↓HTTP请求demo -->
  <div>
    <h2>HTTP请求</h2>
    <button @click="httpGet">get请求</button>
    <button @click="httpPost">post请求</button>
    <button @click="httpCancel">取消请求</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axiosInstance, CancelToken } from "@/utils/http/index";

export default defineComponent({
  name: "Axios",
  setup() {
    // ↓取消请求函数
    let cancelRequest = (msg?: string) => {};

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
    // ↓测试取消请求
    const httpCancel = () => {
      axiosInstance
        .get("https://jsonplaceholder.typicode.com/posts/1", {
          // ↓实例化取消令牌，构造函数执行器接受一个取消函数
          cancelToken: new CancelToken(function executor(c) {
            cancelRequest = c;
          }),
        })
        .then((response: any) => {
          console.log(response);
        })
        .catch((error: any) => {
          alert(error);
        });
      cancelRequest("取消请求测试");
    };

    return {
      httpGet,
      httpPost,
      httpCancel,
    };
  },
});
</script>