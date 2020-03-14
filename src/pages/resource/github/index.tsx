import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Input, Tabs } from 'antd';
import { GithubItem, GITHUBS, GITHUBS_MAP } from '@/data/githubs';
import { GithubListItem } from '@/components/ListItem/GithubItem';

export default function GithubResource({ location }: any) {
  const [searchgithubs, setsearchgithubs] = useState<GithubItem[]>(GITHUBS);

  const { query } = location;
  const tabGroups = [
    {
      tab: '全部',
      list: searchgithubs,
    },
  ];
  if (query && query.tag) {
    tabGroups.push({
      tab: query.tag,
      list: GITHUBS.filter(item => {
        if (item.tags) {
          return !!item.tags.find(tag => tag === query.tag);
        }
        return false;
      }),
    });
  }
  return (
    <PageHeaderWrapper>
      <Card>
        <Input.Search
          placeholder="搜索github资源"
          onChange={e => {
            if (!e.target.value) {
              setsearchgithubs([]);
              return;
            }
            const githubs: GithubItem[] = [];
            GITHUBS.forEach(item => {
              if (item.key.includes(e.target.value)) {
                githubs.push(item);
              }
            });
            setsearchgithubs(githubs);
          }}
          onSearch={(value: string) => {
            const project = GITHUBS_MAP.get(value);
            if (project) {
              setsearchgithubs([project]);
            }
          }}
        ></Input.Search>
        <Tabs defaultActiveKey={tabGroups[tabGroups.length - 1].tab}>
          {tabGroups.map(project => {
            return (
              <Tabs.TabPane tab={project.tab} key={project.tab}>
                {
                  <div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
                    {project.list.map(item => (
                      <GithubListItem key={item.key} item={item} location={location} />
                    ))}
                  </div>
                }
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
}
