'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  ClipboardCheck,
  CheckCircle2,
  Circle,
  Plus,
  Search,
  Filter,
  Download,
  ChevronRight,
  Menu,
  X,
  Bell,
  ArrowRight,
  FileText,
  Truck,
  Globe,
  Bot,
  Receipt,
  Megaphone,
  Users,
  AlertTriangle,
  Calendar,
  Building,
  Clock,
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

const checklistCategories = [
  {
    title: 'Pre-Shipment',
    items: [
      { id: 1, text: 'Verify HS code classification', completed: true },
      { id: 2, text: 'Check import restrictions for destination country', completed: true },
      { id: 3, text: 'Confirm required export licenses', completed: false },
      { id: 4, text: 'Validate commercial invoice accuracy', completed: true },
      { id: 5, text: 'Review packing list details', completed: false },
    ],
  },
  {
    title: 'Documentation',
    items: [
      { id: 6, text: 'Prepare Bill of Lading / Airway Bill', completed: false },
      { id: 7, text: 'Obtain Certificate of Origin', completed: true },
      { id: 8, text: 'Secure fumigation certificates (if applicable)', completed: false },
      { id: 9, text: 'Gather insurance certificates', completed: true },
      { id: 10, text: 'Prepare letter of credit documentation', completed: false },
    ],
  },
  {
    title: 'Customs & Duties',
    items: [
      { id: 11, text: 'Calculate estimated duties and taxes', completed: true },
      { id: 12, text: 'Verify FTA eligibility for duty savings', completed: false },
      { id: 13, text: 'Prepare customs entry documentation', completed: false },
      { id: 14, text: 'Confirm bonded warehouse arrangements (if needed)', completed: false },
    ],
  },
  {
    title: 'Logistics & Transport',
    items: [
      { id: 15, text: 'Book freight space with carrier', completed: true },
      { id: 16, text: 'Arrange customs clearance agent at destination', completed: false },
      { id: 17, text: 'Verify cargo insurance coverage', completed: true },
      { id: 18, text: 'Confirm delivery address and contact', completed: true },
    ],
  },
];

const savedChecklists = [
  { id: 'CL-001', name: 'Electronics Import (China → USA)', progress: 85, lastModified: '2 hours ago' },
  { id: 'CL-002', name: 'Textile Export (India → EU)', progress: 60, lastModified: 'Yesterday' },
  { id: 'CL-003', name: 'Auto Parts Import (Japan → Canada)', progress: 100, lastModified: '3 days ago' },
];

