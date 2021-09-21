<template>
  <div class="sidebar">
    <el-menu default-active="1-1" class="menu" :collapse="sidebarCollapse">
      <div class="logo">
        <img src="@/assets/logo-100.png" width="32" height="32" />
        <span v-show="!sidebarCollapse"> Code-Bee管理系统</span>
      </div>
      <el-sub-menu index="1">
        <template #title>
          <i class="el-icon-menu"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="1-1">用户管理</el-menu-item>
        <el-menu-item index="1-2">角色管理</el-menu-item>
        <el-menu-item index="1-3">菜单管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="2-1">系统字典</el-menu-item>
        <el-menu-item index="2-2">参数配置</el-menu-item>
        <el-menu-item index="2-3">通知公告</el-menu-item>
        <el-menu-item index="2-4">日志审计</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
  setup() {
    const sidebarCollapse = ref(inject('sidebarCollapse'))
    return {
      sidebarCollapse,
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
