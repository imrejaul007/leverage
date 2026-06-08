'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, Clock, FileText, Download, Eye, X, Shield, FileCheck, Home, Briefcase, Send, MessageSquare, User, Bell, ChevronDown, Filter, Upload, Folder, Menu, Settings, LogOut, Truck, Package, BarChart3 } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'DRAFT' | 'PENDING' | 'VALIDATED' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  fileSize: string;
  description?: string;
}

const initialDocuments: Document[] = [
  { id: '1', name: 'Commercial Invoice - Order #1234', type: 'INVOICE', status: 'VALIDATED', createdAt: '2024-01-20', updatedAt: '2024-01-20', fileSize: '245 KB', description: 'Invoice for order #1234 - Electronics shipment' },
  { id: '2', name: 'Bill of Lading - Shipment #5678', type: 'BILL_OF_LADING', status: 'PENDING', createdAt: '2024-01-19', updatedAt: '2024-01-19', fileSize: '128 KB', description: 'BOL for container MSCU123456' },
  { id: '3', name: 'Packing List - Container #CL1234', type: 'PACKING_LIST', status: 'APPROVED', createdAt: '2024-01-18', updatedAt: '2024-01-18', fileSize: '89 KB', description: 'Packing list for sea freight shipment' },
  { id: '4', name: 'Certificate of Origin - India', type: 'CERTIFICATE_OF_ORIGIN', status: 'VALIDATED', createdAt: '2024-01-17', updatedAt: '2024-01-17', fileSize: '156 KB', description: 'COO for Indian export goods' },
  { id: '5', name: 'Customs Declaration - Dubai', type: 'CUSTOMS_DECLARATION', status: 'PENDING', createdAt: '2024-01-16', updatedAt: '2024-01-16', fileSize: '312 KB', description: 'Import declaration for UAE customs' },
  { id: '6', name: 'Insurance Certificate - Marine', type: 'INSURANCE', status: 'APPROVED', createdAt: '2024-01-15', updatedAt: '2024-01-15', fileSize: '78 KB', description: 'Marine insurance for sea cargo' },
];

const documentTypes: Record<string, { icon: string; label: string }> = {
  INVOICE: { icon: '📄', label: 'Invoice' },
  BILL_OF_LADING: { icon: '📋', label: 'Bill of Lading' },
  PACKING_LIST: { icon: '📦', label: 'Packing List' },
  CERTIFICATE_OF_ORIGIN: { icon: '🏛️', label: 'Certificate of Origin' },
  CUSTOMS_DECLARATION: { icon: '📝', label: 'Customs Declaration' },
  INSURANCE: { icon: '🛡️', label: 'Insurance' },
};

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  DRAFT: { color: 'text-[#4A4A4A]', bg: 'bg-[#E6E2DA]', label: 'Draft' },
  PENDING: { color: 'text-[#5D1E21]', bg: 'bg-[#5D1E21]/10', label: 'Pending' },
  VALIDATED: { color: 'text-[#154230]', bg: 'bg-[#154230]/10', label: 'Validated' },
  APPROVED: { color: 'text-[#154230]', bg: 'bg-[#154230]/10', label: 'Approved' },
  REJECTED: { color: 'text-[#5D1E21]', bg: 'bg-[#5D1E21]/10', label: 'Rejected' },
};

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents', active: true },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];


