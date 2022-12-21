<template>
  <NScrollbar class="flex-1-hidden">
    <NMenu
      :value="activeKey"
      :collapsed="app.siderCollapse"
      :collapsed-width="sider.collapsedWidth"
      :collapsed-icon-size="22"
      :width="sider.width"
      :options="menus"
      :indent="sider.indent"
      @update:value="handleUpdateMenu"
    ></NMenu>
  </NScrollbar>
</template>

<script lang="ts" setup>
import { useAppStore, useThemeStore, useRouteStore } from '@/store';
import type { MenuOption } from 'naive-ui';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouterPush } from '@/composables';

defineOptions({
  name: 'SiderMenu',
});

const route = useRoute();

const app = useAppStore();
const { sider } = useThemeStore();
const routeStore = useRouteStore();

const { routerPush } = useRouterPush();

/** 展示菜单 */
const menus = computed(() => routeStore.menus as App.AdminMenuOption[]);

/** 当前选中菜单 */
const activeKey = computed(() => route.name as string);

/**
 * 处理菜单点击
 */
function handleUpdateMenu(key: string, item: MenuOption) {
  const menuItem = item as App.AdminMenuOption;
  routerPush(menuItem.routePath);
}
</script>

<style lang="scss" scoped></style>
