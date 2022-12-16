<template>
  <NScrollbar class="flex-1-hidden">
    <NMenu
      :collapsed="app.siderCollapse"
      :collapsed-width="sider.collapsedWidth"
      :collapsed-icon-size="22"
      :width="sider.width"
      :options="menus"
      :indent="sider.indent"
    ></NMenu>
  </NScrollbar>
</template>

<script lang="ts" setup>
import { useAppStore, useThemeStore } from '@/store';

defineOptions({
  name: 'SiderMenu',
});

const menus = [
  {
    label: '工作台',
    key: 'workbench',
  },
  {
    label: 'PlayStation',
    key: 'playstation',
    children: [
      {
        label: '奖杯',
        key: 'trophy',
      },
      {
        label: 'PSNINE',
        key: 'psnine',
      },
    ],
  },
  {
    label: '可视化',
    key: 'visualization',
    children: [
      {
        label: 'Echarts',
        key: 'echarts',
      },
    ],
  },
  {
    label: '关于',
    key: 'about',
  },
];

const app = useAppStore();
const { sider } = useThemeStore();
</script>

<style lang="scss" scoped></style>
