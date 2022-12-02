<template>
  <main :style="style" class="admin-layout__content">
    <slot></slot>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'LayoutTemplteContent',
});

interface Props {
  /** 顶部内边距 */
  paddingTop?: number;
  /** 底部内边距 */
  paddingBottom?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡速度曲线 */
  transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
  paddingTop: 100,
  paddingBottom: 56,
  paddingLeft: 200,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
});

const style = computed(() => {
  const { paddingTop, paddingBottom, paddingLeft, transitionDuration, transitionTimingFunction } =
    props;
  return `
    padding-top:${paddingTop}px;
    padding-bottom:${paddingBottom}px;
    padding-left:${paddingLeft}px;
    transition-duration:${transitionDuration}ms;
    transition-timing-function:${transitionTimingFunction};
  `;
});
</script>

<style lang="scss" scoped>
.admin-layout__content {
  flex-grow: 1;
  box-sizing: border-box;
  width: 100%;
  transition-property: padding-left;
  overflow: hidden;
}
</style>
