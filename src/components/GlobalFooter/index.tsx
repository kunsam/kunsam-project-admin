import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export const GlobalFooter = () => (
  <DefaultFooter
    copyright="letote技术部"
    links={[
      {
        key: 'Letote WeChat',
        title: 'Letote WeChat',
        href: 'https://wechat.letote.cn/',
      },
      {
        key: 'Letote Admin',
        title: 'Letote Admin',
        href: 'https://admin.letote.cn/admin',
      },
    ]}
  />
);
