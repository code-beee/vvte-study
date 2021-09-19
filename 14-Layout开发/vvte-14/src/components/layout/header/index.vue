<template>
  <div style="display: flex; justify-content: space-between">
    <div style="padding: 13px">
      <el-icon :size="24">
        <fold />
      </el-icon>
    </div>
    <div style="padding: 5px">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Fold } from '@element-plus/icons'

export default defineComponent({
  name: 'Header',
  components: {
    // 全名
    [Fold.name]: Fold,
    // 或者以缩写的方式,
    Fold,
  },
  // setup() {},
})
</script>

<style lang="scss" scoped>
.header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 50px;
}
</style>
