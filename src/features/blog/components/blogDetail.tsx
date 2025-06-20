import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { getAllPostAPI } from "@/lib/action/post";

export default async function BlogDetail({ slug }: { slug: string }) {
    const { data: { posts } } = await getAllPostAPI();
    const post = posts.find(p => p.id === slug);

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <Link href='/blog'>
                <button className="text-sm text-muted-foreground hover:underline mb-6">
                    ← Back to blog
                </button>
            </Link>

            <h1 className="text-3xl font-bold text-primary">{post?.title}</h1>
            <p className="text-sm text-gray-500 mt-2">
                Ngày đăng: {new Date().toLocaleDateString()} · Tác giả: {post?.user.firstName}
            </p>

            <Separator className="my-6" />

            <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p>{post?.content}</p>
                <p>Nội dung tiếp theo đang được cập nhật...</p>
            </div>
            <Separator className="my-8" />
        </div>
    );
}