'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { loginSuccess } from '@/store/slices/authSlice';
import { mockUser } from '@/lib/mock-data';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Check, Package } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      if (password.length >= 6) {
        const accessToken = `mock-token-${Date.now()}`;
        const refreshToken = `mock-refresh-${Date.now()}`;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(mockUser));

        dispatch(loginSuccess({
          user: mockUser,
          tokens: { accessToken, refreshToken }
        }));

        router.push('/dashboard');
      } else {
        setError('Password must be at least 6 characters');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('alex.morgan@leverage.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/">
              <Image src="/logo.png" alt="LEVERAGE" width={160} height={53} className="object-contain" />
            </Link>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#101111] mb-2">Welcome back</h1>
            <p className="text-[#5A5A5A]">Sign in to access your global trade dashboard</p>
          </div>

          {/* Demo Hint */}
          <div className="mb-6 p-4 bg-white border border-black/5 rounded-xl">
            <p className="text-[#5A5A5A] text-sm mb-2">Demo Mode - Enter any email & password (min 6 chars)</p>
            <button
              type="button"
              onClick={fillDemo}
              className="text-[#A6824A] text-sm font-medium hover:underline flex items-center gap-1"
            >
              <Check className="w-4 h-4" /> Fill demo credentials
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-4 bg-white border border-[#5D1E21]/20 rounded-xl">
              <p className="text-[#5D1E21] text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[#101111] text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#5A5A5A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full h-12 pl-12 pr-4 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#5A5A5A] focus:outline-none focus:border-[#A6824A] focus:ring-2 focus:ring-[#A6824A]/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#101111] text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#5A5A5A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 pl-12 pr-14 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#5A5A5A] focus:outline-none focus:border-[#A6824A] focus:ring-2 focus:ring-[#A6824A]/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A5A5A] hover:text-[#A6824A] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-black/10 bg-white" />
                <span className="text-[#5A5A5A] text-sm">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-[#A6824A] text-sm font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-black/5"></div>
            <span className="text-[#5A5A5A] text-sm">or</span>
            <div className="flex-1 h-px bg-black/5"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[#5A5A5A]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#A6824A] font-semibold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-white items-center justify-center p-12">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-[#101111] mb-4">
            Global Trade, Simplified
          </h2>
          <p className="text-[#5A5A5A] text-base mb-8">
            Connect with suppliers worldwide, manage orders, track shipments, and automate compliance — all in one platform.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#A6824A]/10 flex items-center justify-center mx-auto mb-3">
                <Package className="w-7 h-7 text-[#A6824A]" />
              </div>
              <p className="text-[#101111] font-bold text-xl">500+</p>
              <p className="text-[#5A5A5A] text-sm">Suppliers</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-[#154230]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#101111] font-bold text-xl">50+</p>
              <p className="text-[#5A5A5A] text-sm">Countries</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-[#154230]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#101111] font-bold text-xl">$10M+</p>
              <p className="text-[#5A5A5A] text-sm">Traded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
