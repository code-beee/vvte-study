# TS配置

## 😴 功课

### 什么是 tsconfig.json?

如果目录中存在 `tsconfig.json` 文件表明该目录是 TS 项目的根目录。TS 不是原生的 JS 代码，需要进行编译才能转换为 JS 代码。tsconfig.json 文件指定了编译项目所需的根文件和编译器选项。

> 💡 如果是 JS 项目，也可以用 jsconfig.json 编译。

### 使用 GitHub 上的基本配置

根据你的 JavaScript 运行时环境（node10、node12、node14、React Native等），可以在 [这里](https://github.com/tsconfig/bases/) 选择基本配置，基于这些 tsconfig.json 来扩展，可达到简化配置的目的。

### 配置项说明

需要了解更多配置项的同学请参照 [TS官网](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 。

## 🎯 目标

完成TS配置，验证 compilerOptions.paths 属性是否生效。

## 🌈 Coding

### 配置TS

`tsconfig.json` 代码如下：

```json
{
  // ↓可以省略compilerOptions配置，这将使用编译器的默认值
  "compilerOptions": {
    // ↓指定编译的ECMAScript目标版本
    "target": "es2020",
    // ↓指定生成哪个模块系统代码
    "module": "es2020",
    // ↓指定模块解析策略：'node' (Node.js) 或 'classic' (TypeScript 1.6 版本之前使用)
    "moduleResolution": "node",
    // ↓启用所有严格类型检查选项。
    "strict": true,
    // ↓编译过程中需要引入的库文件
    "lib": [
      "es2020"
    ],
    // ↓编译时是否生成.map文件
    "sourceMap": true,
    // ↓支持使用import fs from 'fs'的方式引入commonjs包
    "esModuleInterop": true,
    // ↓忽略所有的声明文件（ *.d.ts）的类型检查。
    "skipLibCheck": true,
    // ↓引入文件时区分文件名大小写
    "forceConsistentCasingInFileNames": true,
    // ↓设置基本目录以解析非绝对模块名称
    "baseUrl": ".",
    // ↓设置模块名称到基于baseUrl的路径映射
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  // ↓指定要编译的文件，这些文件名是相对于包含tsconfig.json的目录解析的。
  // ↓支持通配符：* （匹配0或多个字符）、? （匹配一个任意字符）、**/ (递归匹配任意子目录))
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  // ↓和include一样，不过是指定解析include时应跳过的文件
  "exclude": [
    "node_modules",
    "dist",
    "**/*.js"
  ]
}
```

### 用 @ 映射 ts 文件路径

测试在 `main.ts` 用 @ 导入 router ：

```typescript
......
import router from '@/router/index'
......
```

> 💡 如果 compilerOptions.paths 配置错误，VS Code 会飘红，提示找不到 router 模块。

## 🎭 结果

用 @ 映射路径导入 router， VS Code 没有错误提示。页面访问正常。