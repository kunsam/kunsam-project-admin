import React from 'react';
import { Tag, Row, Typography } from 'antd';
import { chunk } from 'lodash';

export const CommonTagsCard: React.FC<{
  icon: any;
  title: string;
  tagsColumn?: number;
  comboMarginBottom?: number;
  style?: React.CSSProperties;
  tagsCombo: { tags: string[]; label: string }[];
}> = ({ icon, style, title, tagsCombo, tagsColumn, comboMarginBottom }) => {
  return (
    <div style={style}>
      <Row style={{ marginBottom: 15 }}>
        <img alt={title} src={icon} style={{ width: 24, height: 24 }} />
        <Typography.Text style={{ fontSize: 14, color: 'rgba(56, 56, 56, 1)', marginLeft: 12 }}>
          {title}
        </Typography.Text>
      </Row>
      <CommonLabelTagsBlock1
        tagsColumn={tagsColumn}
        tagsCombo={tagsCombo}
        comboMarginBottom={comboMarginBottom}
      />
    </div>
  );
};

// 常用标签组配置
export const CommonLabelTagsBlock1: React.FC<{
  tagsColumn?: number;
  comboMarginBottom?: number;
  tagsCombo: { tags: string[]; label: string }[];
}> = ({ tagsCombo, tagsColumn, comboMarginBottom }) => {
  return (
    <div>
      {tagsCombo.map((combo, comboIndex) => (
        <div style={{ marginBottom: comboMarginBottom || 24 }} key={`combo${comboIndex}`}>
          <LabelTagsBlock
            tags={combo.tags}
            label={combo.label}
            tagsColumn={tagsColumn}
            chunkedRowGutter={6}
            labelStyle={{
              marginRight: 14,
            }}
            tagStyle={{
              padding: '0px 8px',
              height: 20,
              fontSize: 12,
              marginRight: 7,
              borderRadius: 2,
              lineHeight: '20px',
              textAlign: 'center',
              color: 'rgba(56, 56, 56, 1)',
              backgroundColor: 'rgba(229, 229, 229, 1)',
            }}
          />
        </div>
      ))}
    </div>
  );
};

const LabelTagsBlock: React.FC<{
  label: string;
  tags: string[];
  tagsColumn?: number;
  labelStyle?: React.CSSProperties;
  tagStyle?: React.CSSProperties;
  chunkedRowGutter?: number;
  checkedable?: boolean;
}> = ({
  label,
  tags,
  tagsColumn,
  labelStyle = {},
  tagStyle,
  checkedable,
  chunkedRowGutter = 6,
}) => {
  let chunkedTags: string[][] = [];
  if (tagsColumn) {
    chunkedTags = chunk<string>(tags, tagsColumn);
  }
  return (
    <Row>
      <span style={labelStyle}>{label}</span>
      <div>
        {chunkedTags.length === 0
          ? tags.map(tag => (
              <Tag.CheckableTag key={tag} checked>
                {tag}
              </Tag.CheckableTag>
            ))
          : chunkedTags.map((rowTags, rowIndex) => (
              <Row
                key={`rowIndex${rowIndex}`}
                style={{
                  marginBottom: rowIndex !== chunkedTags.length - 1 ? chunkedRowGutter : 0,
                }}
              >
                {rowTags.map(tag =>
                  checkedable ? (
                    <Tag.CheckableTag key={tag} checked style={tagStyle}>
                      {tag}
                    </Tag.CheckableTag>
                  ) : (
                    <span style={tagStyle}>{tag}</span>
                  ),
                )}
              </Row>
            ))}
      </div>
    </Row>
  );
};

export default LabelTagsBlock;
