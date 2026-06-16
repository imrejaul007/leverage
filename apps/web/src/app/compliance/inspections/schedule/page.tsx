'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronRight,
  Menu,
  X,
  Bell,
  CheckCircle,
  FileText,
  Loader2,
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

const inspectionTypes = [
  { id: 'factory_audit', name: 'Factory Audit', description: 'Comprehensive facility inspection', duration: '1-2 days' },
  { id: 'product_inspection', name: 'Product Inspection', description: 'Random sampling inspection', duration: '4-8 hours' },
  { id: 'pre_shipment', name: 'Pre-shipment Inspection', description: 'Final inspection before shipping', duration: '1 day' },
  { id: 'lab_testing', name: 'Lab Testing', description: 'Product samples sent to laboratory', duration: '7-14 days' },
];

export default function ScheduleInspectionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Schedule Inspection</span>
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

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-[#154230] rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#101111]">
                Schedule Inspection
              </h1>
            </div>
            <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
              Book a professional inspection with our certified agents. Fill out the form below to get started.
            </p>
          </motion.div>

          {/* Schedule Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#101111] mb-6">Inspection Details</h2>

              <div className="space-y-6">
                {/* Inspection Type */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-3">Inspection Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inspectionTypes.map((type, index) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-xl text-left transition-all ${
                          selectedType === type.id
                            ? 'bg-[#154230] text-white'
                            : index % 2 === 0
                            ? 'bg-[#154230]/10'
                            : 'bg-[#5D1E21]/10'
                        }`}
                      >
                        <h3 className={`font-medium ${selectedType === type.id ? 'text-white' : 'text-[#101111]'}`}>{type.name}</h3>
                        <p className={`text-sm ${selectedType === type.id ? 'text-white/70' : 'text-[#4A4A4A]'}`}>{type.description}</p>
                        <span className={`text-xs ${selectedType === type.id ? 'text-white/60' : 'text-[#4A4A4A]'}`}>{type.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Inspection Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                      <input
                        type="text"
                        placeholder="Factory address"
                        className="w-full h-12 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                      <input
                        type="date"
                        className="w-full h-12 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Contact Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full h-12 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Contact Email</label>
                    <div className="relative">
                      <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full h-12 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Product Details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the products to be inspected, quantity, HS codes, etc."
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20 resize-none"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Additional Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Any special requirements or instructions..."
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20 resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4 border-t border-black/5">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="h-12 px-8 bg-[#154230] hover:bg-[#1d5240] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Schedule Inspection
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/inspections/agents" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <User className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Find Agents</h3>
              <p className="text-sm text-white/70 mb-4">Browse certified inspection agents.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Agents <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/track" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <Clock className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Track Inspections</h3>
              <p className="text-sm text-white/70 mb-4">Monitor scheduled inspections.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Track <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/reports" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <FileText className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">View Reports</h3>
              <p className="text-sm text-white/70 mb-4">Access inspection reports.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Reports <ChevronRight className="w-4 h-4" />
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