'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Globe,
  FileText,
  Truck,
  Shield,
  Megaphone,
  Receipt,
  Users,
  ArrowRight,
  Menu,
  X,
  Bell,
  Play,
  Pause,
  Eye,
  MessageSquare,
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

const promptStats = [
  { label: 'Total Prompts', value: '1,247', change: '+12%', positive: true },
  { label: 'Avg Response Time', value: '1.2s', change: '-8%', positive: true },
  { label: 'Success Rate', value: '98.5%', change: '+2%', positive: true },
  { label: 'Cost Saved', value: '$12,450', change: '+15%', positive: true },
];

const topPrompts = [
  { id: '1', name: 'Trade Document Analysis', uses: 234, success: 99.2, avgTime: '0.8s' },
  { id: '2', name: 'HS Code Classification', uses: 189, success: 97.8, avgTime: '1.2s' },
  { id: '3', name: 'Quote Generation', uses: 156, success: 98.5, avgTime: '0.9s' },
  { id: '4', name: 'Compliance Check', uses: 134, success: 96.9, avgTime: '1.5s' },
  { id: '5', name: 'Shipment Tracking', uses: 112, success: 99.1, avgTime: '0.6s' },
];

export default function PromptAnalyticsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/ai" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Prompt Analytics</span>
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
                <Link href="/" className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/documents" className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
                <Link href="/consultations" className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <Link href="/ai" className="text-white/70 hover:text-white">← Back to AI</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8 mt-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Prompt Analytics</h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Track performance, usage, and costs of your AI prompts and agents.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {promptStats.map((stat, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
                <span className="text-xs text-green-300 flex items-center justify-center gap-1 mt-1">
                  {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Analytics */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Link href="/ai/prompts/create" className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <Bot className="w-8 h-8 text-[#154230] mx-auto mb-3" />
              <h3 className="font-bold text-[#101111]">Create Prompt</h3>
            </Link>
            <Link href="/ai/prompts/import" className="bg-[#154230] rounded-2xl p-6 text-center hover:bg-[#1d5240] transition-colors">
              <MessageSquare className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white">Import Prompts</h3>
            </Link>
            <Link href="/ai/agents" className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <BarChart3 className="w-8 h-8 text-[#154230] mx-auto mb-3" />
              <h3 className="font-bold text-[#101111]">View Agents</h3>
            </Link>
            <Link href="/ai/prompts" className="bg-[#5D1E21] rounded-2xl p-6 text-center hover:bg-[#6b2326] transition-colors">
              <Play className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white">All Prompts</h3>
            </Link>
          </div>

          {/* Top Prompts */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101111]">Top Performing Prompts</h2>
              <Link href="/ai/prompts" className="text-[#154230] font-medium text-sm hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {topPrompts.map((prompt, i) => (
                <div key={prompt.id} className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                  <span className="text-2xl font-bold text-[#4A4A4A] w-8">{i + 1}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#101111]">{prompt.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-[#4A4A4A] mt-1">
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {prompt.uses} uses</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {prompt.avgTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-semibold">{prompt.success}%</span>
                    <p className="text-xs text-[#4A4A4A]">success rate</p>
                  </div>
                  <Link href={`/ai/prompts/${prompt.id}`} className="p-2 hover:bg-white rounded-lg transition-colors">
                    <Eye className="w-5 h-5 text-[#4A4A4A]" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#101111] mb-6">Usage Over Time</h2>
            <div className="h-64 bg-[#f7f5f1] rounded-xl flex items-center justify-center">
              <p className="text-[#4A4A4A]">Chart visualization would appear here</p>
            </div>
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
