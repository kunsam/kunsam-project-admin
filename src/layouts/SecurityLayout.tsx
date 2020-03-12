import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import { Result, Button } from 'antd';
import { stringify } from 'querystring';
import { CurrentUser } from '@/models/user';
import { PageLoading } from '@ant-design/pro-layout';
import { ConnectState, ConnectProps } from '@/models/connect';
import { queryCurrent } from '@/services/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  location: any;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
  notAuthroized: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  get defaultNotAuthroized() {
    const {
      location: { pathname },
    } = this.props;
    if (pathname === '/notAuthroized') {
      return true;
    }
    if (pathname === 'auth/failure') {
      return true;
    }
    return false;
  }

  constructor(props: SecurityLayoutProps) {
    super(props);
    this.state = {
      isReady: false,
      notAuthroized: this.defaultNotAuthroized,
    };
  }

  static AUTH_PATH = '/admin/auth/openid';

  static DEV_AUTH_PATH = '/user/login';

  fetchMe = async () => {
    const response = await queryCurrent();
    return response && response.data && response.data.me;
  };

  handleIfUserLogin = async (currentUser: CurrentUser): Promise<boolean> => {
    if (this.state.notAuthroized) {
      return false;
    }
    const isAuthroized = Boolean(currentUser && currentUser.id);
    if (!isAuthroized) {
      const queryString = stringify({
        redirect: window.location.href,
      });
      // await message.info('未登陆，即将跳转登录', 2);
      if (process.env.NODE_ENV === 'development') {
        router.replace(`${SecurityLayout.DEV_AUTH_PATH}?${queryString}`);
      } else {
        window.location.href = `https://${window.location.host}${SecurityLayout.AUTH_PATH}`;
      }
    }
    return isAuthroized;
  };

  componentDidMount() {
    // this.fetchMe().then(user => {
    //   this.handleIfUserLogin(user).then(isAuthroized => {
    //     this.setState({
    //       isReady: true,
    //       notAuthroized: !isAuthroized,
    //     });
    //   });
    // });
  }

  render() {
    // const { isReady, notAuthroized } = this.state;
    const { children } = this.props;
    // if (notAuthroized) {
    //   return (
    //     <Result
    //       status="404"
    //       title="暂无权限"
    //       subTitle="您暂无权限登录该页面，请联系管理员"
    //       extra={
    //         <Button
    //           type="primary"
    //           onClick={() => {
    //             window.open('https://admin.letote.cn/admin');
    //           }}
    //         >
    //           联系管理员
    //         </Button>
    //       }
    //     />
    //   );
    // }
    // if (!isReady) {
    //   return <PageLoading tip="正在进行登录验证" />;
    // }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
