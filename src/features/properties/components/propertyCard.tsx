import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import clsx from "clsx";
type Property = {
    id: string;
    thumbnail: string;
    monthlyRent: number;
    city: string;
    amenities: string[];
};

export const fakeProperties = [
    {
        id: '1',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 1200,
        city: 'Toronto',
        amenities: ['WIFI', 'KITCHEN', 'PARKING'],
    },
    {
        id: '2',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 950,
        city: 'Vancouver',
        amenities: ['WIFI', 'HEATER', 'PARKING'],
    },
    {
        id: '3',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 1100,
        city: 'Montreal',
        amenities: ['KITCHEN', 'WIFI'],
    },
    {
        id: '4',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 1350,
        city: 'Calgary',
        amenities: ['PARKING', 'WIFI', 'GYM'],
    },
    {
        id: '5',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 1250,
        city: 'Ottawa',
        amenities: ['KITCHEN', 'WIFI', 'BALCONY'],
    },
    {
        id: '6',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 990,
        city: 'Edmonton',
        amenities: ['WIFI', 'KITCHEN', 'LAUNDRY'],
    },
    {
        id: '7',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 1080,
        city: 'Quebec',
        amenities: ['WIFI', 'HEATER', 'PARKING'],
    },
    {
        id: '8',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 980,
        city: 'Winnipeg',
        amenities: ['WIFI', 'GYM'],
    },
    {
        id: '9',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 1190,
        city: 'Halifax',
        amenities: ['WIFI', 'KITCHEN', 'PARKING'],
    },
    {
        id: '10',
        thumbnail: '/assets/images/p1.webp',
        monthlyRent: 1050,
        city: 'Hamilton',
        amenities: ['WIFI', 'HEATER'],
    },
];

type Props = {
    property: Property
};

const Amenity_labels: Record<string, string> = {
    WIFI: 'Wi-Fi',
    KITCHEN: 'Bếp',
    PARKING: 'Chỗ đậu xe',
};

const PropertyCard: FC<Props> = ({ property }) => {
    const { id, thumbnail, monthlyRent, city, amenities } = property;
    const tags = ['new listing', 'video'];
    const top3Amenities = amenities.slice(0, 3);
    return (
        <div className="p-4 rounded-lg shadow hover:shadow-lg bg-white max-w-sm">
            <div className="relative h-[200px] w-full rounded-md overflow-hidden">
                <Image
                    src={thumbnail}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                />
                <ul className="flex [&>li]:uppercase [&>li]:font-semibold text-[10px] text-white gap-1 p-1 absolute top-1 left-1">
                    {tags?.map((tag, index) => (
                        <li
                            key={tag}
                            className={clsx('rounded-2xl bg-[#0d9b23] py-1 px-2', {
                                '!bg-[#95910b]': index,
                            })}
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
            <h3 className="text-lg font-semibold mt-3">
                <Link href={`/homestay/${id}`}>CAD {monthlyRent}/month</Link>
            </h3>
            <ul className="flex gap-2 text-sm text-gray-600 mt-1">
                {top3Amenities.map((a) => (
                    <li key={a}>{Amenity_labels[a]}</li>
                ))}
            </ul>
            <p className="text-gray-700 mt-1">{city}</p>
        </div>
    )
}
export default PropertyCard;
