<template>
  <Env />
  <Router />
  <Axios />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Env from "@/components/study/Env.vue";
import Axios from "@/components/study/Axios.vue";
import Router from "@/components/study/Router.vue";

export default defineComponent({
  name: "Home",
  components: {
    Axios,
    Router,
    Env,
  },
  setup() {
    return {};
  },
});
</script>