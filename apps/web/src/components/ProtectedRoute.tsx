'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setUser, setTokens } from '@/store/slices/authSlice';

const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password', '/'];

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check localStorage for token if Redux is empty
    if (!isAuthenticated && !isLoading) {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch(setUser(user));
          dispatch(setTokens({ accessToken: token, refreshToken: localStorage.getItem('refreshToken') || '' }));
        } catch (e) {
          // Invalid user data, clear storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      }
    }
  }, [dispatch, isAuthenticated, isLoading]);

  useEffect(() => {
    if (!mounted) return;

    // Skip for public routes
    if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith('/(auth)'))) {
      return;
    }

    // If not authenticated and not loading, redirect to login
    if (!isAuthenticated && !isLoading) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, pathname, router, mounted]);

  // Show loading while checking auth
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render children if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
