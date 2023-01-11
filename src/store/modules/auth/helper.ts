import { localStg } from '@/utils';

/** 获取token */
export function getToken() {
  return localStg.get('token') || '';
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  localStg.remove('token');
}