export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('leverage_documents');
    if (stored) {
      setDocuments(JSON.parse(stored));
    } else {
      setDocuments(initialDocuments);
      localStorage.setItem('leverage_documents', JSON.stringify(initialDocuments));
    }
    setIsLoading(false);
  }, []);

  const statusFilters = ['all', 'DRAFT', 'PENDING', 'VALIDATED', 'APPROVED', 'REJECTED'];

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: documents.length,
    pending: documents.filter(d => d.status === 'PENDING').length,
    validated: documents.filter(d => d.status === 'VALIDATED' || d.status === 'APPROVED').length,
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar - Fixed left */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="lg:hidden">
        {/* Green Gradient Header */}
        <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setSidebarOpen(true)} className="p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
              </div>
            </div>
            <button className="relative p-2 text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5D1E21] rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </span>
            </button>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Documents</h2>
            <p className="text-white/70 text-sm">{documents.length} total documents</p>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="relative w-72 bg-white h-full flex flex-col shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
                  <X className="w-5 h-5 text-[#4A4A4A]" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = link.active;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-[#154230] text-white'
                          : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-black/5">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#101111] font-semibold text-sm">John Doe</p>
                    <p className="text-[#4A4A4A] text-xs">john@company.com</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Main Content - Offset on desktop */}
      <div className="lg:ml-64">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-white border-b border-black/5 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-[#154230]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#101111]">Documents</h2>
                <p className="text-[#4A4A4A] text-sm font-medium">{documents.length} total documents</p>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-[#154230] text-white font-semibold rounded-xl shadow-lg hover:bg-[#1d5240] transition-colors">
              <Plus className="w-5 h-5" />
              New Document
            </button>
          </div>
        </div>

        {/* Search and Filter Section - Mobile */}
        <div className="lg:hidden px-4 -mt-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 bg-[#E6E2DA] rounded-xl text-[#101111] placeholder-[#5A5A5A] focus:outline-none text-sm font-medium"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-colors ${showFilters ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#4A4A4A]'}`}
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Tabs */}
            {showFilters && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1 -mx-1 px-1">
                {statusFilters.map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-xs transition-colors ${
                      statusFilter === s
                        ? 'bg-[#154230] text-white'
                        : 'bg-[#E6E2DA] text-[#4A4A4A]'
                    }`}
                  >
                    {s === 'all' ? 'All' : statusConfig[s]?.label || s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Section - Desktop */}
        <div className="hidden lg:block px-8 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search documents by name or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-[#E6E2DA] rounded-xl text-[#101111] placeholder-[#5A5A5A] focus:outline-none text-sm font-medium"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-xl transition-colors ${showFilters ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#4A4A4A]'}`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs - Desktop */}
            {showFilters && (
              <div className="flex gap-3 mt-4">
                {statusFilters.map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                      statusFilter === s
                        ? 'bg-[#154230] text-white'
                        : 'bg-[#E6E2DA] text-[#4A4A4A] hover:bg-[#D4CCBE]'
                    }`}
                  >
                    {s === 'all' ? 'All' : statusConfig[s]?.label || s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Mobile */}
        <div className="lg:hidden px-4 mt-5">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <h3 className="text-sm font-semibold text-[#101111] mb-3">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center gap-2 p-3 bg-[#E6E2DA] rounded-xl hover:bg-[#D4CCBE] transition-colors">
                <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-xs font-medium text-[#101111]">Upload</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 bg-[#E6E2DA] rounded-xl hover:bg-[#D4CCBE] transition-colors">
                <div className="w-10 h-10 bg-[#5D1E21]/10 rounded-lg flex items-center justify-center">
                  <Folder className="w-5 h-5 text-[#5D1E21]" />
                </div>
                <span className="text-xs font-medium text-[#101111]">Folders</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 bg-[#E6E2DA] rounded-xl hover:bg-[#D4CCBE] transition-colors">
                <div className="w-10 h-10 bg-[#A6824A]/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#A6824A]" />
                </div>
                <span className="text-xs font-medium text-[#101111]">Validate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions - Desktop */}
        <div className="hidden lg:block px-8 mt-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-base font-semibold text-[#101111] mb-4">Quick Actions</h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-3 px-5 py-3 bg-[#E6E2DA] rounded-xl hover:bg-[#D4CCBE] transition-colors">
                <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-sm font-medium text-[#101111]">Upload Document</span>
              </button>
              <button className="flex items-center gap-3 px-5 py-3 bg-[#E6E2DA] rounded-xl hover:bg-[#D4CCBE] transition-colors">
                <div className="w-10 h-10 bg-[#5D1E21]/10 rounded-lg flex items-center justify-center">
                  <Folder className="w-5 h-5 text-[#5D1E21]" />
                </div>
                <span className="text-sm font-medium text-[#101111]">Manage Folders</span>
              </button>
              <button className="flex items-center gap-3 px-5 py-3 bg-[#E6E2DA] rounded-xl hover:bg-[#D4CCBE] transition-colors">
                <div className="w-10 h-10 bg-[#A6824A]/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#A6824A]" />
                </div>
                <span className="text-sm font-medium text-[#101111]">Validate Documents</span>
              </button>
            </div>
          </div>
        </div>

        {/* Documents List - Mobile */}
        <div className="lg:hidden px-4 mt-5 pb-32">
          <div className="space-y-3">
            {filteredDocs.map(doc => (
              <div
                key={doc.id}
                onClick={() => setViewingDoc(doc)}
                className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E6E2DA] flex items-center justify-center text-xl">
                    {documentTypes[doc.type]?.icon || '📄'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#101111] font-bold text-sm truncate">{doc.name}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[#4A4A4A] text-xs font-medium">{documentTypes[doc.type]?.label}</span>
                      <span className="text-[#4A4A4A] text-xs">•</span>
                      <span className="text-[#4A4A4A] text-xs font-medium">{doc.fileSize}</span>
                      <span className="text-[#4A4A4A] text-xs">•</span>
                      <span className="text-[#4A4A4A] text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {doc.updatedAt}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusConfig[doc.status].bg} ${statusConfig[doc.status].color}`}>
                    {statusConfig[doc.status].label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents List - Desktop */}
        <div className="hidden lg:block px-8 mt-6 pb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <h3 className="text-lg font-bold text-[#101111]">All Documents ({filteredDocs.length})</h3>
            </div>
            <div className="divide-y divide-black/5">
              {filteredDocs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setViewingDoc(doc)}
                  className="p-6 cursor-pointer hover:bg-[#E6E2DA]/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#E6E2DA] flex items-center justify-center text-2xl">
                      {documentTypes[doc.type]?.icon || '📄'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#101111] font-bold text-base truncate">{doc.name}</h3>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <span className="text-[#4A4A4A] text-sm font-medium">{documentTypes[doc.type]?.label}</span>
                        <span className="text-[#4A4A4A] text-sm">•</span>
                        <span className="text-[#4A4A4A] text-sm font-medium">{doc.fileSize}</span>
                        <span className="text-[#4A4A4A] text-sm">•</span>
                        <span className="text-[#4A4A4A] text-sm font-medium flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {doc.updatedAt}
                        </span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${statusConfig[doc.status].bg} ${statusConfig[doc.status].color}`}>
                      {statusConfig[doc.status].label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State - Mobile */}
        {!isLoading && filteredDocs.length === 0 && (
          <div className="lg:hidden px-4 mt-5 pb-32">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-[#E6E2DA] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#4A4A4A]" />
              </div>
              <p className="text-[#4A4A4A] text-sm font-medium mb-2">No documents found</p>
              <p className="text-[#4A4A4A] text-xs mb-4">Try adjusting your search or filters</p>
              <button className="px-5 py-2.5 bg-[#154230] text-white font-semibold rounded-xl text-sm">
                Upload Document
              </button>
            </div>
          </div>
        )}

        {/* Empty State - Desktop */}
        {!isLoading && filteredDocs.length === 0 && (
          <div className="hidden lg:block px-8 mt-6">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-[#E6E2DA] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-[#4A4A4A]" />
              </div>
              <p className="text-[#4A4A4A] text-lg font-medium mb-2">No documents found</p>
              <p className="text-[#4A4A4A] text-sm mb-6">Try adjusting your search or filters</p>
              <button className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-xl text-sm">
                Upload Document
              </button>
            </div>
          </div>
        )}

        {/* Loading Skeleton - Mobile */}
        {isLoading && (
          <div className="lg:hidden px-4 mt-5 pb-32 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E6E2DA] rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#E6E2DA] rounded w-48" />
                    <div className="h-3 bg-[#E6E2DA] rounded w-32" />
                  </div>
                  <div className="h-7 bg-[#E6E2DA] rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading Skeleton - Desktop */}
        {isLoading && (
          <div className="hidden lg:block px-8 mt-6 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#E6E2DA] rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-[#E6E2DA] rounded w-64" />
                    <div className="h-4 bg-[#E6E2DA] rounded w-40" />
                  </div>
                  <div className="h-8 bg-[#E6E2DA] rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Stats Bar - Mobile (Burgundy) */}
        <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-[#5D1E21] px-5 py-3 z-30">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-white font-bold text-lg">{stats.total}</p>
              <p className="text-white/60 text-xs font-medium">Total</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold text-lg">{stats.pending}</p>
              <p className="text-white/60 text-xs font-medium">Pending</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold text-lg">{stats.validated}</p>
              <p className="text-white/60 text-xs font-medium">Validated</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-white font-bold text-lg">98%</p>
              <p className="text-white/60 text-xs font-medium">Compliance</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Mobile */}
      <BottomNav activeItem="documents" />
    </div>

    {/* View Document Modal - Mobile Bottom Sheet */}
      {viewingDoc && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/30" onClick={() => setViewingDoc(null)}>
          <div
            className="bg-white w-full max-w-lg rounded-t-[32px] p-6 pb-8 max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 bg-[#E6E2DA] rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#E6E2DA] flex items-center justify-center text-xl">
                  {documentTypes[viewingDoc.type]?.icon || '📄'}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#101111]">{viewingDoc.name}</h2>
                  <p className="text-[#4A4A4A] text-xs font-semibold">{documentTypes[viewingDoc.type]?.label}</p>
                </div>
              </div>
              <button onClick={() => setViewingDoc(null)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Status and Details Card */}
              <div className="bg-[#E6E2DA] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#4A4A4A] text-sm font-semibold">Status</span>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusConfig[viewingDoc.status].bg} ${statusConfig[viewingDoc.status].color}`}>
                    {statusConfig[viewingDoc.status].label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-t border-black/5">
                  <span className="text-[#4A4A4A] font-medium">File Size</span>
                  <span className="text-[#101111] font-bold">{viewingDoc.fileSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-t border-black/5">
                  <span className="text-[#4A4A4A] font-medium">Created</span>
                  <span className="text-[#101111] font-bold">{viewingDoc.createdAt}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2 border-t border-black/5">
                  <span className="text-[#4A4A4A] font-medium">Updated</span>
                  <span className="text-[#101111] font-bold">{viewingDoc.updatedAt}</span>
                </div>
              </div>

              {/* Description Card */}
              {viewingDoc.description && (
                <div className="bg-[#E6E2DA] rounded-2xl p-4">
                  <p className="text-[#4A4A4A] text-xs font-semibold mb-1">Description</p>
                  <p className="text-[#101111] text-sm font-medium">{viewingDoc.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#E6E2DA] text-[#101111] font-semibold rounded-xl text-sm hover:bg-[#D4CCBE] transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#154230] text-white font-semibold rounded-xl text-sm hover:bg-[#1d5240] transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Document Modal - Desktop Centered */}
      {viewingDoc && (
        <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center bg-black/40" onClick={() => setViewingDoc(null)}>
          <div
            className="bg-white w-full max-w-2xl rounded-2xl p-8 max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#E6E2DA] flex items-center justify-center text-2xl">
                  {documentTypes[viewingDoc.type]?.icon || '📄'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">{viewingDoc.name}</h2>
                  <p className="text-[#4A4A4A] text-sm font-semibold">{documentTypes[viewingDoc.type]?.label}</p>
                </div>
              </div>
              <button onClick={() => setViewingDoc(null)} className="p-3 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Status and Details Card */}
              <div className="bg-[#E6E2DA] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#4A4A4A] text-sm font-semibold">Status</span>
                  <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${statusConfig[viewingDoc.status].bg} ${statusConfig[viewingDoc.status].color}`}>
                    {statusConfig[viewingDoc.status].label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm py-3 border-t border-black/5">
                  <span className="text-[#4A4A4A] font-medium">File Size</span>
                  <span className="text-[#101111] font-bold">{viewingDoc.fileSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-3 border-t border-black/5">
                  <span className="text-[#4A4A4A] font-medium">Created</span>
                  <span className="text-[#101111] font-bold">{viewingDoc.createdAt}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-3 border-t border-black/5">
                  <span className="text-[#4A4A4A] font-medium">Updated</span>
                  <span className="text-[#101111] font-bold">{viewingDoc.updatedAt}</span>
                </div>
              </div>

              {/* Description card */}
              {viewingDoc.description && (
                <div className="bg-[#E6E2DA] rounded-2xl p-5">
                  <p className="text-[#4A4A4A] text-xs font-semibold mb-2">Description</p>
                  <p className="text-[#101111] text-sm font-medium">{viewingDoc.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#E6E2DA] text-[#101111] font-semibold rounded-xl text-sm hover:bg-[#D4CCBE] transition-colors">
                  <Eye className="w-5 h-5" />
                  Preview Document
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#154230] text-white font-semibold rounded-xl text-sm hover:bg-[#1d5240] transition-colors">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
