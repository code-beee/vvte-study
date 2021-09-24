<template>
  <Env />
  <Router />
  <Axios />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Env from '@/components/demos/Env.vue'
import Router from '@/components/demos/Router.vue'
import Axios from '@/components/demos/Axios.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Env,
    Router,
    Axios,
  },
})
</script>
