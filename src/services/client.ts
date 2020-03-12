import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { clientErrorHanlder } from './errorhandler';

export const APPClient = new ApolloClient({
  uri: '/admin/api/query',
  credentials: 'same-origin',
  cache: new InMemoryCache(),
  onError: clientErrorHanlder,
});
