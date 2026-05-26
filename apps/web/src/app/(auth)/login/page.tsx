'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@leverage/shared';
import toast from 'react-hot-toast';
import { api } from '@/lib/api-client';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [skipAuth] = useState(() => process.env.NODE_ENV === 'development');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const result = response.data;

      if (result.data) {
        const { user, accessToken, refreshToken } = result.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(`Welcome back, ${user.firstName}!`);
      } else {
        toast.success('Login successful!');
      }
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/demo');
      const result = response.data;

      if (result.data) {
        const { user, accessToken, refreshToken } = result.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Welcome to the demo!');
      } else {
        toast.success('Demo account created!');
      }
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Demo login failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipAuth = () => {
    // Bypass auth for development/demo
    const demoUser = {
      id: 'demo-user-001',
      email: 'demo@leverage.demo',
      firstName: 'Demo',
      lastName: 'User',
      role: 'BUYER',
    };
    localStorage.setItem('accessToken', 'demo-token');
    localStorage.setItem('refreshToken', 'demo-refresh-token');
    localStorage.setItem('user', JSON.stringify(demoUser));
    toast.success('Skipped to dashboard!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-white text-xl font-semibold">Leverage by Lerar</span>
          </Link>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 mb-6">Enter your credentials to access the platform</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                {...register('email')}
                className="input"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                {...register('password')}
                className="input"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700" />
                <span className="text-gray-400 text-sm">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-blue-400 text-sm hover:text-blue-300">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              Sign in
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-gray-400">or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 border border-slate-600"
            >
              Try Demo Account
            </button>
          </form>

          {/* Skip Auth Button - Development Only */}
          <button
            type="button"
            onClick={handleSkipAuth}
            className="w-full mt-4 py-2 text-gray-500 hover:text-gray-400 text-sm transition-colors border border-slate-700 rounded-lg"
          >
            Skip Authentication (Demo)
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
