import { useDeviceInfo } from '@/composables';

/**
 * 是否处于移动设备环境下
 */
export function judgeInMobile() {
  return useDeviceInfo().device.type === 'mobile';
}
