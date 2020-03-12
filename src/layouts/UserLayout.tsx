import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
import { ConnectProps, ConnectState } from '@/models/connect';
import { MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { GlobalFooter } from '@/components/GlobalFooter';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}
/**
 * 用户登录布局
 *
 * @param {*} props
 * @returns
 */
const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Letote Stylist Admin</span>
              </Link>
            </div>
            <div className={styles.desc}>搭配师后台管理系统</div>
          </div>
          {children}
        </div>
        <GlobalFooter />
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
