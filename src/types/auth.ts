import { User } from '@/generated/prisma/client'
export type SignUpResponse = {
  success: true;
  data: {
    user: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
  };
};

export type SignInResponse = {
  success: true;
  data: {
    user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>;
    accessToken: string;
  };
};
export type FetchUser = {
  user: Pick<User, 'email' | 'firstName' | 'id' | 'lastName'>
};
