'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Search,
  ChevronRight,
  Menu,
  X,
  Bell,
  CheckCircle,
  Clock,
  Filter,
  Eye,
  Star,
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

const inspectionReports = [
  { id: 'INS-2024-001', title: 'Electronics Factory Audit', type: 'Factory Audit', date: '2024-11-15', agent: 'Global Inspection Services', status: 'completed', rating: 4.9 },
  { id: 'INS-2024-002', title: 'Textile Quality Inspection', type: 'Product Inspection', date: '2024-11-14', agent: 'Asia Quality Control', status: 'completed', rating: 4.8 },
  { id: 'INS-2024-003', title: 'Packaging Compliance Check', type: 'Document Review', date: '2024-11-12', agent: 'EuroCheck Inspections', status: 'completed', rating: 5.0 },
  { id: 'INS-2024-004', title: 'Auto Parts Pre-shipment', type: 'Pre-shipment Inspection', date: '2024-11-10', agent: 'Pacific Rim Inspectors', status: 'pending', rating: null },
];

export default function InspectionReportsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredReports = inspectionReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || report.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Inspection Reports</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium text-[#154230]">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
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
                <FileText className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Inspection Reports
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Access detailed inspection reports, certificates, and compliance documentation.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by title or ID..."
                      className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-[#f7f5f1] rounded-xl p-1">
                    <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-white shadow-sm text-[#101111]' : 'text-[#4A4A4A]'}`}>All</button>
                    <button onClick={() => setFilter('completed')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-white shadow-sm text-[#101111]' : 'text-[#4A4A4A]'}`}>Completed</button>
                    <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-white shadow-sm text-[#101111]' : 'text-[#4A4A4A]'}`}>Pending</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{inspectionReports.length}</p>
              <p className="text-sm text-white/70">Total Reports</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{inspectionReports.filter(r => r.status === 'completed').length}</p>
              <p className="text-sm text-white/70">Completed</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{inspectionReports.filter(r => r.status === 'pending').length}</p>
              <p className="text-sm text-white/70">Pending</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-sm text-white/70">Avg. Rating</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Reports List */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#101111]">Inspection Reports</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#f7f5f1] text-[#154230] text-sm font-medium rounded-lg hover:bg-[#E6E2DA] transition-colors">
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredReports.map((report, index) => (
                  <div key={report.id} className={`p-6 rounded-xl ${index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white/60 text-sm font-mono">{report.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {report.status === 'completed' ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{report.title}</h3>
                        <p className="text-white/70 text-sm mb-3">{report.type}</p>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {report.date}
                          </span>
                          <span>•</span>
                          <span>{report.agent}</span>
                          {report.rating && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                {report.rating}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link href={`/compliance/inspections/reports/${report.id}`} className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Eye className="w-5 h-5 text-white" />
                        </Link>
                        <Link href={`/compliance/inspections/reports/${report.id}/download`} className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                          <Download className="w-5 h-5 text-white" />
                        </Link>
                        <Link href={`/compliance/inspections/reports/${report.id}`} className="px-6 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
                          View Report
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredReports.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">No Reports Found</h3>
                  <p className="text-[#4A4A4A]">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link href="/compliance/inspections/schedule" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Clock className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Schedule Inspection</h3>
              <p className="text-sm text-white/70 mb-4">Book a new inspection to generate reports.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Schedule <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/agents" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <CheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Find Agents</h3>
              <p className="text-sm text-white/70 mb-4">Connect with certified inspection agents.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Agents <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/track" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <FileText className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Track Status</h3>
              <p className="text-sm text-white/70 mb-4">Monitor your pending inspections.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Track <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
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