import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { loadEnv } from 'vite'

export default ({ command, mode }) => {
  // ↓加载环境变量
  const env = loadEnv(mode, process.cwd())

  return {
    // ↓插件配置
    plugins: [vue()],
    // ↓解析配置
    resolve: {
      // ↓路径别名
      alias: {
        // ↓举例：@/abc => src/abc
        '@': resolve(__dirname, 'src'),
      },
    },
    // ↓服务端配置
    server: {
      // ↓读取环境变量中的HOST、PORT、OPEN
      host: env['VITE_HOST'],
      port: env['VITE_PORT'],
      open: env['VITE_OPEN'],
      strictPort: true,
    },
  }
}
