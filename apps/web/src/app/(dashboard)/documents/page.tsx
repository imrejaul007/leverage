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

// Mock data for demo - no API calls
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
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isLoading, setIsLoading] = useState(false);

  // For now, use mock data only - no API calls
  useEffect(() => {
    setDocuments(mockDocuments);
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
    const matchesSearch =
      (doc.name || doc.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">Documents</h1>
          <p className="text-[#D8CCBC]/60">Manage your trade documents</p>
        </div>
        <button className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
          + Create Document
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10"
          />
          <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="input w-auto"
        >
          {types.map(type => (
            <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
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
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📄</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-lg mb-4">No documents found</p>
          <button className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">
            Create your first document
          </button>
        </div>
      )}

      {/* Documents Grid */}
      {!isLoading && filteredDocuments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map(doc => (
            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
              className="card hover:border-[#C49A6C]/30 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-[#0E3B36] rounded-xl flex items-center justify-center group-hover:bg-[#0E3B36]/80 transition-colors">
                  <svg className="w-7 h-7 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                {doc.status && (
                  <span className={`px-3 py-1 text-xs rounded-full capitalize ${statusColors[doc.status] || 'bg-gray-500/20 text-gray-400'}`}>
                    {doc.status.toLowerCase()}
                  </span>
                )}
              </div>
              <h3 className="text-[#F4F1EA] font-semibold mb-2 line-clamp-2">{doc.name || doc.title || 'Untitled'}</h3>
              {doc.type && (
                <p className="text-[#D8CCBC]/50 text-sm mb-3">{doc.type}</p>
              )}
              <div className="flex items-center justify-between text-sm text-[#D8CCBC]/40 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                {doc.createdAt && (
                  <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                )}
                {doc.fileSize && (
                  <span>{doc.fileSize}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
