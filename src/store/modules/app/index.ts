import { defineStore } from 'pinia';

interface AppState {
  /** basic 布局下，侧边栏折叠状态：
   * false：展开；
   * true：收起。
   */
  siderCollapse: boolean;
}

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    siderCollapse: false,
  }),

  actions: {
    /** 切换侧边栏折叠状态 */
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse;
    },
  },
});
