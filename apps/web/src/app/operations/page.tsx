'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  FileText,
  Package,
  Truck,
  Bot,
  Users,
  ArrowRight,
  Check,
  Globe,
  BarChart3,
  Briefcase,
  Calendar,
  Search,
  DollarSign,
  Settings,
  MessageSquare,
  Megaphone,
  ChevronRight,
  Home,
  LayoutGrid,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const features = [
  { icon: Shield, title: '500+ Suppliers', subtitle: 'Verified global partners', color: '#154230' },
  { icon: FileText, title: 'HS Code Classification', subtitle: 'AI-powered accuracy', color: '#A6824A' },
  { icon: Bot, title: 'AI Compliance', subtitle: 'Smart document checks', color: '#5D1E21' },
  { icon: Truck, title: 'Real-time Tracking', subtitle: 'Shipment monitoring', color: '#154230' },
];

const stats = [
  { value: '150+', label: 'Countries', icon: Globe },
  { value: '20K+', label: 'Businesses', icon: Users },
  { value: '1M+', label: 'Shipments', icon: Package },
  { value: '99.9%', label: 'Compliance', icon: Shield },
];

const operationCards = [
  { icon: FileText, title: 'Documents', description: 'Manage invoices, BL, COO and trade docs', href: '/documents', color: '#154230' },
  { icon: Shield, title: 'Compliance', description: 'HS codes, duty calculator, checks', href: '/compliance', color: '#A6824A' },
  { icon: Truck, title: 'Freight', description: 'Compare rates, track shipments', href: '/freight', color: '#5D1E21' },
  { icon: BarChart3, title: 'Analytics', description: 'Trade performance reports', href: '/analytics', color: '#154230' },
  { icon: DollarSign, title: 'Billing', description: 'Payments and invoices', href: '/billing', color: '#A6824A' },
  { icon: Bot, title: 'AI Assistant', description: 'Get instant trade help', href: '/ai', color: '#5D1E21' },
];

const quickLinks = [
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/consultations', icon: Calendar, label: 'Consultations' },
  { href: '/ads', icon: Megaphone, label: 'Ads' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const howItWorksSteps = [
  { step: '01', title: 'Create Account', description: 'Sign up in minutes', color: '#154230', icon: Globe },
  { step: '02', title: 'Add Products', description: 'Import your catalog', color: '#A6824A', icon: Package },
  { step: '03', title: 'Connect & Trade', description: 'Find partners', color: '#5D1E21', icon: Users },
  { step: '04', title: 'Ship & Track', description: 'Integrated logistics', color: '#154230', icon: Truck },
];

export default function OperationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/marketplace" className="px-5 py-2.5 border-2 border-[#154230] text-[#154230] font-semibold rounded-lg transition-all text-sm hover:bg-[#154230] hover:text-white">
                Go to Marketplace
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-xs font-semibold rounded-full">
              Operations Hub
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#101111] text-center mb-6 leading-tight"
          >
            Everything for <span className="text-[#A6824A]">Global Trade</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#4A4A4A] text-center max-w-2xl mx-auto mb-12"
          >
            Manage your entire trade operations from one place - documents, compliance, logistics, and more.
          </motion.p>

          {/* Operations Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {operationCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link
                  href={card.href}
                  className="group block bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all text-center"
                >
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: card.color }}
                  >
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#101111] text-sm mb-1">{card.title}</h3>
                  <p className="text-xs text-[#4A4A4A] line-clamp-2">{card.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-[#4A4A4A] hover:bg-[#154230] hover:text-white transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-8 bg-[#A6824A]">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#154230]/10 text-[#154230] text-xs font-semibold rounded-full mb-4">
              POWERFUL FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4">
              Everything You Need for Global Trade
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
              From documents to delivery, manage your entire trade lifecycle with our comprehensive platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: feature.color }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#101111] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#4A4A4A]">{feature.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#5D1E21]/10 text-[#5D1E21] text-xs font-semibold rounded-full mb-4">
              SIMPLE PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4">
              How It Works
            </h2>
            <p className="text-base text-[#4A4A4A] max-w-2xl mx-auto">
              Get started with global trade in four simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

            {howItWorksSteps.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative text-center"
                >
                  <div className={`w-32 h-32 mx-auto rounded-full bg-[${item.color}]/5 border-2 border-[${item.color}]/20 flex items-center justify-center mb-6`}>
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                  </div>
                  <span
                    className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-3"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-[#101111] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#4A4A4A]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8 bg-[#E6E2DA]">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-[#A6824A] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4">
              Ready to Streamline Your Trade Operations?
            </h2>
            <p className="text-base text-[#4A4A4A] mb-8 max-w-xl mx-auto">
              Join thousands of businesses who have already optimized their global trade with LEVERAGE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#A6824A] hover:bg-[#8a6a3a] text-white font-bold rounded-lg transition-all">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/consultations" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#A6824A] text-[#A6824A] font-semibold rounded-lg transition-all hover:bg-[#A6824A] hover:text-white">
                <Calendar className="w-5 h-5" />
                Book Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 bg-[#A6824A]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain brightness-0 invert" />
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Globe className="w-4 h-4" />
              <span>Trusted by 20K+ businesses worldwide</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            © 2026 Leverage. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}