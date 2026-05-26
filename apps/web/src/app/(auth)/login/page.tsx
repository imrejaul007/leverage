'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@leverage/shared';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { api } from '@/lib/api-client';
import { AppDispatch } from '@/store';
import { setUser, setTokens, loginSuccess } from '@/store/slices/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'normal' | 'demo'>('normal');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoginMethod('normal');
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      const result = response.data;

      if (result.data) {
        const { user, accessToken, refreshToken } = result.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(loginSuccess({ user, tokens: { accessToken, refreshToken } }));
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
    setLoginMethod('demo');
    setIsLoading(true);
    try {
      const response = await api.post('/auth/demo');
      const result = response.data;

      if (result.data) {
        const { user, accessToken, refreshToken } = result.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(loginSuccess({ user, tokens: { accessToken, refreshToken } }));
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
    const demoUser = {
      id: 'demo-user-001',
      email: 'demo@leverage.demo',
      firstName: 'Demo',
      lastName: 'User',
      role: 'BUYER',
    };
    const token = 'demo-token';
    const refreshToken = 'demo-refresh-token';

    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(demoUser));
    dispatch(loginSuccess({ user: demoUser, tokens: { accessToken: token, refreshToken } }));

    toast.success('Skipped to dashboard!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#081512] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#C49A6C] flex items-center justify-center">
              <span className="text-[#081512] font-bold text-2xl brand-font">L</span>
            </div>
            <span className="text-[#C49A6C] text-3xl font-bold brand-font">LEVERAGE</span>
          </Link>
        </div>

        {/* Card */}
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-[#F4F1EA] mb-2">Welcome back</h1>
          <p className="text-[#D8CCBC]/60 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[#D8CCBC]/80 text-sm mb-2">Email address</label>
              <input
                type="email"
                {...register('email')}
                className="input w-full"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[#D8CCBC]/80 text-sm mb-2">Password</label>
              <input
                type="password"
                {...register('password')}
                className="input w-full"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] accent-[#C49A6C]" />
                <span className="text-[#D8CCBC]/60 text-sm">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-[#C49A6C] text-sm hover:text-[#D4AA82]">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[52px] bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-semibold transition-colors disabled:opacity-50 hover:bg-[#0f4a42]"
            >
              Sign in
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(255,255,255,0.05)]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[#081512] text-[#D8CCBC]/40 text-sm">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full h-[52px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#F4F1EA] rounded-xl font-semibold transition-colors disabled:opacity-50 hover:bg-[rgba(255,255,255,0.1)]"
          >
            Try Demo Account
          </button>

          {/* Skip Auth - subtle */}
          <button
            type="button"
            onClick={handleSkipAuth}
            className="w-full mt-4 py-2 text-[#D8CCBC]/30 hover:text-[#D8CCBC]/50 text-sm transition-colors"
          >
            Skip Authentication
          </button>

          <p className="mt-6 text-center text-[#D8CCBC]/60 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
