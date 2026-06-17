'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Send,
  Sparkles,
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
  Plus,
  Trash2,
  Play,
  Save,
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

const variables = [
  { id: '1', name: 'product_name', type: 'string', required: true },
  { id: '2', name: 'quantity', type: 'number', required: true },
  { id: '3', name: 'destination', type: 'string', required: false },
];

export default function CreatePromptPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promptName, setPromptName] = useState('');
  const [promptTemplate, setPromptTemplate] = useState('');
  const [testInput, setTestInput] = useState('');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/ai" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Create Prompt</span>
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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          <Link href="/ai/prompts" className="text-white/70 hover:text-white">← Back to Prompts</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-10 h-10 text-white" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Create New Prompt</h1>
            </div>
            <p className="text-lg text-white/80">Build custom AI prompts for your trade workflows</p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <form className="space-y-6">
              {/* Prompt Name */}
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Prompt Name</label>
                <input
                  type="text"
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                  placeholder="e.g. Product Classifier"
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-[#154230]"
                />
              </div>

              {/* Variables Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-[#4A4A4A]">Variables</label>
                  <button type="button" className="flex items-center gap-2 text-sm text-[#154230] font-medium hover:underline">
                    <Plus className="w-4 h-4" /> Add Variable
                  </button>
                </div>
                <div className="space-y-3">
                  {variables.map((variable) => (
                    <div key={variable.id} className="flex items-center gap-4 p-3 bg-[#f7f5f1] rounded-lg">
                      <div className="flex-1">
                        <input
                          type="text"
                          defaultValue={variable.name}
                          className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#154230]"
                        />
                      </div>
                      <select defaultValue={variable.type} className="px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-[#154230]">
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                      </select>
                      <label className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                        <input type="checkbox" defaultChecked={variable.required} className="rounded border-black/20" />
                        Required
                      </label>
                      <button type="button" className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt Template */}
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Prompt Template</label>
                <textarea
                  value={promptTemplate}
                  onChange={(e) => setPromptTemplate(e.target.value)}
                  rows={8}
                  placeholder="Write your prompt here. Use {{variable_name}} for dynamic values..."
                  className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-[#154230] font-mono text-sm"
                />
                <p className="text-xs text-[#4A4A4A] mt-2">Use {"{{variable_name}}"} syntax for dynamic inputs</p>
              </div>

              {/* Test Section */}
              <div className="border-t border-black/5 pt-6">
                <h3 className="font-bold text-[#101111] mb-4">Test Your Prompt</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Test Input</label>
                    <textarea
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      rows={3}
                      placeholder="Enter test values for your variables..."
                      className="w-full px-4 py-3 border border-black/10 rounded-lg focus:outline-none focus:border-[#154230]"
                    />
                  </div>
                  <button type="button" className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    <Play className="w-4 h-4" /> Run Test
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4">
                <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#f7f5f1] text-[#4A4A4A] font-semibold rounded-lg hover:bg-[#E6E2DA] transition-colors">
                  <Save className="w-4 h-4" /> Save Draft
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                  <Send className="w-4 h-4" /> Create Prompt
                </button>
              </div>
            </form>
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
            <p className="text-white/70 text-sm text-center">© 2024 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
