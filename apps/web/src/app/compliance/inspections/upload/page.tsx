'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  ChevronRight,
  Menu,
  X,
  Bell,
  File,
  Image as ImageIcon,
  Download,
  Trash2,
  Search,
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

const uploadedFiles = [
  { id: 1, name: 'Inspection_Report_001.pdf', type: 'pdf', size: '2.4 MB', date: '2024-11-15', status: 'verified' },
  { id: 2, name: 'Factory_Certificate.pdf', type: 'pdf', size: '1.8 MB', date: '2024-11-14', status: 'verified' },
  { id: 3, name: 'Quality_Test_Results.xlsx', type: 'xlsx', size: '890 KB', date: '2024-11-12', status: 'pending' },
  { id: 4, name: 'Product_Photo_001.jpg', type: 'jpg', size: '3.2 MB', date: '2024-11-10', status: 'verified' },
];

const documentTypes = [
  { id: 'inspection_report', name: 'Inspection Report', description: 'Official inspection report from agent' },
  { id: 'certificate', name: 'Quality Certificate', description: 'Product quality certification' },
  { id: 'test_result', name: 'Lab Test Results', description: 'Laboratory testing documentation' },
  { id: 'photo', name: 'Product Photos', description: 'Visual documentation of products' },
];

export default function UploadInspectionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'xlsx':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'jpg':
      case 'png':
        return <ImageIcon className="w-6 h-6 text-blue-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'verified'
      ? { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle }
      : { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock };
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Upload Documents</span>
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
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#101111]">
                Upload Inspection Documents
              </h1>
            </div>
            <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
              Upload inspection reports, certificates, test results, and photos to your compliance profile.
            </p>
          </motion.div>

          {/* Document Type Selection */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#101111] mb-4">Document Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {documentTypes.map((doc, index) => {
                  const isGreen = index % 2 === 0;
                  return (
                    <div key={doc.id} className={`p-4 rounded-xl cursor-pointer ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                      <h3 className="font-medium text-white mb-1">{doc.name}</h3>
                      <p className="text-xs text-white/70">{doc.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div
              className={`bg-white rounded-2xl shadow-sm p-8 mb-6 border-2 border-dashed transition-colors ${
                dragActive ? 'border-[#154230] bg-[#154230]/5' : 'border-gray-200'
              }`}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDrop={() => setDragActive(false)}
            >
              <div className="text-center">
                <Upload className="w-12 h-12 text-[#4A4A4A] mx-auto mb-4" />
                <p className="text-[#101111] font-medium mb-2">Drag and drop files here or click to upload</p>
                <p className="text-sm text-[#4A4A4A] mb-4">PDF, DOC, XLSX, JPG, PNG up to 50MB each</p>
                <button className="px-6 py-2 bg-[#154230] text-white font-medium rounded-lg hover:bg-[#1d5240] transition-colors">
                  Choose Files
                </button>
              </div>
            </div>
          </motion.div>

          {/* Uploaded Files */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-black/5">
                <h2 className="text-xl font-bold text-[#101111]">Uploaded Documents</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {uploadedFiles.map((file, index) => {
                    const statusBadge = getStatusBadge(file.status);
                    const StatusIcon = statusBadge.icon;
                    return (
                      <div key={file.id} className={`p-4 rounded-xl flex items-center justify-between ${index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                        <div className="flex items-center gap-4">
                          {getFileIcon(file.type)}
                          <div>
                            <h3 className="font-medium text-white">{file.name}</h3>
                            <p className="text-sm text-white/60">{file.size} • {file.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {file.status === 'verified' ? 'Verified' : 'Pending'}
                          </span>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Download className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                            <Trash2 className="w-5 h-5 text-red-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Link href="/compliance/inspections/reports" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <FileText className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">View Reports</h3>
              <p className="text-sm text-white/70 mb-4">Access all inspection reports.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Reports <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/schedule" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <Upload className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Schedule Inspection</h3>
              <p className="text-sm text-white/70 mb-4">Book a new inspection.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Schedule <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/track" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Search className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Track Status</h3>
              <p className="text-sm text-white/70 mb-4">Monitor inspection progress.</p>
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