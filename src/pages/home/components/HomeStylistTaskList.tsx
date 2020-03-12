import React, { PureComponent } from 'react';
import { get } from 'lodash';
import { QueryStylistTaskListResult } from '@/services/queries/stylist_task';
import { Avatar, Row, Col, Typography, Button } from 'antd';
import { UIStylistTaskUtil } from '@/utils/ui/ui_stylist_task_util';
import { GraphRecommendService } from '@/typings/stylist_task';
import { APPRouterManager } from '@/utils/router/router_manager';

export default class HomeStylistTaskList extends PureComponent<{
  result?: QueryStylistTaskListResult;
}> {
  render() {
    const { result } = this.props;
    if (!(result && result.data)) {
      return null;
    }
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {result.data.recommend_services.nodes.map(node => {
          const data = node as GraphRecommendService;
          if (!(data && data.id)) {
            return null;
          }
          const nickname = get(data, 'customer.nickname');
          const avatar_url = get(data, 'customer.avatar_url');
          const stateUi = UIStylistTaskUtil.getRecommendServiceStylingStateUI(data.styling_state);
          const remainHours = UIStylistTaskUtil.getStylistTaskRemainHour(
            data as GraphRecommendService,
          );
          const { canEdit } = UIStylistTaskUtil.getRecommendServiceOperationState(data);
          return (
            <div
              key={data.id}
              style={{
                width: 364,
                height: 184,
                display: 'flex',
                marginRight: 14,
                flexDirection: 'column',
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Row style={{ paddingLeft: 22, paddingTop: 24 }}>
                <Col>
                  <Avatar size={48} src={avatar_url} />
                </Col>
                <Col style={{ marginLeft: 18 }}>
                  <Typography.Title
                    style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', marginBottom: 16 }}
                  >
                    {nickname}
                  </Typography.Title>
                  <Typography.Paragraph style={{ color: 'rgba(42, 130, 228, 1)', fontSize: 14 }}>
                    当前状态: {stateUi.text}
                    <br />
                    {remainHours === null ? '' : `剩余时间: ${remainHours}小时`}
                  </Typography.Paragraph>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Button
                    style={{
                      width: '100%',
                      border: 0,
                      height: 48,
                      backgroundColor: 'rgba(247, 249, 250, 1)',
                    }}
                    onClick={() => {
                      APPRouterManager.goStylistTaskDetails(data.id);
                    }}
                  >
                    查看任务
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    style={{
                      width: '100%',
                      border: 0,
                      height: 48,
                      backgroundColor: 'rgba(247, 249, 250, 1)',
                    }}
                    onClick={() => {
                      APPRouterManager.goStylistSheet(data.id, canEdit);
                    }}
                  >
                    {canEdit ? '编辑' : '查看'}搭配单
                  </Button>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    );
  }
}
