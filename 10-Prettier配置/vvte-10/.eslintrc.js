module.exports = {
  // ↓环境变量
  env: {
    // ↓启用浏览器全局变量
    browser: true,
    // ↓启用ES2020的功能
    es2020: true,
    // ↓启用Node.js全局变量
    node: true,
  },
  // ↓扩展配置
  extends: [
    // ↓ESLint的内置基本规则集
    'eslint:recommended',
    // ↓Vue规则集，尚不支持Vue3 CSS变量注入功能
    'plugin:vue/vue3-recommended',
    // ↓Vue-TypeScript规则集
    '@vue/typescript/recommended',
    // ↓解决和 ESLint 的冲突
    'prettier',
    // ↓prettier规则集
    'plugin:prettier/recommended',
  ],
  // ↓解析器选项
  parserOptions: {
    // ↓ECMAScript 版本：默认 ECMAScript 5
    ecmaVersion: 11,
    // ↓源码类型：如果你的代码在 ECMAScript 模块中,设置为 "module"。默认为 "script"
    sourceType: 'module',
  },
  // ↓插件
  plugins: ['prettier'],
  // ↓自定义规则
  rules: {
    // ↓打开prettier提供的规则
    'prettier/prettier': 'error',
  },
}
