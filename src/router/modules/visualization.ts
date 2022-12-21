const route: AuthRoute.Route = {
  name: 'visualization',
  path: '/visualization',
  component: 'basic',
  meta: {
    title: '可视化',
    icon: 'mdi:chart-areaspline',
    order: 3,
  },
  children: [
    {
      name: 'visualization_echarts',
      path: '/visualization/echarts',
      component: 'self',
      meta: {
        title: 'Echarts',
        icon: 'simple-icons:apacheecharts',
      },
    },
    {
      name: 'visualization_screen',
      path: '/visualization/screen',
      component: 'self',
      meta: {
        title: '大屏',
        icon: 'gg:screen',
      },
    },
  ],
};
export default route;
