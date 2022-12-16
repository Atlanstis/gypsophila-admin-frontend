import type { RouteRecordRaw } from 'vue-router';
import { getLayoutComponent, getViewComponent } from './component';

type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>;

/**
 * 将权限路由转换成vue路由
 * @param routes - 权限路由
 * @description 所有多级路由都会被转换成二级路由
 */
export function transformAuthRouteToVueRoutes(routes: AuthRoute.Route[]) {
  return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1);
}

/**
 * 将单个权限路由转换成vue路由
 * @param item - 单个权限路由
 */
export function transformAuthRouteToVueRoute(item: AuthRoute.Route) {
  const routes: RouteRecordRaw[] = [];

  const itemRoute = { ...item } as RouteRecordRaw;

  // 动态 path
  if (hasDynamicPath(item)) {
    Object.assign(itemRoute, { path: item.meta.dynamicPath });
  }

  // 解析路由组件
  if (hasComponent(item.component)) {
    const action: ComponentAction = {
      basic: () => {
        itemRoute.component = getLayoutComponent('basic');
      },
      blank: () => {
        itemRoute.component = getLayoutComponent('blank');
      },
      multi: () => {
        // TODO
      },
      self: () => {
        itemRoute.component = getViewComponent(item.name as RoutePage.LastDegreeRouteKey);
      },
    };
    try {
      action[item.component]();
    } catch (e) {
      window.console.error('路由组件解析失败: ', e, item);
    }
  }

  // 解析单层路由的布局组件
  if (isSingleRoute(item.meta.singleLayout)) {
    // 注意：单独路由没有 children 属性
    if (hasChildren(item)) {
      window.console.error('单独路由不应该有子路由: ', item);
    }

    // 捕获无效路由的需特殊处理
    if (item.name === 'not-found') {
      itemRoute.children = [
        {
          path: '',
          name: item.name,
          component: getViewComponent(item.name),
        },
      ];
    } else {
      // 处理布局组件
      const parentPath = `${itemRoute.path}-parent`;
      const layout = getLayoutComponent(item.meta.singleLayout);
      const parentRoute: RouteRecordRaw = {
        path: parentPath,
        component: layout,
        redirect: item.path,
        children: [itemRoute],
      };

      return [parentRoute];
    }
  }

  // 解析多层路由
  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.Route[])
      .map((child) => transformAuthRouteToVueRoute(child))
      .flat();
    // 找出第一个不为多级路由中间级的子路由路径作为重定向路径
    const redirectPath = (children.find((v) => !v.meta?.multi)?.path || '/') as AuthRoute.RoutePath;

    if (redirectPath === '/') {
      window.console.error('该多级路由没有有效的子路径', item);
    }

    if (item.component === 'multi') {
      // TODO
    } else {
      itemRoute.children = children;
    }
    itemRoute.redirect = redirectPath;
  }
  routes.push(itemRoute);
  return routes;
}

/**
 * 是否有路由组件
 * @param item - 权限路由
 */
function hasComponent(
  component: AuthRoute.RouteComponentType | undefined,
): component is AuthRoute.RouteComponentType {
  return Boolean(component);
}
/**
 * 是否有动态路由path
 * @param item - 权限路由
 */
function hasDynamicPath(item: AuthRoute.Route) {
  return Boolean(item.meta.dynamicPath);
}

/**
 * 是否有子路由
 * @param item - 权限路由
 */
function hasChildren(item: AuthRoute.Route) {
  return Boolean(item.children && item.children.length);
}

/**
 * 是否是单层级路由
 * @param item - 权限路由
 */
function isSingleRoute(
  singleLayout: AuthRoute.RouteLayoutType | undefined,
): singleLayout is AuthRoute.RouteLayoutType {
  return Boolean(singleLayout);
}
