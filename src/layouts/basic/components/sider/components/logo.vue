<template>
  <div class="flex-center" :style="{ height: `${header.height}px` }">
    <icon-custom-logo class="text-32px color-primary" />
    <Transition name="fade">
      <h2 v-if="!app.siderCollapse" class="color-primary text-16px font-bold ml-6px">
        {{ app.name }}
      </h2>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore, useAppStore } from '@/store';

defineOptions({
  name: 'SiderLogo',
});

const { header } = useThemeStore();
const app = useAppStore();
</script>

<style lang="scss" scoped></style>
