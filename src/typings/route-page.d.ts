declare namespace RoutePage {
  /** 根路由 */
  type RootRouteKey = 'root';

  /** 登陆页路由 */
  type LoginRouteKey = 'login';

  /** 未找到路由(捕获无效路径的路由) */
  type NotFoundRouteKey = 'not-found';

  type WorkbenchRouteKey = 'workbench';
  type PlaystationRouteKey = 'playstation' | 'playstation_trophy';
  type Visualization = 'visualization' | 'visualization_echarts' | 'visualization_screen';
  type AboutRouteKey = 'about';

  /** 页面路由 */
  type RouteKey =
    | LoginRouteKey
    | NotFoundRouteKey
    | WorkbenchRouteKey
    | PlaystationRouteKey
    | Visualization
    | AboutRouteKey;

  /** 最后一级路由(该级路有对应的vue文件) */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    | NotFoundRouteKey
    | LoginRouteKey
    | 'workbench'
    | 'playstation_trophy'
    | 'visualization_echarts'
    | 'visualization_screen'
    | 'about'
  >;
}
