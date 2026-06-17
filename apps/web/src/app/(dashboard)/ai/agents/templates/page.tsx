'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Plus,
  Copy,
  Edit,
  Trash2,
  Globe,
  FileText,
  Truck,
  Shield,
  Megaphone,
  Receipt,
  Users,
  Search,
  Filter,
  ArrowRight,
  Menu,
  X,
  Bell,
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

const agentTemplates = [
  { id: '1', name: 'Trade Document Analyzer', description: 'Extract key data from invoices, BLs, and certificates', category: 'Documents', uses: 1247 },
  { id: '2', name: 'HS Code Classifier', description: 'Automatically classify products with accurate HS codes', category: 'Compliance', uses: 892 },
  { id: '3', name: 'Quote Generator', description: 'Create professional quotes from RFQ details', category: 'Sales', uses: 2156 },
  { id: '4', name: 'Shipment Tracker', description: 'Monitor and update shipment statuses automatically', category: 'Logistics', uses: 743 },
  { id: '5', name: 'Compliance Checker', description: 'Verify trade documents against regulations', category: 'Compliance', uses: 534 },
  { id: '6', name: 'Market Intelligence', description: 'Gather competitor and market data', category: 'Research', uses: 412 },
];

export default function AgentTemplatesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/ai" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Agent Templates</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium text-[#154230]">AI</Link>
              <Link href="/consultations" className="nav-link font-medium">Consultations</Link>
            </nav>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors"><Bell className="w-5 h-5 text-[#4A4A4A]" /></button>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">Sign In</Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <Link href="/ai/agents" className="text-white/70 hover:text-white">← Back to Agents</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8 mt-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bot className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Agent Templates</h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Pre-built AI agents ready to use. Clone any template to customize for your needs.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">25+</p><p className="text-sm text-white/70">Templates</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">5,000+</p><p className="text-sm text-white/70">Active Uses</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">95%</p><p className="text-sm text-white/70">Accuracy</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">24/7</p><p className="text-sm text-white/70">Available</p></div>
          </motion.div>
        </div>
      </section>

      {/* Templates Grid */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Search & Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                <input type="text" placeholder="Search templates..." className="w-full h-12 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#154230]" />
              </div>
              <select className="h-12 px-4 border border-black/10 rounded-xl text-[#4A4A4A] focus:outline-none focus:border-[#154230]">
                <option>All Categories</option>
                <option>Documents</option>
                <option>Compliance</option>
                <option>Sales</option>
                <option>Logistics</option>
                <option>Research</option>
              </select>
            </div>
          </div>

          {/* Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentTemplates.map((template) => (
              <motion.div key={template.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-xs bg-[#f7f5f1] text-[#4A4A4A] px-3 py-1 rounded-full">{template.category}</span>
                </div>
                <h3 className="font-bold text-[#101111] mb-2">{template.name}</h3>
                <p className="text-sm text-[#4A4A4A] mb-4">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#4A4A4A]">{template.uses.toLocaleString()} uses</span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#f7f5f1] rounded-lg transition-colors" title="Duplicate">
                      <Copy className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <Link href="/ai/agents/create" className="px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors flex items-center gap-2">
                      Use <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Create Custom */}
          <div className="mt-8 bg-[#154230] rounded-2xl p-8 text-center">
            <Bot className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Create Your Own Agent</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">Build a custom AI agent tailored to your specific business needs</p>
            <Link href="/ai/agents/create" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              <Plus className="w-5 h-5" /> Create Agent
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
            <p className="text-white/70 text-sm text-center">© 2026 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
