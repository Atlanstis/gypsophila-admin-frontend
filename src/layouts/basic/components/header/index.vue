<template>
  <div class="basic-header h-full">
    <CollapseIcon />
  </div>
</template>

<script lang="ts" setup>
import { CollapseIcon } from './components';

defineOptions({
  name: 'BasicHeader',
});
</script>

<style lang="scss" scoped>
.basic-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
