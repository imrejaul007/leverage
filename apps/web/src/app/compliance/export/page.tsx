'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Package,
  Globe,
  Shield,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Menu,
  X,
  Bell,
  Search,
  FileCheck,
  Truck,
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

const exportRequirements = [
  { name: 'Export License', status: 'required', description: 'Required for controlled goods' },
  { name: 'Commercial Invoice', status: 'required', description: 'Standard export documentation' },
  { name: 'Packing List', status: 'required', description: 'Detailed cargo specification' },
  { name: 'Certificate of Origin', status: 'conditional', description: 'Required for FTA benefits' },
  { name: 'Export Declaration', status: 'required', description: 'Filed with customs authority' },
  { name: 'Bill of Lading', status: 'required', description: 'Shipping contract document' },
];

const exportDestinations = [
  { country: 'United States', requirements: 8, restrictions: 3, avgTime: '3-5 days' },
  { country: 'European Union', requirements: 12, restrictions: 5, avgTime: '5-7 days' },
  { country: 'United Kingdom', requirements: 10, restrictions: 4, avgTime: '4-6 days' },
  { country: 'Canada', requirements: 7, restrictions: 2, avgTime: '2-4 days' },
  { country: 'Australia', requirements: 9, restrictions: 4, avgTime: '5-7 days' },
  { country: 'Japan', requirements: 11, restrictions: 6, avgTime: '7-10 days' },
];

export default function ExportPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destination, setDestination] = useState('');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      required: 'bg-red-100 text-red-700',
      conditional: 'bg-yellow-100 text-yellow-700',
      optional: 'bg-green-100 text-green-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Export Compliance</span>
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
                <Package className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Export Compliance
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Navigate export regulations, licensing requirements, and documentation for international shipments.
            </p>
          </motion.div>

          {/* Destination Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none"
                  >
                    <option value="">Select destination country</option>
                    <option value="usa">United States</option>
                    <option value="eu">European Union</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="japan">Japan</option>
                  </select>
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Check Requirements</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">180+</p>
              <p className="text-sm text-white/70">Destinations</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-white/70">Export Licenses</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-white/70">Doc Templates</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Updates</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Export Requirements */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#4A4A4A]" />
                Export Documentation Requirements
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exportRequirements.map((req, index) => {
                  const isGreen = index % 2 === 0;
                  return (
                    <div key={req.name} className={`p-4 rounded-xl ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white">{req.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(req.status)}`}>
                          {req.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/70">{req.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#4A4A4A]" />
                Popular Export Destinations
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f7f5f1]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Country</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Requirements</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Restrictions</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Avg. Clearance</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {exportDestinations.map((dest) => (
                      <tr key={dest.country} className="hover:bg-[#f7f5f1] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#4A4A4A]" />
                            <span className="font-medium text-[#101111]">{dest.country}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[#101111]">{dest.requirements}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[#101111]">{dest.restrictions}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[#101111]">{dest.avgTime}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/compliance/export/${dest.country.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#154230] font-medium text-sm hover:underline">
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/fta" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <CheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">FTA Certificates</h3>
              <p className="text-sm text-white/70 mb-4">Generate certificates of origin for preferential duty rates.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Learn More <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/regulations" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <AlertTriangle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Export Restrictions</h3>
              <p className="text-sm text-white/70 mb-4">Check for controlled goods and export license requirements.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Check Restrictions <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/documents" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <FileText className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Document Templates</h3>
              <p className="text-sm text-white/70 mb-4">Access pre-built export document templates and checklists.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Browse Templates <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Export?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get help with export licenses, documentation, and compliance requirements.
          </p>
          <Link href="/consultations" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Get Expert Help <ChevronRight className="w-4 h-4" />
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