<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
    :theme-overrides="theme.naiveThemeOverrides"
  >
    <router-view></router-view>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN } from 'naive-ui';
import { useThemeStore, subscribeStore } from '@/store';
import { useGlobalEvents } from '@/composables';

defineOptions({
  name: 'AppView',
});

const theme = useThemeStore();

subscribeStore();
useGlobalEvents();
</script>
