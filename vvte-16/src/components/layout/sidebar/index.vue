<template>
  <div class="sidebar">
    <el-menu default-active="1-1" class="menu" :collapse="sidebarCollapse">
      <div class="logo">
        <img src="@/assets/logo-100.png" width="32" height="32" />
        <span v-show="!sidebarCollapse"> Code-Bee管理系统</span>
      </div>

      <el-sub-menu v-for="menu in menus" :key="menu.id" :index="menu.id + ''">
        <template #title>
          <i :class="menu.icon"></i>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item v-for="sub in menu.children" :key="sub.id" :index="sub.id + ''">{{ sub.name }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { useUserInfoStore } from '@/store/user-info'

export default defineComponent({
  name: 'Sidebar',
  setup() {
    // ↓注入父组件值
    const sidebarCollapse = ref(inject('sidebarCollapse'))
    // ↓从store获取用户菜单
    const menus = useUserInfoStore().menus

    return {
      sidebarCollapse,
      menus,
    }
  },
})
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.1);
  .menu {
    border-right: unset;
    .logo {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      overflow: hidden;
      img {
        vertical-align: middle;
        margin-left: 6px;
      }
      span {
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .menu:not(.el-menu--collapse) {
    width: 240px;
  }
}
</style>
