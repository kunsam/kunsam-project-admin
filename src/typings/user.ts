export interface GraphAdminUser {
  id: string | number;
  name: string;
  email?: string;
}

export interface GraphCustomer {
  nickname: String;
  id: string | number;
  avatar_url: string;
}
