'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Sparkles,
  Search,
  Plus,
  Copy,
  Edit,
  Trash2,
  ChevronRight,
  Menu,
  X,
  Bell,
  ArrowRight,
  Truck,
  Globe,
  Receipt,
  Megaphone,
  Shield,
  FileText,
  Users,
  Clock,
  Star,
  Bookmark,
  BookmarkCheck,
  Send,
  Lightbulb,
  Tag,
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

const savedPrompts = [
  {
    id: 1,
    title: 'HS Code Classification Request',
    prompt: 'Help me classify this product for import into [COUNTRY]. Product description: [DESCRIPTION]. What HS code applies and what duties apply?',
    category: 'Compliance',
    uses: 45,
    lastUsed: '2 hours ago',
    rating: 5,
  },
  {
    id: 2,
    title: 'Supplier Discovery Query',
    prompt: 'Find verified suppliers for [PRODUCT] in [COUNTRY/REGION]. Include contact information, minimum order quantities, and typical lead times.',
    category: 'Marketplace',
    uses: 32,
    lastUsed: 'Yesterday',
    rating: 4,
  },
  {
    id: 3,
    title: 'Commercial Invoice Review',
    prompt: 'Review this commercial invoice for accuracy and completeness. Check for any errors in HS codes, values, or missing required fields. [ATTACH INVOICE]',
    category: 'Documents',
    uses: 28,
    lastUsed: '3 days ago',
    rating: 5,
  },
  {
    id: 4,
    title: 'Duty Calculation',
    prompt: 'Calculate the estimated landed cost for importing [PRODUCT] from [ORIGIN] to [DESTINATION]. Include product cost, shipping, insurance, duties, and taxes.',
    category: 'Compliance',
    uses: 56,
    lastUsed: '1 week ago',
    rating: 5,
  },
  {
    id: 5,
    title: 'Contract Clause Analysis',
    prompt: 'Review this Incoterms clause and explain the obligations, risks, and costs for both buyer and seller. Identify any unfavorable terms. [ATTACH CLAUSE]',
    category: 'Legal',
    uses: 18,
    lastUsed: '2 weeks ago',
    rating: 4,
  },
  {
    id: 6,
    title: 'Freight Quote Comparison',
    prompt: 'Compare shipping options for [CARGO DESCRIPTION] from [ORIGIN PORT] to [DESTINATION PORT]. Consider sea freight vs air freight in terms of cost, time, and suitability.',
    category: 'Freight',
    uses: 23,
    lastUsed: '1 week ago',
    rating: 4,
  },
];

const promptCategories = [
  { name: 'All', count: 156, color: '#154230' },
  { name: 'Compliance', count: 42, color: '#5D1E21' },
  { name: 'Documents', count: 38, color: '#154230' },
  { name: 'Marketplace', count: 29, color: '#5D1E21' },
  { name: 'Freight', count: 24, color: '#154230' },
  { name: 'Legal', count: 23, color: '#5D1E21' },
];

const recommendedPrompts = [
  { title: 'Calculate import duties for [product]', category: 'Compliance' },
  { title: 'Find suppliers for [product] in [country]', category: 'Marketplace' },
  { title: 'Review invoice for errors', category: 'Documents' },
  { title: 'Compare shipping options', category: 'Freight' },
];

export default function SavedPromptsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const copyPrompt = (id: number, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Saved Prompts</span>
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
              <Sparkles className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Saved Prompts
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Your collection of reusable AI prompts for international trade tasks. Save time and maintain consistency.
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
                    placeholder="Search saved prompts..."
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
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-white/70">Saved Prompts</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-white/70">Categories</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">342</p>
              <p className="text-sm text-white/70">Total Uses</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">4.7</p>
              <p className="text-sm text-white/70">Avg Rating</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Quick Actions - Alternating Solid Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Link href="/ai/prompts/create" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Create Prompt</h3>
                <p className="text-sm text-white/70">Add new prompt</p>
              </div>
            </Link>
            <Link href="/ai/prompts/templates" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Prompt Templates</h3>
                <p className="text-sm text-white/70">Browse templates</p>
              </div>
            </Link>
            <Link href="/ai/prompts/import" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Import/Export</h3>
                <p className="text-sm text-white/70">Share your prompts</p>
              </div>
            </Link>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-[#101111] mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {promptCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.name
                      ? 'text-white'
                      : 'bg-[#f7f5f1] text-[#4A4A4A] hover:bg-[#E6E2DA]'
                  }`}
                  style={selectedCategory === cat.name ? { backgroundColor: cat.color } : {}}
                >
                  {cat.name}
                  <span className={`text-xs ${selectedCategory === cat.name ? 'text-white/70' : 'text-[#4A4A4A]'}`}>
                    ({cat.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Prompts */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#101111]">Recommended for You</h2>
              <Lightbulb className="w-5 h-5 text-[#A6824A]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {recommendedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="px-4 py-3 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-xl text-sm transition-colors text-left flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#154230]" />
                  {prompt.title}
                  <span className="text-xs text-[#4A4A4A] ml-2">({prompt.category})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Saved Prompts List */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101111]">Your Saved Prompts</h2>
              <span className="text-sm text-[#4A4A4A]">{savedPrompts.length} prompts</span>
            </div>
            <div className="space-y-4">
              {savedPrompts.map((prompt, index) => (
                <div
                  key={prompt.id}
                  className={`p-6 rounded-xl ${
                    index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-white text-lg">{prompt.title}</h3>
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                        {prompt.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                      <Star className="w-3 h-3 text-white fill-white" />
                      <span className="text-xs text-white font-medium">{prompt.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-4 font-mono leading-relaxed">
                    {prompt.prompt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Used {prompt.uses} times
                      </span>
                      <span className="flex items-center gap-1">
                        Last used: {prompt.lastUsed}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyPrompt(prompt.id, prompt.prompt)}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        title="Copy prompt"
                      >
                        {copiedPrompt === prompt.id ? (
                          <Sparkles className="w-4 h-4 text-white" />
                        ) : (
                          <Copy className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <button
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        title="Edit prompt"
                      >
                        <Edit className="w-4 h-4 text-white" />
                      </button>
                      <button
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        title="Bookmark"
                      >
                        <BookmarkCheck className="w-4 h-4 text-white" />
                      </button>
                      <button
                        className="px-3 py-2 bg-white text-[#154230] font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Use
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/ai/prompts/share" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Team Sharing</h3>
              <p className="text-sm text-white/70">Share with colleagues</p>
            </Link>
            <Link href="/ai/prompts/templates" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Templates</h3>
              <p className="text-sm text-white/70">Pre-built prompts</p>
            </Link>
            <Link href="/ai/prompts/organize" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Tag className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Organize</h3>
              <p className="text-sm text-white/70">Tag and categorize</p>
            </Link>
            <Link href="/ai/prompts/analytics" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Analytics</h3>
              <p className="text-sm text-white/70">Track usage stats</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Build Your Prompt Library</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Save time with reusable prompts tailored for international trade workflows.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Saving Prompts <ArrowRight className="w-4 h-4" />
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
