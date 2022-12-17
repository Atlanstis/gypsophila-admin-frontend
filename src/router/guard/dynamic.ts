import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useRouteStore } from '@/store';
import { routeName } from '@/router';

/**
 * 处理动态路由
 */
export async function createDynamicRouteGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const route = useRouteStore();

  // 初始化权限路由
  if (!route.isInitAuthRoute) {
    // 加载路由
    await route.initAuthRoute();

    if (to.name === routeName('not-found')) {
      // 动态路由没有加载导致被not-found路由捕获，等待权限路由加载好了，回到之前的路由
      // 若路由是从根路由重定向过来的，重新回到根路由
      const ROOT_ROUTE_NAME: AuthRoute.RootRouteKey = 'root';
      const path = to.redirectedFrom?.name === ROOT_ROUTE_NAME ? '/' : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  // 权限路由已经加载，仍然未找到，重定向到404
  if (to.name === routeName('not-found')) {
    next({ name: routeName('not-found'), replace: true });
    return false;
  }
  return true;
}
