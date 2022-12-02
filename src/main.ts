import { createApp } from 'vue';
import App from './App.vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';

const app = createApp(App);

// 注册路由
setupRouter(app);
// 注册 pinia
setupStore(app);

app.mount('#app');
