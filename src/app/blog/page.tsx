import BlogListSkeleton from "@/components/skeleton/blogListSkeleton";
import BlogList from "@/features/blog/components/blogList";
import CreateFormPost from "@/features/blog/components/createPost/createPost";
import { Suspense } from "react";
const Blog = () => {
  return (
    <>
      <CreateFormPost />
      <Suspense fallback={<BlogListSkeleton />}> <BlogList /></Suspense>
    </>
  );
};
export default Blog;
