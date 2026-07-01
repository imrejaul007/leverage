'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Package, FileText, Truck, Bot, Users, BarChart3, ArrowRight, Check, Globe, Shield, Zap, Anchor, Ship, ChevronDown, Menu, X } from 'lucide-react';

const features = [
  { icon: Check, title: '500+ Suppliers', subtitle: 'Verified global partners' },
  { icon: Shield, title: 'HS Code Classification', subtitle: 'AI-powered accuracy' },
  { icon: Bot, title: 'AI Compliance', subtitle: 'Smart document checks' },
  { icon: Truck, title: 'Real-time Tracking', subtitle: 'Shipment monitoring' },
];

const stats = [
  { value: 150, suffix: '+', label: 'Countries', icon: Globe },
  { value: 20, suffix: 'K+', label: 'Businesses', icon: Users },
  { value: 1, suffix: 'M+', label: 'Shipments', icon: Package },
  { value: 99.9, suffix: '%', label: 'Compliance', icon: Shield },
];

const featureCards = [
  { icon: Package, title: 'Marketplace', description: 'Browse, buy, and sell products with verified trade partners.', bgColor: 'bg-[#154230]', href: '/marketplace' },
  { icon: FileText, title: 'Smart Documents', description: 'Auto-generate invoices, BL, COO, L/C, and trade documents.', bgColor: 'bg-[#A6824A]', href: '/documents' },
  { icon: Truck, title: 'Freight & Logistics', description: 'Track shipments, compare rates, and manage logistics.', bgColor: 'bg-[#5D1E21]', href: '/freight' },
  { icon: Shield, title: 'Compliance', description: 'HS code lookup, duty calculator, and compliance checks.', bgColor: 'bg-[#154230]', href: '/compliance' },
  { icon: Bot, title: 'AI Assistant', description: 'HOJAI-powered intelligence for trade insights and analysis.', bgColor: 'bg-[#A6824A]', href: '/ai' },
  { icon: BarChart3, title: 'Billing & Invoicing', description: 'Create invoices, track payments, and manage cash flow.', bgColor: 'bg-[#5D1E21]', href: '/billing' },
];

const howItWorksSteps = [
  { step: '01', title: 'Create Account', description: 'Sign up in minutes', color: '#154230', icon: Globe },
  { step: '02', title: 'Add Products', description: 'Import your catalog', color: '#A6824A', icon: Package },
  { step: '03', title: 'Connect & Trade', description: 'Find partners', color: '#5D1E21', icon: Users },
  { step: '04', title: 'Ship & Track', description: 'Integrated logistics', color: '#154230', icon: Truck },
];

