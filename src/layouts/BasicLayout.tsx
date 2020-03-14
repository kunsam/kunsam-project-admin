/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React from 'react';
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import { findIndex } from 'lodash';
import { Link } from 'umi';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { APPClient } from '../services/client';
import { ConnectState } from '@/models/connect';
import AuthorizedLayout from './AuthorizedLayout';
import { ApolloProvider } from '@apollo/react-hooks';
import { GlobalFooter } from '@/components/GlobalFooter';
import RightContent from '@/components/GlobalHeader/RightContent';
import { Avatar } from 'antd';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BREADCRUMB_SETTING: { [key: string]: { path: string; breadcrumbName: string }[] } = {
  // 搭配单页配置
  // [APP_ROUTER_CONFIG_MAP.stylist_sheet.index.path]: [
  //   {
  //     path: APP_ROUTER_CONFIG_MAP.stylist_task.index.path,
  //     breadcrumbName: APP_ROUTER_CONFIG_MAP.stylist_task.index.name,
  //   },
  // ],
};

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
  return menuList;
};
// menuList.map(item => {
//   const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
//   return Authorized.check(item.authority, localItem, null) as MenuDataItem;
// });

const footerRender: BasicLayoutProps['footerRender'] = () => {
  return (
    <>
      <GlobalFooter />
    </>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  // useEffect(() => {
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //   }
  // }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  return (
    <ApolloProvider client={APPClient}>
      <ProLayout
        menuHeaderRender={(_, __, tprops) => {
          return (
            <Link to="/">
              <Avatar src="http://q7345qrap.bkt.clouddn.com/avatar.jpg" shape="square" />
              {tprops && tprops.collapsed ? null : (
                <h1 style={{ fontSize: 16 }}>Admin</h1>
              )}
            </Link>
          );
        }}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => {
          // remove same key
          const firstRoute = routers[0];
          if (firstRoute && firstRoute.breadcrumbName && firstRoute.breadcrumbName === '首页') {
            firstRoute.breadcrumbName = '工作台';
          }
          const currentRoute = routers[routers.length - 1];
          let breadcrumbCustomRouters: any[] = [];
          if (currentRoute) {
            if (BREADCRUMB_SETTING[currentRoute.path]) {
              breadcrumbCustomRouters = BREADCRUMB_SETTING[currentRoute.path].map(r => ({
                ...r,
                middlePath: true, // 中间路径由于后退
              }));
            }
          }
          return [
            {
              path: '/',
              breadcrumbName: '首页',
            },
            ...breadcrumbCustomRouters,
            ...routers,
          ];
        }}
        itemRender={(route, _, routes, paths) => {
          if ((route as any).middlePath && window.history.length > 2) {
            const index = findIndex(routes, r => r.path === route.path) + 1;
            const delta = routes.length - index;
            return (
              <a
                onClick={() => {
                  window.history.go(-1 * delta);
                }}
              >
                {route.breadcrumbName}
              </a>
            );
          }
          if (route.path && paths.length !== routes.length - 1) {
            return <Link to={route.path}>{route.breadcrumbName}</Link>;
          }
          return <span>{route.breadcrumbName}</span>;
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        <AuthorizedLayout {...props}>{children}</AuthorizedLayout>
      </ProLayout>
    </ApolloProvider>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
