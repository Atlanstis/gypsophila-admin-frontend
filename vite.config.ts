import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import Unocss from '@unocss/vite';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss()],

  server: {
    host: '0.0.0.0',
    port: 1108,
  },

  // 访问别名配置
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
});
