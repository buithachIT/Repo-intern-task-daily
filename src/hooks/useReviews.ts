import useSWR from 'swr';
import { getReviewByPost } from '@/lib/action/post';
import { ReviewType, ReviewResponse } from '@/types/post';

export function useReviews(postId: string) {
  const { data, error, isLoading, mutate } = useSWR<ReviewResponse>(
    postId ? `/api/post/${postId}/reviews` : null,
    () => getReviewByPost(postId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30 giây
    }
  );

  return {
    reviews: data?.data?.reviews || [],
    isLoading,
    error,
    mutate,
  };
}
