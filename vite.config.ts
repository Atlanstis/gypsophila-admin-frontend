import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import Unocss from '@unocss/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import DefineOptions from 'unplugin-vue-define-options/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    Unocss(),
    Components({
      dts: 'src/typings/components.d.ts',
      dirs: ['src/components'],
      resolvers: [
        NaiveUiResolver(), // 按需自动引入 Naive UI 的组件
        IconsResolver({ prefix: 'icon' }), // 按需自动引入 图标组件
      ],
    }),
    Icons({ compiler: 'vue3' }),
  ],

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
