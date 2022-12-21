const route: AuthRoute.Route = {
  name: 'about',
  path: '/about',
  component: 'self',
  meta: {
    title: '关于',
    singleLayout: 'basic',
    icon: 'fluent:book-information-24-regular',
    order: 4,
  },
};

export default route;
