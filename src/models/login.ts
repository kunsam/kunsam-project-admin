import { Effect } from 'dva';
import { router } from 'umi';
import { stringify } from 'querystring';
import { getPageQuery } from '@/utils/utils';
import { fakeAccountLogin } from '@/services/login';

export interface LoginModelState {
  [key: string]: any;
}
export interface LoginModelType {
  namespace: string;
  effects: {
    login: Effect;
    logout: Effect;
  };
  state: LoginModelState;
  reducers: {};
}

const Model: LoginModelType = {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.data && response.data.SignIn && response.data.SignIn.admin_user) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        router.replace(redirect || '/');
      }
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery();
      yield put({
        type: 'user/resetCurrentUser',
      });
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
            isLogout: true,
          }),
        });
      }
    },
  },
};

export default Model;
