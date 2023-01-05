<template>
  <div v-if="showTooltip">
    <n-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div class="flex-center h-full cursor-pointer hover:bg-[#f6f6f6]">
          <slot></slot>
        </div>
      </template>
      {{ content }}
    </n-tooltip>
  </div>
  <div v-else class="flex-center cursor-pointer hover:bg-[#f6f6f6]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { PopoverPlacement } from 'naive-ui';
import { computed } from 'vue';

defineOptions({
  name: 'HoverContainer',
});

interface Props {
  content?: string;
  placement?: PopoverPlacement;
}

const props = withDefaults(defineProps<Props>(), {
  content: '',
  placement: 'bottom',
});

const showTooltip = computed(() => Boolean(props.content));
</script>

<style lang="scss" scoped></style>
