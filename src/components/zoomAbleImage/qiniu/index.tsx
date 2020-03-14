import React, { Component } from 'react';
import { Modal, Spin } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

export interface ZoomAbleQiNiuImageProps {
  width: number;
  title?: string;
  height: number;
  disable?: boolean;
  zoomWidth?: number;
  originSrc?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  disableZoomedRatio?: boolean;
  onClick?: () => void;
}

export class ZoomAbleQiNiuImage extends Component<
  ZoomAbleQiNiuImageProps,
  { qnUrl: string; loading: boolean; zoomSize?: { width: number; height: number } }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      qnUrl: '',
      loading: false,
    };
  }

  handleClickImage = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    const { originSrc, width, height, zoomWidth, disable } = this.props;
    if (disable || !zoomWidth) {
      return;
    }
    const ratio = width / height;
    const zoomHeight = zoomWidth / ratio;
    let zoomSize = { width: zoomWidth, height: zoomHeight };
    let qnUrl: string = `${originSrc}?imageMogr2/thumbnail/!${zoomWidth * 2}x${zoomHeight *
      2}r/interlace/1/quality/100/ignore-error/1`;

    const validWidth = document.body.clientWidth - 200;
    const validHeight = document.body.clientHeight - 250;
    if (zoomHeight < validHeight && zoomWidth > validWidth) {
      const newZoomWidth = validWidth;
      const newZoomHeight = Math.floor(validWidth / ratio);
      zoomSize = { width: newZoomWidth, height: newZoomHeight };
      qnUrl = `${originSrc}?imageMogr2/thumbnail/!${newZoomWidth * 2}x${newZoomHeight *
        2}r/interlace/1/quality/100/ignore-error`;
    }
    if (zoomWidth < validWidth && zoomHeight > validHeight) {
      const newZoomHeight = validHeight;
      const newZoomWidth = Math.floor(validHeight * ratio);
      zoomSize = { width: newZoomWidth, height: newZoomHeight };
      qnUrl = `${originSrc}?imageMogr2/thumbnail/!${newZoomWidth * 2}x${newZoomHeight *
        2}r/interlace/1/quality/100/ignore-error/1`;
    }
    this.setState({ qnUrl, loading: true, zoomSize });
  };

  render() {
    const {
      width,
      style,
      title,
      height,
      originSrc,
      backgroundColor,
      placeholderStyle = {},
      disableZoomedRatio,
    } = this.props;
    if (!originSrc) {
      return (
        <div
          style={{
            width,
            height,
            padding: 0,
            textAlign: 'center',
            backgroundColor: '#ccc',
            ...placeholderStyle,
          }}
        >
          <FileImageOutlined style={{ marginTop: '50%' }} />
        </div>
      );
    }
    const { loading, qnUrl, zoomSize } = this.state;
    return (
      <>
        {qnUrl && zoomSize ? (
          <Modal
            visible
            title={title}
            footer={null}
            closable={false}
            bodyStyle={{
              backgroundColor: backgroundColor || 'transparent',
              textAlign: 'center',
            }}
            onCancel={() => {
              this.setState({ qnUrl: '' });
            }}
          >
            {loading ? (
              <Spin
                style={{ position: 'absolute', width: 80, height: 80, top: '50%', left: '50%' }}
              />
            ) : null}
            <img
              alt=""
              src={qnUrl}
              style={{
                width: zoomSize.width,
                height: disableZoomedRatio ? undefined : zoomSize.height,
              }}
              onLoad={() => {
                this.setState({ loading: false });
              }}
            />
          </Modal>
        ) : null}
        <img
          alt=""
          style={{
            cursor: 'pointer',
            width,
            height,
            backgroundColor: backgroundColor || 'transparent',
            ...style,
          }}
          onClick={this.handleClickImage}
          src={`${originSrc}?imageMogr2/thumbnail/!${width * 2}x${height *
            2}r/interlace/1/quality/90/ignore-error/1`}
        />
      </>
    );
  }
}
