<template>
  <div style="height: 100vh">
    <div style="text-align: center; height: 50px; line-height: 50px; padding: 0 15px">
      <img src="@/assets/logo-100.png" width="32" height="32" style="vertical-align: middle; margin-right: 10px" />
      <span style="font-weight: bold; color: #555; font-size: 16px">Code-Bee管理系统</span>
    </div>
    <el-menu default-active="1-1" class="menu" @open="handleOpen" @close="handleClose">
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
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const handleOpen = (key: number | string, keyPath: number | string) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: number | string, keyPath: number | string) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
    }
  },
})
</script>

<style lang="scss" scoped>
.menu {
  border-right: unset;
}
</style>
