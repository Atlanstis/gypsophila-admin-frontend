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
    label: '且听风吟',
    key: 'hear-the-wind-sing',
  },
];

const app = useAppStore();
const { sider } = useThemeStore();
</script>

<style lang="scss" scoped></style>
