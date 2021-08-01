<template>
  <!-- ↓路由demo -->
  <div>
    <h2>路由</h2>
    <!-- ↓匹配路由path进行跳转 -->
    <router-link to="/sys/user">Go to User</router-link> <br />
    <!-- ↓匹配路由name进行跳转 -->
    <router-link :to="{ name: 'login' }">Go to Login</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Router",
});
</script>