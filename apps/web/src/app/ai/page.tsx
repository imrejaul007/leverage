'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Sparkles,
  Send,
  MessageSquare,
  Zap,
  FileText,
  Search,
  Calculator,
  TrendingUp,
  Shield,
  Globe,
  ChevronRight,
  Menu,
  X,
  Plus,
  Copy,
  RefreshCw,
  Lightbulb,
  BarChart3,
  Users,
  Briefcase,
  Scale,
  Bell,
  ArrowRight,
  Receipt,
  Megaphone,
  Truck,
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

const aiFeatures = [
  { icon: FileText, name: 'Document Analysis', desc: 'Review and optimize trade documents', color: '#154230' },
  { icon: Search, name: 'Market Research', desc: 'Find buyers and suppliers globally', color: '#A6824A' },
  { icon: Calculator, name: 'Cost Estimation', desc: 'Calculate landed costs instantly', color: '#5D1E21' },
  { icon: TrendingUp, name: 'Trend Analysis', desc: 'Stay ahead of market changes', color: '#154230' },
];

const aiAgents = [
  { name: 'Compliance Advisor', desc: 'HS code classification & duty optimization', icon: Shield },
  { name: 'Market Intelligence', desc: 'Trade opportunities & competitor analysis', icon: BarChart3 },
  { name: 'Document Assistant', desc: 'Invoice & B/L generation & review', icon: FileText },
  { name: 'Negotiation Coach', desc: 'Counterparty analysis & strategy', icon: Users },
];

const quickPrompts = [
  'Find suppliers for electronics in Vietnam',
  'Calculate duties for importing auto parts from Japan',
  'Review this commercial invoice for errors',
  'What are current steel import trends to the US?',
];

const recentChats = [
  { id: 1, title: 'Vietnam Electronics Suppliers', time: '2 hours ago' },
  { id: 2, title: 'Steel Import Duties Analysis', time: 'Yesterday' },
  { id: 3, title: 'Commercial Invoice Review', time: '3 days ago' },
];

export default function AILandingPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'agents' | 'history'>('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">AI Assistant</span>
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Trade AI Assistant
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Your intelligent partner for import/export decisions. Get instant answers, analysis, and recommendations.
            </p>
          </motion.div>

          {/* AI Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-white/70">Questions Answered</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-white/70">Countries Covered</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm text-white/70">Accuracy Rate</p>
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
          {/* AI Features - Alternating Solid Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isGreen = index % 2 === 0;
              return (
                <Link key={feature.name} href={`/ai/${feature.name.toLowerCase().replace(/\s+/g, '-')}`} className={`rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-white/20">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{feature.name}</h3>
                  <p className="text-sm text-white/70">{feature.desc}</p>
                </Link>
              );
            })}
          </div>

          {/* Chat Interface */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('chat')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'chat' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <MessageSquare className="w-4 h-4 inline mr-2" />
                New Chat
              </button>
              <button onClick={() => setActiveTab('agents')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'agents' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Bot className="w-4 h-4 inline mr-2" />
                AI Agents
              </button>
              <button onClick={() => setActiveTab('history')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'history' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <FileText className="w-4 h-4 inline mr-2" />
                History
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'chat' && (
                <div>
                  {/* Quick Prompts */}
                  <div className="mb-6">
                    <p className="text-sm text-[#4A4A4A] mb-3">Try these:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => setMessage(prompt)}
                          className="px-4 py-2 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-lg text-sm transition-colors text-left"
                        >
                          <Lightbulb className="w-3 h-3 inline mr-1 text-[#A6824A]" />
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Bot className="w-5 h-5 text-[#154230]" />
                    </div>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask anything about international trade..."
                      className="w-full h-14 pl-12 pr-24 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 bg-[#154230] hover:bg-[#1d5240] text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">Ask</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#4A4A4A] mt-3 text-center">
                    AI may produce inaccurate information. Verify important data independently.
                  </p>
                </div>
              )}

              {activeTab === 'agents' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiAgents.map((agent, index) => {
                    const Icon = agent.icon;
                    const isGreen = index % 2 === 0;
                    return (
                      <Link
                        key={agent.name}
                        href={`/ai/agents/${agent.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`p-6 rounded-xl transition-colors flex items-start gap-4 text-left hover:opacity-90 ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}
                      >
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1">{agent.name}</h3>
                          <p className="text-sm text-white/70">{agent.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/70 flex-shrink-0 mt-4" />
                      </Link>
                    );
                  })}
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">Recent Conversations</h2>
                    <button className="text-sm text-[#4A4A4A] hover:text-[#101111] flex items-center gap-1">
                      <RefreshCw className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentChats.map((chat) => (
                      <Link
                        key={chat.id}
                        href={`/ai/chat/${chat.id}`}
                        className="w-full p-4 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-xl transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-[#154230]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#101111]">{chat.title}</h3>
                            <p className="text-sm text-[#4A4A4A]">{chat.time}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#4A4A4A]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Capabilities - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/ai/natural-language" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Natural Language</h3>
              <p className="text-sm text-white/70">Chat naturally</p>
            </Link>
            <Link href="/ai/multilingual" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Multilingual</h3>
              <p className="text-sm text-white/70">50+ languages</p>
            </Link>
            <Link href="/ai/instant-results" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Instant Results</h3>
              <p className="text-sm text-white/70">Under 3 seconds</p>
            </Link>
            <Link href="/ai/expertise" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Trade Expertise</h3>
              <p className="text-sm text-white/70">Specialized knowledge</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get Instant Trade Intelligence</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Ask questions, get analysis, and make better trade decisions with AI-powered insights.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Try AI Assistant Free <ArrowRight className="w-4 h-4" />
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