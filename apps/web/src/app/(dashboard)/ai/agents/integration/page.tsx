'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Plug,
  Zap,
  ArrowRight,
  Check,
  ChevronRight,
  Settings,
  Code,
  Globe,
  FileText,
  Truck,
  Shield,
  Users,
  Megaphone,
  Receipt,
  Bell,
  Menu,
  X,
  Database,
  Lock,
  RefreshCw,
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

const integrations = [
  {
    id: 'erp',
    name: 'ERP Systems',
    description: 'Connect with SAP, Oracle, NetSuite, and Microsoft Dynamics',
    icon: Database,
    status: 'available',
    features: ['Real-time sync', 'Automated workflows', 'Inventory updates'],
  },
  {
    id: 'crm',
    name: 'CRM Platforms',
    description: 'Integrate Salesforce, HubSpot, Zoho, and Pipedrive',
    icon: Users,
    status: 'available',
    features: ['Lead sync', 'Contact management', 'Activity tracking'],
  },
  {
    id: 'shipping',
    name: 'Shipping Carriers',
    description: 'Connect with FedEx, UPS, DHL, and regional carriers',
    icon: Truck,
    status: 'available',
    features: ['Rate comparison', 'Label generation', 'Tracking updates'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Integrate Shopify, WooCommerce, Magento, and Amazon',
    icon: Globe,
    status: 'available',
    features: ['Order sync', 'Inventory sync', 'Product listings'],
  },
  {
    id: 'accounting',
    name: 'Accounting Software',
    description: 'Connect QuickBooks, Xero, FreshBooks, and Wave',
    icon: Receipt,
    status: 'coming-soon',
    features: ['Invoice sync', 'Expense tracking', 'Financial reports'],
  },
  {
    id: 'custom',
    name: 'Custom APIs',
    description: 'Build custom integrations with our REST API',
    icon: Code,
    status: 'available',
    features: ['Full control', 'Webhook support', 'Custom logic'],
  },
];

export default function IntegrationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Integrations</span>
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
              <Plug className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                AI Integrations
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Connect our AI agents with your existing tools and systems. Build powerful automated workflows for global trade.
            </p>
          </motion.div>

          {/* Key Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-[#A6824A]" />
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-white/70">Integrations</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <RefreshCw className="w-8 h-8 mx-auto mb-2 text-[#A6824A]" />
              <p className="text-2xl font-bold">Real-time</p>
              <p className="text-sm text-white/70">Data Sync</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Lock className="w-8 h-8 mx-auto mb-2 text-[#A6824A]" />
              <p className="text-2xl font-bold">SOC 2</p>
              <p className="text-sm text-white/70">Certified</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Code className="w-8 h-8 mx-auto mb-2 text-[#A6824A]" />
              <p className="text-2xl font-bold">REST API</p>
              <p className="text-sm text-white/70">Full Access</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* API Overview */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Code className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">REST API Access</h2>
                  <p className="text-white/70">Build custom integrations with our developer-friendly API</p>
                </div>
              </div>
              <div className="bg-black/20 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                <code className="text-[#A6824A]">curl -X POST</code> <span className="text-white/60">https://api.leverage.io/v1/ai/agents/execute</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/ai/api/docs" className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                  <FileText className="w-4 h-4" />
                  API Documentation
                </Link>
                <Link href="/ai/api/playground" className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                  <Code className="w-4 h-4" />
                  API Playground
                </Link>
                <Link href="/ai/api/sdks" className="flex items-center gap-2 px-4 py-2 bg-[#A6824A] rounded-lg text-sm font-medium hover:bg-[#8a6a3a] transition-colors">
                  <Plug className="w-4 h-4" />
                  SDK Downloads
                </Link>
              </div>
            </div>
          </div>

          {/* Integration Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              const isGreen = index % 2 === 0;
              const isComingSoon = integration.status === 'coming-soon';

              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-xl p-6 shadow-sm ${
                    isComingSoon ? 'bg-[#f7f5f1] opacity-75' : isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      isComingSoon ? 'bg-[#E6E2DA]' : 'bg-white/20'
                    }`}>
                      <Icon className={`w-7 h-7 ${isComingSoon ? 'text-[#4A4A4A]' : 'text-white'}`} />
                    </div>
                    {isComingSoon ? (
                      <span className="px-3 py-1 bg-[#A6824A] text-white text-xs font-semibold rounded-full">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> Available
                      </span>
                    )}
                  </div>
                  <h3 className={`font-bold mb-2 ${isComingSoon ? 'text-[#101111]' : 'text-white'}`}>
                    {integration.name}
                  </h3>
                  <p className={`text-sm mb-4 ${isComingSoon ? 'text-[#4A4A4A]' : 'text-white/70'}`}>
                    {integration.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {integration.features.map((feature) => (
                      <div key={feature} className={`flex items-center gap-2 text-sm ${
                        isComingSoon ? 'text-[#4A4A4A]' : 'text-white/80'
                      }`}>
                        <Check className={`w-4 h-4 ${isComingSoon ? 'text-[#154230]' : 'text-green-400'}`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button
                    disabled={isComingSoon}
                    className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                      isComingSoon
                        ? 'bg-[#E6E2DA] text-[#4A4A4A] cursor-not-allowed'
                        : isGreen
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {isComingSoon ? 'Coming Soon' : 'Configure'}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Webhook Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#A6824A]" />
                Webhook Events
              </h2>
              <p className="text-[#4A4A4A] mt-2">Get real-time notifications for AI agent activities</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center mb-3">
                    <Bot className="w-5 h-5 text-[#154230]" />
                  </div>
                  <h4 className="font-semibold text-[#101111] mb-1">Agent Completed</h4>
                  <p className="text-xs text-[#4A4A4A]">Triggered when an AI agent finishes a task</p>
                </div>
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <div className="w-10 h-10 bg-[#5D1E21]/10 rounded-lg flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5 text-[#5D1E21]" />
                  </div>
                  <h4 className="font-semibold text-[#101111] mb-1">Response Ready</h4>
                  <p className="text-xs text-[#4A4A4A]">Triggered when AI generates a response</p>
                </div>
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5 text-[#154230]" />
                  </div>
                  <h4 className="font-semibold text-[#101111] mb-1">Compliance Alert</h4>
                  <p className="text-xs text-[#4A4A4A]">Triggered on compliance issues detected</p>
                </div>
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <div className="w-10 h-10 bg-[#5D1E21]/10 rounded-lg flex items-center justify-center mb-3">
                    <Settings className="w-5 h-5 text-[#5D1E21]" />
                  </div>
                  <h4 className="font-semibold text-[#101111] mb-1">Error Occurred</h4>
                  <p className="text-xs text-[#4A4A4A]">Triggered on any error in agent execution</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Blocks - Alternating */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Link href="/ai/agents/library" className="bg-[#154230] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Agent Library</h3>
              <p className="text-sm text-white/70">Browse available agents</p>
            </Link>
            <Link href="/ai/agents/templates" className="bg-[#5D1E21] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plug className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Templates</h3>
              <p className="text-sm text-white/70">Pre-built workflows</p>
            </Link>
            <Link href="/ai/prompts" className="bg-[#154230] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Prompts</h3>
              <p className="text-sm text-white/70">Manage AI prompts</p>
            </Link>
            <Link href="/ai/history" className="bg-[#5D1E21] rounded-xl p-6 text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-white" />
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Build Your Integration?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get started with our REST API or browse pre-built integrations for popular platforms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ai/api/docs" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              API Documentation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-[#5D1E21] text-white font-semibold rounded-lg hover:bg-[#7b1c1f] transition-colors">
              Contact Sales
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
