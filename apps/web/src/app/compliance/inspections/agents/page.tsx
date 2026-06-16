'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Star,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Menu,
  X,
  Bell,
  Shield,
  CheckCircle,
  Clock,
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

const inspectionAgents = [
  { id: 1, name: 'Global Inspection Services', rating: 4.9, reviews: 234, location: 'New York, USA', services: ['Product Inspection', 'Factory Audit', 'Lab Testing'], certified: true },
  { id: 2, name: 'Asia Quality Control', rating: 4.8, reviews: 189, location: 'Shanghai, China', services: ['Pre-shipment Inspection', 'Container Loading'], certified: true },
  { id: 3, name: 'EuroCheck Inspections', rating: 4.7, reviews: 156, location: 'Frankfurt, Germany', services: ['CE Compliance', 'Product Testing', 'Documentation'], certified: true },
  { id: 4, name: 'Pacific Rim Inspectors', rating: 4.9, reviews: 312, location: 'Hong Kong', services: ['Factory Audit', 'Social Compliance', 'Environmental'], certified: true },
  { id: 5, name: 'South Asia Quality Hub', rating: 4.6, reviews: 98, location: 'Mumbai, India', services: ['Textile Inspection', 'Garment Testing'], certified: false },
  { id: 6, name: 'Mexico Trade Inspections', rating: 4.8, reviews: 145, location: 'Mexico City, Mexico', services: ['USMCA Compliance', 'Product Inspection'], certified: true },
];

export default function InspectionAgentsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = inspectionAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Inspection Agents</span>
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
                <Users className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Inspection Agents
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Connect with certified inspection agents and QC professionals worldwide. Schedule inspections and audits with confidence.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search agents or locations..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-white/70">Verified Agents</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">25+</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-white/70">Avg. Rating</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">1K+</p>
              <p className="text-sm text-white/70">Inspections</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Agent Cards */}
          <div className="space-y-4">
            {filteredAgents.map((agent, index) => {
              const isGreen = index % 2 === 0;
              return (
                <div key={agent.id} className={`rounded-xl overflow-hidden ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                          {agent.certified && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white font-medium">{agent.rating}</span>
                            <span className="text-white/60 text-sm">({agent.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/70 text-sm">
                            <MapPin className="w-4 h-4" />
                            {agent.location}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {agent.services.map((service) => (
                            <span key={service} className="px-2 py-1 bg-white/10 rounded text-xs text-white">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1 text-right">
                          <span className="text-white/60 text-sm">Est. turnaround</span>
                          <span className="text-white font-medium">2-5 business days</span>
                        </div>
                        <Link href={`/compliance/inspections/agents/${agent.id}`} className="px-6 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#101111] mb-2">No Agents Found</h3>
              <p className="text-[#4A4A4A]">Try adjusting your search criteria.</p>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link href="/compliance/inspections/schedule" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Clock className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Schedule Inspection</h3>
              <p className="text-sm text-white/70 mb-4">Book an inspection with a certified agent.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Schedule <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/track" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <CheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Track Inspections</h3>
              <p className="text-sm text-white/70 mb-4">Monitor the status of your scheduled inspections.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Track <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/reports" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Users className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Inspection Reports</h3>
              <p className="text-sm text-white/70 mb-4">Access detailed inspection reports and certificates.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Reports <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Custom Inspection Services?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Contact us to arrange specialized inspection services tailored to your requirements.
          </p>
          <Link href="/consultations" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Contact Us <ChevronRight className="w-4 h-4" />
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