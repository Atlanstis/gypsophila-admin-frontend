import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { createDynamicRouteGuard } from './dynamic';

/** 处理路由页面的权限 */
export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  // 动态路由
  const permission = await createDynamicRouteGuard(to, from, next);
  if (!permission) return;
  next();
}
