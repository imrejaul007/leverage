'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  FileText,
  Download,
  Plus,
  Filter,
  ChevronRight,
  Menu,
  X,
  Bell,
  ArrowRight,
  Truck,
  Globe,
  Bot,
  Receipt,
  Megaphone,
  Users,
  Camera,
  Eye,
  Building,
  User,
  Star,
  Phone,
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

const upcomingInspections = [
  {
    id: 'INS-2024-001',
    type: 'Container Inspection',
    location: 'Port of Los Angeles',
    date: 'Jan 25, 2024',
    time: '10:00 AM PST',
    status: 'scheduled',
    vessel: 'MSC Mediterranean',
  },
  {
    id: 'INS-2024-002',
    type: 'CPSC Safety Check',
    location: 'Warehouse DC-12, Chicago',
    date: 'Jan 27, 2024',
    time: '2:00 PM CST',
    status: 'scheduled',
    vessel: 'N/A',
  },
  {
    id: 'INS-2024-003',
    type: 'FDA Food Inspection',
    location: 'Port of New York',
    date: 'Jan 30, 2024',
    time: '9:00 AM EST',
    status: 'pending_docs',
    vessel: 'Maersk Elba',
  },
];

const pastInspections = [
  {
    id: 'INS-2023-089',
    type: 'Container Inspection',
    location: 'Port of Long Beach',
    date: 'Jan 10, 2024',
    status: 'passed',
    notes: 'All containers cleared. No discrepancies found.',
  },
  {
    id: 'INS-2023-088',
    type: 'USDA Phytosanitary',
    location: 'Port of Seattle',
    date: 'Jan 5, 2024',
    status: 'passed',
    notes: 'Fumigation certificate accepted. Clean release.',
  },
  {
    id: 'INS-2023-087',
    type: 'CPSC Lead Test',
    location: 'Lab Testing Center, LA',
    date: 'Dec 28, 2023',
    status: 'failed',
    notes: 'Lead levels exceeded threshold. Re-testing required.',
  },
];

const inspectionTypes = [
  { name: 'Container Inspection', icon: Truck, count: 45 },
  { name: 'Safety Compliance', icon: Shield, count: 32 },
  { name: 'Phytosanitary', icon: Building, count: 28 },
  { name: 'FDA/USDA', icon: CheckCircle2, count: 19 },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    scheduled: 'bg-blue-100 text-blue-700',
    pending_docs: 'bg-yellow-100 text-yellow-700',
    in_progress: 'bg-orange-100 text-orange-700',
    passed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    passed_with_issues: 'bg-yellow-100 text-yellow-700',
  };
  return styles[status] || 'bg-gray-100 text-gray-700';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    scheduled: 'Scheduled',
    pending_docs: 'Pending Docs',
    in_progress: 'In Progress',
    passed: 'Passed',
    failed: 'Failed',
    passed_with_issues: 'Passed w/ Issues',
  };
  return labels[status] || status;
};

export default function InspectionsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Inspections</span>
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
              <Shield className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Compliance Inspections
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Schedule, track, and manage all your compliance inspections in one place. Ensure smooth customs clearance.
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
                    placeholder="Search inspections by ID, type, or location..."
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
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-white/70">Upcoming</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">124</p>
              <p className="text-sm text-white/70">Completed</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-white/70">Pass Rate</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-white/70">Pending Docs</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Quick Actions - Alternating Solid Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Link href="/compliance/inspections/schedule" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Schedule Inspection</h3>
                <p className="text-sm text-white/70">Book new inspection</p>
              </div>
            </Link>
            <Link href="/compliance/inspections/upload" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Upload Documents</h3>
                <p className="text-sm text-white/70">Submit required docs</p>
              </div>
            </Link>
            <Link href="/compliance/inspections/track" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Track Status</h3>
                <p className="text-sm text-white/70">Real-time updates</p>
              </div>
            </Link>
          </div>

          {/* Inspection Types */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-[#101111] mb-4">Inspection Types</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {inspectionTypes.map((type, index) => {
                const Icon = type.icon;
                const isGreen = index % 2 === 0;
                return (
                  <Link
                    key={type.name}
                    href={`/compliance/inspections/${type.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`p-4 rounded-xl text-center hover:opacity-90 transition-opacity ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}
                  >
                    <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                    <h3 className="font-bold text-white text-sm">{type.name}</h3>
                    <p className="text-white/70 text-xs">{type.count} inspections</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Inspections List */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'upcoming'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Upcoming ({upcomingInspections.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'past'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                Past ({pastInspections.length})
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'upcoming' && (
                <div className="space-y-4">
                  {upcomingInspections.map((inspection) => (
                    <Link
                      key={inspection.id}
                      href={`/compliance/inspections/${inspection.id}`}
                      className="block p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm text-[#4A4A4A]">{inspection.id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(inspection.status)}`}>
                              {getStatusLabel(inspection.status)}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#101111]">{inspection.type}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <Phone className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <MapPin className="w-4 h-4" />
                          {inspection.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <Calendar className="w-4 h-4" />
                          {inspection.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <Clock className="w-4 h-4" />
                          {inspection.time}
                        </div>
                      </div>
                      {inspection.vessel !== 'N/A' && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <Truck className="w-4 h-4" />
                          Vessel: {inspection.vessel}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}

              {activeTab === 'past' && (
                <div className="space-y-4">
                  {pastInspections.map((inspection) => (
                    <Link
                      key={inspection.id}
                      href={`/compliance/inspections/${inspection.id}`}
                      className="block p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-sm text-[#4A4A4A]">{inspection.id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(inspection.status)}`}>
                              {getStatusLabel(inspection.status)}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#101111]">{inspection.type}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <FileText className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <MapPin className="w-4 h-4" />
                          {inspection.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                          <Calendar className="w-4 h-4" />
                          {inspection.date}
                        </div>
                      </div>
                      <p className="text-sm text-[#4A4A4A] bg-white p-3 rounded-lg">{inspection.notes}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Features - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/compliance/inspections/camera" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Photo Upload</h3>
              <p className="text-sm text-white/70">Submit inspection photos</p>
            </Link>
            <Link href="/compliance/inspections/notifications" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Alerts</h3>
              <p className="text-sm text-white/70">Real-time notifications</p>
            </Link>
            <Link href="/compliance/inspections/agents" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Agent Network</h3>
              <p className="text-sm text-white/70">Certified inspectors</p>
            </Link>
            <Link href="/compliance/inspections/reports" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Reports</h3>
              <p className="text-sm text-white/70">Download inspection reports</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Simplify Your Inspection Process</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule inspections, upload documents, and track results all in one place.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Managing Inspections <ArrowRight className="w-4 h-4" />
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
