import { AnyAction } from 'redux';
import { RouterTypes } from 'umi';
import { UserModelState } from './user';
import { LoginModelState } from './login';
import { GlobalModelState } from './global';
import { ExampleModelState } from './_example';
import { MenuDataItem } from '@ant-design/pro-layout';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    menu?: boolean;
    user?: boolean;
    login?: boolean;
    global?: boolean;
    setting?: boolean;
  };
}

// 6. 添加新增Mode类型到 connectState中
export interface ConnectState {
  loading: Loading;
  user: UserModelState;
  login: LoginModelState;
  global: GlobalModelState;
  example: ExampleModelState;
  settings: SettingModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
