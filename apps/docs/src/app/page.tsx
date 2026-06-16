'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Plus,
  Clock,
  CheckCircle,
  Eye,
  Edit3,
  Trash2,
  Search,
  Filter,
  ChevronRight,
  ArrowRight,
  Shield,
  Truck,
  Globe,
  Users,
  Star,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Building2,
  FileCheck,
  ScrollText,
  BookOpen,
  CreditCard,
  Send,
  History,
  Star as StarIcon,
  Bookmark,
  Package,
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'invoice' | 'bl' | 'coo' | 'lc' | 'pl' | 'ci';
  status: 'draft' | 'pending' | 'approved' | 'sent';
  createdAt: string;
  updatedAt: string;
  amount?: string;
  buyer?: string;
  seller?: string;
}

const documents: Document[] = [
  { id: '1', name: 'Invoice INV-2024-001', type: 'invoice', status: 'approved', createdAt: '2024-01-15', updatedAt: '2024-01-16', amount: '$45,000', buyer: 'ABC Imports', seller: 'Global Trade Co' },
  { id: '2', name: 'Bill of Lading BOL-2024-015', type: 'bl', status: 'sent', createdAt: '2024-01-14', updatedAt: '2024-01-17', buyer: 'XYZ Corporation', seller: 'Asia Exports' },
  { id: '3', name: 'Certificate of Origin COO-2024-008', type: 'coo', status: 'pending', createdAt: '2024-01-17', updatedAt: '2024-01-17', buyer: 'DEF Trading', seller: 'Europe Goods Ltd' },
  { id: '4', name: 'Packing List PL-2024-022', type: 'pl', status: 'approved', createdAt: '2024-01-13', updatedAt: '2024-01-15', amount: '$28,500', buyer: 'GHI Merchants', seller: 'Pacific Trade' },
  { id: '5', name: 'Commercial Invoice CI-2024-033', type: 'ci', status: 'draft', createdAt: '2024-01-18', updatedAt: '2024-01-18', amount: '$67,200', buyer: 'JKL Industries', seller: 'Global Trade Co' },
  { id: '6', name: 'Letter of Credit LC-2024-005', type: 'lc', status: 'pending', createdAt: '2024-01-16', updatedAt: '2024-01-18', amount: '$120,000', buyer: 'MNO Enterprises', seller: 'Asia Exports' },
];

