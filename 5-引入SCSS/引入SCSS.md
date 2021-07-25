# 引入SCSS

## 安装依赖

Vite 提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为他们安装特定的 vite 插件，但相应的预处理器依赖本身必须安装。

安装sass依赖：

```bash
npm install -D sass
```

## 🌈Coding

为了使代码结构清晰，在 `src` 目录下创建 `styles` 文件夹，用来存放样式文件。

style文件目录结构如下：

📁 src

<<<<<<< HEAD
​----📁 styles

​--------📁 common

​------------📄 font.scss

​--------📄 index.scss
=======
----📁 styles

--------📁 common

------------📄 font.scss

--------📄 index.scss
>>>>>>> e3649ea1e2d6aa61768e935792e2256e08eac29f



`font.scss` 用来存放字体相关样式，内容如下：

```scss
.red {
  color: #FF2F64
}

.blue {
  color: #034AFF
}
```

`index.scss` 用来聚合 styles 目录下的样式，在 index.scss 中导入 font.scss ，文件内容如下：

```scss
@import './common/font.scss'
```

在 `Study.vue` 中导入样式文件，并给 \<h1\> 标签添加样式，将字体变为红色：

```html
......
<h1 class="red">环境变量</h1>
......
<script lang="ts">
import '@/styles/index.scss'
......
</script>
```

回到浏览器刷新页面，标题“环境变量”已经变成红色。

