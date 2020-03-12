import { notification } from 'antd';
import { GraphQLError, ExecutionResult } from 'graphql';
import { ServerError, ServerParseError } from 'apollo-link-http-common';
import { Operation, NextLink } from 'apollo-link';

export interface ErrorResponse {
  // An array of errors from the GraphQL endpoint
  graphQLErrors?: ReadonlyArray<GraphQLError>;
  // any error during the link execution or server response
  networkError?: Error | ServerError | ServerParseError;
  response?: ExecutionResult;
  operation: Operation;
  forward: NextLink;
}

const isDEV = process.env.NODE_ENV === 'development';

export function clientErrorHanlder(errorResponse: ErrorResponse) {
  const { graphQLErrors, networkError } = errorResponse;

  if (networkError) {
    notification.error({
      message: '网络异常',
      description: networkError.message,
    });
  }

  if (graphQLErrors) {
    notification.error({
      message: '请求错误',
      description: graphQLErrors.map(error => error.message).join(','),
    });
  }

  if (isDEV) {
    if (networkError || graphQLErrors) {
      console.warn(errorResponse, 'errorResponse');
    }
  }
}
