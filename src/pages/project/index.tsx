import React, { useState } from 'react';
import { Row, Tabs, Card, Input, Radio, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PROJECTS, Project, PROJECTS_MAP } from '@/data/projects';
import moment from 'moment';
import { ProjectListItem } from '@/components/ListItem/ProjectItem';

export enum ProjectSortMode {
  default = 'default',
  sort_by_creat_at_descending = 'sort_by_creat_at_descending',
  sort_by_creat_at_ascending = 'sort_by_creat_at_ascending',
  sort_by_emphasisemphasisDegree_descending = 'sort_by_emphasisemphasisDegree',
}

const SorterRatio: React.FC<any> = ({ onChange }) => {
  return (
    <Row style={{ marginBottom: 20 }}>
      <Radio.Group defaultValue={ProjectSortMode.default} onChange={onChange}>
        <Radio.Button value={ProjectSortMode.default}>默认排序</Radio.Button>
        <Radio.Button value={ProjectSortMode.sort_by_creat_at_ascending}>
          创建时间从近到远
        </Radio.Button>
        <Radio.Button value={ProjectSortMode.sort_by_creat_at_descending}>
          创建时间从远到近
        </Radio.Button>
        <Radio.Button value={ProjectSortMode.sort_by_emphasisemphasisDegree_descending}>
          重视程度↓
        </Radio.Button>
      </Radio.Group>
    </Row>
  );
};

export const ProjectPanel: React.FC<{ projects: Project[] }> = ({ projects }) => {
  if (!projects.length) {
    return null;
  }
  const [sorter, setsorter] = useState(ProjectSortMode.default);
  const getSortedProjects = (list: Project[]) => {
    switch (sorter) {
      default: {
        return list;
      }
      case ProjectSortMode.sort_by_creat_at_ascending: {
        return list.sort((a, b) => moment(a.creat_at).diff(moment(b.creat_at)));
      }
      case ProjectSortMode.sort_by_creat_at_descending: {
        return list.sort((a, b) => moment(b.creat_at).diff(moment(a.creat_at)));
      }
      case ProjectSortMode.sort_by_emphasisemphasisDegree_descending: {
        return list.sort((a, b) => {
          const av = a.emphasisDegree || 0;
          const bv = b.emphasisDegree || 0;
          return bv - av;
        });
      }
    }
  };
  const sortedProjects = getSortedProjects(projects);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
      <SorterRatio
        onChange={e => {
          setsorter(e.target.value);
        }}
      />
      {sortedProjects.map(project => (
        <ProjectListItem key={project.key} project={project} />
      ))}
    </div>
  );
};

export default function Project() {
  const [searchprojects, setsearchprojects] = useState<Project[]>([]);
  return (
    <PageHeaderWrapper>
      <Card>
        <Input.Search
          placeholder="查询项目"
          onChange={e => {
            if (!e.target.value) {
              setsearchprojects([]);
              return;
            }
            const projects: Project[] = [];
            PROJECTS.forEach(p => {
              p.list.forEach(project => {
                if (project.key.includes(e.target.value)) {
                  projects.push(project);
                }
              });
            });
            setsearchprojects(projects);
          }}
          onSearch={(value: string) => {
            const project = PROJECTS_MAP.get(value);
            if (project) {
              setsearchprojects([project]);
            }
          }}
        ></Input.Search>
        <ProjectPanel projects={searchprojects} />
        <Tabs>
          {PROJECTS.map(project => {
            return (
              <Tabs.TabPane tab={project.tab} key={project.tab}>
                <Typography.Paragraph style={{ paddingLeft: 20 }}>*{project.desc}</Typography.Paragraph>
                <ProjectPanel projects={project.list} />
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  );
}
