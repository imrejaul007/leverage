'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Library,
  Search,
  ChevronRight,
  Star,
  Filter,
  ArrowRight,
  FileText,
  Truck,
  Shield,
  Users,
  Megaphone,
  Receipt,
  Bell,
  Menu,
  X,
  Play,
  Settings,
  Clock,
  Zap,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: FileText },
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

const agentCategories = [
  { id: 'all', name: 'All Agents', count: 24 },
  { id: 'classification', name: 'HS Classification', count: 6 },
  { id: 'compliance', name: 'Compliance', count: 5 },
  { id: 'documents', name: 'Documents', count: 4 },
  { id: 'shipping', name: 'Shipping', count: 5 },
  { id: 'payment', name: 'Payment', count: 4 },
];

const agents = [
  {
    id: 'hs-classifier',
    name: 'HS Code Classifier',
    description: 'Automatically classify products using the Harmonized System. Get accurate HS codes with confidence scores.',
    category: 'classification',
    rating: 4.9,
    uses: 12500,
    icon: BookOpen,
    color: '#154230',
    featured: true,
  },
  {
    id: 'duty-calculator',
    name: 'Duty Calculator',
    description: 'Calculate import/export duties for 180+ countries. Supports FTA preferential rates.',
    category: 'classification',
    rating: 4.8,
    uses: 9800,
    icon: Receipt,
    color: '#5D1E21',
    featured: true,
  },
  {
    id: 'compliance-checker',
    name: 'Compliance Checker',
    description: 'Verify product compliance across multiple markets. Check restrictions, certifications, and regulations.',
    category: 'compliance',
    rating: 4.9,
    uses: 8700,
    icon: Shield,
    color: '#154230',
    featured: true,
  },
  {
    id: 'document-prep',
    name: 'Document Preparer',
    description: 'Generate trade documents including invoices, packing lists, and certificates of origin.',
    category: 'documents',
    rating: 4.7,
    uses: 7200,
    icon: FileText,
    color: '#5D1E21',
    featured: false,
  },
  {
    id: 'shipping-quote',
    name: 'Shipping Quote Generator',
    description: 'Compare shipping rates from multiple carriers. Get instant quotes for FCL, LCL, and air freight.',
    category: 'shipping',
    rating: 4.6,
    uses: 6500,
    icon: Truck,
    color: '#154230',
    featured: false,
  },
  {
    id: 'lc-advisor',
    name: 'Letter of Credit Advisor',
    description: 'Review L/C documents for discrepancies. Get expert guidance on compliance requirements.',
    category: 'payment',
    rating: 4.8,
    uses: 4300,
    icon: MessageSquare,
    color: '#5D1E21',
    featured: false,
  },
  {
    id: 'incoterms-guide',
    name: 'Incoterms Guide',
    description: 'Understand Incoterms 2020 rules. Get guidance on responsibilities, risks, and costs.',
    category: 'shipping',
    rating: 4.5,
    uses: 5200,
    icon: Zap,
    color: '#154230',
    featured: false,
  },
  {
    id: 'restriction-checker',
    name: 'Trade Restriction Checker',
    description: 'Check if products are restricted or prohibited in target markets.',
    category: 'compliance',
    rating: 4.7,
    uses: 3800,
    icon: Shield,
    color: '#5D1E21',
    featured: false,
  },
];

export default function LibraryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter((agent) => {
    const matchesCategory = activeCategory === 'all' || agent.category === activeCategory;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredAgents = filteredAgents.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Agent Library</span>
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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Library className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                AI Agent Library
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Browse and deploy pre-built AI agents for every aspect of global trade. From HS classification to compliance checking.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search agents by name or capability..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-white/70">Total Agents</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm text-white/70">Total Uses</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-white/70">Avg. Rating</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-white/70">Categories</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Category Filters */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 p-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {agentCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-[#154230] text-white'
                      : 'bg-[#f7f5f1] text-[#4A4A4A] hover:bg-[#E6E2DA]'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Featured Agents */}
          {activeCategory === 'all' && featuredAgents.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#A6824A] fill-[#A6824A]" />
                Featured Agents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredAgents.map((agent, index) => {
                  const Icon = agent.icon;
                  return (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${agent.color}15` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: agent.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#101111]">{agent.name}</h3>
                            {agent.featured && <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-[#A6824A]" />
                              {agent.rating}
                            </span>
                            <span>{agent.uses.toLocaleString()} uses</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-[#4A4A4A] mb-4">{agent.description}</p>
                      <div className="flex gap-2">
                        <Link
                          href={`/ai/agents/${agent.id}`}
                          className="flex-1 py-2 bg-[#154230] text-white font-medium text-sm rounded-lg text-center hover:bg-[#1d5240] transition-colors"
                        >
                          View Details
                        </Link>
                        <button className="p-2 bg-[#A6824A] text-white rounded-lg hover:bg-[#8a6a3a] transition-colors">
                          <Play className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Agents */}
          <h2 className="text-xl font-bold text-[#101111] mb-4">
            {activeCategory === 'all' ? 'All Agents' : agentCategories.find((c) => c.id === activeCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAgents.map((agent, index) => {
              const Icon = agent.icon;
              const isGreen = index % 2 === 0;

              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl p-6 shadow-sm ${
                    isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">{agent.name}</h3>
                        {agent.featured && <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-white/70">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#A6824A]" />
                          {agent.rating}
                        </span>
                        <span>{agent.uses.toLocaleString()} uses</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 mb-4">{agent.description}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/ai/agents/${agent.id}`}
                      className="flex-1 py-2 bg-white/20 text-white font-medium text-sm rounded-lg text-center hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                      <Play className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredAgents.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Library className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#101111] mb-2">No agents found</h3>
              <p className="text-[#4A4A4A] mb-4">
                Try adjusting your search or browse all categories.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors"
              >
                View All Agents
              </button>
            </div>
          )}

          {/* Feature Blocks - Alternating */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Link href="/ai/agents/create" className="bg-[#154230] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Create Agent</h3>
              <p className="text-sm text-white/70">Build custom agents</p>
            </Link>
            <Link href="/ai/agents/templates" className="bg-[#5D1E21] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Library className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Templates</h3>
              <p className="text-sm text-white/70">Pre-built workflows</p>
            </Link>
            <Link href="/ai/agents/integration" className="bg-[#154230] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Integrations</h3>
              <p className="text-sm text-white/70">Connect your tools</p>
            </Link>
            <Link href="/ai/history" className="bg-[#5D1E21] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">History</h3>
              <p className="text-sm text-white/70">View past runs</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Build Your Own AI Agent</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Can not find what you need? Create custom AI agents tailored to your specific trade workflows.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ai/agents/create" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Create Agent <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ai/agents/templates" className="inline-flex items-center gap-2 px-8 py-3 bg-[#5D1E21] text-white font-semibold rounded-lg hover:bg-[#7b1c1f] transition-colors">
              Browse Templates
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
