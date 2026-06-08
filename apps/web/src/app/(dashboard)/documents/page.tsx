'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Clock, CheckCircle, AlertCircle, FileText, Download, Eye, X, Shield, FileCheck, Home, Briefcase, Send, MessageSquare, User, Bell, ChevronDown, Filter, Upload, Folder } from 'lucide-react';

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

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Briefcase, label: 'Browse', href: '/browse' },
  { icon: Send, label: 'Post RFQ', href: '/post-rfq' },
  { icon: MessageSquare, label: 'Inbox', href: '/inbox' },
  { icon: User, label: 'Account', href: '/account' },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      {/* Header - Green gradient with rounded bottom */}
      <div className="bg-gradient-to-br from-[#154230] to-[#1a5c3f] px-5 pt-12 pb-8 rounded-b-[32px] relative overflow-hidden">
        {/* LEVERAGE Logo and Tagline */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">LEVERAGE</h1>
            <p className="text-white/70 text-xs font-medium mt-0.5">CONNECTING DOTS TO PORTS</p>
          </div>
          <button className="relative p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#5D1E21] rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            </span>
          </button>
        </div>

        {/* Title and New Document Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Documents</h2>
              <p className="text-white/70 text-sm font-medium">{documents.length} total documents</p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#154230] font-semibold rounded-xl shadow-lg">
            <Plus className="w-4 h-4" />
            New
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="px-5 -mt-4 relative z-10">
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

      {/* Quick Actions */}
      <div className="px-5 mt-5">
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

      {/* Documents List */}
      <div className="px-5 mt-5">
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

      {/* Empty State */}
      {!isLoading && filteredDocs.length === 0 && (
        <div className="px-5 mt-5">
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

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="px-5 mt-5 space-y-3">
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

      {/* Bottom Stats Bar - Burgundy */}
      <div className="fixed bottom-16 left-0 right-0 bg-[#5D1E21] px-5 py-3">
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors ${
                item.label === 'Home' ? 'text-[#154230]' : 'text-[#4A4A4A]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* View Document Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30" onClick={() => setViewingDoc(null)}>
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
    </div>
  );
}