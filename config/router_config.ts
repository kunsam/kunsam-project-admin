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
            name: '首页',
            icon: 'home',
            component: './home/home.tsx',
            path: APP_ROUTER_CONFIG_MAP.home.path,
            routes: [],
          },

          {
            name: '项目管理',
            icon: 'CodeOutlined',
            path: '/project',
            routes: [
              {
                name: '项目管理',
                path: '/project',
                component: './project/index',
              },
              {
                name: '标签项目',
                path: '/project/project_by_tag',
                component: './project/project_by_tag',
                hideInMenu: true,
              },
            ],
          },

          {
            name: '故事管理',
            icon: 'WalletOutlined',
            path: '/story',
            routes: [
              {
                name: '看板',
                path: '/story/index',
                component: './story/index',
              },
              {
                name: '故事管理',
                path: '/story/list',
                component: './story/list/index',
              },
            ],
          },

          {
            name: '前端资源',
            icon: 'ShopOutlined',
            path: '/resource',
            routes: [
              {
                name: 'react社区资源',
                path: '/resource/react',
                component: './resource/react/index',
              },
              {
                name: 'github资源',
                path: '/resource/github',
                component: './resource/github/index',
              },
            ],
          },
          {
            name: '个人简介',
            icon: 'UserOutlined',
            path: '/about',
            component: './about/index',
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
