'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Sparkles,
  MessageSquare,
  Shield,
  BarChart3,
  FileText,
  Users,
  Search,
  Plus,
  ChevronRight,
  Menu,
  X,
  Bell,
  ArrowRight,
  Truck,
  Globe,
  Receipt,
  Megaphone,
  Settings,
  Play,
  Star,
  Clock,
  Zap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
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

const aiAgents = [
  {
    id: 'compliance-advisor',
    name: 'Compliance Advisor',
    description: 'HS code classification and duty optimization for your shipments',
    icon: Shield,
    color: '#154230',
    rating: 4.9,
    uses: '12.5K',
    capabilities: ['HS Code Classification', 'Duty Calculation', 'FTA Eligibility', 'Import Restrictions'],
  },
  {
    id: 'market-intelligence',
    name: 'Market Intelligence',
    description: 'Trade opportunities, competitor analysis, and market research',
    icon: BarChart3,
    color: '#5D1E21',
    rating: 4.8,
    uses: '8.2K',
    capabilities: ['Supplier Discovery', 'Price Trends', 'Competitor Analysis', 'Demand Forecasting'],
  },
  {
    id: 'document-assistant',
    name: 'Document Assistant',
    description: 'Generate, review, and optimize trade documents instantly',
    icon: FileText,
    color: '#154230',
    rating: 4.9,
    uses: '15.1K',
    capabilities: ['Invoice Generation', 'BL/AWB Review', 'Certificate of Origin', 'Packing Lists'],
  },
  {
    id: 'negotiation-coach',
    name: 'Negotiation Coach',
    description: 'Counterparty analysis and negotiation strategy recommendations',
    icon: Users,
    color: '#5D1E21',
    rating: 4.7,
    uses: '5.4K',
    capabilities: ['Company Research', 'Risk Assessment', 'Price Benchmarks', 'Strategy Tips'],
  },
  {
    id: 'logistics-planner',
    name: 'Logistics Planner',
    description: 'Optimize shipping routes and freight cost analysis',
    icon: Truck,
    color: '#154230',
    rating: 4.8,
    uses: '7.3K',
    capabilities: ['Route Optimization', 'Cost Comparison', 'Carrier Selection', 'Transit Times'],
  },
  {
    id: 'trade-finance',
    name: 'Trade Finance Advisor',
    description: 'Guidance on Letters of Credit, insurance, and payment terms',
    icon: Briefcase,
    color: '#5D1E21',
    rating: 4.6,
    uses: '3.8K',
    capabilities: ['LC Requirements', 'Insurance Options', 'Payment Terms', 'Risk Mitigation'],
  },
];

const recentAgentChats = [
  { agent: 'Compliance Advisor', query: 'What HS code applies to lithium batteries?', time: '2 min ago' },
  { agent: 'Market Intelligence', query: 'Find electronics suppliers in Vietnam', time: '15 min ago' },
  { agent: 'Document Assistant', query: 'Review my commercial invoice', time: '1 hour ago' },
];

export default function AIAgentsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bot className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                AI Trade Agents
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Specialized AI agents for every aspect of international trade. Get expert assistance on demand.
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
                    placeholder="What do you need help with?"
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Sparkles className="w-5 h-5" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-white/70">Specialized Agents</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">52K+</p>
              <p className="text-sm text-white/70">Tasks Completed</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-white/70">Avg Rating</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">&lt;3s</p>
              <p className="text-sm text-white/70">Response Time</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Quick Actions - Alternating Solid Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Link href="/ai/agents/create" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Create Agent</h3>
                <p className="text-sm text-white/70">Build custom agent</p>
              </div>
            </Link>
            <Link href="/ai/agents/library" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Agent Library</h3>
                <p className="text-sm text-white/70">Browse all agents</p>
              </div>
            </Link>
            <Link href="/ai/agents/templates" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Templates</h3>
                <p className="text-sm text-white/70">Pre-built workflows</p>
              </div>
            </Link>
          </div>

          {/* AI Agents Grid */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101111]">Available Agents</h2>
              <Link href="/ai/agents/all" className="flex items-center gap-1 text-[#154230] font-medium hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiAgents.map((agent, index) => {
                const Icon = agent.icon;
                const isGreen = index % 2 === 0;
                return (
                  <div
                    key={agent.id}
                    className={`rounded-xl overflow-hidden ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                          <Star className="w-3 h-3 text-white fill-white" />
                          <span className="text-xs text-white font-medium">{agent.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-white text-lg mb-2">{agent.name}</h3>
                      <p className="text-white/70 text-sm mb-4">{agent.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {agent.capabilities.slice(0, 3).map((cap) => (
                          <span key={cap} className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white">
                            {cap}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-white/70 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {agent.uses} uses
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                        className="w-full py-2 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Chat
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Agent Chats */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101111]">Recent Agent Conversations</h2>
              <Link href="/ai/agents/history" className="flex items-center gap-1 text-[#154230] font-medium hover:underline">
                View History <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentAgentChats.map((chat, index) => (
                <Link
                  key={index}
                  href={`/ai/agents/${chat.agent.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'
                    }`}>
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#101111]">{chat.agent}</h3>
                      <p className="text-sm text-[#4A4A4A]">{chat.query}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#4A4A4A]">{chat.time}</span>
                    <ChevronRight className="w-5 h-5 text-[#4A4A4A]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Features - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/ai/agents/custom" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Custom Agents</h3>
              <p className="text-sm text-white/70">Build your own</p>
            </Link>
            <Link href="/ai/agents/multilingual" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Multilingual</h3>
              <p className="text-sm text-white/70">50+ languages</p>
            </Link>
            <Link href="/ai/agents/fast" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Fast Responses</h3>
              <p className="text-sm text-white/70">Under 3 seconds</p>
            </Link>
            <Link href="/ai/agents/integration" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">API Access</h3>
              <p className="text-sm text-white/70">Integrate into your systems</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let AI Do the Heavy Lifting</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Specialized AI agents are ready to help with compliance, documents, market research, and more.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Try AI Agents Free <ArrowRight className="w-4 h-4" />
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
