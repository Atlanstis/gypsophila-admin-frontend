import { defineStore } from 'pinia';
import { initThemeSettings, getNaiveThemeOverrides } from './helpers';

export const useThemeStore = defineStore('theme-store', {
  state: (): Theme.Setting => initThemeSettings(),

  getters: {
    /** naiveUI的主题配置 */
    naiveThemeOverrides(state) {
      return getNaiveThemeOverrides({ primary: state.themeColor, ...state.otherColor });
    },
  },
});
