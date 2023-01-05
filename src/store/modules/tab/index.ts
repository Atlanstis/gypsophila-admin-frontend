import { defineStore } from 'pinia';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { localStg } from '@/utils';
import { useThemeStore } from '../theme';
import {
  getTabRoutes,
  getTabRouteByVueRoute,
  getIndexInTabRoutes,
  getIndexInTabRoutesByRouteName,
  isInTabRoutes,
} from './helpers';
import { useRouterPush } from '@/composables';

interface TabState {
  /** 多页签数据 */
  tabs: App.AdminTabRoute[];
  homeTab: App.AdminTabRoute;
  /** 当前激活状态的页签(路由fullPath) */
  activeTab: string;
}

export const useTabStore = defineStore('tab-store', {
  state: (): TabState => ({
    tabs: [],
    homeTab: {
      name: 'root',
      fullPath: '/',
      meta: {
        title: 'Root',
      },
      scrollPosition: {
        left: 0,
        top: 0,
      },
    },
    activeTab: '',
  }),

  getters: {
    /** 当前激活状态的页签索引 */
    activeTabIndex(state) {
      const { tabs, activeTab } = state;
      return getIndexInTabRoutes(tabs, activeTab);
    },
  },

  actions: {
    /**
     * 添加多页签
     * @param route - 路由
     */
    addTab(route: RouteLocationNormalizedLoaded) {
      const tab = getTabRouteByVueRoute(route);
      if (isInTabRoutes(this.tabs, tab.fullPath)) return;

      const index = getIndexInTabRoutesByRouteName(this.tabs, route.name as string);
      if (index === -1) {
        this.tabs.push(tab);
        return;
      }
    },

    /** 缓存页签路由数据 */
    cacheTabRoutes() {
      localStg.set('multiTabRoutes', this.tabs);
    },

    /**
     * 初始化首页页签路由
     * @param routeHomeName - 路由首页的name
     * @param router - 路由实例
     */
    initHomeTab(routeHomeName: string, router: Router) {
      const routes = router.getRoutes();
      const findHome = routes.find((item) => item.name === routeHomeName);
      if (findHome && !findHome.children.length) {
        // 有子路由的不能作为Tab
        this.homeTab = getTabRouteByVueRoute(findHome);
      }
    },

    /** 初始化Tab状态 */
    iniTabStore(currentRoute: RouteLocationNormalizedLoaded) {
      const theme = useThemeStore();

      const tabs: App.AdminTabRoute[] = theme.tab.isCache ? getTabRoutes() : [];

      const hasHome = getIndexInTabRoutesByRouteName(tabs, this.homeTab.name as string) > -1;
      if (!hasHome && this.homeTab.name !== 'root') {
        tabs.unshift(this.homeTab);
      }

      const isHome = currentRoute.fullPath === this.homeTab.fullPath;
      if (!isHome) {
        const currentTab = getTabRouteByVueRoute(currentRoute);

        const hasCurrent = isInTabRoutes(tabs, currentRoute.fullPath);
        if (!hasCurrent) {
          tabs.push(currentTab);
        }
      }

      this.tabs = tabs;
      this.setActiveTab(currentRoute.fullPath);
    },

    /**
     * 点击单个tab
     * @param fullPath - 路由fullPath
     */
    handleClickTab(fullPath: string) {
      const { routerPush } = useRouterPush(false);

      const isActive = this.activeTab === fullPath;
      if (!isActive) {
        this.setActiveTab(fullPath);
        routerPush(fullPath);
      }
    },

    /**
     * 删除页签
     * @param fullPath - 路由fullPath
     */
    removeTab(fullPath: string) {
      const { routerPush } = useRouterPush(false);

      const isActive = fullPath === this.activeTab;
      const index = getIndexInTabRoutes(this.tabs, fullPath);
      if (index > -1) {
        this.tabs.splice(index, 1);
        if (isActive) {
          const activeIndex = index === this.tabs.length ? this.tabs.length - 1 : index;
          const activePath = this.tabs[activeIndex].fullPath;
          this.setActiveTab(activePath);
          routerPush(activePath);
        }
      }
    },

    /**
     * 设置当前路由对应的页签为激活状态
     * @param fullPath - 路由fullPath
     */
    setActiveTab(fullPath: string) {
      this.activeTab = fullPath;
    },
  },
});
