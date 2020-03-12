
import { APPClient } from './client';
import { LoginIn } from './queries/user';

export interface LoginParamsType {
  email: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return APPClient.mutate({ mutation: LoginIn, variables: { input: params }, errorPolicy: 'ignore' });
}

