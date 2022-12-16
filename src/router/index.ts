import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from './routes';
import { transformAuthRouteToVueRoutes } from '@/utils';

const routes = transformAuthRouteToVueRoutes(constantRoutes);
console.log(routes);
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
