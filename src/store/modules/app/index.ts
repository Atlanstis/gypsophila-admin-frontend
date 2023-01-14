import { defineStore } from 'pinia';
import { judgeInMobile } from './helper';

interface AppState {
  /** 平台名称 */
  name: string;
  /** basic 布局下，侧边栏折叠状态：
   * false：展开；
   * true：收起。
   */
  siderCollapse: boolean;
  /** 是否处于移动设备环境 */
  isInMobile: boolean;
}

const isInMobile = judgeInMobile();

export const useAppStore = defineStore('app-store', {
  state: (): AppState => ({
    name: 'Gypsophila.',
    siderCollapse: isInMobile,
    isInMobile,
  }),

  actions: {
    /** 切换侧边栏折叠状态 */
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse;
    },
  },
});
