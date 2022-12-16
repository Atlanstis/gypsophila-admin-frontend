declare namespace AuthRoute {
  /** 根路由路径 */
  type RootRoutePath = '/';

  /** 捕获无效路由的路由路径 */
  type NotFoundRoutePath = '/:pathMatch(.*)*';

  type RootRouteKey = RoutePage.RootRouteKey;
  type NotFoundRouteKey = RoutePage.NotFoundRouteKey;
  type RouteKey = RoutePage.RouteKey;
  type AllRouteKey = RouteKey | RootRouteKey | NotFoundRouteKey;

  /**
   * 路由布局类型
   * - basic - 基础布局，具有公共部分的布局
   * - blank - 空白布局
   */
  type RouteLayoutType = 'basic' | 'blank';

  /**
   * 路由的组件
   * - multi - 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
   * - self - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
   */
  type RouteComponentType = RouteLayoutType | 'multi' | 'self';

  /** 路由描述信息 */
  interface RouteMeta {
    /** 路由标题 */
    title: string;
    /** 动态路径 */
    dynamicPath?: string;
    /** 作为单级路由的父级路由布局组件 */
    singleLayout?: RouteLayoutType;
    /** 菜单和面包屑对应的图标 */
    icon?: string;
    /** 使用本地svg作为的菜单和面包屑对应的图标(src/assets/svg文件夹的的svg文件名) */
    localIcon?: string;
  }

  type Route<K extends AllRouteKey = AllRouteKey> = K extends AllRouteKey
    ? {
        /** 路由名称(路由唯一标识) */
        name: K;
        /** 路由路径 */
        path: AuthRouteUtils.GetRoutePath<K>;
        /** 路由重定向 */
        redirect?: AuthRouteUtils.GetRoutePath;
        /** 路由组件 */
        component?: RouteComponentType;
        /** 子路由 */
        children?: Route[];
        /** 路由描述 */
        meta: RouteMeta;
      } & Omit<
        import('vue-router').RouteRecordRaw,
        'name' | 'path' | 'redirect' | 'component' | 'children' | 'meta'
      >
    : never;
}

declare namespace AuthRouteUtils {
  /** 路由key层级分割符 */
  type RouteKeySplitMark = '_';

  /** 路由path层级分割符 */
  type RoutePathSplitMark = '/';

  /** 空白字符串 */
  type BlankString = '';

  /** key转换成path */
  type KeyToPath<K extends string> =
    K extends `${infer _Left}${RouteKeySplitMark}${RouteKeySplitMark}${infer _Right}`
      ? never
      : K extends `${infer Left}${RouteKeySplitMark}${infer Right}`
      ? Left extends BlankString
        ? never
        : Right extends BlankString
        ? never
        : KeyToPath<`${Left}${RoutePathSplitMark}${Right}`>
      : `${RoutePathSplitMark}${K}`;

  /** 根据路由key获取路由路径 */
  type GetRoutePath<K extends AuthRoute.AllRouteKey = AuthRoute.AllRouteKey> =
    K extends AuthRoute.AllRouteKey
      ? K extends AuthRoute.RootRouteKey
        ? AuthRoute.RootRoutePath
        : K extends AuthRoute.NotFoundRouteKey
        ? AuthRoute.NotFoundRoutePath
        : KeyToPath<K>
      : never;
}
