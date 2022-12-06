<template>
  <HoverContainer class="w-40px h-full" @click="app.toggleSiderCollapse">
    <icon-line-md-menu-unfold-left v-if="app.siderCollapse" class="text-16px" />
    <icon-line-md-menu-fold-left v-else class="text-16px" />
  </HoverContainer>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store';

defineOptions({
  name: 'CollapseIcon',
});

const app = useAppStore();
</script>

<style lang="scss" scoped></style>
