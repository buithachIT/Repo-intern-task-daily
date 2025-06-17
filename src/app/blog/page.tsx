import BlogDetailSkeleton from "@/components/skeleton/blogDetailSkeleton";
import BlogListSkeleton from "@/components/skeleton/blogListSkeleton";
import BlogList from "@/features/blog/components/blogList";
import { Suspense } from "react";
const Blog = () => {
  return (
    <Suspense fallback={<BlogListSkeleton />}> <BlogList /></Suspense>

  );
};
export default Blog;
