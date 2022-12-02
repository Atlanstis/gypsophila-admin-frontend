<template>
  <div class="admin-layout__header" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  /** 开启fixed布局 */
  fixed?: boolean;
  /** fixed布局的层级 */
  zIndex?: number;
  /** 高度 */
  height?: number;
  /** 左侧内边距 */
  paddingLeft?: number;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡速度曲线 */
  transitionTimingFunction?: string;
}

defineOptions({
  name: 'AdminLayoutHeader',
});
const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  zIndex: 1001,
  height: 56,
  paddingLeft: 0,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
});

const style = computed(() => {
  const { fixed, zIndex, height, paddingLeft, transitionDuration, transitionTimingFunction } =
    props;
  const position = fixed ? 'fixed' : 'static';
  return `
    position:${position};
    z-index:${zIndex};
    height:${height}px;
    padding-left:${paddingLeft}px;
    transition-duration:${transitionDuration}ms;
    transition-timing-function:${transitionTimingFunction};
  `;
});
</script>

<style lang="scss" scoped>
.admin-layout__header {
  left: 0;
  top: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  transition-property: padding-left;
}
</style>
