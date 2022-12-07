<template>
  <NScrollbar class="h-full bg-[#f6f9f8]">
    <div class="p-16px">
      <routerView v-slot="{ Component, route }">
        <transition :name="'fade-slide'" mode="out-in" :appear="true">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </routerView>
    </div>
  </NScrollbar>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'BasicContent',
});
</script>

<style lang="scss" scoped></style>
