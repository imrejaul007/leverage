'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Sparkles,
  MessageSquare,
  Search,
  Calculator,
  TrendingUp,
  Shield,
  Globe,
  ChevronRight,
  Menu,
  X,
  Bell,
  ArrowRight,
  FileText,
  Users,
  Briefcase,
  Scale,
  Megaphone,
  Truck,
  Filter,
  Grid,
  List,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Billing', href: '/billing', icon: Megaphone },
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

const allAgents = [
  { name: 'Compliance Advisor', desc: 'HS code classification & duty optimization', icon: Shield, category: 'Compliance', color: '#154230' },
  { name: 'Market Intelligence', desc: 'Trade opportunities & competitor analysis', icon: BarChart3, category: 'Market', color: '#5D1E21' },
  { name: 'Document Assistant', desc: 'Invoice & B/L generation & review', icon: FileText, category: 'Documents', color: '#154230' },
  { name: 'Negotiation Coach', desc: 'Counterparty analysis & strategy', icon: Users, category: 'Negotiation', color: '#5D1E21' },
  { name: 'Cost Calculator', desc: 'Landed cost estimation & comparison', icon: Calculator, category: 'Finance', color: '#154230' },
  { name: 'Supplier Finder', desc: 'Global supplier discovery & vetting', icon: Search, category: 'Sourcing', color: '#5D1E21' },
  { name: 'Trend Analyzer', desc: 'Market trends & pricing insights', icon: TrendingUp, category: 'Market', color: '#154230' },
  { name: 'Custom Agent', desc: 'Build your own AI agent', icon: Sparkles, category: 'Custom', color: '#A6824A' },
];

const categories = ['All', 'Compliance', 'Market', 'Documents', 'Negotiation', 'Finance', 'Sourcing', 'Custom'];

export default function AgentsAllPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAgents = selectedCategory === 'All'
    ? allAgents
    : allAgents.filter(agent => agent.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">AI Agents</span>
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
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">AI</Link>
                <Link href="/consultations" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                All AI Agents
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore our complete collection of specialized AI agents for every aspect of international trade.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
              <p className="text-2xl font-bold">{allAgents.length}</p>
              <p className="text-sm text-white/70">Total Agents</p>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-white/70">Categories</p>
            </div>
            <div className="bg-white/10 rounded-xl px-6 py-3 text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Availability</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Filters and View Toggle */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-4 h-4 text-[#4A4A4A] flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#154230] text-white'
                      : 'bg-[#f7f5f1] text-[#4A4A4A] hover:bg-[#E6E2DA]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#154230] text-white' : 'bg-[#f7f5f1] text-[#4A4A4A]'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#154230] text-white' : 'bg-[#f7f5f1] text-[#4A4A4A]'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Agents Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredAgents.map((agent, index) => {
                const Icon = agent.icon;
                return (
                  <Link
                    key={agent.name}
                    href={`/ai/agents/${agent.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4`} style={{ backgroundColor: agent.color + '20' }}>
                      <Icon className="w-7 h-7" style={{ color: agent.color }} />
                    </div>
                    <span className="text-xs font-medium text-[#4A4A4A] mb-2 block">{agent.category}</span>
                    <h3 className="font-bold text-[#101111] mb-1">{agent.name}</h3>
                    <p className="text-sm text-[#4A4A4A]">{agent.desc}</p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAgents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <Link
                    key={agent.name}
                    href={`/ai/agents/${agent.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: agent.color + '20' }}>
                      <Icon className="w-7 h-7" style={{ color: agent.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-[#4A4A4A] px-2 py-0.5 bg-[#f7f5f1] rounded">{agent.category}</span>
                      </div>
                      <h3 className="font-bold text-[#101111]">{agent.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{agent.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#4A4A4A] flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Build Your Own Agent</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Can not find what you need? Create a custom AI agent tailored to your specific trade requirements.
          </p>
          <Link href="/ai/agents/create" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Create Custom Agent <ArrowRight className="w-4 h-4" />
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
