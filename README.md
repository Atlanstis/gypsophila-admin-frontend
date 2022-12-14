# Gypsophila Admin Frontend

## 依赖说明

1. [vite](https://cn.vitejs.dev/)

2. [vue](https://cn.vuejs.org/)

3. [vue-router](https://router.vuejs.org/zh/introduction.html)：路由；

4. [unocss](https://zhuanlan.zhihu.com/p/425814828?utm_medium=social&utm_oi=31225867665408)：原子化 CSS，涉及依赖 @unocss/preset-uno，@unocss/vite，@unocss/reset；

   | 类名       | 属性值              | 类名           | 属性值           |
   | ---------- | ------------------- | -------------- | ---------------- |
   | h-full     | height: 100%;       | w-{num}px      | width: {num}px;  |
   | text-{num} | font-size: {num}px; | cursor-pointer | cursor: pointer; |
   |            |                     |                |                  |

5. [Naive UI](https://www.naiveui.com/zh-CN/light)：vue3 组件库；

6. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)：按需自动加载组件；

7. [unplugin-vue-define-options](https://github.com/sxzz/unplugin-vue-macros/tree/main/packages/define-options#readme)：在 `<script setup>` 中使用 Options API，例如在一个函数中设置 `name`；

8. [Pinia](https://pinia.vuejs.org/zh/index.html)：Vue Store；

9. [unplugin-icons](https://github.com/antfu/unplugin-icons)：将图标转换为组件方式，支持自定义图标及 [icones](https://icones.js.org/) 图标；
10. [@iconify/vue](https://www.npmjs.com/package/@iconify/vue)：vue 渲染 icones 组件。
11. [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)：生成 svg 雪碧图。

## 工具库

1. [colord](https://github.com/omgovich/colord)：颜色处理工具；
2. [lodash-es](https://lodash.com/docs/4.17.15)：函数工具库；
3. [@vueuse/core](https://github.com/vueuse/vueuse#readme)：Vue Composition 应用。
