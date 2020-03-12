import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { ClickParam } from 'antd/es/menu';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import { Avatar, Menu, Spin, message } from 'antd';
import { ConnectProps, ConnectState } from '@/models/connect';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

export interface GlobalHeaderRightProps extends ConnectProps {
  menu?: boolean;
  currentUser?: CurrentUser;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    message.info('暂未开放');
    // router.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const { menu, currentUser } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {/* {menu && <Menu.Divider />} */}

        {process.env.NODE_ENV === 'development' && (
          <Menu.Item key="logout">
            <LogoutOutlined />
            退出登录
          </Menu.Item>
        )}
      </Menu>
    );
    return currentUser && currentUser.id ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src="" alt="avatar" />
          <span className={styles.name}>{currentUser.email}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
