export default function BlogDetailSkeleton() {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4 animate-pulse space-y-6">
            <div className="h-4 w-32 bg-gray-300 rounded" />
            <div className="h-8 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-px bg-gray-200 my-6" />

            <div className="space-y-3">
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-5/6 bg-gray-300 rounded" />
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
            </div>

            <div className="h-px bg-gray-200 my-8" />
        </div>
    );
}
