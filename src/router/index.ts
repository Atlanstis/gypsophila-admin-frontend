import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from './routes';
import { transformAuthRouteToVueRoutes } from '@/utils';
import { createRouterGuard } from './guard';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: transformAuthRouteToVueRoutes(constantRoutes),
});

export async function setupRouter(app: App<Element>) {
  app.use(router);

  createRouterGuard(router);

  await router.isReady();
}

/** 路由名称 */
export const routeName = (key: AuthRoute.AllRouteKey) => key;

export * from './modules';
