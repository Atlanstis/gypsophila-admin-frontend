import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from './routes';
import { transformAuthRouteToVueRoutes, transformRouteNameToRoutePath } from '@/utils';
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

/** 路由路径 */
export const routePath = (key: Exclude<AuthRoute.AllRouteKey, 'not-found'>) =>
  transformRouteNameToRoutePath(key);

export * from './modules';
export * from './routes';
