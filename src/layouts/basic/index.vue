<template>
  <LayoutTemplate
    :header-height="header.height"
    :mode="mode"
    :sider-collapse="app.siderCollapse"
    :sider-width="sider.width"
    :sider-collapsed-width="sider.collapsedWidth"
    :tab-height="tab.height"
    :footer-visible="footer.visible"
    :footer-height="footer.height"
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
    <template #footer>
      <BasicFooter />
    </template>
    <ScrollContent />
  </LayoutTemplate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicHeader, BasicSider, BasicTab, BasicFooter } from './components';
import { ScrollContent } from '../components';
import { useThemeStore, useAppStore } from '@/store';

defineOptions({
  name: 'BasicLayout',
});

// 展示方式
type Mode = 'vertical' | 'horizontal';
const mode = ref<Mode>('vertical');

const { header, sider, tab, footer } = useThemeStore();

const app = useAppStore();
</script>
