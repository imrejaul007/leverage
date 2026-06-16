'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Download,
  Bell,
  Menu,
  X,
  ArrowRight,
  FileSpreadsheet,
  FileText,
  FileJson,
  Settings,
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

const exportFormats = [
  { id: 1, name: 'CSV', icon: FileSpreadsheet, description: 'Compatible with Excel and Google Sheets', count: 45 },
  { id: 2, name: 'PDF', icon: FileText, description: 'Professional formatted documents', count: 32 },
  { id: 3, name: 'JSON', icon: FileJson, description: 'For API integrations and custom systems', count: 18 },
];

const recentExports = [
  { id: 1, name: 'Q4 2023 Payments Export', format: 'CSV', date: 'Jan 15, 2024', records: 156 },
  { id: 2, name: 'December Invoice Report', format: 'PDF', date: 'Jan 10, 2024', records: 24 },
  { id: 3, name: 'Client Payment History', format: 'CSV', date: 'Jan 8, 2024', records: 89 },
];

export default function ExportPage() {
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
              <Download className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Export Payments
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Export your payment data in multiple formats for accounting and reporting.
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
              <p className="text-2xl font-bold text-[#154230]">95</p>
              <p className="text-sm text-[#4A4A4A]">Total Exports</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">2,450</p>
              <p className="text-sm text-[#4A4A4A]">Records Exported</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">3</p>
              <p className="text-sm text-[#4A4A4A]">Export Formats</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">100%</p>
              <p className="text-sm text-[#4A4A4A]">Data Accuracy</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <FileSpreadsheet className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Export to CSV</h3>
                <p className="text-sm text-white/70">For spreadsheets</p>
              </div>
            </button>
            <button className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Export to PDF</h3>
                <p className="text-sm text-white/70">For reports</p>
              </div>
            </button>
            <button className="bg-[#A6824A] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Schedule Exports</h3>
                <p className="text-sm text-white/70">Automated exports</p>
              </div>
            </button>
          </div>

          {/* Export Formats */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111]">Export Formats</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exportFormats.map((format) => {
                  const Icon = format.icon;
                  return (
                    <div key={format.id} className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#154230]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#101111]">{format.name}</div>
                        <div className="text-sm text-[#4A4A4A]">{format.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-[#154230]">{format.count} exports</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Exports */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111]">Recent Exports</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentExports.map((export_item) => (
                  <div key={export_item.id} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Download className="w-6 h-6 text-[#154230]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#101111]">{export_item.name}</div>
                        <div className="text-sm text-[#4A4A4A]">{export_item.date} - {export_item.records} records</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#154230]/10 text-[#154230] rounded-full text-xs font-medium">
                        {export_item.format}
                      </span>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-[#4A4A4A]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#154230] rounded-xl p-6 text-center">
              <FileSpreadsheet className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Spreadsheet Ready</h3>
              <p className="text-sm text-white/70">Export data ready for Excel and Google Sheets</p>
            </div>
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center">
              <FileText className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Professional PDFs</h3>
              <p className="text-sm text-white/70">Formatted reports ready to share</p>
            </div>
            <div className="bg-[#154230] rounded-xl p-6 text-center">
              <Download className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Scheduled Exports</h3>
              <p className="text-sm text-white/70">Automate your export workflow</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Export Your Payment Data</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Download your payment data in the format that works best for your accounting workflow.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Exporting <ArrowRight className="w-4 h-4" />
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