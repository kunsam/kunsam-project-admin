import { APPClient } from './client';
import { QueryCurrentCustomer, QueryCurrentCustomerResult } from './queries/user';
import { ApolloQueryResult } from 'apollo-boost';

export async function queryCurrent(): Promise<ApolloQueryResult<QueryCurrentCustomerResult>> {
  return APPClient.query({
    errorPolicy: 'ignore',
    fetchPolicy: 'no-cache',
    query: QueryCurrentCustomer,
  });
}
