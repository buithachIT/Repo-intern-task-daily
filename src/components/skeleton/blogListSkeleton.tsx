export default function BlogListSkeleton() {
    return (
        <div className="mt-5 md:mx-40 space-y-4">
            <div className="h-8 w-1/3 bg-gray-300 rounded animate-pulse" />
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="border p-4 rounded shadow space-y-2 animate-pulse"
                >
                    <div className="h-6 w-3/4 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-1/2 bg-gray-100 rounded" />
                    <div className="h-4 w-1/4 bg-gray-100 rounded" />
                </div>
            ))}
        </div>
    );
}
