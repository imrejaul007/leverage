'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Clock, CheckCircle, AlertCircle, FileText, Download, Eye, X, Shield, FileCheck, Globe } from 'lucide-react';

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

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);

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
    <div className="space-y-4 relative overflow-hidden">
      {/* Background decorations - Documents/Certificates themed */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Globe with Document Routes */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] animate-[spin_75s_linear_infinite]">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.06]">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#5D1E21" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#5D1E21" strokeWidth="0.5" transform="rotate(60 200 200)" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#5D1E21" strokeWidth="0.5" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#5D1E21" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Document/Certificate Pattern */}
        <svg className="absolute top-0 left-0 w-[400px] h-[350px] opacity-[0.05]" viewBox="0 0 400 350">
          {/* Stacked documents */}
          <rect x="30" y="30" width="80" height="100" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="50" y="50" width="80" height="100" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <rect x="70" y="70" width="80" height="100" fill="none" stroke="#A6824A" strokeWidth="1" rx="4" />
          <line x1="85" y1="90" x2="135" y2="90" stroke="#A6824A" strokeWidth="1" />
          <line x1="85" y1="105" x2="125" y2="105" stroke="#A6824A" strokeWidth="1" />
          <line x1="85" y1="120" x2="130" y2="120" stroke="#A6824A" strokeWidth="1" />
          {/* Seal/Badge */}
          <circle cx="120" cy="150" r="15" fill="none" stroke="#5D1E21" strokeWidth="1" />
          <path d="M120,138 L122,143 L127,143 L123,147 L125,152 L120,149 L115,152 L117,147 L113,143 L118,143 Z" fill="#5D1E21" />
          {/* More documents */}
          <rect x="200" y="80" width="80" height="100" fill="none" stroke="#154230" strokeWidth="1" rx="4" />
          <rect x="220" y="100" width="80" height="100" fill="none" stroke="#154230" strokeWidth="1" rx="4" />
          <line x1="235" y1="120" x2="285" y2="120" stroke="#154230" strokeWidth="1" />
          <line x1="235" y1="135" x2="275" y2="135" stroke="#154230" strokeWidth="1" />
          <line x1="235" y1="150" x2="280" y2="150" stroke="#154230" strokeWidth="1" />
        </svg>

        {/* Stamp/Seal Pattern */}
        <svg className="absolute bottom-10 left-10 w-[200px] h-[200px] opacity-[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="70" fill="none" stroke="#5D1E21" strokeWidth="2" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="#5D1E21" strokeWidth="1" />
          <text x="100" y="90" textAnchor="middle" fill="#5D1E21" fontSize="10" fontFamily="serif">CERTIFIED</text>
          <text x="100" y="110" textAnchor="middle" fill="#5D1E21" fontSize="8" fontFamily="serif">VERIFIED</text>
        </svg>

        {/* Checkmark/Approved Pattern */}
        <svg className="absolute bottom-20 right-20 w-[150px] h-[150px] opacity-[0.04]" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="60" fill="none" stroke="#154230" strokeWidth="2" />
          <path d="M45,75 L65,95 L105,55" fill="none" stroke="#154230" strokeWidth="3" />
        </svg>

        {/* Floating Document Particles */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${4 + (i * 5.2)}%`,
              top: `${12 + (i % 7) * 11}%`,
              width: i % 3 === 0 ? '6px' : i % 3 === 1 ? '8px' : '10px',
              height: i % 3 === 0 ? '8px' : i % 3 === 1 ? '10px' : '7px',
              backgroundColor: i % 4 === 0 ? '#5D1E21' : i % 4 === 1 ? '#A6824A' : i % 4 === 2 ? '#154230' : '#A6824A',
              animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.1 + (i % 4) * 0.04,
            }}
          />
        ))}

        {/* Globe Lines */}
        <svg className="absolute bottom-0 left-0 right-0 h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 Q180,15 360,40 T720,40 T1080,40 T1440,40 L1440,80 L0,80 Z" fill="#5D1E21" opacity="0.02" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg">
            <FileCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Trade Documents</h1>
            <p className="text-[#4A4A4A] text-sm">{documents.length} documents in system</p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors text-sm shadow-lg">
          <Plus className="w-4 h-4" />
          New Document
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-6 p-4 bg-white border border-black/5 rounded-xl overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{stats.total}</p>
            <p className="text-[#4A4A4A] text-xs">Total</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-[#5D1E21]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{stats.pending}</p>
            <p className="text-[#4A4A4A] text-xs">Pending</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{stats.validated}</p>
            <p className="text-[#4A4A4A] text-xs">Validated</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#A6824A]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">98%</p>
            <p className="text-[#4A4A4A] text-xs">Compliance</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-[#101111] placeholder-[#5A5A5A] focus:outline-none focus:border-[#A6824A] text-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              statusFilter === s
                ? 'bg-[#154230] text-white'
                : 'bg-white text-[#4A4A4A] hover:bg-[#E6E2DA] border border-black/5'
            }`}
          >
            {s === 'all' ? 'All' : statusConfig[s]?.label || s}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-black/5 rounded-xl p-4 animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-5 bg-[#E6E2DA] rounded w-48"></div>
                  <div className="h-4 bg-[#E6E2DA] rounded w-32"></div>
                </div>
                <div className="h-8 bg-[#E6E2DA] rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-14 h-14 bg-[#E6E2DA] rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-[#4A4A4A]" />
          </div>
          <p className="text-[#4A4A4A] text-sm mb-4">No documents found</p>
          <button className="text-[#5D1E21] hover:underline font-medium text-sm">
            Create your first document
          </button>
        </div>
      )}

      {/* Documents List */}
      {!isLoading && filteredDocs.length > 0 && (
        <div className="space-y-2">
          {filteredDocs.map(doc => (
            <div
              key={doc.id}
              onClick={() => setViewingDoc(doc)}
              className="bg-white border border-black/5 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#E6E2DA] flex items-center justify-center text-xl">
                  {documentTypes[doc.type]?.icon || '📄'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#101111] font-medium text-sm truncate">{doc.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[#4A4A4A] text-xs">{documentTypes[doc.type]?.label}</span>
                    <span className="text-[#4A4A4A] text-xs">•</span>
                    <span className="text-[#4A4A4A] text-xs">{doc.fileSize}</span>
                    <span className="text-[#4A4A4A] text-xs">•</span>
                    <span className="text-[#4A4A4A] text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {doc.updatedAt}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusConfig[doc.status].bg} ${statusConfig[doc.status].color}`}>
                    {statusConfig[doc.status].label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Document Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setViewingDoc(null)}>
          <div className="bg-white border border-black/5 rounded-xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#E6E2DA] flex items-center justify-center text-xl">
                  {documentTypes[viewingDoc.type]?.icon || '📄'}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#101111]">{viewingDoc.name}</h2>
                  <p className="text-[#4A4A4A] text-xs">{documentTypes[viewingDoc.type]?.label}</p>
                </div>
              </div>
              <button onClick={() => setViewingDoc(null)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#E6E2DA] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#4A4A4A] text-sm">Status</span>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusConfig[viewingDoc.status].bg} ${statusConfig[viewingDoc.status].color}`}>
                    {statusConfig[viewingDoc.status].label}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#4A4A4A]">File Size</span>
                  <span className="text-[#101111] font-medium">{viewingDoc.fileSize}</span>
                </div>
              </div>

              {viewingDoc.description && (
                <div className="p-4 bg-[#E6E2DA] rounded-lg">
                  <p className="text-[#4A4A4A] text-xs mb-1">Description</p>
                  <p className="text-[#101111] text-sm">{viewingDoc.description}</p>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#E6E2DA] text-[#101111] font-medium rounded-lg hover:bg-[#D4CCBE] transition-colors text-sm">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#154230] text-white font-medium rounded-lg hover:bg-[#1d5240] transition-colors text-sm">
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
