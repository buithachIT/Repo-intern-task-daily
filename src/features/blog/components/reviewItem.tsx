import { ReviewWithUser } from "@/types/post";
import { Star } from "lucide-react";

type Props = {
    review: ReviewWithUser
};

export default function ReviewItem({ review }: Props) {
    return (
        <div className="bg-muted/50 p-4 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-1">
                <p className="font-medium">{review.user.firstName}</p>
                <div className="flex gap-1 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                    ))}
                </div>
            </div>
            <p className="text-sm text-gray-700">{review.content}</p>
        </div>
    );
}
