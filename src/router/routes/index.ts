/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: '/login',
  meta: {
    title: 'Root',
  },
};

export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: 'login',
    path: '/login',
    component: 'self',
    meta: {
      title: '登录',
      singleLayout: 'blank',
    },
  },
  {
    name: 'workbench',
    path: '/workbench',
    component: 'self',
    meta: {
      title: '工作台',
      singleLayout: 'basic',
    },
  },
  {
    name: 'playstation',
    path: '/playstation',
    component: 'basic',
    meta: {
      title: 'PlayStation',
    },
    children: [
      {
        name: 'playstation_trophy',
        path: '/playstation/trophy',
        component: 'self',
        meta: {
          title: '奖杯',
        },
      },
    ],
  },
  // 匹配无效路径的路由
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: 'blank',
    meta: {
      title: '未找到页面',
      singleLayout: 'blank',
    },
  },
];