export default function ComplianceChecklistPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checklist, setChecklist] = useState(checklistCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Pre-Shipment');

  const toggleItem = (categoryTitle: string, itemId: number) => {
    setChecklist((prev) =>
      prev.map((category) =>
        category.title === categoryTitle
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : category
      )
    );
  };

  const getOverallProgress = () => {
    const totalItems = checklist.reduce((acc, cat) => acc + cat.items.length, 0);
    const completedItems = checklist.reduce(
      (acc, cat) => acc + cat.items.filter((item) => item.completed).length,
      0
    );
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Compliance Checklist</span>
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
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Compliance</Link>
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
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
              <ClipboardCheck className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Compliance Checklist
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Never miss a compliance requirement. Track your import/export tasks and ensure every shipment meets regulations.
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
                    placeholder="Search checklist items..."
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
              <p className="text-2xl font-bold">{getOverallProgress()}%</p>
              <p className="text-sm text-white/70">Overall Progress</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-white/70">Total Tasks</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">9</p>
              <p className="text-sm text-white/70">Completed</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-white/70">Categories</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Quick Actions - Alternating Solid Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Link href="/compliance/checklist/new" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">New Checklist</h3>
                <p className="text-sm text-white/70">Create from scratch</p>
              </div>
            </Link>
            <Link href="/compliance/templates" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Templates</h3>
                <p className="text-sm text-white/70">Use pre-built checklists</p>
              </div>
            </Link>
            <Link href="/compliance/ai-assist" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">AI Assist</h3>
                <p className="text-sm text-white/70">Let AI build your list</p>
              </div>
            </Link>
          </div>

          {/* Current Checklist */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">Current Shipment Checklist</h2>
                  <p className="text-sm text-[#4A4A4A]">Electronics Import - China to USA</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#f7f5f1] rounded-full h-3 mb-2">
                <div
                  className="bg-[#154230] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getOverallProgress()}%` }}
                />
              </div>
              <p className="text-sm text-[#4A4A4A]">{getOverallProgress()}% complete</p>
            </div>

            {/* Checklist Categories */}
            <div className="divide-y divide-black/5">
              {checklist.map((category) => {
                const categoryCompleted = category.items.filter((item) => item.completed).length;
                const categoryTotal = category.items.length;
                const categoryProgress = Math.round((categoryCompleted / categoryTotal) * 100);
                const isExpanded = expandedCategory === category.title;

                return (
                  <div key={category.title}>
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.title)}
                      className="w-full p-6 flex items-center justify-between hover:bg-black/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          categoryProgress === 100 ? 'bg-green-100' : 'bg-[#154230]/10'
                        }`}>
                          {categoryProgress === 100 ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <ClipboardCheck className="w-5 h-5 text-[#154230]" />
                          )}
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-[#101111]">{category.title}</h3>
                          <p className="text-sm text-[#4A4A4A]">
                            {categoryCompleted} of {categoryTotal} completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 bg-[#f7f5f1] rounded-full h-2 hidden sm:block">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              categoryProgress === 100 ? 'bg-green-500' : 'bg-[#A6824A]'
                            }`}
                            style={{ width: `${categoryProgress}%` }}
                          />
                        </div>
                        <ChevronRight className={`w-5 h-5 text-[#4A4A4A] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="px-6 pb-6"
                      >
                        <div className="space-y-3 pl-4 border-l-2 border-[#154230]/20">
                          {category.items.map((item) => (
                            <label
                              key={item.id}
                              className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl cursor-pointer hover:bg-[#E6E2DA] transition-colors"
                            >
                              <button
                                onClick={() => toggleItem(category.title, item.id)}
                                className="flex-shrink-0"
                              >
                                {item.completed ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                                ) : (
                                  <Circle className="w-6 h-6 text-[#4A4A4A]" />
                                )}
                              </button>
                              <span className={`flex-1 ${item.completed ? 'line-through text-[#4A4A4A]' : 'text-[#101111]'}`}>
                                {item.text}
                              </span>
                              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                <AlertTriangle className="w-4 h-4 text-[#A6824A]" />
                              </button>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved Checklists */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101111]">Saved Checklists</h2>
              <Link href="/compliance/checklist/all" className="flex items-center gap-1 text-[#154230] font-medium hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {savedChecklists.map((checklist) => (
                <Link
                  key={checklist.id}
                  href={`/compliance/checklist/${checklist.id}`}
                  className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      checklist.progress === 100 ? 'bg-green-100' : 'bg-[#154230]/10'
                    }`}>
                      {checklist.progress === 100 ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <ClipboardCheck className="w-6 h-6 text-[#154230]" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#101111]">{checklist.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                        <Clock className="w-3 h-3" />
                        {checklist.lastModified}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-[#E6E2DA] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          checklist.progress === 100 ? 'bg-green-500' : 'bg-[#A6824A]'
                        }`}
                        style={{ width: `${checklist.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#101111]">{checklist.progress}%</span>
                    <ChevronRight className="w-5 h-5 text-[#4A4A4A]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Features - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/compliance/auto-reminders" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Auto Reminders</h3>
              <p className="text-sm text-white/70">Never miss deadlines</p>
            </Link>
            <Link href="/compliance/templates" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Templates</h3>
              <p className="text-sm text-white/70">Pre-built checklists</p>
            </Link>
            <Link href="/compliance/team" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Team Sharing</h3>
              <p className="text-sm text-white/70">Collaborate with ease</p>
            </Link>
            <Link href="/compliance/export" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Export Reports</h3>
              <p className="text-sm text-white/70">PDF & Excel formats</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Compliant Every Time</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Use our comprehensive checklists to ensure nothing falls through the cracks.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Using Checklists <ArrowRight className="w-4 h-4" />
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
