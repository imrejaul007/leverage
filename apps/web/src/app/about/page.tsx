'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Globe,
  FileText,
  Truck,
  Shield,
  Bot,
  Receipt,
  Megaphone,
  Users,
  Menu,
  X,
  Bell,
  ArrowRight,
  Target,
  Award,
  TrendingUp,
  Building2,
  Globe2,
  Handshake,
  Zap,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Ads', href: '/ads', icon: Megaphone },
  { name: 'Consultations', href: '/consultations', icon: Users },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Security', href: '/security' },
];

const stats = [
  { value: '50+', label: 'Countries Served' },
  { value: '10K+', label: 'Active Traders' },
  { value: '$2B+', label: 'Trade Volume' },
  { value: '99.9%', label: 'Platform Uptime' },
];

const values = [
  {
    icon: Globe2,
    title: 'Global Reach',
    description: 'Connecting businesses across 50+ countries with seamless cross-border trade capabilities.',
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Enterprise-grade security with verified suppliers and encrypted transactions.',
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'Streamlined workflows that reduce trade cycle time by up to 60%.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'We grow when our clients succeed. Your trade success is our mission.',
  },
];

const team = [
  {
    name: 'Marcus Chen',
    title: 'CEO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Former Goldman Sachs VP with 15 years in international trade finance.',
  },
  {
    name: 'Sarah Williams',
    title: 'CTO & Co-Founder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Ex-Google engineering lead with expertise in fintech platforms.',
  },
  {
    name: 'Raj Patel',
    title: 'Chief Trade Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: '25+ years experience in global supply chain and customs compliance.',
  },
  {
    name: 'Elena Rodriguez',
    title: 'VP of Operations',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    bio: 'Operations expert scaling logistics across Asia-Pacific and Americas.',
  },
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/about" className="nav-link font-medium text-[#154230]">About</Link>
              <Link href="/blog" className="nav-link font-medium">Blog</Link>
              <Link href="/contact" className="nav-link font-medium">Contact</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-black/5">
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">About</Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Blog</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Contact</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <Building2 className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              About LEVERAGE
            </h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              The global trade operating system that empowers businesses to source, sell, and ship anywhere in the world.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 sm:px-8 py-16 -mt-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <Target className="w-12 h-12 text-[#154230] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#101111] mb-4">Our Mission</h2>
            <p className="text-lg text-[#4A4A4A] mb-6">
              To democratize global trade by making international commerce accessible, efficient, and transparent for businesses of all sizes.
            </p>
            <p className="text-[#4A4A4A]">
              We believe that every business, from small SMEs to large enterprises, should have the tools and connections to participate in global trade. LEVERAGE removes the complexity and barriers that have traditionally limited market access.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4">Our Core Values</h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">These principles guide everything we do at LEVERAGE.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm text-center"
                >
                  <div className="w-14 h-14 bg-[#154230]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#154230]" />
                  </div>
                  <h3 className="font-bold text-[#101111] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#4A4A4A]">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4">Our Story</h2>
              <p className="text-[#4A4A4A] mb-4">
                LEVERAGE was founded in 2020 by a team of trade finance veterans and technology experts who saw a fundamental problem in global commerce: the tools available to businesses for international trade were fragmented, outdated, and inaccessible.
              </p>
              <p className="text-[#4A4A4A] mb-4">
                We set out to build the operating system for global trade — a unified platform that brings together marketplace, logistics, compliance, and payments in one seamless experience.
              </p>
              <p className="text-[#4A4A4A]">
                Today, LEVERAGE serves businesses in over 50 countries, facilitating billions in trade volume while helping companies of all sizes compete on the global stage.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative">
              <div className="aspect-video bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-2xl flex items-center justify-center">
                <Globe className="w-24 h-24 text-white/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Award className="w-12 h-12 text-[#154230] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4">Leadership Team</h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">Meet the experienced team driving LEVERAGE forward.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm text-center"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 object-cover"
                  unoptimized
                />
                <h3 className="font-bold text-[#101111]">{member.name}</h3>
                <p className="text-sm text-[#154230] font-medium mb-2">{member.title}</p>
                <p className="text-sm text-[#4A4A4A]">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#154230] to-[#5D1E21] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join the Global Trade Revolution</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Start trading globally today. Create your free account and connect with suppliers and buyers worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Get Started Free
            </Link>
            <Link href="/contact" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230]">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">
                  The operating system for global trade.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Platform</h4>
                <ul className="space-y-2 text-sm">
                  {platformLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
                <ul className="space-y-2 text-sm">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
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
