'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Check, Package, Globe, Shield, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
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
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <p className="text-[#4A4A4A]">Sign in to access your global trade dashboard</p>
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
                <Mail className="w-5 h-5 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full h-12 pl-12 pr-4 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] focus:ring-2 focus:ring-[#A6824A]/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#101111] text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 pl-12 pr-14 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] focus:ring-2 focus:ring-[#A6824A]/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4A4A4A] hover:text-[#A6824A] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-black/10 bg-white" />
                <span className="text-[#4A4A4A] text-sm">Remember me</span>
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
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-black/5"></div>
            <span className="text-[#4A4A4A] text-sm">or</span>
            <div className="flex-1 h-px bg-black/5"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[#4A4A4A]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#A6824A] font-semibold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#081512] via-[#0a1f18] to-[#081512] items-center justify-center p-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">
            Global Trade, Simplified
          </h2>
          <p className="text-[#4A4A4A] text-base mb-8">
            Connect with suppliers worldwide, manage orders, track shipments, and automate compliance — all in one platform.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#A6824A]/10 flex items-center justify-center mx-auto mb-3">
                <Package className="w-7 h-7 text-[#A6824A]" />
              </div>
              <p className="text-[#101111] font-bold text-xl">500+</p>
              <p className="text-[#4A4A4A] text-sm">Suppliers</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center mx-auto mb-3">
                <Globe className="w-7 h-7 text-[#154230]" />
              </div>
              <p className="text-[#101111] font-bold text-xl">50+</p>
              <p className="text-[#4A4A4A] text-sm">Countries</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#5D1E21]/10 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-[#5D1E21]" />
              </div>
              <p className="text-[#101111] font-bold text-xl">100%</p>
              <p className="text-[#4A4A4A] text-sm">Compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
