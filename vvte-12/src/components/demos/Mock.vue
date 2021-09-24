<template>
  <!-- ↓Mock请求demo -->
  <div>
    <h2>Mock请求</h2>
    <button @click="userPage">mock分页查询</button>
    <button @click="addUser">mock新增</button>
    <button @click="modifyUser">mock修改</button>
    <button @click="delUser">mock删除</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import userApi from '@/api/sys/user'

export default defineComponent({
  name: 'Mock',
  setup() {
    // ↓分页
    const userPage = () => {
      userApi.page({ current: 1, size: 10 }).then((response: any) => {
        console.log(response)
      })
    }
    // ↓新增
    const addUser = () => {
      userApi.add({ username: 'zhangsan', name: '张三', email: 'zhangsan@163.com' }).then((response: any) => {
        console.log(response)
      })
    }
    // ↓修改
    const modifyUser = () => {
      userApi.modify({ id: 2, username: 'lisi', name: '李四', email: 'lisi@163.com' }).then((response: any) => {
        console.log(response)
      })
    }
    // ↓删除
    const delUser = () => {
      userApi.del(2).then((response: any) => {
        console.log(response)
      })
    }

    return {
      userPage,
      addUser,
      modifyUser,
      delUser,
    }
  },
})
</script>
