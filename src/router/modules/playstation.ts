const route: AuthRoute.Route = {
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
};
export default route;
