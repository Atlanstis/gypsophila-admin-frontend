<template>
  <n-loading-bar-provider>
    <slot></slot>
    <naive-provider-content />
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue';
import { useLoadingBar } from 'naive-ui';

defineOptions({ name: 'NaiveProvider' });

// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar();
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools();
  },
  render() {
    return h('div');
  },
});
</script>
<style scoped></style>
