import { apiPath } from '@/lib/api/utils';
import { STORAGE_KEY } from '@/config/storageKeys';

//API lấy user, kèm token tự động và retry khi 401
export async function fetchUserAction(): Promise<{
    user: { id: string; email: string; firstName?: string; exp?: number; iat?: number };
}> {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);

    if (!token) { }
    let res = await fetch(apiPath('/api/users/fetchUser'), {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
    });

    if (res.status === 401) {
        const newToken = await refreshTokenAction();
        localStorage.setItem(STORAGE_KEY.TOKEN, newToken);
        res = await fetch(apiPath('/api/users/fetchUser'), {
            method: 'GET',
            headers: { Authorization: `Bearer ${newToken}` },
            credentials: 'include',
        });
    }

    if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || res.statusText);
    }

    return res.json();
}

// Action refresh token
export async function refreshTokenAction(): Promise<string> {
    const res = await fetch(apiPath('/api/auth/refresh'), {
        method: 'POST',
        credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok || !data.accessToken) {
        throw new Error('Failed to refresh token');
    }
    return data.accessToken as string;
}
