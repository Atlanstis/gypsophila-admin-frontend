import type { RouteComponent } from 'vue-router';

export const views: Record<
  RoutePage.LastDegreeRouteKey,
  RouteComponent | (() => Promise<RouteComponent>)
> = {
  login: () => import('./_system/login/index.vue'),
  'not-found': () => import('./_system/not-found/index.vue'),
  workbench: () => import('./workbench/index.vue'),
  playstation_trophy: () => import('./playstation/trophy/index.vue'),
  visualization_echarts: () => import('./visualization/echarts/index.vue'),
  visualization_screen: () => import('./visualization/screen/index.vue'),
  about: () => import('./about/index.vue'),
};
