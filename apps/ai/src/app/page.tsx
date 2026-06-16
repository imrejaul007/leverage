'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageSquare,
  FileSearch,
  Brain,
  Lightbulb,
  TrendingUp,
  Zap,
  Search,
  Plus,
  ChevronRight,
  ArrowRight,
  Send,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Building2,
  Bot,
  Cpu,
  Database,
  Shield,
  Globe,
  BarChart3,
  FileText,
  Bookmark,
  Copy,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon';
  color: string;
}

const aiAgents: AIAgent[] = [
  {
    id: 'intelligence',
    name: 'LEVERGE Intelligence',
    description: 'Real-time market analysis and trade insights',
    icon: <Brain className="w-6 h-6" />,
    status: 'available',
    color: '#154230',
  },
  {
    id: 'memory',
    name: 'LEVERGE Memory',
    description: 'Your trade history and relationship memory',
    icon: <Database className="w-6 h-6" />,
    status: 'available',
    color: '#A6824A',
  },
  {
    id: 'twin',
    name: 'LEVERGE Twin',
    description: 'Digital twin for your business operations',
    icon: <Bot className="w-6 h-6" />,
    status: 'available',
    color: '#5D1E21',
  },
  {
    id: 'agents',
    name: 'LEVERGE Agents',
    description: 'Autonomous agents for repetitive tasks',
    icon: <Cpu className="w-6 h-6" />,
    status: 'available',
    color: '#154230',
  },
  {
    id: 'copilot',
    name: 'LEVERGE Copilot',
    description: 'Your AI assistant across all LEVERAGE services',
    icon: <Sparkles className="w-6 h-6" />,
    status: 'available',
    color: '#A6824A',
  },
];

const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your LEVERAGE AI assistant powered by HOJAI. I can help you with trade documents, market insights, compliance checks, and more. How can I assist you today?',
    timestamp: '10:30 AM',
  },
];

const quickActions = [
  { label: 'Analyze Invoice', icon: <FileText className="w-5 h-5" />, prompt: 'Analyze this commercial invoice for compliance issues' },
  { label: 'Market Research', icon: <TrendingUp className="w-5 h-5" />, prompt: 'What are the current trends in electronics exports to Europe?' },
  { label: 'HS Code Help', icon: <Search className="w-5 h-5" />, prompt: 'Find the correct HS code for wireless Bluetooth headphones' },
  { label: 'Trade Advice', icon: <Lightbulb className="w-5 h-5" />, prompt: 'What documents do I need to export furniture to Canada?' },
];

export default function AIPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'ve analyzed your query. Based on current market data and your trade history, here are my recommendations...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg">
                <Sparkles className="w-4 h-4" />
                AI
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Home</Link>
              <Link href="/marketplace" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Marketplace</Link>
              <Link href="/docs" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Documents</Link>
              <Link href="/freight" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Freight</Link>
              <Link href="/compliance" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Compliance</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/ai/consultations" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg hover:bg-[#154230]/20 transition-colors">
                <Sparkles className="w-4 h-4" />
                AI Consultations
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-black/5"
            >
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Powered by HOJAI AI
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Your AI-Powered Trade OS
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              LEVERAGE AI brings you 5 specialized AI agents for trade intelligence, document analysis, market insights, and automated workflows.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">AI Agents</div>
              <div className="text-2xl font-bold text-[#101111]">5</div>
              <div className="text-sm text-[#4A4A4A] mt-1">specialized services</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Queries Today</div>
              <div className="text-2xl font-bold text-[#101111]">1,247</div>
              <div className="text-sm text-green-600 mt-1">+12% vs yesterday</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Accuracy Rate</div>
              <div className="text-2xl font-bold text-[#101111]">98.5%</div>
              <div className="text-sm text-[#4A4A4A] mt-1">verified by experts</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Response Time</div>
              <div className="text-2xl font-bold text-[#101111]">{"<2s"}</div>
              <div className="text-sm text-[#4A4A4A] mt-1">average latency</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-20 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* AI Chat Interface */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center ai-glow">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">LEVERAGE AI Assistant</h2>
                  <p className="text-sm text-[#4A4A4A]">Powered by HOJAI Intelligence</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 bg-[#f7f5f1] border-b border-black/5">
              <div className="flex items-center gap-2 text-sm text-[#4A4A4A] mb-3">
                <Zap className="w-4 h-4" />
                Quick Actions
              </div>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-black/10 rounded-lg text-sm font-medium text-[#101111] hover:bg-[#E6E2DA] transition-colors"
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-[#154230] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-[#154230] text-white'
                      : 'bg-[#f7f5f1] text-[#101111]'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-white/60' : 'text-[#4A4A4A]'}`}>
                      {message.timestamp}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-[#A6824A] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#154230] rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#f7f5f1] rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#154230] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-[#154230] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-[#154230] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-black/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything about trade, documents, compliance..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-3 rounded-xl border border-black/10 text-[#101111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Agents */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">LEVERAGE AI Agents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger-children">
              {aiAgents.map((agent) => (
                <div key={agent.id} className="p-6 border-2 border-black/5 rounded-xl hover:border-[#154230]/30 transition-colors">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: agent.color + '15' }}>
                    <div style={{ color: agent.color }}>{agent.icon}</div>
                  </div>
                  <h3 className="font-bold text-[#101111] mb-1">{agent.name}</h3>
                  <p className="text-sm text-[#4A4A4A] mb-3">{agent.description}</p>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-600">
                      {agent.status === 'available' ? 'Available' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">Why LEVERAGE AI</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Trade Intelligence</h3>
                <p className="text-sm text-[#4A4A4A]">Real-time market analysis and competitor insights.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#A6824A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileSearch className="w-7 h-7 text-[#A6824A]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Document Analysis</h3>
                <p className="text-sm text-[#4A4A4A]">Instant review of invoices, B/L, and certificates.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#5D1E21]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-[#5D1E21]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Compliance Checks</h3>
                <p className="text-sm text-[#4A4A4A]">Automated verification against trade regulations.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">24/7 Automation</h3>
                <p className="text-sm text-[#4A4A4A]">Autonomous agents handle repetitive tasks.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

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
                <li><Link href="/docs" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2024 LEVERAGE. All rights reserved. Powered by HOJAI AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}