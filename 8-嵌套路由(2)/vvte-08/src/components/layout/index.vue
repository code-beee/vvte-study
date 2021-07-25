<template>
  <!-- ↓上层navbar -->
  <div class="red-border text-center">
    <h3>Header</h3>
  </div>
  <!-- ↓中层 -->
  <div class="flex">
    <!-- ↓sidebar -->
    <div class="green-border text-center">
      <h3>Sidebar</h3>
    </div>
    <!-- ↓content -->
    <div class="flex-1 text-center">
      <!-- ↓layout下的路由出口 -->
      <router-view></router-view>
    </div>
  </div>
  <!-- ↓下层footer -->
  <div class="blue-border text-center">
    <h3>Footer</h3>
  </div>
</template>

<script>
import "@/styles/index.scss";
</script>