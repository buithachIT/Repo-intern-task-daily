import BlogDetailSkeleton from "@/components/skeleton/blogDetailSkeleton";
import ReviewItemSkeleton from "@/components/skeleton/reviewItemSkeleton";
import BlogDetail from "@/features/blog/components/blogDetail";
import ReviewList from "@/features/blog/components/reviewList";
import { Suspense } from "react";

export async function generateStaticParams() {
  return [{ slug: 'post-1' }, { slug: 'post-2' }];
}
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="md:mx-40">
      <Suspense fallback={<BlogDetailSkeleton />}>
        <BlogDetail slug={slug} />
      </Suspense>

      <h2 className="text-xl font-semibold mb-4">Đánh giá người đọc</h2>
      <Suspense fallback={<ReviewItemSkeleton />}>
        <ReviewList slug={slug} />
      </Suspense>
    </div>);
};