// Smooth parallax hook
function useParallax(value: any, distance: number) {
  const transform = useTransform(value, [0, 1], [-distance, distance]);
  return transform;
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/marketplace" className="nav-link">Marketplace</Link>
              <Link href="/documents" className="nav-link">Documents</Link>
              <Link href="/freight" className="nav-link">Freight</Link>
              <Link href="/compliance" className="nav-link">Compliance</Link>
              <Link href="/ai" className="nav-link">AI</Link>
              <Link href="/billing" className="nav-link">Billing</Link>
              <Link href="/ads" className="nav-link">Ads</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/demo" className="px-5 py-2.5 bg-[#A6824A] hover:bg-[#b8925a] text-white font-semibold rounded-lg transition-all text-sm">
                Try Demo
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button
                className="lg:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-black/5 overflow-hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 flex flex-col gap-2">
            <Link href="/demo" className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#A6824A]">Try Demo</Link>
            <Link href="/marketplace" className="p-3 hover:bg-black/5 rounded-lg">Marketplace</Link>
            <Link href="/documents" className="p-3 hover:bg-black/5 rounded-lg">Documents</Link>
            <Link href="/freight" className="p-3 hover:bg-black/5 rounded-lg">Freight</Link>
            <Link href="/compliance" className="p-3 hover:bg-black/5 rounded-lg">Compliance</Link>
            <Link href="/ai" className="p-3 hover:bg-black/5 rounded-lg">AI</Link>
            <Link href="/billing" className="p-3 hover:bg-black/5 rounded-lg">Billing</Link>
            <Link href="/ads" className="p-3 hover:bg-black/5 rounded-lg">Ads</Link>
          </div>
        </motion.div>
      </header>

      {/* Hero Section - Smooth Sliding */}
      <section ref={heroRef} className="pt-28 pb-16 px-4 sm:px-8 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Simple Background - No heavy animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -right-32 top-10 w-[700px] h-[700px] opacity-10"
            style={{ y }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="200" cy="200" r="150" fill="none" stroke="#A6824A" strokeWidth="1" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="#A6824A" strokeWidth="0.5" />
              <ellipse cx="200" cy="200" rx="150" ry="50" fill="none" stroke="#A6824A" strokeWidth="0.5" />
            </svg>
          </motion.div>

          {/* Floating Elements with smooth movement */}
          <motion.div
            className="absolute top-1/4 right-20 w-16 h-16 bg-[#A6824A]/10 rounded-full blur-xl"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-20 w-24 h-24 bg-[#154230]/10 rounded-full blur-xl"
            animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-12 h-12 bg-[#5D1E21]/10 rounded-full blur-lg"
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto max-w-6xl relative"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content - Sliding in */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 text-center lg:text-left z-10"
            >
              {/* Badge - Sliding */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5D1E21] rounded-full mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-white text-sm font-medium">Connecting Dots to Ports</span>
              </motion.div>

              {/* Headline - Smooth reveal */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#154230] mb-6 leading-tight tracking-tight"
              >
                Trade Smarter.
                <br />
                <span className="text-[#5D1E21]">Globally.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base sm:text-lg text-[#4A4A4A] mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Streamline your import/export operations with AI-powered compliance,
                smart documents, and integrated logistics — all in one platform.
              </motion.p>

              {/* CTA Buttons - Smooth slide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              >
                <Link href="/signup" className="btn-primary-group">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/marketplace" className="btn-secondary-group">
                  <Globe className="w-5 h-5" />
                  Explore Marketplace
                </Link>
              </motion.div>

              {/* Feature Pills - Staggered slide */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } }
                }}
                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="pill-item"
                  >
                    <Check className="w-4 h-4 text-[#154230]" />
                    <span className="text-[#101111] text-sm font-medium">{feature.title}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Floating Globe with smooth movement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex-1 relative hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-lg mx-auto"
              >
                {/* Main Globe */}
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#154230" />
                      <stop offset="100%" stopColor="#1d5240" />
                    </linearGradient>
                  </defs>
                  <circle cx="200" cy="200" r="150" fill="url(#oceanGrad)" />
                  <ellipse cx="150" cy="160" rx="50" ry="35" fill="#A6824A" opacity="0.8" />
                  <ellipse cx="240" cy="180" rx="40" ry="55" fill="#A6824A" opacity="0.8" />
                  <ellipse cx="170" cy="260" rx="35" ry="25" fill="#A6824A" opacity="0.8" />
                  <ellipse cx="200" cy="200" rx="150" ry="45" fill="none" stroke="#A6824A" strokeWidth="2" />
                  <ellipse cx="200" cy="200" rx="150" ry="45" fill="none" stroke="#A6824A" strokeWidth="2" transform="rotate(60 200 200)" />
                  <ellipse cx="200" cy="200" rx="150" ry="45" fill="none" stroke="#A6824A" strokeWidth="2" transform="rotate(-60 200 200)" />
                </svg>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-[#A6824A] rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Ship className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 w-14 h-14 bg-[#5D1E21] rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Anchor className="w-7 h-7 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="text-[#4A4A4A] text-xs font-medium">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 text-[#A6824A]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section - Smooth Slide In */}
      <section className="py-16 px-4 sm:px-8 bg-[#154230] relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${i % 2 === 0 ? 'bg-[#A6824A]/20' : 'bg-white/10'}`}>
                    <Icon className={`w-7 h-7 ${i % 2 === 0 ? 'text-[#A6824A]' : 'text-white'}`} />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}{stat.suffix}</p>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Smooth Cards */}
      <section className="py-24 px-4 sm:px-8 bg-[#E6E2DA] relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#154230]/10 text-[#154230] text-xs font-semibold rounded-full mb-4">
              POWERFUL FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4 tracking-tight">
              Everything You Need for Global Trade
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
              From RFQ to delivery, manage your entire trade lifecycle with our comprehensive platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={i}
                  href={feature.href}
                  className="feature-card group block"
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${feature.bgColor}`} />

                  {/* Icon container */}
                  <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[#101111] mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">{feature.description}</p>

                  {/* Learn more link */}
                  <div className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all duration-300">
                    <span className={`${feature.bgColor.replace('bg-', 'text-')}`}>Learn more</span>
                    <ArrowRight className={`w-4 h-4 ${feature.bgColor.replace('bg-', 'text-')} group-hover:translate-x-1 transition-transform duration-300`} />
                  </div>

                  {/* Decorative corner */}
                  <div className={`absolute bottom-0 right-0 w-20 h-20 ${feature.bgColor} opacity-5 rounded-tl-full`} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Smooth Slide */}
      <section className="py-24 px-4 sm:px-8 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#5D1E21]/10 text-[#5D1E21] text-xs font-semibold rounded-full mb-4">
              SIMPLE PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
              Get started with global trade in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

            {howItWorksSteps.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative text-center group cursor-pointer"
                >
                  <div className={`w-32 h-32 mx-auto rounded-full bg-[${item.color}]/5 border-2 border-[${item.color}]/20 flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-opacity-100`}>
                    <div className={`w-20 h-20 rounded-full ${item.color === '#154230' ? 'bg-[#154230]' : item.color === '#A6824A' ? 'bg-[#A6824A]' : 'bg-[#5D1E21]'} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                  </div>
                  <span className={`inline-block px-3 py-1 ${item.color === '#154230' ? 'bg-[#154230]/10 text-[#154230]' : item.color === '#A6824A' ? 'bg-[#A6824A]/10 text-[#A6824A]' : 'bg-[#5D1E21]/10 text-[#5D1E21]'} text-xs font-bold rounded-full mb-3`}>
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-[#101111] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#4A4A4A] max-w-[200px] mx-auto">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Smooth Slide */}
      <section className="py-24 px-4 sm:px-8 bg-[#E6E2DA] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto max-w-4xl"
        >
          <div className="bg-white rounded-2xl p-10 sm:p-14 border border-black/5 shadow-xl relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 right-0 w-32 h-32 bg-[#154230]/5 rounded-bl-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-0 left-0 w-24 h-24 bg-[#A6824A]/5 rounded-tr-full"
            />

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-[#154230] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Globe className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4 tracking-tight text-center">
              Ready to Transform Your Trade Business?
            </h2>
            <p className="text-base text-[#4A4A4A] mb-8 max-w-xl mx-auto text-center">
              Join thousands of traders who have already streamlined their global trade operations with Leverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary-group mx-auto sm:mx-0">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="btn-burgundy-group mx-auto sm:mx-0">
                <Ship className="w-5 h-5" />
                Talk to Sales
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-8 bg-[#154230]">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
              <p className="text-white/70 text-sm mb-4">
                The operating system for global trade.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/documents" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
                <li><Link href="/ai" className="hover:text-white transition-colors">AI</Link></li>
                <li><Link href="/billing" className="hover:text-white transition-colors">Billing</Link></li>
                <li><Link href="/ads" className="hover:text-white transition-colors">Ads</Link></li>
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

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © 2026 Leverage. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/50">
              <Ship className="w-4 h-4" />
              <span className="text-xs">Powered by Global Trade</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}