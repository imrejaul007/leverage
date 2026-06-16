'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  ListChecks,
  CheckCircle,
  Clock,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Menu,
  X,
  Bell,
  Edit,
  Trash2,
  Download,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Documents', href: '/documents' },
  { name: 'Freight', href: '/freight' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'AI Assistant', href: '/ai' },
  { name: 'Billing', href: '/billing' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const checklists = [
  {
    id: 'CL-001',
    name: 'Electronics Import Checklist',
    category: 'Import',
    items: 24,
    completed: 20,
    lastUpdated: '2024-11-15',
    status: 'active',
  },
  {
    id: 'CL-002',
    name: 'Textile Export Documentation',
    category: 'Export',
    items: 18,
    completed: 18,
    lastUpdated: '2024-11-12',
    status: 'completed',
  },
  {
    id: 'CL-003',
    name: 'FDA Product Registration',
    category: 'Regulatory',
    items: 12,
    completed: 8,
    lastUpdated: '2024-11-10',
    status: 'active',
  },
  {
    id: 'CL-004',
    name: 'CPSC Compliance Review',
    category: 'Safety',
    items: 15,
    completed: 0,
    lastUpdated: '2024-11-08',
    status: 'draft',
  },
  {
    id: 'CL-005',
    name: 'Customs Bond Renewal',
    category: 'Financial',
    items: 8,
    completed: 5,
    lastUpdated: '2024-11-05',
    status: 'active',
  },
];

const categories = ['All', 'Import', 'Export', 'Regulatory', 'Safety', 'Financial'];

export default function AllChecklistsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredChecklists = checklists.filter((checklist) => {
    const matchesCategory = selectedCategory === 'All' || checklist.category === selectedCategory;
    const matchesSearch = checklist.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">All Checklists</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium text-[#154230]">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
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
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Compliance</Link>
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
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <ListChecks className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Compliance Checklists
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Create and manage custom compliance checklists for your import and export operations.
            </p>
          </motion.div>

          {/* Search and Create */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search checklists..."
                  className="w-full h-14 pl-12 pr-4 bg-white rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none shadow-lg"
                />
              </div>
              <Link href="/compliance/checklist/new" className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg">
                <Plus className="w-5 h-5" />
                New Checklist
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{checklists.length}</p>
              <p className="text-sm text-white/70">Total Checklists</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{checklists.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-white/70">Active</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{checklists.filter(c => c.status === 'completed').length}</p>
              <p className="text-sm text-white/70">Completed</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">78%</p>
              <p className="text-sm text-white/70">Avg. Completion</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Category Filters */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-4 border-b border-black/5">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#154230] text-white'
                        : 'bg-[#f7f5f1] text-[#4A4A4A] hover:bg-[#E6E2DA]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist Cards */}
            <div className="p-6">
              <div className="space-y-4">
                {filteredChecklists.map((checklist, index) => {
                  const progress = Math.round((checklist.completed / checklist.items) * 100);
                  const isGreen = index % 2 === 0;
                  return (
                    <div key={checklist.id} className={`p-6 rounded-xl ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-white/60 text-sm font-mono">{checklist.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(checklist.status)}`}>
                              {checklist.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white">{checklist.name}</h3>
                          <p className="text-white/60 text-sm">{checklist.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-white" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-white" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-white/70">Progress</span>
                          <span className="text-white font-medium">{checklist.completed}/{checklist.items} items ({progress}%)</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {checklist.lastUpdated}
                          </span>
                        </div>
                        <Link
                          href={`/compliance/checklist/${checklist.id}`}
                          className="flex items-center gap-1 text-white font-medium hover:text-white/80 transition-colors"
                        >
                          {checklist.status === 'completed' ? 'View' : 'Continue'}
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredChecklists.length === 0 && (
                <div className="text-center py-12">
                  <ListChecks className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">No Checklists Found</h3>
                  <p className="text-[#4A4A4A] mb-4">Create a new checklist to get started.</p>
                  <Link href="/compliance/checklist/new" className="inline-block px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    Create Checklist
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/checklist/new" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Plus className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Create New Checklist</h3>
              <p className="text-sm text-white/70 mb-4">Build a custom compliance checklist for your needs.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Get Started <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/check" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <ClipboardCheck className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Run Compliance Check</h3>
              <p className="text-sm text-white/70 mb-4">Verify your shipments against all requirements.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Start Check <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/regulations" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <CheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Regulation Updates</h3>
              <p className="text-sm text-white/70 mb-4">Stay updated on the latest compliance requirements.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Updates <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need a Custom Checklist?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our AI can help you create a compliance checklist tailored to your specific products and trade routes.
          </p>
          <Link href="/compliance/ai-assist" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Get AI Assistance <ChevronRight className="w-4 h-4" />
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}