// NOTICE: 修改此文件后 需要重启 npm start 更新才会生效

// 给全局提供的路由配置表
const APP_ROUTER_CONFIG_MAP = {
  user: {
    login: {
      path: '/user/login',
      queries: ['redirect?'],
    },
  },
  home: {
    path: '/admin',
  }
};

module.exports = { APP_ROUTER_CONFIG_MAP };
