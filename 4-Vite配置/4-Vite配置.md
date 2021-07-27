# Vite配置

## 😴 功课

### 配置文件解析

运行 Vite 时会自动解析项目根目录下名为 `vite.config.js` 的文件。

默认生成的文件内容如下：

```typescript
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

### 常用配置项说明

下面列举了部分常用配置，详细配置参考 [Vite官网](https://vitejs.cn/config/)。

#### **base**

**类型：** `string`

**默认：** `/`

开发或生产环境服务的 公共基础路径。合法的值包括以下几种：

- 绝对 URL 路径名，例如 `/foo/`
- 完整的 URL，例如 `https://foo.com/`
- 空字符串或 `./`（用于开发环境）

---

#### **plugins**

- **类型：** `(Plugin | Plugin[])[]`

    将要用到的插件数组。

---

#### **resolve.alias**

- **类型：**

    `Record<string, string> | Array<{ find: string | RegExp, replacement: string }>`

    将会被传递到 `@rollup/plugin-alias` 作为它的 [entries](https://github.com/rollup/plugins/tree/master/packages/alias#entries)。也可以是一个对象，或一个 `{ find, replacement }` 的数组.

    当使用文件系统路径的别名时，请始终使用绝对路径。相对路径作别名值将按原样使用导致不会解析到文件系统路径中。

---

#### **server.host**

- **类型：** `string`

    指定服务器主机名

---

#### **server.port**

- **类型：** `number`

    指定服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是服务器最终监听的实际端口。

---

#### **server.strictPort**

- **类型：** `boolean`

    设为 `true` 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。

---

#### **server.https**

- **类型：** `boolean | https.ServerOptions`

    启用 TLS + HTTP/2。注意当 `server.proxy` option也被使用时，将会仅使用 TLS。

    这个值也可以是一个传递给 `https.createServer()` 的选项对象。

---

#### **server.open**

- **类型：** `boolean | string`

    在服务器启动时自动在浏览器中打开应用程序。当此值为字符串时，会被用作 URL 的路径名。

---

#### **server.proxy**

- **类型：** `Record<string, string | ProxyOptions>`

    为开发服务器配置自定义代理规则。期望接收一个 `{ key: options }` 对象。如果 key 值以 `^` 开头，将会被解释为 `RegExp`。

    下方为示例，`http-proxyd`的完整选项详见 [此处](https://github.com/http-party/node-http-proxy#options)。

    ```typescript
    export default {
      server: {
        proxy: {
          // 字符串简写写法
          '/foo': 'http://localhost:4567/foo',
          // 选项写法
          '/api': {
            target: 'http://jsonplaceholder.typicode.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          },
          // 正则表达式写法
          '^/fallback/.*': {
            target: 'http://jsonplaceholder.typicode.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/fallback/, '')
          }
        }
      }
    }
    ```

---

#### **build.outDir**

- **类型：** `string`
- **默认：** `dist`

    指定输出路径（相对于项目根目录)。

---

#### **build.brotliSize**

- **类型：** `boolean`
- **默认：** `true`

    启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。

---

#### **optimizeDeps.include**

- **类型：** `string[]`

    默认情况下，不在 `node_modules` 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。

### 情景配置

如果配置文件需要基于命令（  `dev` 或 `build` ）或者不同场景与模式来决定选项，可以选择导出这样一个函数：

```typescript
export default ({ command, mode }) => {
  if (command === 'dev') {
    return {
      // dev 独有配置
    }
  } else {
    return {
      // build 独有配置
    }
  }
}
```

## 🎯 目标

结合环境变量配置vite，添加别名配置（ resolve.alias ）和服务端（ server ）配置。

## 🍸 准备

安装 node 声明依赖：

```bash
npm install -D @types/node
```

<br/>

留意当下项目启动时控制台的输出，现在Local 的值为 localhost。

## 🌈 Coding

配置 vite ，`vite.config.js` 代码如下：

```typescript
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { loadEnv } from 'vite';

export default ({ command, mode }) => {
	// ↓加载环境变量
  const env = loadEnv(mode, process.cwd());

  return {
  	// ↓插件配置
    plugins: [vue()],
    // ↓解析配置
    resolve: {
      // ↓路径别名
      alias: {
        // ↓举例：@/abc => src/abc
        '@': resolve(__dirname, "src")
      }
    },
    // ↓服务端配置
    server: {
      // ↓读取环境变量中的HOST、PORT、OPEN
      host: env['VITE_HOST'],
      port: env['VITE_PORT'],
      open: env['VITE_OPEN'],
      strictPort: true
    }
  }
}
```

<br/>

上面设置了别名，我们修改 `App.vue` 以 `@` 别名方式导入 HelloWorld 组件：

```typescript
import HelloWorld from '@/components/HelloWorld.vue'
```

## 🎭 结果

- 重启项目后控制台打印的 Local 由 `localhost` 变成了环境变量中的 `127.0.0.1`
- 在页面能看到以别名方式导入的 HelloWorld 被正常渲染。

