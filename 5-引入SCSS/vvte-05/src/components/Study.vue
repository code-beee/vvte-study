<template>
  <!-- ↓环境变量demo -->
  <div>
    <h1 class="red">环境变量</h1>
    host: {{ host }} <br />
    port: {{ port }} <br />
    open: {{ open }} <br />
    baseUrl: {{ baseUrl }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import '@/styles/index.scss'

export default defineComponent({
  name: "Study",
  setup() {
    // ↓读取环境变量
    const host = import.meta.env.VITE_HOST;
    const port = import.meta.env.VITE_PORT;
    const open = import.meta.env.VITE_OPEN;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    // ↓返回变量，使其在html元素中能够读取
    return {
      host,
      port,
      open,
      baseUrl,
    };
  },
});
</script>