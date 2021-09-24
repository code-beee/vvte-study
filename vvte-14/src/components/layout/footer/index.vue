<template>
  <div class="footer">Copyright ©2021 CodeBee</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
})
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  color: #ccc;
  line-height: 32px;
  border-top: 1px solid #dfdfdf;
  font-size: 12px;
}
</style>
