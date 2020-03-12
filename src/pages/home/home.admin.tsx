import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import HomeProfileCard from '../user/home_profile';
import { queryHomeStylistTaskList } from '@/services/home_stylist_task';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { RecommendServiceStylingState } from '@/typings/stylist_task';
import HomeStylistTaskList from './components/HomeStylistTaskList';
import { QueryStylistTaskListResult } from '@/services/queries/stylist_task';

const HomepageAdminContainer: React.FC<{
  user?: CurrentUser;
}> = ({ user }) => {
  const [data, setData] = useState<QueryStylistTaskListResult | undefined>();

  useEffect(() => {
    if (user) {
      queryHomeStylistTaskList(user.id, [
        RecommendServiceStylingState.styling,
        RecommendServiceStylingState.completed_styling,
      ]).then(result => {
        if (result && result.data) {
          setData(result);
        }
      });
    }
  }, [user]);

  return (
    <PageHeaderWrapper content={<HomeProfileCard />}>
      <HomeStylistTaskList result={data} />
    </PageHeaderWrapper>
  );
};

export default connect((state: ConnectState) => {
  return {
    user: state.user.currentUser,
  };
})(HomepageAdminContainer);
