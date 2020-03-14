import React from 'react';
import { router } from 'umi';
import { Card, Row, Tag, message, Tooltip, Col, Rate } from 'antd';
import { Project } from '@/data/projects';
import { ZoomAbleQiNiuImage } from '@/components/zoomAbleImage/qiniu';
import {
  GithubOutlined,
  BarsOutlined,
  FileSearchOutlined,
  CodepenOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import copy from 'copy-to-clipboard';

export const ProjectListItem: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Card className="hover-shadow" style={{ marginBottom: 10, width: '90%', paddingBottom: 30 }}>
      <Row justify="end" style={{ position: 'absolute', right: 20, top: 10, height: 100 }}>
        {!project.github ? null : (
          <GithubOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              window.open(project.github);
            }}
          />
        )}
        {!project.prototype ? null : (
          <Tooltip title="计划文档">
            <BarsOutlined
              style={{ fontSize: 24, marginLeft: 15 }}
              onClick={() => {
                window.open(project.prototype);
              }}
            />
          </Tooltip>
        )}
        {!project.doc ? null : (
          <FileSearchOutlined
            style={{ fontSize: 24, marginLeft: 15 }}
            onClick={() => {
              window.open(project.doc);
            }}
          />
        )}
        {!project.npm ? null : (
          <Tooltip title="npm">
            <ApartmentOutlined
              style={{ fontSize: 24, marginLeft: 15, color: '#fb8817' }}
              onClick={() => {
                window.open(project.npm);
              }}
            />
          </Tooltip>
        )}
        {!project.localPath ? null : (
          <Tooltip title="复制打开命令">
            <CodepenOutlined
              onClick={() => {
                copy(`code ${project.localPath}`);
                message.success('已复制到剪切板');
              }}
              style={{ fontSize: 24, marginLeft: 15, color: 'rgba(24, 144, 255, 1)' }}
            />
          </Tooltip>
        )}
      </Row>

      <p style={{ fontSize: 16, fontWeight: 600, color: '#000' }}>
        <span>名称：</span>
        {project.name}
        {project.emphasisDegree === undefined ? null : (
          <Tooltip title="重视程度">
            <span style={{ marginLeft: 10 }}>
              <Rate disabled allowHalf defaultValue={project.emphasisDegree} />
            </span>
          </Tooltip>
        )}
      </p>
      <p>
        <span>描述：</span>
        {project.desc}
      </p>

      {!project.website ? null : (
        <Row style={{ marginBottom: '1em' }}>
          <span>网址：</span>
          <a
            style={{ textDecoration: 'underline' }}
            onClick={() => {
              window.open(project.website);
            }}
          >
            {project.website}
          </a>
        </Row>
      )}

      {project.tags && project.tags.length ? (
        <Row style={{ flexWrap: 'nowrap' }}>
          <Col style={{ wordBreak: 'keep-all' }}>
            <span>标签：</span>
          </Col>
          <Col>
            {project.tags
              .sort((a, b) => a.length - b.length)
              .map(tag => {
                return (
                  <Tag
                    key={tag}
                    color="geekblue"
                    style={{ cursor: 'pointer', marginBottom: 15 }}
                    onClick={() => {
                      router.push({
                        pathname: '/project/project_by_tag',
                        query: {
                          tag,
                        },
                      });
                    }}
                  >
                    {tag}
                  </Tag>
                );
              })}
          </Col>
        </Row>
      ) : null}

      {!project.photos ? null : (
        <Row
          style={{
            marginTop: 10,
            border: '1px dashed #ccc',
            padding: 8,
            overflowX: 'scroll',
            width: '100%',
          }}
        >
          {project.photos.map(photo => {
            return (
              <ZoomAbleQiNiuImage
                key={photo}
                width={200}
                height={120}
                originSrc={photo}
                zoomWidth={400}
                disableZoomedRatio
                style={{ marginRight: 10 }}
              />
            );
          })}
        </Row>
      )}

      {project.authorComment ? (
        <p
          style={{
            backgroundColor: '#f1f2f3',
            padding: 8,
            color: '#999',
            fontSize: 12,
            marginTop: 15,
          }}
        >
          {project.authorComment}
        </p>
      ) : null}

      {!project.achievements ? null : (
        <Row style={{ flexWrap: 'nowrap', marginTop: 8 }}>
          <Col style={{ wordBreak: 'keep-all' }}>
            <span>成就：</span>
          </Col>
          <Col>
            {project.achievements.map((ac, acIndex) => (
              <Tag key={`ac${acIndex}`} color="green">
                {ac}
              </Tag>
            ))}
          </Col>
        </Row>
      )}

      {!(project.articles && project.articles.length) ? null : (
        <Row style={{ flexWrap: 'nowrap', marginTop: 20 }}>
          <Col style={{ wordBreak: 'keep-all' }}>
            <span>相关文章：</span>
          </Col>
          <Col>
            {project.articles.map((article, index) => (
              <a
                key={`article${index}`}
                style={{ fontSize: 12, marginRight: 10 }}
                onClick={() => {
                  window.open(article.link);
                }}
              >
                {article.name}
              </a>
            ))}
          </Col>
        </Row>
      )}

      <div style={{ position: 'absolute', right: 20, bottom: 10, textAlign: 'center' }}>
        <p style={{ fontSize: 12, margin: 0 }}>项目创建于: {project.creat_at}</p>
        {project.estimateTimeConsumption ? (
          <p style={{ fontSize: 10, margin: 0, color: '#999' }}>
            已开发时长：{project.estimateTimeConsumption} (预估值)
          </p>
        ) : null}
      </div>
    </Card>
  );
};
