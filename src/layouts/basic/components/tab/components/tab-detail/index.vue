<template>
  <div ref="tabRef" class="h-full flex items-end">
    <ChromeTab
      v-for="(item, index) of tab.tabs"
      :key="item.fullPath"
      :is-active="item.fullPath === tab.activeTab"
      :closable="item.name !== tab.homeTab.name"
      :class="{ '!mr-0': index === tab.tabs.length - 1 }"
      @click="tab.handleClickTab(item.fullPath)"
      @close="tab.removeTab(item.fullPath)"
    >
      <svg-icon
        :icon="item.meta.icon"
        :local-icon="item.meta.localIcon"
        class="inline-block align-text-bottom mr-4px text-16px"
      />
      {{ item.meta.title }}
    </ChromeTab>
  </div>
</template>

<script lang="ts" setup>
import { useTabStore } from '@/store';
import { nextTick, ref, watch } from 'vue';
import { ChromeTab } from './components';

defineOptions({
  name: 'TabDetail',
});

interface Emits {
  (e: 'scroll', clientX: number): void;
}

const emit = defineEmits<Emits>();

const tab = useTabStore();

const tabRef = ref<HTMLElement>();

/** 获取当前激活的tab的clientX */
async function getActiveTabClientX() {
  await nextTick();
  if (tabRef.value && tabRef.value.children.length && tabRef.value.children[tab.activeTabIndex]) {
    const activeTabElement = tabRef.value.children[tab.activeTabIndex];
    const { x, width } = activeTabElement.getBoundingClientRect();
    const clientX = x + width / 2;
    setTimeout(() => {
      emit('scroll', clientX);
    }, 50);
  }
}

watch(
  () => tab.activeTabIndex,
  () => {
    getActiveTabClientX();
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped></style>
