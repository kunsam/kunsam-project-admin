import { gql } from 'apollo-boost';
import { GraphExample } from '@/typings/_example';

// 3.2 完成 结果 类型定义
export interface QueryExampleResult {
  example: GraphExample.Type;
}
// 3.3 完成 输入 类型定义
export interface QueryExampleInput {
  id: string;
}

// 3. 确定数据原料，完成graph片段 https://staging.letote.cn/admin/graphiql (在其中完成可进行语法检查)
// 3.1 命名规则尽量通用 Query{*} Mutate{*}
export const QueryExample = gql`
  query QueryExample($input: Input) {
    example {
      id
      name
    }
  }
`;

export interface MutateExampleResult {
  id: string;
}
export interface MutateExampleInput {
  id: string;
}
export const MutateExample = gql`
  mutation QueryExample($input: Input) {
    example {
      id
      name
    }
  }
`;
