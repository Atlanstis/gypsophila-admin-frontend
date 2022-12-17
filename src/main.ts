import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import { setupPlugin } from './plugins';

async function setup() {
  const app = createApp(App);
  // 注册插件、css
  setupPlugin(app);

  // 注册 pinia
  setupStore(app);

  // 注册路由
  await setupRouter(app);

  app.mount('#app');
}

setup();
