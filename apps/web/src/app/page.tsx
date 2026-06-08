'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, FileText, Truck, Bot, Users, BarChart3, ArrowRight, Check, Globe, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'RFQ Management',
    description: 'Create, send, and manage Request for Quotes with ease. Track responses and close deals faster.',
 },
  {
    icon: Shield,
    title: 'Smart Documents',
    description: 'Auto-generate invoices, BL, COO, and more. AI-powered compliance checks included.',
  },
  {
    icon: Truck,
    title: 'Freight Integration',
    description: 'Compare shipping rates from top freight forwarders. Track shipments in real-time.',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Get instant help with HS codes, duty calculations, and compliance requirements.',
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Connect with verified trade experts for consultations on compliance, logistics, and more.',
  },
  {
    icon: BarChart3,
    title: 'Trade Analytics',
    description: 'Track performance, monitor trends, and make data-driven decisions for your trade business.',
  },
];

const stats = [
  { value: '10,000+', label: 'Active Traders' },
  { value: '$500M+', label: 'Trade Volume' },
  { value: '150+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
];

const testimonials = [
  {
    quote: 'Leverage has transformed how we handle international trade. The AI assistant saved us countless hours on compliance.',
    author: 'Priya Sharma',
    role: 'Head of Procurement, ExportCo India',
    avatar: 'PS',
  },
  {
    quote: 'The document automation is incredible. What used to take days now happens in minutes.',
    author: 'Michael Chen',
    role: 'Trade Manager, Asia Pacific Trading',
    avatar: 'MC',
  },
  {
    quote: 'Best platform for connecting with verified suppliers. Our sourcing costs dropped by 30%.',
    author: 'Sarah Johnson',
    role: 'CEO, Global Impex LLC',
    avatar: 'SJ',
  },
];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f14]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f14]/90 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/marketplace" className="text-[#8a8f94] hover:text-[#F4F1EA] transition-colors text-sm">
                Marketplace
              </Link>
              <Link href="/freight" className="text-[#8a8f94] hover:text-[#F4F1EA] transition-colors text-sm">
                Freight
              </Link>
              <Link href="/compliance" className="text-[#8a8f94] hover:text-[#F4F1EA] transition-colors text-sm">
                Compliance
              </Link>
              <Link href="/about" className="text-[#8a8f94] hover:text-[#F4F1EA] transition-colors text-sm">
                About
              </Link>
            </nav>
            <Link href="/login" className="px-4 py-2 bg-[#C49A6C] hover:bg-[#D4AA82] text-[#0a0f14] font-semibold rounded-lg transition-all text-sm">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C49A6C]/5 rounded-full blur-[120px]" />

        <div className={`container mx-auto text-center max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C49A6C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C49A6C]"></span>
            </span>
            <span className="text-[#8a8f94] text-sm">Connecting Dots to Ports</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F4F1EA] mb-6 leading-tight tracking-tight">
            Trade Smarter.
            <br />
            <span className="text-[#C49A6C]">Globally.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#8a8f94] mb-10 max-w-2xl mx-auto">
            Streamline your import/export operations with AI-powered compliance,
            smart documents, and integrated logistics — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link href="/signup" className="px-8 py-4 bg-[#C49A6C] hover:bg-[#D4AA82] text-[#0a0f14] font-bold rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/marketplace" className="px-8 py-4 bg-white/5 border border-white/10 text-[#F4F1EA] hover:bg-white/10 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
              <Globe className="w-5 h-5" />
              Explore Marketplace
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['500+ Suppliers', 'HS Code Classification', 'AI Compliance', 'Real-time Tracking'].map((feature) => (
              <div key={feature} className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
                <Check className="w-4 h-4 text-[#C49A6C]" />
                <span className="text-[#8a8f94] text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-8 border-y border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#C49A6C] mb-2">{stat.value}</p>
                <p className="text-[#8a8f94] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F1EA] mb-4 tracking-tight">
              Everything You Need for Global Trade
            </h2>
            <p className="text-base text-[#8a8f94] max-w-2xl mx-auto">
              From RFQ to delivery, manage your entire trade lifecycle with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group p-6 bg-[#151c24] border border-white/5 rounded-xl hover:border-[#C49A6C]/20 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#C49A6C]/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#C49A6C]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F1EA] mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-[#8a8f94] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-8 bg-[#121820]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F1EA] mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-base text-[#8a8f94]">
              Get started in minutes, not days
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: '1', title: 'Create Account', desc: 'Sign up in seconds with your email. No credit card required.', icon: Zap },
              { step: '2', title: 'Connect & Trade', desc: 'Browse marketplace, create RFQs, and manage documents.', icon: Globe },
              { step: '3', title: 'Scale Globally', desc: 'Grow your business with AI insights and expert consultations.', icon: BarChart3 },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative text-center">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-10 right-0 w-full h-px bg-gradient-to-r from-[#C49A6C]/20 to-transparent" />
                  )}
                  <div className="w-16 h-16 rounded-full bg-[#151c24] border border-[#C49A6C]/20 flex items-center justify-center mx-auto mb-5 relative">
                    <Icon className="w-7 h-7 text-[#C49A6C]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#F4F1EA] mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-[#8a8f94] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F1EA] mb-4 tracking-tight">
              Trusted by Traders Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-[#151c24] border border-white/5 rounded-xl">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#8a8f94] mb-5 leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#C49A6C] flex items-center justify-center text-[#0a0f14] font-bold text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[#F4F1EA] font-medium text-sm">{t.author}</p>
                    <p className="text-[#8a8f94] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-[#151c24] rounded-2xl p-10 sm:p-14 text-center border border-[#C49A6C]/10 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#C49A6C]/5 rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F1EA] mb-4 tracking-tight">
                Ready to Transform Your Trade Business?
              </h2>
              <p className="text-base text-[#8a8f94] mb-8 max-w-xl mx-auto">
                Join thousands of traders who have already streamlined their global trade operations with Leverge.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/signup" className="px-8 py-4 bg-[#C49A6C] hover:bg-[#D4AA82] text-[#0a0f14] font-bold rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-white/5 border border-white/10 text-[#F4F1EA] hover:bg-white/10 font-semibold rounded-xl transition-all">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Image src="/logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain" />
              </div>
              <p className="text-[#8a8f94] text-sm">
                The operating system for global trade.
              </p>
            </div>
            <div>
              <h4 className="text-[#F4F1EA] font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-[#8a8f94]">
                <li><Link href="/marketplace" className="hover:text-[#C49A6C] transition-colors">Marketplace</Link></li>
                <li><Link href="/freight" className="hover:text-[#C49A6C] transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-[#C49A6C] transition-colors">Compliance</Link></li>
                <li><Link href="/ai" className="hover:text-[#C49A6C] transition-colors">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F4F1EA] font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-[#8a8f94]">
                <li><Link href="/about" className="hover:text-[#C49A6C] transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#C49A6C] transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-[#C49A6C] transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-[#C49A6C] transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F4F1EA] font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-[#8a8f94]">
                <li><Link href="/privacy" className="hover:text-[#C49A6C] transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#C49A6C] transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-[#C49A6C] transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#8a8f94] text-sm">
              © 2026 Leverge. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#8a8f94] hover:text-[#C49A6C] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-[#8a8f94] hover:text-[#C49A6C] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-[#8a8f94] hover:text-[#C49A6C] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.756v20.487C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.244V1.756C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}