export type SignUpResponse = {
    success: true;
    data: {
        user: { id: string; firstName: string; lastName: string; email: string };
    };
};

export type SignInResponse = {
    success: true;
    data: {
        user: { id: string; firstName: string; email: string };
        accessToken: string;
    };
};
export type FetchUser = {
    user: {
        id: string; firstName: string; email: string
    }
}