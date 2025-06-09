export const apiPath = (pathname: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${pathname}`;
};

export const internalApiPath = (pathname: string) => {
    return `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}${pathname}`;
};
