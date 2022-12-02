import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import { setupPlugin } from './plugins';

const app = createApp(App);

// 注册插件、css
setupPlugin(app);
// 注册路由
setupRouter(app);
// 注册 pinia
setupStore(app);

app.mount('#app');
