<template>
  <div class="admin-layout h-full flex-col">
    <LayoutHeader
      v-if="headerVisible"
      v-bind="commonProps"
      :fixed="fixedHeaderAndTab"
      :z-index="headerZIndex"
      :height="headerHeight"
      :padding-left="headerPaddingLeft"
    >
      <slot name="header"></slot>
    </LayoutHeader>
    <LayoutSider
      v-if="tabVisible"
      v-bind="commonProps"
      :padding-top="siderPaddingTop"
      :width="currentSiderWidth"
      :z-index="siderZIndex"
    >
      <slot name="sider"></slot>
    </LayoutSider>
    <LayoutTab
      v-if="tabVisible"
      v-bind="commonProps"
      :padding-left="currentSiderWidth"
      :fixed="fixedHeaderAndTab"
      :top="headerHeight"
      :height="tabHeight"
      :z-index="tabZIndex"
    >
      <slot name="tab"></slot>
    </LayoutTab>
    <LayoutContent
      v-bind="commonProps"
      :padding-left="currentSiderWidth"
      :padding-bottom="contentPaddingBottom"
      :padding-top="contentPaddingTop"
    >
      <slot></slot>
    </LayoutContent>
    <LayoutFooter
      v-if="footerVisible"
      v-bind="commonProps"
      :fixed="fixedFooter"
      :padding-left="currentSiderWidth"
      :height="footerHeight"
      :z-index="footerZIndex"
    >
      <slot name="footer"></slot>
    </LayoutFooter>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'LayoutTemplate',
});

interface Props {
  /** 布局模式 */
  mode?: 'vertical' | 'horizontal';
  /** 头部可见 */
  headerVisible?: boolean;
  /** 头部高度 */
  headerHeight?: number;
  /** 标签可见 */
  tabVisible?: boolean;
  /** 标签页高度 */
  tabHeight?: number;
  /** 固定头部和标签 */
  fixedHeaderAndTab?: boolean;
  /** 底部可见 */
  footerVisible?: boolean;
  /** 底部高度 */
  footerHeight?: number;
  /** 固定底部 */
  fixedFooter?: boolean;
  /** 侧边可见 */
  siderVisible?: boolean;
  /** 侧边栏宽度 */
  siderWidth?: number;
  /** 侧边栏折叠状态的宽度 */
  siderCollapsedWidth?: number;
  /** 侧边栏折叠状态 */
  siderCollapse?: boolean;
  /** 动画过渡时间 */
  transitionDuration?: number;
  /** 动画过渡速度曲线 */
  transitionTimingFunction?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  headerVisible: true,
  headerHeight: 56,
  tabVisible: true,
  tabHeight: 44,
  fixedHeaderAndTab: true,
  footerVisible: true,
  footerHeight: 48,
  fixedFooter: true,
  siderVisible: true,
  siderWidth: 200,
  siderCollapsedWidth: 64,
  siderCollapse: false,
  transitionDuration: 300,
  transitionTimingFunction: 'ease-in-out',
});

interface Emits {
  (e: 'update:sider-collapse', collapse: boolean): void;
}

const emit = defineEmits<Emits>();

/** 侧边栏展开状态 */
const siderCollapseStatus = computed({
  get() {
    return props.siderCollapse;
  },
  set(collapse) {
    emit('update:sider-collapse', collapse);
  },
});

/** 垂直布局 */
const isVertical = computed(() => props.mode === 'vertical');

/** 侧边栏宽度 */
const currentSiderWidth = computed(() => {
  const { siderWidth, siderCollapsedWidth } = props;
  const width = siderCollapseStatus.value ? siderCollapsedWidth : siderWidth;
  return props.siderVisible ? width : 0;
});

/** 公共属性 */
const commonProps = computed(() => {
  const { transitionDuration, transitionTimingFunction } = props;
  return {
    transitionDuration,
    transitionTimingFunction,
  };
});

// fixed布局时的层级
const headerZIndex = 1001;
const tabZIndex = 999;
const siderZIndex = computed(() => (isVertical.value ? 1003 : 1000));
const footerZIndex = 998;

/** header 与左侧距离 */
const headerPaddingLeft = computed(() => (isVertical.value ? currentSiderWidth.value : 0));

/** sider 与顶部距离 */
const siderPaddingTop = computed(() =>
  isVertical.value ? 0 : props.headerVisible ? props.headerHeight : 0,
);

/** content 与顶部距离 */
const contentPaddingTop = computed(() => {
  let height = 0;
  if (props.fixedHeaderAndTab) {
    if (props.headerVisible) {
      height += props.headerHeight;
    }
    if (props.tabVisible) {
      height += props.tabHeight;
    }
  }
  return height;
});
/** content 与底部距离 */
const contentPaddingBottom = computed(() =>
  props.fixedFooter && props.footerVisible ? props.footerHeight : 0,
);
</script>

<style lang="scss" scoped></style>
