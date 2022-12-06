<template>
  <LayoutTemplate
    :header-height="header.height"
    :mode="mode"
    :sider-collapse="app.siderCollapse"
    :sider-width="sider.width"
    :sider-collapsed-width="sider.collapsedWidth"
    :tab-height="tab.height"
  >
    <template #header>
      <BasicHeader />
    </template>
    <template #sider>
      <BasicSider />
    </template>
    <template #tab>
      <BasicTab />
    </template>
    <BasicContent />
  </LayoutTemplate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicContent, BasicHeader, BasicSider, BasicTab } from './components';
import { useThemeStore, useAppStore } from '@/store';

defineOptions({
  name: 'BasicLayout',
});

// 展示方式
type Mode = 'vertical' | 'horizontal';
const mode = ref<Mode>('vertical');

const { header, sider, tab } = useThemeStore();

const app = useAppStore();
</script>
