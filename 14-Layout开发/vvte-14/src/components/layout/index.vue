<template>
  <el-container>
    <el-aside width="240px"><Sidebar /></el-aside>
    <el-container>
      <el-header height="50px" style="box-shadow: inset 0px 1px 4px 0px rgba(0, 0, 0, 0.08)"><Header /></el-header>
      <el-main>
        <!-- ↓layout路由视图 -->
        <router-view></router-view>
      </el-main>
      <el-footer height="50px" style="box-shadow: inset 0px 1px 4px 0px rgba(0, 0, 0, 0.08)"><Footer /></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from './sidebar/index.vue'
import Header from './header/index.vue'
import Footer from './footer/index.vue'

export default defineComponent({
  name: 'Layout',
  components: { Sidebar, Header, Footer },
})
</script>

<style lang="scss" scoped>
.el-main {
  text-align: center;
}
</style>
