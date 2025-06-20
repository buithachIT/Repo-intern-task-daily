import { User } from '@/generated/prisma/client';
export interface JwtPayload extends Pick<User, 'id' | 'email'> {
  firstName?: string;
  role?: string;
}
