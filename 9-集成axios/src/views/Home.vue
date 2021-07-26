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