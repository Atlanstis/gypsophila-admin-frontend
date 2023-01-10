<template>
  <div class="wh-full relative flex-center">
    <CanvasBg />
    <LoginForm class="absolute" />
  </div>
</template>

<script lang="ts" setup>
import { CanvasBg, LoginForm } from './components';

defineOptions({
  name: 'LoginPage',
});
</script>

<style lang="scss" scoped></style>
