export type PostType = {
    id: string;
    title: string;
    content: string;
    userId: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    };
    _count: {
        reviews: number;
    };
};

export type PostResponse = {
    success: true;
    data: {
        posts: PostType[]
    }
}
export type ReviewType = {
    id: string;
    content: string;
    rating: number;
    postId: string;
    createdAt: string;
    userId: string;
    user: {
        firstName: string;
        lastName: string;
    }
}
export type ReviewResponse = {
    success: true;
    data: {
        reviews: ReviewType[];
    }
}