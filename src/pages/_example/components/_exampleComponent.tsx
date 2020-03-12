/* eslint-disable */
import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { QueryExampleResult, MutateExampleInput } from '@/services/queries/_example';
import { mutateExample } from '@/services/_example';

// 11. 使用并标注复杂/多维护子业务组件
class EComponent extends React.Component {
  render() {
    return <div></div>;
  }
}

// 8. 完善业务组件输入类型
export interface ExampleComponentNameProps {
  example: QueryExampleResult;
}

// 2. 创建业务组件
// 2.1 使用通用组件 https://ant.design/components
// 2.2 使用项目通用组件 '@/components'
export class ExampleComponentName extends React.Component<ExampleComponentNameProps, any> {
  handleClick = () => {
    // 10. 完成交互逻辑处理
    // 10.1 请标注 MutateExampleInput 以方便追踪
    const inuput: MutateExampleInput = {
      id: '1',
    };
    mutateExample(inuput).then(() => {
      // dosomething
    });
  };

  render() {
    const { example } = this.props;
    // 9. (备选) 处理负责数据 -> ui 映射
    // 9.1 复杂|复用 请抽象到 @utils/ui 中

    return (
      <div onClick={this.handleClick}>
        {example.example.id}
        <EComponent />
      </div>
    );
  }
}

// 7. 使用仓库数据
const ConnectedExampleComponentName: React.FC<any> = connect((state: ConnectState) => {
  return {
    example: state.example.data,
  };
})(props => <ExampleComponentName {...props} />);
export default ConnectedExampleComponentName;
