'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Check, X, Loader2 } from 'lucide-react';

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    phone: '',
    acceptTerms: false,
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    setPasswordChecks({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      setError('Please meet all password requirements');
      return;
    }

    if (!formData.acceptTerms) {
      setError('Please accept the Terms of Service');
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: 'BUYER',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Signup failed');
      }

      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(result.data.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
      setIsLoading(false);
    }
  };

  const isStep1Valid = formData.email && validateEmail(formData.email) &&
    formData.password && formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    Object.values(passwordChecks).every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081512] via-[#0a1f18] to-[#081512] flex flex-col">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#154230]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A6824A]/5 rounded-full blur-[80px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain brightness-0 invert" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
            <p className="text-white/60 text-sm">Start your global trade journey today</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step >= s ? 'bg-[#154230] text-white' : 'bg-white/10 text-white/40'
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                <span className={`text-sm ${step >= s ? 'text-white' : 'text-white/40'}`}>
                  {s === 1 ? 'Account' : 'Company'}
                </span>
                {s < 2 && (
                  <div className={`w-8 h-0.5 ${step > s ? 'bg-[#154230]' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
                <X className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/60 text-xs mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#154230]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#154230]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Work Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#154230]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder="Create a strong password"
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#154230]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Password Strength */}
                    {formData.password && (
                      <div className="mt-2 space-y-1.5">
                        {[
                          { key: 'length', label: '8+ characters' },
                          { key: 'uppercase', label: 'Uppercase letter' },
                          { key: 'lowercase', label: 'Lowercase letter' },
                          { key: 'number', label: 'Number' },
                          { key: 'special', label: 'Special character' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center gap-2 text-xs">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              passwordChecks[item.key as keyof typeof passwordChecks]
                                ? 'bg-[#154230] text-white'
                                : 'bg-white/10 text-white/40'
                            }`}>
                              {passwordChecks[item.key as keyof typeof passwordChecks] ? (
                                <Check className="w-2.5 h-2.5" />
                              ) : (
                                <div className="w-1.5 h-1.5 bg-current rounded-full" />
                              )}
                            </div>
                            <span className={passwordChecks[item.key as keyof typeof passwordChecks] ? 'text-[#154230]' : 'text-white/40'}>
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#154230]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      isStep1Valid
                        ? 'bg-[#154230] hover:bg-[#1d5240] text-white'
                        : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Trading Co."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#154230]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#154230] appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-[#081512]">Select country</option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code} className="bg-[#081512]">
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 555 123 4567"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#154230]"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, acceptTerms: !formData.acceptTerms })}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        formData.acceptTerms
                          ? 'bg-[#154230] border-[#154230]'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {formData.acceptTerms && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <label className="text-white/60 text-xs cursor-pointer">
                      I agree to the{' '}
                      <Link href="/terms" className="text-[#154230] hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-[#154230] hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !formData.company || !formData.country || !formData.acceptTerms}
                      className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        isLoading || !formData.company || !formData.country || !formData.acceptTerms
                          ? 'bg-[#154230]/50 text-white/50 cursor-not-allowed'
                          : 'bg-[#154230] hover:bg-[#1d5240] text-white'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Account <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-white/40 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-[#A6824A] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Mode Notice - More subtle */}
          <div className="mt-4 p-3 bg-[#154230]/10 border border-[#154230]/20 rounded-xl">
            <p className="text-[#154230] text-xs text-center">
              💡 This is a preview environment. All data is for demonstration purposes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
