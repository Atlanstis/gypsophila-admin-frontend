import { defineStore } from 'pinia';
import { useRouterPush } from '@/composables';
import { fetchLogin } from '@/service';
import { useRouteStore, useTabStore } from '@/store';
import { localStg } from '@/utils';
import { clearAuthStorage, getToken } from './helper';
import { nextTick } from 'vue';

interface AuthState {
  /** 用户凭证 */
  token: string;
  /** 登录 loading */
  loginLoading: boolean;
}

// TODO 缺少获取用户信息

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    loginLoading: false,
  }),

  getters: {
    /** 是否已登录 */
    isLogin(state) {
      return !!state.token;
    },
  },

  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();

      clearAuthStorage();
      this.$reset();

      toLogin();

      nextTick(() => {
        resetTabStore();
        resetRouteStore();
      });
    },

    /** 账号密码登录
     * @param username -账号
     * @param password -密码
     */
    async login(username: string, password: string) {
      this.loginLoading = true;
      const {
        data,
        data: { token },
      } = await fetchLogin(username, password);
      if (data) {
        await this.handleActionAfterLogin(token);
      }
      this.loginLoading = false;
    },

    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(token: string) {
      let successFlag = false;

      // 先把token存储到缓存中(后面接口的请求头需要token)
      localStg.set('token', token);

      this.token = token;
      successFlag = true;
      return successFlag;
    },

    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async handleActionAfterLogin(token: string) {
      const route = useRouteStore();
      const { toLoginRedirect } = useRouterPush(false);

      const loginSuccess = await this.loginByToken(token);

      if (loginSuccess) {
        await route.initAuthRoute();

        // 跳转登录后的地址
        toLoginRedirect();
        return;
      }
    },
  },
});
