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
        <el-avatar :src="avatar"></el-avatar>
        <el-icon>
          <caret-bottom />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-right" divided @click="signout">用户登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '@/store/user-info'

export default defineComponent({
  name: 'Header',

  props: {
    sidebarCollapse: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:sidebarCollapse'],

  setup(props, { emit }) {
    const router = useRouter()
    // ↓从store获取用户头像
    const avatar = useUserInfoStore().avatar

    // ↓Sidebar折叠/展开的开关
    const toggle = () => {
      // ↓修改父组件值
      emit('update:sidebarCollapse', !props.sidebarCollapse)
    }
    // ↓登出
    const signout = () => {
      // ↓将store重置为初始值
      useUserInfoStore().$reset()
      router.push('/login')
    }

    return { avatar, toggle, signout }
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
