import { Effect } from 'dva';
import { get } from 'lodash';
import { Reducer } from 'redux';
import { queryExample } from '@/services/_example';
import { QueryExampleInput, QueryExampleResult } from '@/services/queries/_example';

// 5. 增加/完成 ExampleMode
// 5.1 声明储存类型
// 5.2 声明effect/reducer
// 5.3 尽量使用 QueryExampleResult 作为数据类型 以方便追踪业务流程
export interface ExampleModelState {
  data?: QueryExampleResult[];
}

export interface ExampleModelType {
  namespace: 'example';
  state: ExampleModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ExampleModelState>;
  };
}

const StylistModel: ExampleModelType = {
  namespace: 'example',

  state: {
    data: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryExample, payload as QueryExampleInput);
      const data = get(response, '');
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};

export default StylistModel;
