'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Shield, Lock, Eye, Server, FileCheck, AlertTriangle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
            </Link>
            <Link href="/" className="flex items-center gap-2 text-[#4A4A4A] hover:text-[#101111] transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#154230] to-[#1a5a3a]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Security & Trust</h1>
          <p className="text-xl text-white/80">
            Your data security is our highest priority
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lock, title: 'End-to-End Encryption', description: 'All data is encrypted in transit and at rest using industry-standard AES-256 encryption.' },
              { icon: Server, title: 'Secure Infrastructure', description: 'Hosted on AWS with SOC 2 Type II compliant data centers and DDoS protection.' },
              { icon: Eye, title: 'Privacy Controls', description: 'You control who sees your data. Granular permissions and audit logs included.' },
              { icon: FileCheck, title: 'Compliance Ready', description: 'GDPR, CCPA, and industry-specific compliance features built-in.' },
              { icon: AlertTriangle, title: 'Fraud Detection', description: 'AI-powered fraud detection monitors transactions 24/7 for suspicious activity.' },
              { icon: Shield, title: 'Verified Security', description: 'Regular penetration testing and security audits by certified professionals.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#101111] mb-2">{item.title}</h3>
                <p className="text-[#4A4A4A] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">Security Best Practices</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              'Use a strong, unique password for your account',
              'Enable two-factor authentication (2FA)',
              'Review connected apps and revoke access regularly',
              'Keep your browser and devices updated',
              'Be cautious of phishing attempts - we never ask for passwords via email',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#E6E2DA] rounded-xl p-4">
                <div className="w-8 h-8 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-[#101111]">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Issue */}
      <section className="py-16 px-4 bg-[#5D1E21] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Found a Security Issue?</h2>
        <p className="text-white/80 mb-6">If you've discovered a security vulnerability, please let us know immediately.</p>
        <Link href="/contact" className="inline-block px-6 py-3 bg-white text-[#5D1E21] font-semibold rounded-lg hover:bg-white/90 transition-colors">
          Report Security Issue
        </Link>
      </section>
    </div>
  );
}