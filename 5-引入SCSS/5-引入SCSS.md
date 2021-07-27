# 引入SCSS

## 安装依赖

Vite 提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为他们安装特定的 vite 插件，但相应的预处理器依赖本身必须安装。

安装sass依赖：

```bash
npm install -D sass
```

## 🎯 目标

创建样式文件，将样式效果显示到页面。

## 🌈Coding

为了使代码结构清晰，在 `src` 目录下创建 `styles` 文件夹，用来存放样式文件。

styles文件目录结构如下：

📁 src

----📁 styles

--------📁 common

------------📄 font.scss

--------📄 index.scss

<br/>

`font.scss` 用来存放字体相关样式，内容如下：

```scss
.red {
  color: #FF2F64
}
```

<br/>

`index.scss` 用来聚合 styles 目录下的样式，内容如下：

```typescript
@import './common/font.scss'
```

<br/>

在 `HelloWorld` 中导入样式文件，并给 \<h2\> 标签添加 red 样式：

```vue
......
<h1 class="red">环境变量</h1>
......
<script lang="ts">
import '@/styles/index.scss'
......
</script>
```

## 🎭 结果

回到浏览器刷新页面，标题“环境变量”已经变成红色。

