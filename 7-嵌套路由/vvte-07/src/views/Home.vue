<template>
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
</template>

<script lang="ts">
import "@/styles/index.scss";
import { defineComponent } from "vue";

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
    // ↓返回变量，使支持template获取
    return {
      mode,
      host,
      port,
      open,
      baseUrl,
    };
  },
});
</script>