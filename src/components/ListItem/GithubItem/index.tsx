import React from 'react';
import { router } from 'umi';
import { Card, Row, Tag, Col } from 'antd';
import { GithubItem } from '@/data/githubs';
import { GithubOutlined } from '@ant-design/icons';
import { ZoomAbleQiNiuImage } from '@/components/zoomAbleImage/qiniu';

export const GithubListItem: React.FC<{ item: GithubItem; location: any }> = ({
  item,
  location,
}) => {
  return (
    <Card className="hover-shadow" style={{ marginBottom: 10, width: '90%', paddingBottom: 20 }}>
      <Row justify="end" style={{ position: 'absolute', right: 20, top: 10, height: 100 }}>
        {!item.github ? null : (
          <GithubOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              window.open(item.github);
            }}
          />
        )}
      </Row>

      <p style={{ fontSize: 16, fontWeight: 600 }}>
        <span>名称：</span>
        {item.name}
      </p>
      <p>
        <span>描述：</span>
        {item.desc}
      </p>

      {!item.website ? null : (
        <Row style={{ marginBottom: '1em' }}>
          <span>网址：</span>
          <a
            style={{ textDecoration: 'underline' }}
            onClick={() => {
              window.open(item.website);
            }}
          >
            {item.website}
          </a>
        </Row>
      )}

      {item.tags && item.tags.length ? (
        <Row style={{ flexWrap: 'nowrap' }}>
          <Col style={{ wordBreak: 'keep-all' }}>
            <span>标签：</span>
          </Col>

          <Col>
            {item.tags
              .sort((a, b) => a.length - b.length)
              .map(tag => {
                return (
                  <Tag
                    color="geekblue"
                    style={{ cursor: 'pointer', marginBottom: 10 }}
                    onClick={() => {
                      const { pathname, query = {} } = location;
                      router.push({
                        pathname,
                        query: {
                          ...query,
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

      {!item.photos ? null : (
        <Row style={{ marginTop: 20, border: '1px dashed #ccc', padding: 8 }}>
          {item.photos.map(photo => {
            return (
              <ZoomAbleQiNiuImage
                key={photo}
                width={100}
                height={100}
                originSrc={photo}
                zoomWidth={500}
              />
            );
          })}
        </Row>
      )}
    </Card>
  );
};
