import React from 'react';
import { get } from 'lodash';
import { connect } from 'dva';
import { CurrentUser } from '@/models/user';
import { ConnectState } from '@/models/connect';
import { Card, Avatar, Row, Col, Typography } from 'antd';

class Component extends React.PureComponent<
  {
    user: CurrentUser;
  },
  any
> {
  render() {
    const { user } = this.props;
    return (
      <Card>
        <Row justify="space-between">
          <Col>
            <Row>
              <Col>
                <Avatar src={get(user, 'recommend_stylist.avatar_url')} size={80} />
              </Col>
              <Col style={{ height: 80, marginLeft: 16 }}>
                <Typography.Title style={{ fontSize: 20, marginTop: 8 }}>
                  你好，{get(user, 'recommend_stylist.nickname') || '搭配师'}，祝你开心每一天！
                </Typography.Title>
                <Typography.Title
                  style={{ fontSize: 14, color: 'rgba(166, 166, 166, 1)', marginTop: 8 }}
                >
                  托特衣箱 VMD
                </Typography.Title>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row>
              <Col>
                <Typography.Text
                  style={{ fontSize: 14, textAlign: 'center', color: 'rgba(0, 0, 0, 0.45)' }}
                >
                  完成搭配任务
                </Typography.Text>
                <Typography.Title style={{ fontSize: 30 }}>暂无统计</Typography.Title>
              </Col>
              <Col style={{ marginLeft: 10 }}>
                <Typography.Text
                  style={{ fontSize: 14, textAlign: 'center', color: 'rgba(0, 0, 0, 0.45)' }}
                >
                  推荐VKU
                </Typography.Text>
                <Typography.Title style={{ fontSize: 30 }}>暂无统计</Typography.Title>
              </Col>
              <Col style={{ marginLeft: 10 }}>
                <Typography.Text
                  style={{ fontSize: 14, textAlign: 'center', color: 'rgba(0, 0, 0, 0.45)' }}
                >
                  用户采用
                </Typography.Text>
                <Typography.Title style={{ fontSize: 30 }}>暂无统计</Typography.Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

const HomeProfileCard: React.FC<any> = connect((state: ConnectState) => {
  return {
    user: state.user.currentUser,
  };
})(props => <Component {...props} />);
export default HomeProfileCard;
