'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Users,
  Bell,
  Lock,
  Globe,
  Mail,
  Shield,
  ArrowRight,
  Menu,
  X,
  FileText,
  Bot,
  Truck,
  Megaphone,
  Receipt,
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

export default function SettingsLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Settings</span>
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
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">Sign In</Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
            </div>
          </div>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-black/5">
              <nav className="flex flex-col gap-2">
                <Link href="/" className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/documents" className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
                <Link href="/consultations" className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <SettingsIcon className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Account Settings</h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Manage your account, preferences, and security settings all in one place.</p>
          </motion.div>
        </div>
      </section>

      {/* Settings */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/settings/profile" className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center"><Users className="w-6 h-6 text-[#154230]" /></div>
                <div><h3 className="font-bold text-[#101111]">Profile Settings</h3><p className="text-sm text-[#4A4A4A]">Update your profile information</p></div>
              </div>
            </Link>
            <Link href="/settings/security" className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5D1E21]/10 rounded-xl flex items-center justify-center"><Lock className="w-6 h-6 text-[#5D1E21]" /></div>
                <div><h3 className="font-bold text-[#101111]">Security</h3><p className="text-sm text-[#4A4A4A]">Password and 2FA settings</p></div>
              </div>
            </Link>
            <Link href="/settings/notifications" className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center"><Bell className="w-6 h-6 text-[#154230]" /></div>
                <div><h3 className="font-bold text-[#101111]">Notifications</h3><p className="text-sm text-[#4A4A4A]">Email and push preferences</p></div>
              </div>
            </Link>
            <Link href="/settings/company" className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5D1E21]/10 rounded-xl flex items-center justify-center"><Globe className="w-6 h-6 text-[#5D1E21]" /></div>
                <div><h3 className="font-bold text-[#101111]">Company</h3><p className="text-sm text-[#4A4A4A]">Business profile settings</p></div>
              </div>
            </Link>
            <Link href="/settings/billing" className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center"><Receipt className="w-6 h-6 text-[#154230]" /></div>
                <div><h3 className="font-bold text-[#101111]">Billing</h3><p className="text-sm text-[#4A4A4A]">Plans and payment methods</p></div>
              </div>
            </Link>
            <Link href="/settings/api" className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5D1E21]/10 rounded-xl flex items-center justify-center"><Mail className="w-6 h-6 text-[#5D1E21]" /></div>
                <div><h3 className="font-bold text-[#101111]">API Access</h3><p className="text-sm text-[#4A4A4A]">Developer integrations</p></div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#154230]">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">The operating system for global trade.</p>
              </div>
              <div><h4 className="text-white font-bold mb-4 text-sm">Platform</h4><ul className="space-y-2 text-sm">{platformLinks.map((link) => (<li key={link.name}><Link href={link.href} className="text-white/70 hover:text-white transition-colors">{link.name}</Link></li>))}</ul></div>
            </div>
          </div>
        </div>
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <p className="text-white/70 text-sm text-center">© 2024 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
