import { AnyAction } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { LoginModelState } from './login';
import { UserModelState } from './user';
import { StylistModelState } from './stylist';
import { StylistTaskModelState } from './stylist_task';
import { StylingProductsModelState } from './styling_products';
import { ExampleModelState } from './_example';

export { GlobalModelState, SettingModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    stylist?: boolean;
    stylistTask?: boolean;
  };
}

// 6. 添加新增Mode类型到 connectState中
export interface ConnectState {
  example: ExampleModelState;
  loading: Loading;
  login: LoginModelState;
  user: UserModelState;
  global: GlobalModelState;
  stylist: StylistModelState;
  settings: SettingModelState;
  stylistTask: StylistTaskModelState;
  stylingProducts: StylingProductsModelState;
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
