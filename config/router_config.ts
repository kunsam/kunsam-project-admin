import { APP_ROUTER_CONFIG_MAP } from '../src/utils/router/router_map';

// https://pro.ant.design/docs/router-and-nav-cn#%E8%B7%AF%E7%94%B1
export interface RouteConfigItem {
  path?: string; // 不存在时对应无法找到的路径

  // 相对于 src/pages 目录的路径 component 与 redirect 需同时存在一个
  component?: string;
  redirect?: string;

  routes?: RouteConfigItem[];

  // 分别代表生成菜单项的文本和图标
  // 使用全球化组件会导致 name 和菜单实际展示的不同
  name?: string;
  icon?: string;

  // 用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示。
  authority?: string[];

  exact?: boolean;
  // 可以在菜单中不展示这个路由，包括子路由
  hideInMenu?: boolean;
  // 用于隐藏不需要在菜单中展示的子路由。用法可以查看 分步表单 的配置。
  hideChildrenInMenu?: boolean;
}

/*
   注意顺序产生的影响
   /a
   /
    /c
   /b
   这样的写法会提示无法找到 /b 页面
*/

// antd-design-pro 自定义的配置形式
export const ROUTER_CONFIG: RouteConfigItem[] = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        component: './user/login',
        path: APP_ROUTER_CONFIG_MAP.user.login.path,
      },
    ],
  },

  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        // authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/admin',
          },
          {
            name: '首页',
            icon: 'home',
            component: './home/home.tsx',
            path: APP_ROUTER_CONFIG_MAP.home.path,
          },

          // 无法找到的路径
          {
            path: undefined,
            component: './404',
          },
        ],
      },
    ],
  },

  // 无法找到的路径
  {
    path: undefined,
    component: './404',
  },
];
