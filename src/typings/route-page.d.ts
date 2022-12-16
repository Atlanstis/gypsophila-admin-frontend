declare namespace RoutePage {
  /** 根路由 */
  type RootRouteKey = 'root';

  /** 未找到路由(捕获无效路径的路由) */
  type NotFoundRouteKey = 'not-found';

  /** 页面路由 */
  type RouteKey = 'login' | NotFoundRouteKey | 'workbench' | 'playstation' | 'playstation_trophy';

  /** 最后一级路由(该级路有对应的vue文件) */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    NotFoundRouteKey | 'login' | 'workbench' | 'playstation_trophy'
  >;
}
