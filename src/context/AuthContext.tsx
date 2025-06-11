'use client';

import { apiPath } from '@/lib/api/utils';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StorageKeys } from '@/config/storageKeys';

type User = {
  id: string;
  email: string;
  firstName?: string;
  exp?: number;
  iat?: number;
};

type AuthContextType = {
  user: User | null;
  updateUser: (user: User, accessToken: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refreshAccessToken = async () => {
    try {
      const res = await fetch(apiPath('/api/auth/refresh'), {
        method: 'POST',
        credentials: 'include', // gửi cookie với request
      });

      const data = await res.json();

      if (res.ok && data.accessToken) {
        localStorage.setItem(StorageKeys.TOKEN, data.accessToken);
        return data.accessToken;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem(StorageKeys.TOKEN);
      if (!token) {
        console.log('No token found in localStorage');
        return;
      }

      try {
        console.log('Fetching user with token:', token);
        let res = await fetch(apiPath('/api/users/fetchUser'), {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        //  token hết hạn, refresh
        if (res.status === 401) {
          const newToken = await refreshAccessToken();
          if (!newToken) return;

          res = await fetch(apiPath('/api/users/fetchUser'), {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
            credentials: 'include',
          });
        }

        const data = await res.json();
        console.log('API Response:', data);

        if (res.ok && data.user) {
          const userData: User = {
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.firstName,
            exp: data.user.exp,
            iat: data.user.iat,
          };
          setUser(userData);
          localStorage.setItem(StorageKeys.USER, JSON.stringify(userData));
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        logout();
      }
    };

    fetchUser();
  }, []);

  const updateUser = (user: User, accessToken: string) => {
    console.log('Logging in user:', user);
    setUser(user);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
    localStorage.setItem(StorageKeys.TOKEN, accessToken);
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem(StorageKeys.USER);
    localStorage.removeItem(StorageKeys.TOKEN);
    fetch(apiPath('/api/auth/logout'), {
      method: 'POST',
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
