<template>
  <n-breadcrumb class="px-12px">
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <n-breadcrumb-item>
        <n-dropdown
          v-if="breadcrumb.hasChildren"
          :options="breadcrumb.children"
          @select="dropdownSelect"
        >
          <span>
            <component
              :is="breadcrumb.icon"
              class="inline-block align-text-bottom mr-4px text-16px"
            />
            <span>{{ breadcrumb.label }}</span>
          </span>
        </n-dropdown>
        <template v-else>
          <component
            :is="breadcrumb.icon"
            class="inline-block align-text-bottom mr-4px text-16px"
          />
          <span>{{ breadcrumb.label }}</span>
        </template>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useRouteStore } from '@/store';
import { getBreadcrumbByRouteKey } from '@/utils';
import { useRouterPush } from '@/composables';
defineOptions({
  name: 'Breadcrumb',
});

const route = useRoute();
const routeStore = useRouteStore();
const { routerPush } = useRouterPush();

const breadcrumbs = computed(() =>
  getBreadcrumbByRouteKey(route.name as string, routeStore.menus as App.AdminMenuOption[]),
);

function dropdownSelect(key: string) {
  routerPush({ name: key });
}
</script>

<style lang="scss" scoped></style>
