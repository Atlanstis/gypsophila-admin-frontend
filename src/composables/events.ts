import { useEventListener } from '@vueuse/core';
import { useTabStore } from '@/store';

/** 全局事件 */
export function useGlobalEvents() {
  const tab = useTabStore();

  useEventListener(window, 'beforeunload', () => {
    /** 页面离开时缓存多页签数据 */
    tab.cacheTabRoutes();
  });
}
