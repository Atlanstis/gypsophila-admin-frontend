<template>
  <div class="basic-tab h-full w-full flex-y-center pl-16px">
    <div ref="bsWrapper" class="flex-1-hidden h-full">
      <BetterScroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: false }">
        <TabDetail @scroll="handleScroll" />
      </BetterScroll>
    </div>
    <ReloadButton />
  </div>
</template>

<script lang="ts" setup>
import { ReloadButton, TabDetail } from './components';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTabStore } from '@/store';
import { useElementBounding } from '@vueuse/core';

defineOptions({
  name: 'BasicTab',
});

const tab = useTabStore();
const route = useRoute();

const bsWrapper = ref<HTMLElement>();
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper);
const bsScroll = ref<Expose.BetterScroll>();

function handleScroll(clientX: number) {
  const currentX = clientX - bsWrapperLeft.value;
  const deltaX = currentX - bsWrapperWidth.value / 2;
  if (bsScroll.value) {
    const { maxScrollX, x: leftX } = bsScroll.value.instance;
    const rightX = maxScrollX - leftX;
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);
    bsScroll.value?.instance.scrollBy(update, 0, 300);
  }
}

watch(
  () => route.fullPath,
  () => {
    tab.addTab(route);
    tab.setActiveTab(route.fullPath);
  },
);

/** 初始化 Tab */
function init() {
  tab.iniTabStore(route);
}

init();
</script>

<style lang="scss" scoped>
.basic-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
