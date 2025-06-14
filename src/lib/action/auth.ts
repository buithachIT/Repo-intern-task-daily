import { SigninFormValues } from '@/features/auth/components/SigninForm/SigninSchema';
import { SignupFormValues } from '@/features/auth/components/SignupForm/SignupSchema';
import { handleFetch } from '@/helper/api';

export type SignUpResponse = {
  success: true;
  data: {
    user: { id: string; firstName: string; lastName: string; email: string };
  };
};

export type SignInResponse = {
  success: true;
  data: {
    user: { id: string; firstName: string; email: string };
    accessToken: string;
  };
};
export type FetchUser = {
  user: {
    id: string; firstName: string; email: string
  }
}
export const signUpAPI = (user: SignupFormValues) =>
  handleFetch<SignUpResponse>('/api/users/signup/', user);

export const signInAPI = (user: SigninFormValues) =>
  handleFetch<SignInResponse>('/api/users/signin/', user);
export const logoutAPI = () => handleFetch<SignInResponse>('/api/auth/logout/', undefined, "POST");