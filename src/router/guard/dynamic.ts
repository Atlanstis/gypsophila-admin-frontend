import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useRouteStore, useAuthStore } from '@/store';
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
  const { isLogin } = useAuthStore();

  // 初始化权限路由
  if (!route.isInitAuthRoute) {
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!isLogin) {
      const toName = to.name as AuthRoute.AllRouteKey;
      if (route.isValidConstantRoute(toName)) {
        next();
      } else {
        const redirect = to.fullPath;
        next({ name: routeName('login'), query: { redirect } });
      }
      return false;
    }

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

  // 权限路由已经加载，仍然未找到，显示未匹配路由对应的页面
  if (to.name === routeName('not-found')) {
    next();
    return false;
  }
  return true;
}
