import { defineStore } from 'pinia';
import { routes as staticRoutes, router } from '@/router';
import { transformAuthRouteToMenu, transformAuthRouteToVueRoutes } from '@/utils';

interface RouteState {
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 后台页菜单 */
  menus: App.AdminMenuOption[];
}

export const useRouteStore = defineStore('route-store', {
  state: (): RouteState => ({
    isInitAuthRoute: false,
    menus: [],
  }),
  actions: {
    /** 初始化路由 */
    async initAuthRoute() {
      this.handleAuthRoute(staticRoutes);
      this.isInitAuthRoute = true;
    },

    /**
     * 处理路由
     * @param routes 路由配置
     */
    handleAuthRoute(routes: AuthRoute.Route[]) {
      (this.menus as App.AdminMenuOption[]) = transformAuthRouteToMenu(routes);

      const vueRoutes = transformAuthRouteToVueRoutes(routes);
      vueRoutes.forEach((route) => {
        router.addRoute(route);
      });
    },
  },
});
