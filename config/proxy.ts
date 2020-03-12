/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
// https://stylist-dev.letote.cn
export default {
  dev: {
    '/admin/api': {
      target: 'https://stylist-staging.letote.cn',
      secure: false,
      changeOrigin: true,
      preserveHeaderKeyCase: true,
      hostRewrite: true,
      autoRewrite: true,
      protocolRewrite: 'https',
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    },
    '/admin/auth/openid': {
      target: 'https://stylist-staging.letote.cn',
      secure: false,
      changeOrigin: true,
      preserveHeaderKeyCase: true,
      hostRewrite: true,
      autoRewrite: true,
      protocolRewrite: 'https',
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    },
  },
  staging: {
    '/api': {
      target: 'https://stylist-staging.letote.cn/',
      secure: false,
      changeOrigin: true,
      preserveHeaderKeyCase: true,
      hostRewrite: true,
      autoRewrite: true,
      protocolRewrite: 'https',
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    },
    '/admin/auth/openid': {
      target: 'https://stylist-staging.letote.cn/',
      secure: false,
      changeOrigin: true,
      preserveHeaderKeyCase: true,
      hostRewrite: true,
      autoRewrite: true,
      protocolRewrite: 'https',
      cookieDomainRewrite: {
        '*': 'localhost',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
