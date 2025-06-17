import { SigninFormValues } from '@/features/auth/components/SigninForm/SigninSchema';
import { SignupFormValues } from '@/features/auth/components/SignupForm/SignupSchema';
import { handleFetch } from '@/helper/api';
import { SignInResponse, SignUpResponse } from '@/types/auth';

export const signUpAPI = (user: SignupFormValues) =>
  handleFetch<SignUpResponse>('/api/users/signup/', user);

export const signInAPI = (user: SigninFormValues) =>
  handleFetch<SignInResponse>('/api/users/signin/', user);

export const logoutAPI = () => handleFetch<SignInResponse>('/api/auth/logout/', undefined, "POST");