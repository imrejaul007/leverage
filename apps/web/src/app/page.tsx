'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, FileText, Truck, Bot, Users, BarChart3, ArrowRight, Check, Globe, Shield, Zap, Anchor, Ship } from 'lucide-react';

const features = [
  { icon: Check, title: '500+ Suppliers', subtitle: 'Verified global partners' },
  { icon: Shield, title: 'HS Code Classification', subtitle: 'AI-powered accuracy' },
  { icon: Bot, title: 'AI Compliance', subtitle: 'Smart document checks' },
  { icon: Truck, title: 'Real-time Tracking', subtitle: 'Shipment monitoring' },
];

const stats = [
  { value: '150+', label: 'Countries', icon: Globe },
  { value: '20K+', label: 'Businesses', icon: Users },
  { value: '1M+', label: 'Shipments', icon: Package },
  { value: '99.9%', label: 'Compliance', icon: Shield },
];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#E6E2DA] overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/marketplace" className="text-[#4A4A4A] hover:text-[#101111] transition-colors text-sm font-medium">
                Marketplace
              </Link>
              <Link href="/freight" className="text-[#4A4A4A] hover:text-[#101111] transition-colors text-sm font-medium">
                Freight
              </Link>
              <Link href="/compliance" className="text-[#4A4A4A] hover:text-[#101111] transition-colors text-sm font-medium">
                Compliance
              </Link>
              <Link href="/about" className="text-[#4A4A4A] hover:text-[#101111] transition-colors text-sm font-medium">
                About
              </Link>
            </nav>
            <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 sm:px-8 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Graphics Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large Animated Globe */}
          <div className="absolute -right-32 top-10 w-[700px] h-[700px] opacity-25 animate-[spin_60s_linear_infinite]">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Outer rings */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="#A6824A" strokeWidth="0.4" />
              <circle cx="200" cy="200" r="60" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              <circle cx="200" cy="200" r="40" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              {/* Horizontal ellipses */}
              <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              <ellipse cx="200" cy="200" rx="180" ry="140" fill="none" stroke="#A6824A" strokeWidth="0.3" />
              {/* Rotated ellipses */}
              <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#A6824A" strokeWidth="0.3" transform="rotate(60 200 200)" />
              <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#A6824A" strokeWidth="0.3" transform="rotate(-60 200 200)" />
              <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#A6824A" strokeWidth="0.3" transform="rotate(30 200 200)" />
              <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#A6824A" strokeWidth="0.3" transform="rotate(-30 200 200)" />
              {/* Meridian lines */}
              <line x1="20" y1="200" x2="380" y2="200" stroke="#A6824A" strokeWidth="0.4" />
              <line x1="200" y1="20" x2="200" y2="380" stroke="#A6824A" strokeWidth="0.4" />
              <line x1="50" y1="50" x2="350" y2="350" stroke="#A6824A" strokeWidth="0.2" />
              <line x1="350" y1="50" x2="50" y2="350" stroke="#A6824A" strokeWidth="0.2" />
              {/* Continent hints */}
              <ellipse cx="140" cy="160" rx="35" ry="25" fill="#A6824A" opacity="0.15" />
              <ellipse cx="260" cy="180" rx="30" ry="40" fill="#A6824A" opacity="0.15" />
              <ellipse cx="180" cy="250" rx="25" ry="20" fill="#A6824A" opacity="0.15" />
            </svg>
          </div>

          {/* Trade Route Paths */}
          <svg className="absolute top-20 right-0 w-[500px] h-[400px] opacity-40" viewBox="0 0 500 400">
            {/* Main trade routes */}
            <path d="M80,350 Q200,150 420,180" fill="none" stroke="#A6824A" strokeWidth="1.5" strokeDasharray="8,4" className="animate-dash">
              <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M120,50 Q280,250 450,100" fill="none" stroke="#5D1E21" strokeWidth="1.5" strokeDasharray="8,4" className="animate-dash">
              <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M50,200 Q200,50 400,250" fill="none" stroke="#154230" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
            <path d="M100,300 Q300,300 480,150" fill="none" stroke="#A6824A" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
            {/* Port nodes */}
            <circle cx="80" cy="350" r="6" fill="#A6824A" />
            <circle cx="420" cy="180" r="6" fill="#A6824A" />
            <circle cx="120" cy="50" r="5" fill="#5D1E21" />
            <circle cx="450" cy="100" r="5" fill="#5D1E21" />
            <circle cx="250" cy="200" r="4" fill="#154230" />
            <circle cx="300" cy="280" r="4" fill="#154230" />
            {/* Animated ship markers */}
            <g>
              <path d="M0,0 L8,4 L0,8 L-4,4 Z" fill="#A6824A" transform="translate(250, 185) rotate(-20)">
                <animateMotion dur="4s" repeatCount="indefinite" path="M80,350 Q200,150 420,180" />
              </path>
            </g>
            <g>
              <path d="M0,0 L8,4 L0,8 L-4,4 Z" fill="#5D1E21" transform="translate(250, 185) rotate(-20)">
                <animateMotion dur="5s" repeatCount="indefinite" path="M120,50 Q280,250 450,100" />
              </path>
            </g>
          </svg>

          {/* Floating Port Silhouette */}
          <svg className="absolute bottom-32 right-20 w-[200px] h-[120px] opacity-20" viewBox="0 0 200 120">
            {/* Crane */}
            <rect x="30" y="20" width="6" height="80" fill="#154230" />
            <rect x="20" y="15" width="60" height="5" fill="#154230" />
            <rect x="70" y="15" width="3" height="40" fill="#154230" />
            <rect x="65" y="50" width="10" height="8" fill="#154230" />
            {/* Containers stacked */}
            <rect x="100" y="70" width="25" height="20" fill="#A6824A" rx="1" />
            <rect x="100" y="45" width="25" height="20" fill="#5D1E21" rx="1" />
            <rect x="130" y="55" width="25" height="20" fill="#154230" rx="1" />
            <rect x="130" y="75" width="25" height="15" fill="#A6824A" rx="1" />
            {/* Warehouse */}
            <rect x="160" y="50" width="35" height="40" fill="#154230" rx="2" />
            <polygon points="160,50 177,35 195,50" fill="#154230" />
          </svg>

          {/* Gold Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${5 + (i * 5)}%`,
                top: `${10 + (i % 10) * 8}%`,
                width: i % 3 === 0 ? '3px' : '2px',
                height: i % 3 === 0 ? '3px' : '2px',
                backgroundColor: i % 2 === 0 ? '#A6824A' : '#154230',
                animationDelay: `${i * 0.3}s`,
                opacity: 0.2 + (i % 4) * 0.1,
              }}
            />
          ))}

          {/* Wave Pattern Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
            <svg viewBox="0 0 1440 200" className="absolute bottom-0 w-full" preserveAspectRatio="none">
              <path d="M0,200 L0,100 Q180,0 360,100 T720,100 T1080,100 T1440,100 L1440,200 Z" fill="#154230" opacity="0.9" />
              <path d="M0,200 L0,120 Q240,40 480,120 T960,120 T1440,120 L1440,200 Z" fill="#154230" opacity="0.6" />
            </svg>
          </div>
        </div>

<div className={`container mx-auto max-w-6xl relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5D1E21] rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-white text-sm font-medium">Connecting Dots to Ports</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#154230] mb-6 leading-tight tracking-tight font-['Plus_Jakarta_Sans']">
                Trade Smarter.
                <br />
                <span className="text-[#5D1E21]">Globally.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-[#4A4A4A] mb-8 max-w-xl mx-auto lg:mx-0">
                Streamline your import/export operations with AI-powered compliance,
                smart documents, and integrated logistics — all in one platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link href="/signup" className="px-8 py-4 bg-[#154230] hover:bg-[#1d5240] text-white font-bold rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/marketplace" className="px-8 py-4 bg-white border-2 border-[#154230] text-[#154230] hover:bg-[#154230] hover:text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
                  <Globe className="w-5 h-5" />
                  Explore Marketplace
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                    <Check className="w-4 h-4 text-[#154230]" />
                    <span className="text-[#101111] text-sm font-medium">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphics - Large Hero Illustration */}
            <div className="flex-1 relative hidden lg:block">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Globe */}
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                  {/* Globe base */}
                  <defs>
                    <radialGradient id="globeGrad" cx="30%" cy="30%">
                      <stop offset="0%" stopColor="#E6E2DA" />
                      <stop offset="100%" stopColor="#D4CCBE" />
                    </radialGradient>
                    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#154230" />
                      <stop offset="100%" stopColor="#1d5240" />
                    </linearGradient>
                  </defs>

                  {/* Ocean circle */}
                  <circle cx="200" cy="200" r="150" fill="url(#oceanGrad)" />

                  {/* Continent shapes */}
                  <ellipse cx="150" cy="160" rx="50" ry="35" fill="#A6824A" opacity="0.8" />
                  <ellipse cx="240" cy="180" rx="40" ry="55" fill="#A6824A" opacity="0.8" />
                  <ellipse cx="170" cy="260" rx="35" ry="25" fill="#A6824A" opacity="0.8" />
                  <ellipse cx="280" cy="130" rx="25" ry="20" fill="#A6824A" opacity="0.8" />

                  {/* Globe rings */}
                  <ellipse cx="200" cy="200" rx="150" ry="45" fill="none" stroke="#A6824A" strokeWidth="2" />
                  <ellipse cx="200" cy="200" rx="150" ry="45" fill="none" stroke="#A6824A" strokeWidth="2" transform="rotate(60 200 200)" />
                  <ellipse cx="200" cy="200" rx="150" ry="45" fill="none" stroke="#A6824A" strokeWidth="2" transform="rotate(-60 200 200)" />

                  {/* Lat/Long grid */}
                  <circle cx="200" cy="200" r="120" fill="none" stroke="#A6824A" strokeWidth="0.5" opacity="0.5" />
                  <circle cx="200" cy="200" r="90" fill="none" stroke="#A6824A" strokeWidth="0.5" opacity="0.5" />
                  <circle cx="200" cy="200" r="60" fill="none" stroke="#A6824A" strokeWidth="0.5" opacity="0.5" />
                  <circle cx="200" cy="200" r="30" fill="none" stroke="#A6824A" strokeWidth="0.5" opacity="0.5" />
                  <line x1="50" y1="200" x2="350" y2="200" stroke="#A6824A" strokeWidth="0.5" opacity="0.5" />
                  <line x1="200" y1="50" x2="200" y2="350" stroke="#A6824A" strokeWidth="0.5" opacity="0.5" />

                  {/* Trade route arc */}
                  <path d="M120,240 Q200,100 280,160" fill="none" stroke="#A6824A" strokeWidth="3" strokeDasharray="10,5" />

                  {/* Animated ship on route */}
                  <g>
                    <path d="M0,0 L10,5 L0,10 L-5,5 Z" fill="#5D1E21">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M120,240 Q200,100 280,160" />
                    </path>
                  </g>

                  {/* Port markers */}
                  <circle cx="120" cy="240" r="8" fill="#A6824A" />
                  <circle cx="280" cy="160" r="8" fill="#A6824A" />
                  <circle cx="200" cy="100" r="6" fill="#5D1E21" />
                </svg>

                {/* Floating Elements around globe */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#A6824A] rounded-xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                  <Ship className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-[#5D1E21] rounded-xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                  <Anchor className="w-7 h-7 text-white" />
                </div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Globe className="w-6 h-6 text-[#154230]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-8 bg-[#154230] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute left-0 top-0 w-64 h-64 opacity-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#A6824A" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#A6824A" strokeWidth="1" />
            <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#A6824A" strokeWidth="1" />
          </svg>
          <svg className="absolute right-0 bottom-0 w-48 h-48 opacity-10" viewBox="0 0 200 200">
            <rect x="20" y="80" width="40" height="30" fill="#A6824A" rx="2" />
            <rect x="70" y="90" width="35" height="25" fill="#5D1E21" rx="2" />
            <rect x="115" y="85" width="45" height="35" fill="#A6824A" rx="2" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center relative">
                  {i % 2 === 0 ? (
                    <div className="w-14 h-14 rounded-full bg-[#A6824A]/20 border border-[#A6824A]/30 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-7 h-7 text-[#A6824A]" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  )}
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-8 bg-[#E6E2DA] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-20 left-10 w-32 h-32 opacity-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="#154230" strokeWidth="0.5" />
          </svg>
          <svg className="absolute bottom-20 right-10 w-40 h-40 opacity-20" viewBox="0 0 100 100">
            <rect x="20" y="30" width="20" height="15" fill="#A6824A" rx="2" />
            <rect x="45" y="35" width="18" height="12" fill="#5D1E21" rx="2" />
            <rect x="68" y="28" width="22" height="18" fill="#154230" rx="2" />
            <rect x="25" y="50" width="15" height="10" fill="#154230" rx="2" />
            <rect x="50" y="52" width="20" height="12" fill="#A6824A" rx="2" />
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#154230]/10 text-[#154230] text-xs font-semibold rounded-full mb-4">
              POWERFUL FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4 tracking-tight">
              Everything You Need for Global Trade
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
              From RFQ to delivery, manage your entire trade lifecycle with our comprehensive platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: 'RFQ Management', description: 'Create, send, and manage Request for Quotes with ease. Track responses and close deals faster.', bgColor: 'bg-[#154230]', borderColor: 'border-[#154230]/20', href: '/rfqs' },
              { icon: Shield, title: 'Smart Documents', description: 'Auto-generate invoices, BL, COO, and more. AI-powered compliance checks included.', bgColor: 'bg-[#A6824A]', borderColor: 'border-[#A6824A]/20', href: '/documents' },
              { icon: Truck, title: 'Freight Integration', description: 'Compare shipping rates from top freight forwarders. Track shipments in real-time.', bgColor: 'bg-[#5D1E21]', borderColor: 'border-[#5D1E21]/20', href: '/freight' },
              { icon: Bot, title: 'AI Assistant', description: 'Get instant help with HS codes, duty calculations, and compliance requirements.', bgColor: 'bg-[#154230]', borderColor: 'border-[#154230]/20', href: '/ai' },
              { icon: Users, title: 'Expert Network', description: 'Connect with verified trade experts for consultations on compliance, logistics, and more.', bgColor: 'bg-[#A6824A]', borderColor: 'border-[#A6824A]/20', href: '/consultations' },
              { icon: BarChart3, title: 'Trade Analytics', description: 'Track performance, monitor trends, and make data-driven decisions for your trade business.', bgColor: 'bg-[#5D1E21]', borderColor: 'border-[#5D1E21]/20', href: '/analytics' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group relative p-6 bg-white border-2 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${feature.bgColor}`} />

                  {/* Icon container */}
                  <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[#101111] mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">{feature.description}</p>

                  {/* Learn more link */}
                  <Link href={feature.href || '/marketplace'} className={`inline-flex items-center gap-1 text-sm font-medium ${feature.bgColor.replace('bg-', 'text-')} group-hover:gap-2 transition-all`}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Decorative corner element */}
                  <div className={`absolute bottom-0 right-0 w-20 h-20 ${feature.bgColor} opacity-5 rounded-tl-full`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-8 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A6824A]/20 to-transparent" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#5D1E21]/10 text-[#5D1E21] text-xs font-semibold rounded-full mb-4">
              SIMPLE PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
              Get started with global trade in four simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

            {[
              { step: '01', title: 'Create Account', description: 'Sign up in minutes with our streamlined onboarding process', color: '#154230', icon: Globe },
              { step: '02', title: 'Add Products', description: 'Import your catalog or browse our marketplace for suppliers', color: '#A6824A', icon: Package },
              { step: '03', title: 'Connect & Trade', description: 'Find partners, negotiate deals, and manage transactions', color: '#5D1E21', icon: Users },
              { step: '04', title: 'Ship & Track', description: 'Integrated logistics with real-time tracking and compliance', color: '#154230', icon: Truck },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative text-center group">
                  {/* Step number badge */}
                  <div className={`w-32 h-32 mx-auto rounded-full bg-[${item.color}]/5 border-2 border-[${item.color}]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-20 h-20 rounded-full ${item.color === '#154230' ? 'bg-[#154230]' : item.color === '#A6824A' ? 'bg-[#A6824A]' : 'bg-[#5D1E21]'} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                  </div>
                  <span className={`inline-block px-3 py-1 ${item.color === '#154230' ? 'bg-[#154230]/10 text-[#154230]' : item.color === '#A6824A' ? 'bg-[#A6824A]/10 text-[#A6824A]' : 'bg-[#5D1E21]/10 text-[#5D1E21]'} text-xs font-bold rounded-full mb-3`}>
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-[#101111] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#4A4A4A] max-w-[200px] mx-auto">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-8 bg-[#E6E2DA] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Globe outline */}
          <svg className="absolute -left-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#154230" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="100" cy="100" rx="80" ry="50" fill="none" stroke="#154230" strokeWidth="0.5" transform="rotate(60 100 100)" />
          </svg>
          <svg className="absolute -right-20 top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#A6824A" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#A6824A" strokeWidth="0.5" />
            <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#A6824A" strokeWidth="0.5" />
          </svg>
          {/* Wave decoration */}
          <svg className="absolute bottom-0 left-0 right-0 h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 Q360,0 720,40 T1440,40 L1440,80 L0,80 Z" fill="#154230" opacity="0.1" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="bg-white rounded-2xl p-10 sm:p-14 border border-black/5 shadow-xl relative overflow-hidden">
            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#154230]/5 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#A6824A]/5 rounded-tr-full" />

            {/* Globe icon */}
            <div className="w-16 h-16 bg-[#154230] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4 tracking-tight">
              Ready to Transform Your Trade Business?
            </h2>
            <p className="text-base text-[#4A4A4A] mb-8 max-w-xl mx-auto">
              Join thousands of traders who have already streamlined their global trade operations with Leverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="px-8 py-4 bg-[#154230] hover:bg-[#1d5240] text-white font-bold rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-[#5D1E21] hover:bg-[#7a2629] text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
                <Ship className="w-5 h-5" />
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-8 bg-[#154230] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute -right-20 -bottom-20 w-80 h-80 opacity-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#A6824A" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#A6824A" strokeWidth="0.5" />
            <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#A6824A" strokeWidth="0.5" />
          </svg>
          <svg className="absolute left-20 bottom-10 w-40 h-40 opacity-5" viewBox="0 0 100 60">
            <path d="M10,50 L20,55 L80,55 L90,50 L85,40 L15,40 Z" fill="#A6824A" />
            <rect x="25" y="30" width="15" height="10" fill="#A6824A" rx="1" />
            <rect x="45" y="32" width="12" height="8" fill="#A6824A" rx="1" />
            <rect x="62" y="28" width="18" height="12" fill="#A6824A" rx="1" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Top wave decoration */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A6824A]/50 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain" />
              </div>
              <p className="text-white/70 text-sm mb-4">
                The operating system for global trade.
              </p>
              {/* Globe icon */}
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                <Globe className="w-4 h-4 text-[#A6824A]" />
                <span className="text-white/80 text-xs font-medium">Trusted by 20K+ businesses</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
                <li><Link href="/ai" className="hover:text-white transition-colors">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © 2026 Leverage. All rights reserved.
            </p>

            {/* Ship icon decoration */}
            <div className="flex items-center gap-2 text-white/50">
              <Ship className="w-4 h-4" />
              <span className="text-xs">Powered by Global Trade</span>
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.756v20.487C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.244V1.756C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
