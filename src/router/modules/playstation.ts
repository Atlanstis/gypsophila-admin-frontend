const route: AuthRoute.Route = {
  name: 'playstation',
  path: '/playstation',
  component: 'basic',
  meta: {
    title: 'PlayStation',
    localIcon: 'playstation',
    order: 2,
  },
  children: [
    {
      name: 'playstation_trophy',
      path: '/playstation/trophy',
      component: 'self',
      meta: {
        title: '奖杯',
        localIcon: 'trophy',
      },
    },
  ],
};
export default route;
