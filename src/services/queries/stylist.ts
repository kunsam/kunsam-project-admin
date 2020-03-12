import { gql } from 'apollo-boost';
import { GraphAdminUser } from '@/typings/user';

export interface QueryStylistsResult {
  data?: {
    stylists: GraphAdminUser[];
  };
}

export const QueryStylists = gql`
  query QueryStylists {
    stylists {
      id
      name
    }
  }
`;
