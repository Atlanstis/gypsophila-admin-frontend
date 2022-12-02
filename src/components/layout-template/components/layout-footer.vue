<template>
  <footer class="admin-layout__footer" :style="style">
    <slot></slot>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'LayoutTemplteFooter',
});

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

const props = withDefaults(defineProps<Props>(), {
  fixed: true,
  zIndex: 999,
  height: 48,
  paddingLeft: 200,
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
.admin-layout__footer {
  left: 0;
  bottom: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  transition-property: padding-left;
}
</style>
