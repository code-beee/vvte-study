<template>
  <div class="bg">
    <div class="panel">
      <div class="panel-left">
        <el-radio-group v-model="form.username" size="small" style="margin-bottom: 20px">
          <el-radio-button label="admin"></el-radio-button>
          <el-radio-button label="zhangsan"></el-radio-button>
        </el-radio-group>
        <el-input v-model="form.username" class="form-item" placeholder="用户名"></el-input>
        <el-input
          v-model="form.password"
          class="form-item"
          type="password"
          placeholder="密码"
          @keyup.enter="signin"
        ></el-input>
        <el-button class="login-btn" @click="signin">登 录</el-button>
      </div>
      <div class="panel-right">
        <img src="@/assets/logo-100.png" width="60" />
        <div class="title">Code-Bee</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { errorMessage } from '@/utils/notice/message'
import loginApi from '@/api/login'
import { setToken } from '@/utils/token/index'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()

    // ↓表单数据
    const form = reactive({
      username: 'admin',
      password: '123456',
    })

    // ↓登录
    const signin = () => {
      if (!form.username) {
        errorMessage('用户名为空')
      } else if (!form.password) {
        errorMessage('密码为空')
      } else {
        loginApi.signin(form).then((res: any) => {
          // ↓保存token
          setToken(res.data.token)
          router.push('/')
        })
      }
    }
    return { form, signin }
  },
})
</script>

<style lang="scss" scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top left, rgba(0, 160, 160, 0.6), rgba(0, 0, 160, 0.7), rgba(110, 0, 160, 0.6));
  background-size: cover;
  background-position: center;
  .panel {
    display: flex;
    position: relative;
    width: 500px;
    margin: auto;
    top: 30%;
    .panel-left {
      width: 300px;
      padding: 40px 20px;
      border-radius: 10px 0 0 10px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-right: unset;
      background: rgba(255, 255, 255, 0.1);
      .form-item {
        margin-bottom: 20px;
      }
      .login-btn {
        width: 100%;
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.3);
        color: #fff;
      }
      .login-btn:hover {
        background-color: rgba(255, 255, 255, 0.4);
        border-color: rgba(255, 255, 255, 0.4);
      }
    }
    .panel-right {
      flex: 1;
      text-align: center;
      padding: 70px 20px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 0 10px 10px 0;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-left: unset;
      .title {
        font-weight: bold;
        color: #333;
      }
    }
  }
}
</style>

<style lang="scss">
.bg .panel .el-input__inner {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
  color: #eee;
}
.bg .panel .el-input__inner:focus {
  border-color: #eee;
}
</style>
