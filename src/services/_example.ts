/* eslint-disable */
import { APPClient } from './client';
import { ApolloCurrentQueryResult, FetchResult } from 'apollo-boost';
import {
  QueryExampleResult,
  QueryExample,
  QueryExampleInput,
  MutateExample,
  MutateExampleResult,
  MutateExampleInput,
} from './queries/_example';

// 4. 完成 api 函数
export async function queryExample(
  input: QueryExampleInput,
): Promise<ApolloCurrentQueryResult<QueryExampleResult>> {
  return APPClient.query({ query: QueryExample, errorPolicy: 'ignore' });
}

export async function mutateExample(
  input: MutateExampleInput,
): Promise<FetchResult<MutateExampleResult>> {
  return APPClient.query({ query: MutateExample, errorPolicy: 'ignore' });
}
