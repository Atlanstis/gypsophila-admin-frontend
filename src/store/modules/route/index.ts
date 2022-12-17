import { defineStore } from 'pinia';
import { routes as staticRoutes, router } from '@/router';
import { transformAuthRouteToVueRoutes } from '@/utils';

interface RouteState {
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
}

export const useRouteStore = defineStore('route-store', {
  state: (): RouteState => ({
    isInitAuthRoute: false,
  }),
  actions: {
    /** 初始化路由 */
    async initAuthRoute() {
      this.handleRoute(staticRoutes);
      this.isInitAuthRoute = true;
    },

    /**
     * 处理路由
     * @param routes 路由配置
     */
    handleRoute(routes: AuthRoute.Route[]) {
      const vueRoutes = transformAuthRouteToVueRoutes(routes);
      vueRoutes.forEach((route) => {
        router.addRoute(route);
      });
    },
  },
});
