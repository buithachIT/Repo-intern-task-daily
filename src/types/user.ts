import { Role, User } from '@/generated/prisma/client';

export type SafeUser = Omit<User, 'password'>;
export type RoleUser = Role;