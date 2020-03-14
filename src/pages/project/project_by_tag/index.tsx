import React from 'react';
import { Project, PROJECTS } from '@/data/projects';
import { Result } from 'antd';
import { ProjectPanel } from '../index';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default function ProjectByTag(props: any) {
  const {
    location: { query },
  } = props;

  const projects: Project[] = [];
  if (query && query.tag) {
    PROJECTS.map(p => {
      p.list.map((project: Project) => {
        if (query.tag === project.key) {
          projects.push(project);
          return;
        }
        if (project.tags) {
          if (project.tags.find(tag => tag === query.tag)) {
            projects.push(project);
          }
        }
      });
    });
  }

  if (!projects.length) {
    return <Result title="暂无结果" />;
  }
  return (
    <PageHeaderWrapper>
      <ProjectPanel projects={projects} />
    </PageHeaderWrapper>
  );
}
