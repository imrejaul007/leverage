'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { RootState, AppDispatch } from '@/store';
import { loginSuccess, logout, setUser, setTokens } from '@/store/slices/authSlice';
import { authApi } from '@/lib/api-client';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

  // Hydrate auth state from localStorage on mount
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');

    if (accessToken && refreshToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch(setUser(user));
        dispatch(setTokens({ accessToken, refreshToken }));
      } catch {
        // Invalid stored data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(loginSuccess({ user, tokens: { accessToken, refreshToken } }));
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  }, [dispatch]);

  const signup = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string; role?: string }) => {
    try {
      const response = await authApi.signup(data);
      const { user, accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(loginSuccess({ user, tokens: { accessToken, refreshToken } }));
      return { success: true };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed';
      return { success: false, error: message };
    }
  }, [dispatch]);

  const logoutUser = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch {
      // Ignore logout API errors
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      dispatch(logout());
      router.push('/login');
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout: logoutUser,
  };
}

// Get user initials for avatar
export function getUserInitials(user: { firstName?: string; lastName?: string; email?: string } | null): string {
  if (!user) return '??';
  const first = user.firstName?.[0] || '';
  const last = user.lastName?.[0] || '';
  return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || '??';
}
