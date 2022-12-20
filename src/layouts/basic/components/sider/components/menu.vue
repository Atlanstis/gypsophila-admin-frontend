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
import { useAppStore, useThemeStore, useRouteStore } from '@/store';
import { computed } from 'vue';

defineOptions({
  name: 'SiderMenu',
});

const app = useAppStore();
const { sider } = useThemeStore();
const routeStore = useRouteStore();

const menus = computed(() => routeStore.menus as App.AdminMenuOption[]);
</script>

<style lang="scss" scoped></style>
