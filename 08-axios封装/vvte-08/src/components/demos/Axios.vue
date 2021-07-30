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
    // ↓取消请求函数
    let cancelRequest = (msg?: string) => {};

    // ↓发送get请求
    const httpGet = () => {
      http
        .get("https://jsonplaceholder.typicode.com/posts1/1")
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