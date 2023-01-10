import { localStg } from '@/utils';

/** 获取token */
export function getToken() {
  return localStg.get('token') || '';
}
