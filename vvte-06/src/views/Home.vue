<template>
  <Env />
  <Router />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Env from "@/components/demos/Env.vue";
import Router from "@/components/demos/Router.vue";

export default defineComponent({
  name: "Home",
  components: {
    Router,
    Env,
  },
});
</script>