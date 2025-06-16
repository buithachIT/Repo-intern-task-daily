'use client'
import { useMemo, useState } from "react";
import PropertyCard, { fakeProperties } from "../propertyCard";
import DefaultPagination, { } from "@/components/pagination-with-links";
const PAGE_SIZE = 6;

const FeatureRoomRentalList = () => {
    const [page, setPage] = useState(1);
    const onPageChange = (page: number) => {
        setPage(page);
    };
    const totalPage = useMemo(() => {
        return Math.ceil(fakeProperties.length / PAGE_SIZE);
    }, [])

    const currentPageRooms = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        const end = page * PAGE_SIZE;
        return fakeProperties.slice(start, end);
    }, [page])

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {currentPageRooms.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            <DefaultPagination
                pageSize={PAGE_SIZE}
                total={fakeProperties.length}
                onPaginationChange={onPageChange}
            />
        </div>
    )
}
export default FeatureRoomRentalList;