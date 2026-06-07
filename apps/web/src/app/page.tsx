'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Package, FileText, Truck, Bot, Users, BarChart3, ArrowRight, Check, Globe, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'RFQ Management',
    description: 'Create, send, and manage Request for Quotes with ease. Track responses and close deals faster.',
    color: 'orange',
  },
  {
    icon: Shield,
    title: 'Smart Documents',
    description: 'Auto-generate invoices, BL, COO, and more. AI-powered compliance checks included.',
    color: 'blue',
  },
  {
    icon: Truck,
    title: 'Freight Integration',
    description: 'Compare shipping rates from top freight forwarders. Track shipments in real-time.',
    color: 'green',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Get instant help with HS codes, duty calculations, and compliance requirements.',
    color: 'purple',
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Connect with verified trade experts for consultations on compliance, logistics, and more.',
    color: 'cyan',
  },
  {
    icon: BarChart3,
    title: 'Trade Analytics',
    description: 'Track performance, monitor trends, and make data-driven decisions for your trade business.',
    color: 'pink',
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

const colorMap: Record<string, string> = {
  orange: 'from-orange-500/20 to-orange-600/10 text-orange-400',
  blue: 'from-blue-500/20 to-blue-600/10 text-blue-400',
  green: 'from-green-500/20 to-green-600/10 text-green-400',
  purple: 'from-purple-500/20 to-purple-600/10 text-purple-400',
  cyan: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400',
  pink: 'from-pink-500/20 to-pink-600/10 text-pink-400',
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-lg border-b border-[#1E293B]">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-lg shadow-orange-500/20">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V8l9-5 9 5v13M3 8l9 5 9-5M9 21V12h6v9" />
                </svg>
              </div>
              <div>
                <span className="text-white text-xl font-bold brand-font">LEVERGE</span>
                <p className="text-[#64748B] text-xs">Global Trade Platform</p>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/marketplace" className="text-[#94A3B8] hover:text-white transition-colors">
                Marketplace
              </Link>
              <Link href="/freight" className="text-[#94A3B8] hover:text-white transition-colors">
                Freight
              </Link>
              <Link href="/compliance" className="text-[#94A3B8] hover:text-white transition-colors">
                Compliance
              </Link>
              <Link href="/about" className="text-[#94A3B8] hover:text-white transition-colors">
                About
              </Link>
            </nav>
            <Link href="/login" className="px-5 py-2.5 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:opacity-90 text-white font-semibold rounded-xl transition-opacity shadow-lg shadow-orange-500/20">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className={`container mx-auto text-center max-w-5xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#1E293B] border border-[#334155] rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[#94A3B8] text-sm font-medium">Connecting Dots to Ports</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            The Operating System for
            <br />
            <span className="text-[#F97316] brand-font">Global Trade</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#94A3B8] mb-10 max-w-2xl mx-auto">
            Streamline your import/export operations with AI-powered compliance,
            smart documents, and integrated logistics — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup" className="px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:opacity-90 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/marketplace" className="px-8 py-4 bg-[#1E293B] border border-[#334155] text-white hover:bg-[#334155] font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
<Globe className="w-5 h-5" />
              Explore Marketplace
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['500+ Suppliers', 'HS Code Classification', 'AI Compliance', 'Real-time Tracking'].map((feature) => (
              <div key={feature} className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-full">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-[#94A3B8] text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-8 border-y border-[#1E293B]">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#F97316] mb-2">{stat.value}</p>
                <p className="text-[#64748B]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need for Global Trade
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              From RFQ to delivery, manage your entire trade lifecycle with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group p-6 bg-[#111827] border border-[#1E293B] rounded-2xl hover:border-[#F97316]/30 transition-all hover:bg-[#1E293B]/50"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[feature.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-[#64748B]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-8 bg-[#0F172A]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#64748B]">
              Get started in minutes, not days
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Create Account', desc: 'Sign up in seconds with your email. No credit card required.', icon: Zap },
              { step: '2', title: 'Connect & Trade', desc: 'Browse marketplace, create RFQs, and manage documents.', icon: Globe },
              { step: '3', title: 'Scale Globally', desc: 'Grow your business with AI insights and expert consultations.', icon: BarChart3 },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative text-center">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 right-0 w-full h-0.5 bg-gradient-to-r from-[#F97316]/50 to-transparent" />
                  )}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#F97316]/30 flex items-center justify-center mx-auto mb-6 relative">
                    <Icon className="w-10 h-10 text-[#F97316]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-[#64748B]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Traders Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-[#111827] border border-[#1E293B] rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className="w-5 h-5 text-[#F97316]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#94A3B8] mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-medium">{t.author}</p>
                    <p className="text-[#64748B] text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="relative bg-gradient-to-br from-[#F97316]/20 to-[#EA580C]/10 rounded-3xl p-8 sm:p-12 text-center border border-[#F97316]/30 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#F97316]/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Trade Business?
              </h2>
              <p className="text-lg text-[#64748B] mb-8 max-w-xl mx-auto">
                Join thousands of traders who have already streamlined their global trade operations with Leverage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="px-8 py-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:opacity-90 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-[#1E293B] border border-[#334155] text-white hover:bg-[#334155] font-semibold rounded-xl transition-all">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 border-t border-[#1E293B]">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <span className="text-white text-xl font-bold brand-font">LEVERGE</span>
                <p className="text-[#64748B] text-xs mt-1">Global Trade Platform</p>
              </div>
              <p className="text-[#64748B] text-sm">
                The operating system for global trade.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#64748B]">
                <li><Link href="/marketplace" className="hover:text-[#F97316]">Marketplace</Link></li>
                <li><Link href="/freight" className="hover:text-[#F97316]">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-[#F97316]">Compliance</Link></li>
                <li><Link href="/ai" className="hover:text-[#F97316]">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#64748B]">
                <li><Link href="/about" className="hover:text-[#F97316]">About</Link></li>
                <li><Link href="/contact" className="hover:text-[#F97316]">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-[#F97316]">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-[#F97316]">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#64748B]">
                <li><Link href="/privacy" className="hover:text-[#F97316]">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#F97316]">Terms</Link></li>
                <li><Link href="/security" className="hover:text-[#F97316]">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#64748B] text-sm">
              © 2026 Leverge. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#64748B] hover:text-[#F97316]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-[#64748B] hover:text-[#F97316]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-[#64748B] hover:text-[#F97316]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.756v20.487C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.244V1.756C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}