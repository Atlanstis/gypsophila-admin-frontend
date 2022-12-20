import { useIconRender } from '@/composables';

/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export function transformAuthRouteToMenu(routes: AuthRoute.Route[]) {
  const menus: App.AdminMenuOption[] = [];

  routes.forEach((route) => {
    const { name, path, meta } = route;
    const routeName = name as string;
    let menuChildren: App.AdminMenuOption[] | undefined;
    if (route.children) {
      menuChildren = transformAuthRouteToMenu(route.children);
    }

    const menuItem: App.AdminMenuOption = addPartialProps({
      menu: {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path,
      },
      icon: meta.icon,
      localIcon: meta.localIcon,
      children: menuChildren,
    });

    if (!hideInMenu(route)) {
      menus.push(menuItem);
    }
  });
  return menus;
}

/** 路由不转换菜单 */
function hideInMenu(route: AuthRoute.Route) {
  return Boolean(route.meta.hide);
}

/** 给菜单添加可选属性 */
function addPartialProps(config: {
  menu: App.AdminMenuOption;
  icon?: string;
  localIcon?: string;
  children?: App.AdminMenuOption[];
}) {
  const { iconRender } = useIconRender();

  const item = { ...config.menu };

  const { icon, localIcon, children } = config;

  if (localIcon) {
    Object.assign(item, { icon: iconRender({ localIcon }) });
  }

  if (icon) {
    Object.assign(item, { icon: iconRender({ icon }) });
  }

  if (children) {
    Object.assign(item, { children });
  }
  return item;
}
