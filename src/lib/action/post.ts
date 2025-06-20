import { PostResponse, ReviewResponse } from '@/types/post';
import { handleFetch } from "@/helper/api";
import { createPostFormValues } from '@/features/blog/components/createPost/createPostForm/createPostFormSchema';

export const getAllPostAPI = () => {
    return handleFetch<PostResponse>('/api/post/');
}
export const getReviewByPost = (id: string) => {
    return handleFetch<ReviewResponse>(`api/post/${id}/reviews/`);
}
export const createPostAPI = (post: createPostFormValues) => {
    return handleFetch<PostResponse>('api/post/', post, 'POST')
}
export const createReviewByPost = (id: string, data: { content: string, rating: number }) => {
    return handleFetch(`/api/post/${id}/reviews`, data);
}