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
      :expanded-keys="expandedKeys"
      @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys"
    ></NMenu>
  </NScrollbar>
</template>

<script lang="ts" setup>
import { useAppStore, useThemeStore, useRouteStore } from '@/store';
import type { MenuOption } from 'naive-ui';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouterPush } from '@/composables';
import { getActiveKeyPathsOfMenus } from '@/utils';

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

const expandedKeys = ref<string[]>([]);

/**
 * 处理菜单折叠状态
 */
function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, menus.value);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
