'use client'
import { asyncHandlerWrapper } from "@/helper/api";
import ReviewItem from "./reviewItem";
import { ReviewWithUser } from "@/types/post";
import { toast } from "react-toastify";
import CreateReview from "./createReviewForm/createReview";
import { useReviews } from "@/hooks/useReviews";
import ReviewItemSkeleton from "@/components/skeleton/reviewItemSkeleton";
import { createReviewByPost } from "@/lib/action/post";

export default function ReviewList({ slug }: { slug: string }) {
    const { reviews, isLoading, error, mutate } = useReviews(slug);

    if (isLoading) return <div><ReviewItemSkeleton /></div>;
    if (error || !reviews || !Array.isArray(reviews)) {
        return <p className="text-sm italic text-gray-400">Không thể tải đánh giá.</p>;
    }
    const handleReviewSubmit = async (content: string, rating: number) => {
        const optimisticReview: ReviewWithUser = {
            id: 'temp',
            content,
            rating,
            postId: slug,
            createdAt: new Date(),
            userId: 'temp',
            user: { firstName: 'You', lastName: '', id: '' }
        };

        mutate(
            { success: true, data: { reviews: [...reviews, optimisticReview] } },
            false
        );
        await asyncHandlerWrapper(
            async () => {
                await createReviewByPost(slug, { content, rating })
                toast.success("Gửi đánh giá thành công!");
                mutate();
            },
            (error) => {
                toast.error("Vui lòng thử lại sau!")
            }
        )
    };

    return (
        <div className="space-y-4">
            <CreateReview postId={slug} onSubmit={handleReviewSubmit} />
            {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </div>
    );
}
