import { lusitana } from "@/config/fonts";
import { getAllPostAPI } from "@/lib/action/post";
import Link from "next/link";

export default async function BlogList() {
    const { data: { posts } } = await getAllPostAPI();
    return (
        <div className="mt-5 md:mx-40">
            <h1 className={`${lusitana.className} text-3xl font-bold text-center`}>Blog</h1>
            <div className="flex flex-col gap-4 mt-4">
                {posts?.map((post) => (
                    <div key={post.id} className="blog-card border p-4 rounded shadow">
                        <Link href={`blog/${post.id}`}>
                            <h3 className="title text-xl font-semibold">{post.title}</h3>
                        </Link>
                        <p className="content text-gray-600">{post.content}</p>
                        <p className="content text-gray-600">
                            Viết bởi: {post.user.firstName} {post.user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {post?._count?.reviews} đánh giá
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
