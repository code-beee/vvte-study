# 引入scss

## 🎯 目标

以变量形式编写样式。

## 🍸 准备

### 安装依赖

```bash
npm install -D sass
```

### 调整文件&目录

在 `src` 目录下创建 `styles` 文件夹，用来存放样式文件。

styles文件目录结构如下：

📁 src

----📁 styles

--------📁 common

------------📄 font.scss

--------📁 variable

------------📄 color.scss

--------📄 index.scss

> - common — 存放常用样式文件
> - variable — 存放变量

## 🌈 Coding

### 定义 scss 变量

在 `color.scss` 定义一个颜色变量：

```scss
$color-red: #FF2F64;
```

### 编写样式

在 `font.scss` 编写个字体为红色的样式：

```scss
.red {
  color: $color-red
}
```

### 聚合样式文件

在 `index.scss` 聚合 styles 下的样式：

```scss
@import './variable/color.scss';
@import './common/font.scss'
```

### 使用样式

在 `HelloWorld.vue` 中导入样式文件，给 \<h2\> 标签添加 red 样式：

```vue
......
<h2 class="red">环境变量</h2>
......
<script lang="ts">
import '@/styles/index.scss'
......
</script>
```

## 🎭 结果

标题“环境变量”变成红色。
