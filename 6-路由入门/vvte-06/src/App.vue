<template>
  <HelloWorld />
  <!-- ↓总路由视图 -->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
});
</script>