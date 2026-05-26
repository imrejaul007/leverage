'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Document {
  id: string;
  title?: string;
  name?: string;
  type?: string;
  status?: string;
  createdAt?: string;
  fileSize?: string;
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Commercial Invoice - Order #1234', type: 'INVOICE', status: 'VALIDATED', createdAt: '2024-01-20', fileSize: '245 KB' },
  { id: '2', name: 'Bill of Lading - Shipment #5678', type: 'BILL_OF_LADING', status: 'PENDING_SIGNATURE', createdAt: '2024-01-19', fileSize: '128 KB' },
  { id: '3', name: 'Packing List - Container #CL1234', type: 'PACKING_LIST', status: 'APPROVED', createdAt: '2024-01-18', fileSize: '89 KB' },
  { id: '4', name: 'Certificate of Origin - India', type: 'CERTIFICATE_OF_ORIGIN', status: 'VALIDATED', createdAt: '2024-01-17', fileSize: '156 KB' },
  { id: '5', name: 'Customs Declaration - Dubai', type: 'CUSTOMS_DECLARATION', status: 'PENDING', createdAt: '2024-01-16', fileSize: '312 KB' },
  { id: '6', name: 'Insurance Certificate - Marine', type: 'INSURANCE', status: 'APPROVED', createdAt: '2024-01-15', fileSize: '78 KB' },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDocuments(mockDocuments);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const types = ['all', ...new Set(documents.map(d => d.type).filter(Boolean))] as string[];

  const statusColors: Record<string, string> = {
    APPROVED: 'bg-emerald-500/20 text-emerald-400',
    VALIDATED: 'bg-emerald-500/20 text-emerald-400',
    PENDING: 'bg-amber-500/20 text-amber-400',
    PENDING_SIGNATURE: 'bg-amber-500/20 text-amber-400',
    REJECTED: 'bg-red-500/20 text-red-400',
    CANCELLED: 'bg-red-500/20 text-red-400',
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = (doc.name || doc.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Documents</h1>
          <p className="text-[#D8CCBC]/60 text-sm">{filteredDocuments.length} documents</p>
        </div>
        <button className="w-full sm:w-auto px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm">
          + Create Document
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm"
          />
          <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#D8CCBC] text-sm focus:outline-none focus:border-[#C49A6C]"
        >
          {types.map(type => (
            <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-12 w-12 bg-[#0E3B36]/50 rounded-xl mb-4"></div>
              <div className="h-5 bg-[#0E3B36]/50 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-[#0E3B36]/50 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📄</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-sm">No documents found</p>
        </div>
      )}

      {/* Documents Grid - Mobile: Full width cards */}
      {!isLoading && filteredDocuments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map(doc => (
            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
              className="card hover:border-[#C49A6C]/30 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0E3B36] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                {doc.status && (
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${statusColors[doc.status] || 'bg-gray-500/20 text-gray-400'}`}>
                    {doc.status.toLowerCase().replace('_', ' ')}
                  </span>
                )}
              </div>
              <h3 className="text-[#F4F1EA] font-semibold mb-1 line-clamp-2 text-sm sm:text-base">{doc.name || doc.title || 'Untitled'}</h3>
              {doc.type && (
                <p className="text-[#D8CCBC]/50 text-xs mb-3">{doc.type.replace('_', ' ')}</p>
              )}
              <div className="flex items-center justify-between text-xs text-[#D8CCBC]/40 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                {doc.createdAt && <span>{doc.createdAt}</span>}
                {doc.fileSize && <span>{doc.fileSize}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
