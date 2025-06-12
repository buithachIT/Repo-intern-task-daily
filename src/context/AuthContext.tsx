'use client';

import { createContext, useContext, useState, useEffect, ReactNode, CSSProperties } from 'react';
import { STORAGE_KEY } from '@/config/storageKeys';
import { fetchUserAction } from '@/lib/action/user';
import { ClipLoader } from "react-spinners";
import { logoutAPI } from '@/lib/action/auth';

type User = { id: string; email: string; firstName?: string; exp?: number; iat?: number };

type AuthContextType = {
  user: User | null;
  updateUser: (user: User, accessToken: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // fetchUser 

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.TOKEN);
    if (token) {
      setIsLoading(true);
      const loadUser = async () => {
        try {
          const { user: u } = await fetchUserAction();
          setUser(u);
          localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(u));
        } catch (err) {
          console.error('Fetch user failed', err);
        } finally {
          setIsLoading(false);
        }
      };
      loadUser();
    }
  }, []);

  const updateUser = (u: User, accessToken: string) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY.TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEY.USER, JSON.stringify(u));
  };

  const logout = () => {
    logoutAPI();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY.TOKEN);
    localStorage.removeItem(STORAGE_KEY.USER);
  };

  return (
    <> {
      isLoading === false ?
        <AuthContext.Provider value={{ user, isLoading, updateUser, logout }}>
          {children}
        </AuthContext.Provider >
        :
        <ClipLoader
          loading={isLoading}
          size={30}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    }
    </>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};