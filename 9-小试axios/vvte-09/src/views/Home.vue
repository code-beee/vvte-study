<template>
  <div class="flex">
    <!-- ↓=====左侧控制区===== -->
    <div>
      <!-- ↓环境变量demo -->
      <div>
        <h2 class="red">环境变量</h2>
        mode: {{ mode }} <br />
        host: {{ host }} <br />
        port: {{ port }} <br />
        open: {{ open }} <br />
        baseUrl: {{ baseUrl }}
      </div>
      <!-- ↓路由demo -->
      <div>
        <h2 class="red">路由</h2>
        <!-- ↓匹配路由path进行跳转 -->
        <router-link to="/sys/user">Go to User</router-link> <br />
        <!-- ↓匹配路由name进行跳转，防止硬编码的URL -->
        <router-link :to="{ name: 'login' }">Go to Login</router-link>
      </div>
      <!-- ↓HTTP请求demo -->
      <div>
        <h1>HTTP请求</h1>
        <button @click="httpGet">get请求</button>
        <button @click="httpPost">post请求</button>
      </div>
    </div>
    <!-- ↓=====右侧展示区===== -->
    <div class="flex-1">
      {{ state.responseData }}
    </div>
  </div>
</template>

<script lang="ts">
import "@/styles/index.scss";
import { defineComponent, reactive } from "vue";
import { axiosInstance } from "@/utils/http/index";

export default defineComponent({
  name: "Home",
  setup() {
    // ↓读取内建环境变量
    const mode = import.meta.env.MODE;
    // ↓读取自定义环境变量
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;
    const open = import.meta.env.VITE_OPEN;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    // ↓响应式reactive变量
    const state = reactive({
      // ↓请求响应数据
      responseData: undefined,
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

    // ↓返回变量，使支持template获取
    return {
      mode,
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