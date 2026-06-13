'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  Briefcase,
  ChevronRight,
  ArrowRight,
  Search,
  Shield,
  Truck,
  FileText,
  Users,
  TrendingUp,
  Package,
  Globe,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Section Selection */}
      <section className="pt-32 pb-20 px-4 sm:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1.5 bg-[#154230]/10 text-[#154230] text-xs font-semibold rounded-full">
              Choose Your Experience
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#101111] text-center mb-6 leading-tight"
          >
            What brings you to <span className="text-[#154230]">LEVERAGE</span>?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#4A4A4A] text-center max-w-2xl mx-auto mb-16"
          >
            Select a section below to get started with your trading or operations journey
          </motion.p>

          {/* Section Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Marketplace Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/marketplace"
                className="group block bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#154230] relative overflow-hidden"
                onMouseEnter={() => setHoveredCard('marketplace')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#154230]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-[#154230] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <LayoutGrid className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-[#101111] mb-3">Marketplace</h2>
                  <p className="text-[#4A4A4A] mb-6">
                    Browse products, connect with suppliers, manage RFQs, and track orders. Your complete B2B trading platform.
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Search className="w-4 h-4 text-[#154230]" />
                      <span>Browse Products</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <FileText className="w-4 h-4 text-[#154230]" />
                      <span>RFQ Management</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Truck className="w-4 h-4 text-[#154230]" />
                      <span>Order Tracking</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Users className="w-4 h-4 text-[#154230]" />
                      <span>Supplier Network</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#154230] font-semibold group-hover:gap-3 transition-all">
                    <span>Enter Marketplace</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Operations Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/operations"
                className="group block bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#A6824A] relative overflow-hidden"
                onMouseEnter={() => setHoveredCard('operations')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#A6824A]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-[#A6824A] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-[#101111] mb-3">Operations</h2>
                  <p className="text-[#4A4A4A] mb-6">
                    Manage trade documents, ensure compliance, handle freight, and analyze your business performance.
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <FileText className="w-4 h-4 text-[#A6824A]" />
                      <span>Trade Documents</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Shield className="w-4 h-4 text-[#A6824A]" />
                      <span>Compliance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Truck className="w-4 h-4 text-[#A6824A]" />
                      <span>Freight & Logistics</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <TrendingUp className="w-4 h-4 text-[#A6824A]" />
                      <span>Analytics</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#A6824A] font-semibold group-hover:gap-3 transition-all">
                    <span>Enter Operations</span>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-8 bg-[#154230]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">150+</p>
              <p className="text-white/70 text-sm">Countries</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">20K+</p>
              <p className="text-white/70 text-sm">Businesses</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">1M+</p>
              <p className="text-white/70 text-sm">Shipments</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">99.9%</p>
              <p className="text-white/70 text-sm">Compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4 sm:px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-[#101111] text-center mb-4">Built for Global Trade</h2>
          <p className="text-[#4A4A4A] text-center max-w-2xl mx-auto mb-12">
            Everything you need to run your import/export business efficiently
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Compliance First',
                description: 'AI-powered HS code classification and duty calculations to ensure your shipments are always compliant.',
                color: '#154230',
              },
              {
                icon: Globe,
                title: 'Global Network',
                description: 'Connect with verified suppliers and buyers from 150+ countries.',
                color: '#A6824A',
              },
              {
                icon: Package,
                title: 'End-to-End',
                description: 'From RFQ to delivery, manage your entire trade lifecycle in one platform.',
                color: '#5D1E21',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#101111] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#4A4A4A]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8 bg-[#E6E2DA]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#101111] mb-4">Ready to get started?</h2>
          <p className="text-[#4A4A4A] mb-8">
            Join thousands of businesses already trading globally with LEVERAGE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#154230] hover:bg-[#1d5240] text-white font-bold rounded-lg transition-all">
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 bg-[#154230]">
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