'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      toast.success('Password reset link sent to your email');
      setSent(true);
      setIsLoading(false);
    }, 1000);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#f7f5f1] flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-black/5">
          <div className="container mx-auto px-4 sm:px-8 py-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#101111] mb-4">Check your email</h1>
            <p className="text-[#4A4A4A] mb-6">
              We sent a password reset link to <span className="font-medium text-[#101111]">{email}</span>
            </p>
            <p className="text-sm text-[#4A4A4A] mb-8">
              Didn&apos;t receive the email? Check your spam folder or try again.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => { setSent(false); setEmail(''); }}
                className="w-full py-3 bg-[#f7f5f1] text-[#101111] font-semibold rounded-lg hover:bg-[#E6E2DA] transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/login"
                className="block w-full py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#154230]">
          <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-white/70 text-sm">
                  © 2024 LEVERAGE. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy</Link>
                  <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">Terms</Link>
                  <Link href="/security" className="text-white/70 hover:text-white text-sm transition-colors">Security</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f1] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#154230] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#101111] mb-2">Forgot password?</h1>
            <p className="text-[#4A4A4A]">Enter your email and we&apos;ll send you a reset link</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#101111] mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="input w-full pl-12"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#4A4A4A]">
                Remember your password?{' '}
                <Link href="/login" className="text-[#154230] font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-[#4A4A4A] mt-6">
            Having trouble?{' '}
            <Link href="/contact" className="text-[#154230] hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#154230]">
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">
                © 2024 LEVERAGE. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy</Link>
                <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">Terms</Link>
                <Link href="/security" className="text-white/70 hover:text-white text-sm transition-colors">Security</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}