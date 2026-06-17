'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  FolderOpen,
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
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Folder,
  Truck,
  Receipt,
  Megaphone,
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

const folders = [
  { name: 'Compliance', count: 12, color: '#154230' },
  { name: 'Documents', count: 8, color: '#A6824A' },
  { name: 'Sourcing', count: 6, color: '#5D1E21' },
  { name: 'Finance', count: 4, color: '#154230' },
];

const prompts = [
  { id: 1, title: 'HS Code Classifier', category: 'Compliance', lastUsed: '2 hours ago' },
  { id: 2, title: 'Duty Calculator', category: 'Finance', lastUsed: 'Yesterday' },
  { id: 3, title: 'Invoice Review', category: 'Documents', lastUsed: '3 days ago' },
  { id: 4, title: 'Supplier Finder', category: 'Sourcing', lastUsed: '1 week ago' },
];

export default function PromptsOrganizePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Organize Prompts</span>
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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FolderOpen className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Organize Prompts
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Keep your prompts organized with folders and categories. Find what you need quickly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          {/* Actions Bar */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-2 bg-[#f7f5f1] rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <Filter className="w-4 h-4 text-[#4A4A4A]" />
              </button>
              <Link href="/ai/prompts/create" className="inline-flex items-center gap-2 px-4 py-2 bg-[#154230] hover:bg-[#1d5240] text-white text-sm font-medium rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                New Prompt
              </Link>
            </div>
          </div>

          {/* Folders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-[#101111] mb-4 flex items-center gap-2">
              <Folder className="w-5 h-5 text-[#154230]" />
              Folders
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  className="p-4 rounded-xl border-2 border-[#E6E2DA] hover:border-[#154230]/50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: folder.color + '20' }}>
                    <Folder className="w-4 h-4" style={{ color: folder.color }} />
                  </div>
                  <h3 className="font-semibold text-[#101111]">{folder.name}</h3>
                  <p className="text-sm text-[#4A4A4A]">{folder.count} prompts</p>
                </button>
              ))}
              <button className="p-4 rounded-xl border-2 border-dashed border-[#E6E2DA] hover:border-[#154230]/50 transition-colors text-center">
                <Plus className="w-6 h-6 text-[#4A4A4A] mx-auto mb-2" />
                <p className="text-sm text-[#4A4A4A]">New Folder</p>
              </button>
            </div>
          </div>

          {/* Prompts List */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-black/5">
              <h2 className="text-lg font-bold text-[#101111]">All Prompts</h2>
            </div>
            <div className="divide-y divide-black/5">
              {prompts.map((prompt) => (
                <div key={prompt.id} className="p-4 flex items-center justify-between hover:bg-[#f7f5f1]/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#154230]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#101111]">{prompt.title}</h3>
                      <p className="text-sm text-[#4A4A4A]">{prompt.category} • {prompt.lastUsed}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#f7f5f1] rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <button className="p-2 hover:bg-[#f7f5f1] rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
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
