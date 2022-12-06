<template>
  <div class="basic-sider h-full flex-col">
    <SiderLogo />
    <SiderMenu />
  </div>
</template>

<script lang="ts" setup>
import { SiderLogo, SiderMenu } from './components';

defineOptions({
  name: 'BasicSider',
});
</script>

<style lang="scss" scoped>
.basic-sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
