'use client';

import clsx from 'clsx';
import { ReactNode, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type PaginationProps = {
    total: number;
    pageSize: number;
    onPaginationChange: (page: number) => void;
};
function DefaultPagination({
    pageSize,
    total,
    onPaginationChange,
}: PaginationProps) {
    const [page, setPage] = useState(1);
    const totalPages = useMemo(() => {
        return Math.ceil(total / pageSize);
    }, [total, pageSize]);

    const onPageChange = (page: number) => {
        if (page < 1 || page > totalPages) {
            return;
        }
        setPage(page);
        onPaginationChange(page);
    };

    const renderPages = () => {
        const items: ReactNode[] = [];

        for (let i = 1; i <= totalPages; i++) {
            const isActive = page === i;

            items.push(
                <Button
                    key={i}
                    variant="ghost"
                    onClick={() => onPageChange(i)}
                    className={cn(
                        'w-10 h-10 rounded-full border text-sm transition-colors',
                        isActive
                            ? 'bg-muted text-muted-foreground border-muted-foreground/30'
                            : 'border-primary text-primary hover:bg-primary/10'
                    )}
                >
                    {i}
                </Button>
            );
        }

        return items;
    };

    return (
        <div className="flex gap-2 items-center">
            <Button
                variant={'secondary'}
                className={clsx('pagination-item rotate-180', { disabled: page === 1 })}
                size={'icon'}
                onClick={() => onPageChange(page - 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </Button>
            {renderPages()}
            <Button
                variant={'secondary'}
                className={clsx('pagination-item', { disabled: page === totalPages })}
                size={'icon'}
                onClick={() => onPageChange(page + 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </Button>
        </div>
    );
}

export default DefaultPagination;
