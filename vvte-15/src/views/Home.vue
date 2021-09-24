<template>
  <Env />
  <Router />
  <Axios />
  <Mock />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Env from '@/components/demos/Env.vue'
import Router from '@/components/demos/Router.vue'
import Axios from '@/components/demos/Axios.vue'
import Mock from '@/components/demos/Mock.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Env,
    Router,
    Axios,
    Mock,
  },
})
</script>
