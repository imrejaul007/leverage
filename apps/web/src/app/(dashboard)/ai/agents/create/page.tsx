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
  Globe,
  ChevronRight,
  Menu,
  X,
  Bell,
  ArrowRight,
  FileText,
  Users,
  Plus,
  Save,
  Settings,
  Wand2,
  Zap,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Shield },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Billing', href: '/billing', icon: FileText },
  { name: 'Ads', href: '/ads', icon: FileText },
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

const agentTypes = [
  { id: 'compliance', name: 'Compliance', desc: 'HS codes, duties, regulations', icon: Shield },
  { id: 'market', name: 'Market Research', desc: 'Trends, competitors, pricing', icon: Globe },
  { id: 'documents', name: 'Document Processing', desc: 'Invoices, B/L, certificates', icon: FileText },
  { id: 'negotiation', name: 'Negotiation', desc: 'Counterparty analysis, strategy', icon: Users },
  { id: 'custom', name: 'Custom', desc: 'Build from scratch', icon: Sparkles },
];

export default function AgentsCreatePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentDesc, setAgentDesc] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Create Agent</span>
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
              <Wand2 className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Create Custom Agent
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Build specialized AI agents tailored to your specific trade workflows and requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            {/* Step 1: Choose Type */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#154230] text-white rounded-full flex items-center justify-center text-sm">1</span>
                Choose Agent Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {agentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedType === type.id
                          ? 'border-[#154230] bg-[#154230]/5'
                          : 'border-[#E6E2DA] hover:border-[#154230]/50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${selectedType === type.id ? 'text-[#154230]' : 'text-[#4A4A4A]'}`} />
                      <h3 className="font-semibold text-[#101111]">{type.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{type.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Agent Details */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#154230] text-white rounded-full flex items-center justify-center text-sm">2</span>
                Agent Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#101111] mb-2">Agent Name</label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g., My Customs Assistant"
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#101111] mb-2">Description</label>
                  <textarea
                    value={agentDesc}
                    onChange={(e) => setAgentDesc(e.target.value)}
                    placeholder="Describe what this agent does..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: System Prompt */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#154230] text-white rounded-full flex items-center justify-center text-sm">3</span>
                System Prompt
              </h2>
              <div>
                <label className="block text-sm font-medium text-[#101111] mb-2">
                  Define agent behavior and capabilities
                </label>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="You are a specialized trade compliance assistant. You help users with HS code classification, duty calculation, and regulatory compliance for [specific product category or region]..."
                  rows={8}
                  className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20 resize-none font-mono text-sm"
                />
                <p className="text-xs text-[#4A4A4A] mt-2">
                  Tip: Be specific about the agent's role, knowledge domain, and response format.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </button>
              <button className="flex-1 px-6 py-3 bg-[#A6824A] hover:bg-[#b8925a] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Save Agent
              </button>
            </div>
          </div>
        </div>
      </main>

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
