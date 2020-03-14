import { Effect } from 'dva';
import { Reducer } from 'redux';
import { get } from 'lodash';
import { queryCurrent } from '@/services/user';

export interface CurrentUser {
  // 用户id
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    saveCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
    resetCurrentUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    // 用于登录的简介
    currentUser: undefined,
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const me = get(response, 'data.me');
      if (me) {
        yield put({
          type: 'saveCurrentUser',
          payload: me,
        });
      }
    },
    *saveCurrent({ payload }, { put }) {
      yield put({
        payload,
        type: 'saveCurrentUser',
      });
    },
  },

  reducers: {
    resetCurrentUser() {
      return {
        currentUser: undefined,
        userProfile: undefined,
        subscription: undefined,
        userStyle: undefined,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: undefined,
      },
      action,
    ) {
      if (!state.currentUser) {
        return state;
      }
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
