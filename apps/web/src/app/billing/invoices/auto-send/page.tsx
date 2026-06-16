'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Send,
  Bell,
  Menu,
  X,
  ArrowRight,
  Clock,
  CheckCircle,
  Settings,
  Mail,
  FileText,
  Globe,
  Bot,
  Megaphone,
  Truck,
  Shield,
  Receipt,
  Users,
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

const sendSettings = [
  { id: 1, name: 'Immediately after creation', description: 'Send invoice as soon as it is created', enabled: true },
  { id: 2, name: 'Due date reminder', description: 'Send reminder 3 days before due date', enabled: true },
  { id: 3, name: 'Overdue notice', description: 'Send notice 1 day after due date', enabled: true },
  { id: 4, name: 'Weekly summary', description: 'Send weekly invoice summary to all clients', enabled: false },
];

export default function AutoSendPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Billing</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
              <Link href="/consultations" className="nav-link font-medium">Consultations</Link>
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
                <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
                <Link href="/consultations" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#5D1E21] to-[#7a2830] px-4 sm:px-8 pt-8 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Send className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Auto-Send
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Automatically send invoices and payment reminders to your clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">89</p>
              <p className="text-sm text-[#4A4A4A]">Sent This Month</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">97%</p>
              <p className="text-sm text-[#4A4A4A]">Delivery Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">12</p>
              <p className="text-sm text-[#4A4A4A]">Reminders Sent</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">45</p>
              <p className="text-sm text-[#4A4A4A]">Opened</p>
            </div>
          </div>

          {/* Auto-Send Settings */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#101111]">Auto-Send Settings</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                <Settings className="w-4 h-4" />
                Configure
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sendSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#154230]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#101111]">{setting.name}</div>
                        <div className="text-sm text-[#4A4A4A]">{setting.description}</div>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative ${setting.enabled ? 'bg-[#154230]' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${setting.enabled ? 'right-1' : 'left-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#154230] rounded-xl p-6 text-center">
              <Clock className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Scheduled Delivery</h3>
              <p className="text-sm text-white/70">Choose when invoices are sent automatically</p>
            </div>
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center">
              <CheckCircle className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Smart Reminders</h3>
              <p className="text-sm text-white/70">Automatic payment reminders at optimal times</p>
            </div>
            <div className="bg-[#154230] rounded-xl p-6 text-center">
              <Mail className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Email Tracking</h3>
              <p className="text-sm text-white/70">Know when clients open your invoices</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Never Miss a Payment</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Set up automatic invoice delivery and reminders to ensure you get paid on time.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Enable Auto-Send <ArrowRight className="w-4 h-4" />
          </Link>
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