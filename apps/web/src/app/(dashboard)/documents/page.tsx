'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FileText,
  Plus,
  Clock,
  CheckCircle,
  Search,
  ChevronRight,
  ArrowRight,
  Shield,
  Truck,
  Globe,
  Users,
  Star,
  BarChart3,
  Menu,
  X,
  Bell,
  FileCheck,
  ScrollText,
  CreditCard,
  Send,
  Download,
  Eye,
  Zap,
  Bot,
  Receipt,
  Megaphone,
} from 'lucide-react';

const documentTypes = [
  { icon: FileText, name: 'Commercial Invoice', color: '#154230', desc: 'Primary document for customs & payment', fields: 9 },
  { icon: Truck, name: 'Bill of Lading', color: '#A6824A', desc: 'Proof of shipment receipt', fields: 8 },
  { icon: Globe, name: 'Certificate of Origin', color: '#5D1E21', desc: 'Verify product origin', fields: 6 },
  { icon: CreditCard, name: 'Letter of Credit', color: '#154230', desc: 'Bank payment guarantee', fields: 7 },
  { icon: ScrollText, name: 'Packing List', color: '#A6824A', desc: 'Detailed cargo inventory', fields: 7 },
  { icon: FileCheck, name: 'Customs Invoice', color: '#5D1E21', desc: 'For customs clearance', fields: 8 },
];

const recentDocuments = [
  { id: 1, name: 'Invoice INV-2024-001', type: 'Invoice', status: 'approved', date: 'Jan 15, 2024', amount: '$45,000' },
  { id: 2, name: 'B/L BOL-2024-015', type: 'Bill of Lading', status: 'sent', date: 'Jan 14, 2024', buyer: 'ABC Imports' },
  { id: 3, name: 'COO COO-2024-008', type: 'Certificate of Origin', status: 'pending', date: 'Jan 17, 2024', buyer: 'XYZ Corp' },
  { id: 4, name: 'P/L PL-2024-022', type: 'Packing List', status: 'approved', date: 'Jan 13, 2024', amount: '$28,500' },
];

const features = [
  { icon: Zap, title: 'AI-Powered', desc: 'Smart suggestions and auto-fill' },
  { icon: Shield, title: 'Legally Compliant', desc: 'Meets international standards' },
  { icon: Globe, title: 'Export-Ready', desc: 'Accepted worldwide' },
  { icon: Download, title: 'PDF & Print', desc: 'Professional formatting' },
];

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

export default function DocumentsLandingPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'my-docs'>('create');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      sent: 'bg-blue-100 text-blue-700',
      draft: 'bg-gray-100 text-gray-700',
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

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
              <Link href="/documents" className="nav-link font-medium text-[#154230]">Documents</Link>
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
                <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Documents</Link>
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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Trade Document Generator
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Create professional trade documents in minutes. AI-powered, legally compliant, export-ready.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documents or templates..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#5D1E21] hover:bg-[#7b1c1f] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-8">
            {documentTypes.slice(0, 6).map((doc) => {
              const Icon = doc.icon;
              return (
                <Link key={doc.name} href={`/documents?type=${encodeURIComponent(doc.name)}`} className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center">{doc.name.split(' ')[0]}</span>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('create')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'create' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Plus className="w-4 h-4 inline mr-2" />
                Create Document
              </button>
              <button onClick={() => setActiveTab('my-docs')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'my-docs' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <FileText className="w-4 h-4 inline mr-2" />
                My Documents
              </button>
            </div>

            {activeTab === 'create' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-6">Select Document Type</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentTypes.map((doc) => {
                    const Icon = doc.icon;
                    return (
                      <Link
                        key={doc.name}
                        href={`/documents/generate?type=${encodeURIComponent(doc.name)}`}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${selectedType === doc.name ? 'border-[#154230] bg-[#154230]/5' : 'border-black/5 hover:border-[#154230]/30 hover:bg-[#154230]/5'}`}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: doc.color + '15' }}>
                          <Icon className="w-6 h-6" style={{ color: doc.color }} />
                        </div>
                        <h3 className="font-bold text-[#101111] mb-1">{doc.name}</h3>
                        <p className="text-sm text-[#4A4A4A] mb-3">{doc.desc}</p>
                        <span className="text-xs text-[#4A4A4A]">{doc.fields} fields</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'my-docs' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">Recent Documents</h2>
                  <Link href="/documents/generate" className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    <Plus className="w-4 h-4" />
                    New Document
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentDocuments.map((doc) => (
                    <Link key={doc.id} href={`/documents/${doc.id}`} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#154230]" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#101111]">{doc.name}</div>
                          <div className="text-sm text-[#4A4A4A]">{doc.type} - {doc.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(doc.status)}`}>{doc.status}</span>
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="p-2 hover:bg-white rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-[#4A4A4A]" />
                        </button>
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="p-2 hover:bg-white rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-[#4A4A4A]" />
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isGreen = index % 2 === 0;
              return (
                <Link key={feature.title} href={`/documents/${feature.title.toLowerCase().replace(/\s+/g, '-')}`} className={`rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#154230] to-[#5D1E21] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Create Your Documents?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Start generating professional trade documents in minutes. No design skills needed.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Get Started Free <ArrowRight className="w-4 h-4" />
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
                © 2026 LEVERAGE. All rights reserved.
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