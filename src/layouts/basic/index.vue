<template>
  <LayoutTemplate :footer-visible="false">
    <template #header>
      <Header />
    </template>
    <template #sider>
      <Sider />
    </template>
    <template #tab>
      <Tab />
    </template>
    <Content />
  </LayoutTemplate>
</template>

<script lang="ts" setup>
import { Content, Header, Sider, Tab } from './components';

defineOptions({
  name: 'BasicLayout',
});
</script>
