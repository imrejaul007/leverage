'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle,
  ArrowRight,
  Building2,
  Globe,
  Shield,
  Truck,
  FileText,
  BarChart3,
} from 'lucide-react';

const steps = [
  {
    title: 'Create Your Profile',
    description: 'Set up your business profile with company details and verification documents.',
    icon: Building2,
  },
  {
    title: 'Connect Globally',
    description: 'Browse and connect with verified suppliers and buyers from around the world.',
    icon: Globe,
  },
  {
    title: 'Trade with Confidence',
    description: 'Use our integrated compliance, documentation, and logistics tools.',
    icon: Shield,
  },
  {
    title: 'Track Everything',
    description: 'Monitor orders, shipments, and analytics all in one dashboard.',
    icon: BarChart3,
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-12">
        <div className="container mx-auto max-w-4xl">
          {/* Welcome */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4">
              Welcome to LEVERAGE
            </h1>
            <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
              The complete global trade operating system. Let&apos;s set up your account in a few simple steps.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-12">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step <= currentStep
                      ? 'bg-[#154230] text-white'
                      : 'bg-[#E6E2DA] text-[#4A4A4A]'
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step + 1}
                </button>
                {step < 3 && (
                  <div className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                    step < currentStep ? 'bg-[#154230]' : 'bg-[#E6E2DA]'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#154230]/10 rounded-xl flex items-center justify-center">
                {(() => {
                  const Icon = steps[currentStep].icon;
                  return <Icon className="w-7 h-7 text-[#154230]" />;
                })()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#101111]">{steps[currentStep].title}</h2>
                <p className="text-[#4A4A4A]">{steps[currentStep].description}</p>
              </div>
            </div>

            {/* Step-specific content */}
            <div className="space-y-4">
              {currentStep === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#101111] mb-2">Company Name</label>
                    <input type="text" placeholder="Your company name" className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#101111] mb-2">Business Type</label>
                    <select className="input w-full">
                      <option>Select business type</option>
                      <option>Importer</option>
                      <option>Exporter</option>
                      <option>Manufacturer</option>
                      <option>Wholesaler</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#101111] mb-2">Country</label>
                    <input type="text" placeholder="Your country" className="input w-full" />
                  </div>
                </>
              )}
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#101111] mb-2">What are you looking for?</label>
                    <div className="space-y-3">
                      {['Find suppliers for my products', 'Connect with buyers worldwide', 'Source materials for manufacturing', 'Find logistics partners'].map((option) => (
                        <label key={option} className="flex items-center gap-3 p-4 bg-[#f7f5f1] rounded-xl cursor-pointer hover:bg-[#E6E2DA] transition-colors">
                          <input type="checkbox" className="w-5 h-5 rounded border-[#4A4A4A] text-[#154230] focus:ring-[#154230]" />
                          <span className="text-[#101111]">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#101111] mb-2">Upload Verification Documents</label>
                    <div className="border-2 border-dashed border-[#4A4A4A]/30 rounded-xl p-8 text-center hover:border-[#154230] transition-colors cursor-pointer">
                      <FileText className="w-10 h-10 text-[#4A4A4A] mx-auto mb-3" />
                      <p className="text-[#101111] font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-[#4A4A4A]">PDF, JPG up to 10MB</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A4A4A]">
                    Your documents are securely encrypted and only shared with verified partners you choose to trade with.
                  </p>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <div className="bg-[#f7f5f1] rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#101111] mb-2">You&apos;re All Set!</h3>
                    <p className="text-[#4A4A4A]">Your account is ready. Start exploring the marketplace and connecting with global trade partners.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentStep > 0 ? (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex-1 py-3 bg-[#f7f5f1] text-[#101111] font-semibold rounded-lg hover:bg-[#E6E2DA] transition-colors"
              >
                Back
              </button>
            ) : (
              <Link
                href="/"
                className="flex-1 py-3 bg-[#f7f5f1] text-[#101111] font-semibold rounded-lg hover:bg-[#E6E2DA] transition-colors text-center"
              >
                Skip for Now
              </Link>
            )}
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex-1 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/marketplace"
                className="flex-1 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors flex items-center justify-center gap-2"
              >
                Go to Marketplace
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
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