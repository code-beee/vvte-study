# 引入SCSS

## 🎯 目标

创建样式文件，以scss变量形式编写样式，将样式效果显示到页面。

## 🌈Coding

安装sass依赖：

```bash
npm install -D sass
```

<br/>

为了使代码结构清晰，在 `src` 目录下创建 `styles` 文件夹，用来存放样式文件。

styles文件目录结构如下：

📁 src

----📁 styles

--------📁 common

------------📄 font.scss

--------📁 variable

------------📄 color.scss

--------📄 index.scss

> - common — 存放常用普通样式文件
> - variable — 存放变量

<br/>

`color.scss` 包含颜色值变量，内容如下：

```scss
$color-red: #FF2F64;
```

<br/>

`font.scss` 包含字体相关样式，内容如下：

```scss
.red {
  color: $color-red
}
```

<br/>

`index.scss` 用来聚合 styles 目录下的样式，内容如下：

```scss
@import './variable/color.scss';
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

