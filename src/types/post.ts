import { Post, User, Review } from '@/generated/prisma/client';

export type PostWithUser = Post & {
  user: Pick<User, 'firstName' | 'lastName' | 'email'>;
  _count: {
    reviews: number;
  };
};

export type PostResponse = {
  success: true;
  data: {
    posts: PostWithUser[];
  };
};
export type ReviewWithUser = Review & {
  user: Pick<User, 'firstName' | 'lastName' | 'id'>;
};

export type ReviewResponse = {
  success: true;
  data: {
    reviews: ReviewWithUser[];
  };
};
