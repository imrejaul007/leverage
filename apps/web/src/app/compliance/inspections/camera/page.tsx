'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Camera,
  Video,
  Image as ImageIcon,
  Upload,
  ChevronRight,
  Menu,
  X,
  Bell,
  Play,
  Pause,
  Settings,
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

const recentCaptures = [
  { id: 1, type: 'image', name: 'Container Loading Photo 1', date: '2024-11-15 10:30', inspection: 'INS-2024-001' },
  { id: 2, type: 'video', name: 'Factory Floor Walkthrough', date: '2024-11-15 09:15', inspection: 'INS-2024-001' },
  { id: 3, type: 'image', name: 'Packaging Details', date: '2024-11-14 14:20', inspection: 'INS-2024-002' },
  { id: 4, type: 'image', name: 'Label Verification', date: '2024-11-14 13:45', inspection: 'INS-2024-002' },
];

export default function InspectionCameraPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Inspection Camera</span>
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
        <div className="container mx-auto max-w-5xl">
          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-[#154230] rounded-2xl flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#101111]">
                Inspection Camera
              </h1>
            </div>
            <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
              Capture photos and videos during inspections directly from your browser. All captures are automatically attached to the inspection report.
            </p>
          </motion.div>

          {/* Camera Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
              <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                {/* Placeholder for camera feed */}
                <div className="text-center text-white">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-white/70">Camera preview will appear here</p>
                  <p className="text-white/50 text-sm mt-2">Allow camera access to start capturing</p>
                </div>

                {/* Recording indicator */}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">Recording</span>
                  </div>
                )}

                {/* Camera controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-[#154230] hover:bg-[#1d5240]'
                    }`}
                  >
                    {isRecording ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Video className="w-8 h-8 text-white" />
                    )}
                  </button>
                  <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                    <Settings className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upload Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#101111] mb-4">Upload Existing Media</h2>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                <Upload className="w-12 h-12 text-[#4A4A4A] mx-auto mb-4" />
                <p className="text-[#101111] font-medium mb-2">Drag and drop files here or click to upload</p>
                <p className="text-sm text-[#4A4A4A] mb-4">JPG, PNG, MP4 up to 100MB</p>
                <button className="px-6 py-2 bg-[#154230] text-white font-medium rounded-lg hover:bg-[#1d5240] transition-colors">
                  Choose Files
                </button>
              </div>
            </div>
          </motion.div>

          {/* Recent Captures */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-black/5">
                <h2 className="text-xl font-bold text-[#101111]">Recent Captures</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentCaptures.map((capture, index) => (
                    <div key={capture.id} className={`p-4 rounded-xl ${index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            {capture.type === 'video' ? (
                              <Video className="w-6 h-6 text-white" />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{capture.name}</h3>
                            <p className="text-sm text-white/60">{capture.date} - {capture.inspection}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Play className="w-5 h-5 text-white" />
                          </button>
                          <Link href={`/compliance/inspections/track/${capture.id}`} className="text-white font-medium text-sm flex items-center gap-1">
                            View <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link href="/compliance/inspections/schedule" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Clock className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Schedule Inspection</h3>
              <p className="text-sm text-white/70 mb-4">Book a new inspection session.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Schedule <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/upload" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <Upload className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Upload Documents</h3>
              <p className="text-sm text-white/70 mb-4">Upload inspection reports and certificates.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Upload <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/reports" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <CheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">View Reports</h3>
              <p className="text-sm text-white/70 mb-4">Access all inspection reports.</p>
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