const documentTypes = [
  {
    type: 'invoice',
    name: 'Commercial Invoice',
    shortName: 'Invoice',
    icon: FileText,
    description: 'Primary commercial document for customs and payment',
    color: '#154230',
    fields: ['Invoice Number', 'Date', 'Buyer Details', 'Seller Details', 'Product Description', 'Quantity', 'Unit Price', 'Total Amount', 'Payment Terms'],
  },
  {
    type: 'bl',
    name: 'Bill of Lading',
    shortName: 'B/L',
    icon: Truck,
    description: 'Shipping document proving receipt of goods',
    color: '#A6824A',
    fields: ['Shipper', 'Consignee', 'Notify Party', 'Port of Loading', 'Port of Discharge', 'Container Details', 'Cargo Description', 'Gross Weight'],
  },
  {
    type: 'coo',
    name: 'Certificate of Origin',
    shortName: 'COO',
    icon: Globe,
    description: 'Certificate proving origin of goods',
    color: '#5D1E21',
    fields: ['Exporter Details', 'Manufacturer', ' Country of Origin', 'Product Description', 'HS Code', 'Declaration'],
  },
  {
    type: 'lc',
    name: 'Letter of Credit',
    shortName: 'L/C',
    icon: CreditCard,
    description: 'Bank guarantee for international payment',
    color: '#154230',
    fields: ['LC Number', 'Issuing Bank', 'Beneficiary', 'Applicant', 'Amount', 'Expiry Date', 'Terms & Conditions'],
  },
  {
    type: 'pl',
    name: 'Packing List',
    shortName: 'P/L',
    icon: Package,
    description: 'Detailed list of packed goods',
    color: '#A6824A',
    fields: ['Invoice Reference', 'Marks & Numbers', 'Description', 'Quantity', 'Net Weight', 'Gross Weight', 'Dimensions'],
  },
  {
    type: 'ci',
    name: 'Customs Invoice',
    shortName: 'C/I',
    icon: ScrollText,
    description: 'Invoice for customs clearance purposes',
    color: '#5D1E21',
    fields: ['Seller', 'Buyer', 'Invoice Number', 'Date', 'Product Details', 'Declared Value', 'HS Code', 'Country of Origin'],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    case 'draft': return 'bg-gray-100 text-gray-700';
    case 'sent': return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'invoice': return <FileText className="w-5 h-5" />;
    case 'bl': return <Truck className="w-5 h-5" />;
    case 'coo': return <Globe className="w-5 h-5" />;
    case 'lc': return <CreditCard className="w-5 h-5" />;
    case 'pl': return <Package className="w-5 h-5" />;
    case 'ci': return <ScrollText className="w-5 h-5" />;
    default: return <FileText className="w-5 h-5" />;
  }
};

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'my-docs'>('create');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg">
                <FileText className="w-4 h-4" />
                Documents
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Home</Link>
              <Link href="/marketplace" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Marketplace</Link>
              <Link href="/docs" className="text-sm font-medium text-[#154230] transition-colors">Documents</Link>
              <Link href="/freight" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Freight</Link>
              <Link href="/compliance" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Compliance</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/docs/templates" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg hover:bg-[#154230]/20 transition-colors">
                <Bookmark className="w-4 h-4" />
                Templates
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-black/5"
            >
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#154230]/10 rounded-lg font-medium text-[#154230]">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              <FileCheck className="w-4 h-4" />
              Trade Document Generator
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Create Trade Documents Instantly
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Generate invoices, bills of lading, certificates of origin, and more. AI-powered, legally compliant, export-ready.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Plus className="w-6 h-6" />
              <span className="text-sm font-medium">New Invoice</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Truck className="w-6 h-6" />
              <span className="text-sm font-medium">New B/L</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Globe className="w-6 h-6" />
              <span className="text-sm font-medium">New COO</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <CreditCard className="w-6 h-6" />
              <span className="text-sm font-medium">New L/C</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-[#A6824A] hover:bg-[#b8945a] rounded-xl transition-colors">
              <Users className="w-6 h-6" />
              <span className="text-sm font-medium">Consultations</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-20 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button
                onClick={() => setActiveTab('create')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'create'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create Document
              </button>
              <button
                onClick={() => setActiveTab('my-docs')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'my-docs'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                My Documents
              </button>
            </div>

            {activeTab === 'create' ? (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-6">Select Document Type</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documentTypes.map((doc) => {
                    const Icon = doc.icon;
                    return (
                      <button
                        key={doc.type}
                        onClick={() => setSelectedType(doc.type)}
                        className={`p-6 rounded-xl border-2 text-left transition-all ${
                          selectedType === doc.type
                            ? 'border-[#154230] bg-[#154230]/5'
                            : 'border-black/5 hover:border-[#154230]/30 hover:bg-[#154230]/5'
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: doc.color }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-[#101111] mb-1">{doc.name}</h3>
                        <p className="text-sm text-[#4A4A4A] mb-3">{doc.description}</p>
                        <span className="text-xs text-[#154230] font-medium">
                          {doc.fields.length} fields
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedType && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-[#154230]/5 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-[#101111]">
                        Create {documentTypes.find(d => d.type === selectedType)?.name}
                      </h3>
                      <button className="px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Start Creating
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {documentTypes.find(d => d.type === selectedType)?.fields.map((field, i) => (
                        <div key={i} className="space-y-2">
                          <label className="text-sm font-medium text-[#4A4A4A]">{field}</label>
                          <input
                            type="text"
                            placeholder={`Enter ${field.toLowerCase()}`}
                            className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-[#101111] placeholder-[#4A4A4A]/50 focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="p-6">
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="w-full h-12 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                  <button className="h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>

                {/* Documents List */}
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          doc.type === 'invoice' || doc.type === 'ci' ? 'bg-[#154230]/10 text-[#154230]' :
                          doc.type === 'bl' || doc.type === 'pl' ? 'bg-[#A6824A]/10 text-[#A6824A]' :
                          'bg-[#5D1E21]/10 text-[#5D1E21]'
                        }`}>
                          {getTypeIcon(doc.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-[#101111]">{doc.name}</h4>
                          <p className="text-sm text-[#4A4A4A]">
                            {doc.buyer} • {doc.createdAt}
                            {doc.amount && ` • ${doc.amount}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <div className="flex items-center gap-1">
                          <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                            <Edit3 className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-semibold text-[#101111] mb-2">AI-Powered</h3>
              <p className="text-sm text-[#4A4A4A]">Auto-fill from orders and contracts</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#A6824A]/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#A6824A]" />
              </div>
              <h3 className="font-semibold text-[#101111] mb-2">Legally Compliant</h3>
              <p className="text-sm text-[#4A4A4A]">Templates follow international standards</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#5D1E21]/10 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-[#5D1E21]" />
              </div>
              <h3 className="font-semibold text-[#101111] mb-2">Export-Ready</h3>
              <p className="text-sm text-[#4A4A4A]">Multiple country formats supported</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-semibold text-[#101111] mb-2">PDF & Print</h3>
              <p className="text-sm text-[#4A4A4A]">Download in multiple formats</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-8 bg-[#E6E2DA]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4">
            Ready to streamline your trade documents?
          </h2>
          <p className="text-[#4A4A4A] mb-8 max-w-xl mx-auto">
            Join thousands of businesses who have already digitized their trade documentation with LEVERAGE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#154230] hover:bg-[#1d5240] text-white font-bold rounded-xl transition-all">
              Start Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#154230] text-[#154230] font-semibold rounded-xl transition-all hover:bg-[#154230] hover:text-white">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 bg-[#154230]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain brightness-0 invert" />
              <span className="text-white font-semibold">Documents</span>
            </div>
            <div className="flex gap-6 text-sm text-white/70">
              <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
              <Link href="/freight" className="hover:text-white transition-colors">Freight</Link>
              <Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            © 2026 LEVERAGE Documents. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
