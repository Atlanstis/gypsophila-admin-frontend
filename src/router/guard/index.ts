import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { createPermissionGuard } from './permission';

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    await createPermissionGuard(to, from, next);
  });

  router.afterEach((to) => {
    useTitle(`${to.meta.title} - ✨Gypsophila.✨`);
  });
}
