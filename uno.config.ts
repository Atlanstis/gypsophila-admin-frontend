import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';

export default defineConfig({
  exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build'],
  presets: [presetUno()],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-col': 'flex flex-col',
    'flex-1-hidden': 'flex-1 overflow-hidden',
  },
});
