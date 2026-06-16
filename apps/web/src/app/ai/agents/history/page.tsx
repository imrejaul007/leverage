'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  History,
  Search,
  Trash2,
  Clock,
  MessageSquare,
  ChevronRight,
  Calendar,
  Star,
  Copy,
  Download,
  Filter,
  Bell,
  Menu,
  X,
  ArrowRight,
  FileText,
  Truck,
  Shield,
  Users,
  Megaphone,
  Receipt,
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

const conversationHistory = [
  {
    id: 'conv-001',
    title: 'HS Code Classification - Electronics',
    preview: 'What is the correct HS code for wireless headphones?',
    date: 'Today, 2:30 PM',
    messages: 12,
    starred: true,
  },
  {
    id: 'conv-002',
    title: 'Import Duty Calculation - China to USA',
    preview: 'Calculate duties for textile imports under 500kg',
    date: 'Today, 11:15 AM',
    messages: 8,
    starred: false,
  },
  {
    id: 'conv-003',
    title: 'Document Requirements - Food Export',
    preview: 'What certificates are needed for exporting honey products?',
    date: 'Yesterday, 4:45 PM',
    messages: 15,
    starred: true,
  },
  {
    id: 'conv-004',
    title: 'Compliance Check - Auto Parts',
    preview: 'Verify compliance requirements for brake pad exports to EU',
    date: 'Jun 14, 10:20 AM',
    messages: 6,
    starred: false,
  },
  {
    id: 'conv-005',
    title: 'Shipping Options - FCL vs LCL',
    preview: 'Compare shipping methods for a 20ft container of furniture',
    date: 'Jun 13, 3:00 PM',
    messages: 10,
    starred: false,
  },
  {
    id: 'conv-006',
    title: 'Letter of Credit Guidance',
    preview: 'How to handle discrepancies in L/C documentation?',
    date: 'Jun 12, 9:30 AM',
    messages: 14,
    starred: false,
  },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterStarred, setFilterStarred] = useState(false);

  const filteredHistory = conversationHistory.filter((conv) => {
    const matchesSearch =
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStarred = filterStarred ? conv.starred : true;
    return matchesSearch && matchesStarred;
  });

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">AI History</span>
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
              <History className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Conversation History
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Access and manage all your AI conversations. Search through past interactions and pick up where you left off.
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
                    placeholder="Search your conversation history..."
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
              <p className="text-sm text-white/70">Total Conversations</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">2,340</p>
              <p className="text-sm text-white/70">Messages</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-white/70">Starred</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">30</p>
              <p className="text-sm text-white/70">Days Retained</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilterStarred(false)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    !filterStarred ? 'bg-[#154230] text-white' : 'bg-[#f7f5f1] text-[#4A4A4A] hover:bg-[#E6E2DA]'
                  }`}
                >
                  All Conversations
                </button>
                <button
                  onClick={() => setFilterStarred(true)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    filterStarred ? 'bg-[#154230] text-white' : 'bg-[#f7f5f1] text-[#4A4A4A] hover:bg-[#E6E2DA]'
                  }`}
                >
                  <Star className="w-4 h-4 inline mr-1" />
                  Starred
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#f7f5f1] text-[#4A4A4A] rounded-lg font-medium text-sm hover:bg-[#E6E2DA] transition-colors">
                  <Download className="w-4 h-4" />
                  Export All
                </button>
              </div>
            </div>
          </div>

          {/* Conversation List */}
          <div className="space-y-4">
            {filteredHistory.map((conv, index) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/ai/agents/chat/${conv.id}`} className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-[#154230]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-[#101111]">{conv.title}</h3>
                          {conv.starred && <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />}
                        </div>
                        <p className="text-sm text-[#4A4A4A]">{conv.preview}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#f7f5f1] rounded-lg transition-colors" title="Copy">
                        <Copy className="w-4 h-4 text-[#4A4A4A]" />
                      </button>
                      <button className="p-2 hover:bg-[#f7f5f1] rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-[#5D1E21]" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {conv.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {conv.messages} messages
                      </span>
                    </div>
                    <span className="text-[#154230] font-medium flex items-center gap-1">
                      Continue <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredHistory.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center">
              <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#101111] mb-2">No conversations found</h3>
              <p className="text-[#4A4A4A] mb-4">
                {filterStarred ? 'You have no starred conversations yet.' : 'Try adjusting your search terms.'}
              </p>
              <Link href="/ai" className="inline-flex items-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                Start New Conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Feature Blocks - Alternating */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Link href="/ai/agents" className="bg-[#154230] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">AI Agents</h3>
              <p className="text-sm text-white/70">Create custom agents</p>
            </Link>
            <Link href="/ai/prompts" className="bg-[#5D1E21] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Prompts</h3>
              <p className="text-sm text-white/70">Manage your prompts</p>
            </Link>
            <Link href="/ai/expertise" className="bg-[#154230] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Expertise</h3>
              <p className="text-sm text-white/70">Trade knowledge base</p>
            </Link>
            <Link href="/ai/templates" className="bg-[#5D1E21] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Templates</h3>
              <p className="text-sm text-white/70">Pre-built solutions</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Continue Your Trade Journey</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Start a new conversation with our AI assistant or explore pre-built agents for common trade scenarios.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ai" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              New Conversation <ArrowRight className="w-4 h-4" />
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
