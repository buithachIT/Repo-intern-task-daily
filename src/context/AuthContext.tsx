'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchUserAction } from '@/lib/action/user';
import { logoutAPI } from '@/lib/action/auth';
import { toast } from 'react-toastify';
import { SafeUser } from '@/types/user';
import { unknown } from 'zod';

type AuthContextType = {
  user: SafeUser | null;
  updateUser: (user: SafeUser) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // fetchUser 
  const updateUser = (u: SafeUser) => {
    setUser(u);
  };

  useEffect(() => {

    setIsLoading(true);
    const loadUser = async () => {
      try {
        const { user: u } = await fetchUserAction();
        setUser(u);
      } catch (err) {
        toast.info('Login to explore more!');
      } finally {
        setIsLoading(false);
      }
    }; loadUser();
  }, []);

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (err) {
      toast.error("Unknown error")
    } finally {
      setUser(null);
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ user, isLoading, updateUser, logout }}>
        {children}
      </AuthContext.Provider >
    </>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
