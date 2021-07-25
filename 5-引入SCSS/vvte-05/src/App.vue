<template>
  <Study />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Study from '@/components/Study.vue'

export default defineComponent({
  name: "App",
  components: {
    Study,
  },
});
</script>