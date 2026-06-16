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
} from 'lucide-react';

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
              <Link href="/ai" className="nav-link font-medium text-[#154230]">Chat</Link>
              <Link href="/ai/agents" className="nav-link font-medium">AI Agents</Link>
              <Link href="/ai/analytics" className="nav-link font-medium">Insights</Link>
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
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Chat</Link>
                <Link href="/ai/agents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">AI Agents</Link>
                <Link href="/ai/analytics" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Insights</Link>
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
          {/* AI Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: feature.color + '15' }}>
                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-bold text-[#101111] mb-1">{feature.name}</h3>
                  <p className="text-sm text-[#4A4A4A]">{feature.desc}</p>
                </div>
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
                  {aiAgents.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <button
                        key={agent.name}
                        className="p-6 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-xl transition-colors flex items-start gap-4 text-left"
                      >
                        <div className="w-14 h-14 bg-[#154230]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-[#154230]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#101111] mb-1">{agent.name}</h3>
                          <p className="text-sm text-[#4A4A4A]">{agent.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#4A4A4A] flex-shrink-0 mt-4" />
                      </button>
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
                      <button
                        key={chat.id}
                        className="w-full p-4 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-xl transition-colors flex items-center justify-between text-left"
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
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Capabilities */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Natural Language</h3>
              <p className="text-sm text-[#4A4A4A]">Chat naturally</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Multilingual</h3>
              <p className="text-sm text-[#4A4A4A]">50+ languages</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Instant Results</h3>
              <p className="text-sm text-[#4A4A4A]">Under 3 seconds</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Scale className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Trade Expertise</h3>
              <p className="text-sm text-[#4A4A4A]">Specialized knowledge</p>
            </div>
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

      {/* Footer */}
      <footer className="bg-[#101111] text-white px-4 sm:px-8 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain mb-4 brightness-0 invert" />
              <p className="text-sm text-gray-400">The Trade OS for import/export businesses.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/documents" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2024 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}