import { gql } from 'apollo-boost';
import { CurrentUser } from '@/models/user';

export interface QueryCurrentCustomerResult {
  me: CurrentUser;
}
export const QueryCurrentCustomer = gql`
  query Me {
    me {
      id
      email
      recommend_stylist {
        id
        nickname
        avatar_url
      }
    }
  }
`;

export const LoginIn = gql`
  mutation SignIn($input: SignInInput!) {
    SignIn(input: $input) {
      admin_user {
        id
        email
      }
    }
  }
`;
