<template>
  <div class="header">
    <div class="fold-icon" @click="toggle">
      <el-icon v-if="!sidebarCollapse" :size="24" color="#909399">
        <fold />
      </el-icon>
      <el-icon v-else :size="24" color="#909399">
        <expand />
      </el-icon>
    </div>

    <el-dropdown trigger="click">
      <div class="avatar">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-icon>
          <caret-bottom />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-right" divided>退出用户</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  components: {},
  props: {
    sidebarCollapse: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:sidebarCollapse'],
  setup(props, { emit }) {
    const toggle = () => {
      emit('update:sidebarCollapse', !props.sidebarCollapse)
    }
    return { toggle }
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  box-shadow: 3px 1px 4px 0px rgba(0, 0, 0, 0.1);
  .fold-icon {
    padding: 11px 13px;
  }
  .avatar {
    padding: 5px;
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
    .el-avatar {
      margin-right: 5px;
    }
  }
  .fold-icon:hover,
  .avatar:hover {
    cursor: pointer;
    background: #f7f7f7;
  }
}
</style>
