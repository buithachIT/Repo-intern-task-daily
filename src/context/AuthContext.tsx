'use client';

import { apiPath } from '@/lib/api/utils';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
    id: string;
    email: string;
    firstName?: string;
    exp?: number;
    iat?: number;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
    setIsAuthenticated: (v: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const refreshAccessToken = async () => {
        try {
            const res = await fetch(apiPath('/api/auth/refresh'), {
                method: 'POST',
                credentials: 'include', // gửi cookie với request
            });

            const data = await res.json();

            if (res.ok && data.accessToken) {
                localStorage.setItem('token', data.accessToken);
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
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found in localStorage');
                return;
            }

            try {
                console.log('Fetching user with token:', token);
                let res = await fetch(apiPath('/api/users/fetchUser'), {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include', //Send cookie with request
                });

                //  token hết hạn, refresh
                if (res.status === 401) {
                    const newToken = await refreshAccessToken();
                    if (!newToken) return;

                    res = await fetch(apiPath('/api/users/fetchUser'), {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${newToken}`,
                        },
                        credentials: 'include',
                    });
                }

                const data = await res.json();
                console.log('API Response:', data);

                if (res.ok && data.user) {
                    console.log('User data received successfully');
                    const userData: User = {
                        id: data.user.id,
                        email: data.user.email,
                        firstName: data.user.firstName,
                        exp: data.user.exp,
                        iat: data.user.iat
                    };
                    setUser(userData);
                    setIsAuthenticated(true);
                    localStorage.setItem('user', JSON.stringify(userData));
                } else {
                    console.log('Failed to fetch user data:', data);
                    setIsAuthenticated(false);
                    logout();
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setIsAuthenticated(false);
                logout();
            }
        };

        fetchUser();
    }, []);

    const login = (user: User, accessToken: string) => {
        console.log('Logging in user:', user);
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', accessToken);
    };

    const logout = () => {
        console.log('Logging out user');
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        fetch(apiPath('/api/auth/logout'), {
            method: 'POST',
            credentials: 'include',
        });
    };

    return (
        <AuthContext.Provider value={{ user, setIsAuthenticated, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}; 