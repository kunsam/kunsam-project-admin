import { connect } from 'dva';
import React, { useState } from 'react';
import LoginFrom from './components/Login';
import { Dispatch, AnyAction } from 'redux';
import { ConnectState } from '@/models/connect';
import { LoginModelState } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { Alert, Checkbox, message, Button } from 'antd';

import styles from './style.less';
import SecurityLayout from '@/layouts/SecurityLayout';

const { Tab, UserName, Password, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: LoginModelState;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = props => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="账户或密码错误（admin/ant.design）" />
          )}
          <UserName
            name="email"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
            onClick={() => message.info('请联系管理员')}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <Button
          type="primary"
          style={{ width: '100%' }}
          onClick={() => {
            window.location.href = `https://${window.location.host}${SecurityLayout.AUTH_PATH}`;
          }}
        >
          使用Admin登录
        </Button>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => {
  return {
    userLogin: login,
    submitting: loading.effects['login/login'],
  };
})(Login);
