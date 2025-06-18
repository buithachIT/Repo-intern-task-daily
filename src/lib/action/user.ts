import { apiPath } from '@/lib/api/utils';
import { SafeUser } from '@/types/user';

//API lấy user, kèm token tự động và retry khi 401
export async function fetchUserAction(): Promise<{
  user: SafeUser;
}> {
  let res = await fetch(apiPath('/api/users/fetchUser'), {
    method: 'GET',
    credentials: 'include',
  });

  if (res.status === 401) {
    await refreshTokenAction();
    res = await fetch(apiPath('/api/users/fetchUser'), {
      method: 'GET',
      credentials: 'include',
    });
  }

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || res.statusText);
  }

  return res.json();
}

export async function refreshTokenAction(): Promise<void> {
  const res = await fetch(apiPath('/api/auth/refresh'), {
    method: 'POST',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok || !data.accessToken) {
    throw new Error('Failed to refresh token');
  }
}
