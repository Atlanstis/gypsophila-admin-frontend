import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/basic/index.vue'),
    children: [
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench/index.vue'),
        meta: {
          title: '工作台',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
