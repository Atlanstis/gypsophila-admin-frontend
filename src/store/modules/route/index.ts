import { defineStore } from 'pinia';
import { routes as staticRoutes, router, ROOT_ROUTE, constantRoutes } from '@/router';
import {
  transformAuthRouteToMenu,
  transformAuthRouteToVueRoute,
  transformAuthRouteToVueRoutes,
  transformRouteNameToRoutePath,
  getConstantRouteNames,
} from '@/utils';
import { useTabStore } from '../tab';

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
      const { initHomeTab } = useTabStore();
      (this.menus as App.AdminMenuOption[]) = transformAuthRouteToMenu(routes);
      // TODO: rootRouteKey 暂定为 workbench，后续更改为后端返回
      const rootRouteKey = 'workbench';
      this.handleUpdateRootRedirect(rootRouteKey);
      const vueRoutes = transformAuthRouteToVueRoutes(routes);
      vueRoutes.forEach((route) => {
        router.addRoute(route);
      });
      initHomeTab(rootRouteKey, router);
    },

    /**
     * 更新根路由的重定向
     * @param routeKey 路由键值
     */
    handleUpdateRootRedirect(routeKey: AuthRoute.AllRouteKey) {
      if (routeKey === 'root' || routeKey === 'not-found') {
        throw new Error('routeKey 的值不能为 root 或者 not-found');
      }
      const rootRoute: AuthRoute.Route = {
        ...ROOT_ROUTE,
        redirect: transformRouteNameToRoutePath(routeKey),
      };
      const rootRouteName: AuthRoute.AllRouteKey = 'root';
      router.removeRoute(rootRouteName);
      const rootVueRoute = transformAuthRouteToVueRoute(rootRoute)[0];
      router.addRoute(rootVueRoute);
    },

    /**
     * 是否是有效的固定路由
     * @param name 路由名称
     */
    isValidConstantRoute(name: AuthRoute.AllRouteKey) {
      const NOT_FOUND_PAGE_NAME: AuthRoute.NotFoundRouteKey = 'not-found';
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME;
    },
  },
});
