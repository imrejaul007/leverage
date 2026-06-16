'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  User,
  ChevronRight,
  Menu,
  X,
  Bell,
  CheckCircle,
  AlertCircle,
  FileText,
  Camera,
  Search,
  Calendar,
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

const trackingSteps = [
  { id: 1, name: 'Scheduled', description: 'Inspection has been scheduled', completed: true },
  { id: 2, name: 'Agent Assigned', description: 'Inspector has been assigned', completed: true },
  { id: 3, name: 'In Progress', description: 'Inspection is being conducted', completed: true },
  { id: 4, name: 'Report Generation', description: 'Generating inspection report', completed: false },
  { id: 5, name: 'Completed', description: 'Inspection complete', completed: false },
];

const scheduledInspections = [
  { id: 'INS-2024-001', title: 'Electronics Factory Audit', status: 'in_progress', type: 'Factory Audit', date: '2024-11-15', agent: 'Global Inspection Services', progress: 75 },
  { id: 'INS-2024-002', title: 'Textile Quality Inspection', status: 'scheduled', type: 'Product Inspection', date: '2024-11-18', agent: 'Asia Quality Control', progress: 25 },
  { id: 'INS-2024-003', title: 'Auto Parts Pre-shipment', status: 'scheduled', type: 'Pre-shipment Inspection', date: '2024-11-20', agent: 'Pacific Rim Inspectors', progress: 0 },
];

export default function TrackInspectionsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      scheduled: 'bg-blue-100 text-blue-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Track Inspections</span>
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#5D1E21] rounded-full"></span>
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
                <Clock className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Track Inspections
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Monitor the status of your scheduled and ongoing inspections in real-time.
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
                    placeholder="Search by inspection ID..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center transition-colors">
                  Track
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{scheduledInspections.length}</p>
              <p className="text-sm text-white/70">Total</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{scheduledInspections.filter(i => i.status === 'in_progress').length}</p>
              <p className="text-sm text-white/70">In Progress</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{scheduledInspections.filter(i => i.status === 'scheduled').length}</p>
              <p className="text-sm text-white/70">Scheduled</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-white/70">On-Time</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Inspection Cards */}
          <div className="space-y-6">
            {scheduledInspections.map((inspection, index) => (
              <div key={inspection.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#4A4A4A] text-sm font-mono">{inspection.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(inspection.status)}`}>
                          {inspection.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#101111] mb-1">{inspection.title}</h3>
                      <p className="text-[#4A4A4A]">{inspection.type}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href="/compliance/inspections/camera" className="p-3 bg-[#f7f5f1] rounded-lg hover:bg-[#E6E2DA] transition-colors">
                        <Camera className="w-5 h-5 text-[#4A4A4A]" />
                      </Link>
                      <Link href={`/compliance/inspections/track/${inspection.id}`} className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#4A4A4A]">Progress</span>
                      <span className="text-sm font-medium text-[#101111]">{inspection.progress}%</span>
                    </div>
                    <div className="h-2 bg-[#f7f5f1] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#154230] rounded-full transition-all duration-500"
                        style={{ width: `${inspection.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <Calendar className="w-4 h-4" />
                      <span>{inspection.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <User className="w-4 h-4" />
                      <span>{inspection.agent}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <MapPin className="w-4 h-4" />
                      <span>Shanghai, China</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      {getStatusIcon(inspection.status)}
                      <span className="capitalize">{inspection.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link href="/compliance/inspections/schedule" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Clock className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Schedule New</h3>
              <p className="text-sm text-white/70 mb-4">Book a new inspection.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Schedule <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/reports" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <FileText className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">View Reports</h3>
              <p className="text-sm text-white/70 mb-4">Access inspection reports.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Reports <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/agents" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <User className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Find Agents</h3>
              <p className="text-sm text-white/70 mb-4">Browse inspection agents.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Agents <ChevronRight className="w-4 h-4" />
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