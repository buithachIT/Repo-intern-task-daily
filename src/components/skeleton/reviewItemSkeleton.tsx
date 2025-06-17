export default function ReviewItemSkeleton() {
    return (
        <div className="bg-muted/50 p-4 rounded-md shadow-sm animate-pulse space-y-2">
            <div className="flex justify-between items-center mb-1">
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gray-300 rounded-sm" />
                    ))}
                </div>
            </div>
            <div className="h-3 w-full bg-gray-300 rounded" />
            <div className="h-3 w-4/5 bg-gray-300 rounded" />
        </div>
    );
}