'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, CheckCircle, Phone } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success('Account created successfully!');
      window.location.href = '/marketplace';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/"><Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" /></Link>
          <Link href="/marketplace" className="text-sm text-gray-500 hover:text-[#154230]">Back to Marketplace</Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500 mb-6">Join LEVERAGE - The Global Trade OS</p>

            {/* Benefits */}
            <div className="bg-[#154230]/5 rounded-lg p-4 mb-6 space-y-2">
              <p className="font-medium text-gray-900 mb-2">Free account includes:</p>
              {['Access to 2,847+ verified suppliers', 'Post unlimited RFQs', 'Real-time messaging', 'Secure escrow payments'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Enter your company name"
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a password"
                    className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]"
                />
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-4 h-4 mt-1 rounded border-gray-300 text-[#154230]"
                />
                <span className="text-sm text-gray-600">
                  I agree to the <Link href="/terms" className="text-[#154230] underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#154230] underline">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#154230] hover:bg-[#1a5a3a] text-white font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Free Account'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Phone className="w-5 h-5" />
                OTP
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account? <Link href="/marketplace/login" className="text-[#154230] font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
