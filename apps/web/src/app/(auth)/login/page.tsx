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
    <div className="min-h-screen bg-[#081512] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="LEVERAGE" width={48} height={48} className="object-contain" />
              <div>
                <span className="text-[#C49A6C] text-2xl font-bold brand-font">LEVERAGE</span>
                <p className="text-[#D8CCBC] text-xs">Global Trade Platform</p>
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">Welcome back</h1>
            <p className="text-[#D8CCBC]">Sign in to access your global trade dashboard</p>
          </div>

          {/* Demo Hint */}
          <div className="mb-6 p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl">
            <p className="text-[#D8CCBC] text-sm mb-2">Demo Mode - Enter any email & password (min 6 chars)</p>
            <button
              type="button"
              onClick={fillDemo}
              className="text-[#C49A6C] text-sm font-medium hover:underline flex items-center gap-1"
            >
              <Check className="w-4 h-4" /> Fill demo credentials
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full h-14 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/50 focus:outline-none focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-14 pl-12 pr-14 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/50 focus:outline-none focus:border-[#C49A6C] focus:ring-2 focus:ring-[#C49A6C]/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D8CCBC]/50 hover:text-[#C49A6C] transition-colors"
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
                <input type="checkbox" className="w-4 h-4 rounded border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-[#C49A6C] focus:ring-[#C49A6C]" />
                <span className="text-[#D8CCBC] text-sm">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-[#C49A6C] text-sm font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#C49A6C] text-[#081512] font-bold rounded-xl hover:bg-[#D4AA82] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#081512] border-t-transparent"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]"></div>
            <span className="text-[#D8CCBC] text-sm">or</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.1)]"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[#D8CCBC]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#C49A6C] font-semibold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0E3B36] to-[#081512] items-center justify-center p-12">
        <div className="text-center max-w-md">
          <h2 className="text-4xl font-bold text-[#F4F1EA] mb-4 brand-font">
            Global Trade, Simplified
          </h2>
          <p className="text-[#D8CCBC] text-lg mb-8">
            Connect with suppliers worldwide, manage orders, track shipments, and automate compliance — all in one platform.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#C49A6C]/20 flex items-center justify-center mx-auto mb-3">
                <Package className="w-8 h-8 text-[#C49A6C]" />
              </div>
              <p className="text-[#F4F1EA] font-bold text-xl">500+</p>
              <p className="text-[#D8CCBC] text-sm">Suppliers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#F4F1EA] font-bold text-xl">50+</p>
              <p className="text-[#D8CCBC] text-sm">Countries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#F4F1EA] font-bold text-xl">$10M+</p>
              <p className="text-[#D8CCBC] text-sm">Traded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}