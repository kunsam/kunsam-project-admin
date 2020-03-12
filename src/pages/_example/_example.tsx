/* eslint-disable */
import React, { Component } from 'react';

export interface ExampleProps {
  location: {
    pathname: string;
    query: {
      [key: string]: string;
    };
  };
}

// 1. 创建页面容器框架
export class Example extends Component<ExampleProps, {}> {
  render() {
    return <div></div>;
  }
}

export const ExampleFunc: React.FC<ExampleProps> = () => {
  return <div></div>;
};
