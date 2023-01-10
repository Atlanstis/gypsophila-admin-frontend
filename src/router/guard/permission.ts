import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { createDynamicRouteGuard } from './dynamic';
import { useAuthStore } from '@/store';
import { routeName } from '@/router';

/** 处理路由页面的权限 */
export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  // 动态路由处理
  const permission = await createDynamicRouteGuard(to, from, next);
  if (!permission) return;

  const { isLogin } = useAuthStore();

  if (isLogin && to.name === routeName('login')) {
    // 已登录，跳转至登录页，重定向至根路由
    next({ name: routeName('root') });
  } else {
    next();
  }
}
