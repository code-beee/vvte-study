<template>
  <h2 class="red">固定区域</h2>
  <!-- ↓layout路由视图 -->
  <router-view></router-view>
</template>

<script>
import '@/styles/index.scss'
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout",
});
</script>
