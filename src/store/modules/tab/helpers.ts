import { localStg } from '@/utils';
import { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router';

/** 获取缓存的多页签数据 */
export function getTabRoutes() {
  const routes: App.AdminTabRoute[] = [];
  const data = localStg.get('multiTabRoutes');
  if (data) {
    const defaultTabRoutes = data.map((item) => ({
      ...item,
      scrollPosition: {
        left: 0,
        top: 0,
      },
    }));
    routes.push(...defaultTabRoutes);
  }
  return routes;
}

/**
 * 根据vue路由获取tab路由
 * @param route
 */
export function getTabRouteByVueRoute(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded,
) {
  const fullPath = hasFullPath(route) ? route.fullPath : route.path;

  const tabRoute: App.AdminTabRoute = {
    name: route.name,
    fullPath,
    meta: route.meta,
    scrollPosition: {
      left: 0,
      top: 0,
    },
  };
  return tabRoute;
}

/**
 * 判断路由是否有fullPath属性
 * @param route 路由
 */
function hasFullPath(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded,
): route is RouteLocationNormalizedLoaded {
  return Boolean((route as RouteLocationNormalizedLoaded).fullPath);
}

/**
 * 根据路由名称获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param routeName - 路由名称
 */
export function getIndexInTabRoutesByRouteName(tabs: App.AdminTabRoute[], routeName: string) {
  return tabs.findIndex((tab) => tab.name === routeName);
}

/**
 * 判断该页签是否在多页签数据中
 * @param tabs - 多页签数据
 * @param fullPath - 该页签的路径
 */
export function isInTabRoutes(tabs: App.AdminTabRoute[], fullPath: string) {
  return getIndexInTabRoutes(tabs, fullPath) > -1;
}

/**
 * 获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param fullPath - 该页签的路径
 */
export function getIndexInTabRoutes(tabs: App.AdminTabRoute[], fullPath: string) {
  return tabs.findIndex((tab) => tab.fullPath === fullPath);
}
