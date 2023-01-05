<template>
  <HoverContainer class="h-full w-64px" content="重新加载" placement="bottom-end">
    <icon-mdi-refresh class="text-22px" :class="{ 'animate-spin': loading }" />
  </HoverContainer>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ReloadButton',
});

const loading = false;
</script>

<style lang="scss" scoped></style>
