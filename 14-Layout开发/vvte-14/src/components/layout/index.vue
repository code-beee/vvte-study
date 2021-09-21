<template>
  <el-container>
    <Sidebar />
    <el-container>
      <el-header height="50px"><Header v-model:sidebar-collapse="sidebarCollapse" /></el-header>
      <el-main>
        <!-- ↓layout路由视图 -->
        <router-view></router-view>
      </el-main>
      <Footer />
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref, provide } from 'vue'
import Sidebar from './sidebar/index.vue'
import Header from './header/index.vue'
import Footer from './footer/index.vue'

export default defineComponent({
  name: 'Layout',
  components: { Sidebar, Header, Footer },
  setup() {
    const sidebarCollapse = ref(false)
    provide('sidebarCollapse', sidebarCollapse)
    return {
      sidebarCollapse,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.el-main {
  text-align: center;
}
</style>
