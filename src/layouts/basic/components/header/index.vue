<template>
  <div class="basic-header h-full flex">
    <div class="flex-1-hidden flex flex-y-center h-full">
      <template v-if="!app.isInMobile">
        <CollapseIcon />
        <Breadcrumb />
      </template>
    </div>
    <div class="flex justify-end h-full">
      <UserAvatar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';
import { CollapseIcon, Breadcrumb, UserAvatar } from './components';

defineOptions({
  name: 'BasicHeader',
});
const app = useAppStore();
</script>

<style lang="scss" scoped>
.basic-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
