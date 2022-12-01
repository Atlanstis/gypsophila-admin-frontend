import { createApp } from 'vue';
import App from './App.vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';
import { setupRouter } from './router/index';

const app = createApp(App);

setupRouter(app);

app.mount('#app');
