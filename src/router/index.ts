import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [{ path: '/', component: import('@/views/workbench/index.vue') }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
