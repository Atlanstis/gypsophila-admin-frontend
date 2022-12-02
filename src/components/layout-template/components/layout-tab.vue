<template>
  <div class="admin-layout__tab" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'AdminLayoutTab',
});

interface Props {
  /** 开启fixed布局 */
  fixed?: boolean;
  /** fixed布局的top距离 */
  top?: number;
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
  top: 56,
  zIndex: 999,
  height: 56,
  paddingLeft: 200,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
});

const style = computed(() => {
  const { fixed, top, zIndex, height, paddingLeft, transitionDuration, transitionTimingFunction } =
    props;
  const position = fixed ? 'fixed' : 'static';
  return `
    position:${position};
    top:${top}px;
    z-index:${zIndex};
    height:${height}px;
    padding-left:${paddingLeft}px;
    transition-duration:${transitionDuration}ms;
    transition-timing-function:${transitionTimingFunction};
  `;
});
</script>

<style lang="scss" scoped>
.admin-layout__tab {
  left: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  transition-property: padding-left;
}
</style>
