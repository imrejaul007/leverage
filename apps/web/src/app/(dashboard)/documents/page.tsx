'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { documentsApi } from '@/lib/api-client';

interface Document {
  id: string;
  title?: string;
  name?: string;
  type?: string;
  status?: string;
  createdAt?: string;
  fileSize?: string;
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const { data, isLoading, isError } = useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await documentsApi.list();
      return response.data.data || [];
    },
    retry: false,
  });

  const documents = data || [];
  const types = ['all', ...new Set(documents.map(d => d.type).filter(Boolean))] as string[];

  const statusColors: Record<string, string> = {
    APPROVED: 'bg-emerald-600/20 text-emerald-400',
    VALIDATED: 'bg-emerald-600/20 text-emerald-400',
    PENDING: 'bg-amber-600/20 text-amber-400',
    PENDING_SIGNATURE: 'bg-amber-600/20 text-amber-400',
    REJECTED: 'bg-red-600/20 text-red-400',
    CANCELLED: 'bg-red-600/20 text-red-400',
    approved: 'bg-emerald-600/20 text-emerald-400',
    pending: 'bg-amber-600/20 text-amber-400',
    rejected: 'bg-red-600/20 text-red-400',
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch =
      (doc.name || doc.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Documents</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
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
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {types.map(type => (
            <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
          ))}
        </select>
      </div>

      {/* Error State */}
      {isError && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400">Failed to load documents. Please try again.</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-slate-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No documents found</p>
          <button className="text-blue-400 hover:text-blue-300">
            Create your first document
          </button>
        </div>
      )}

      {/* Documents Grid */}
      {!isLoading && filteredDocuments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map(doc => (
            <Link
              key={doc.id}
              href={`/documents/${doc.id}`}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                {doc.status && (
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[doc.status] || 'bg-gray-600/20 text-gray-400'}`}>
                    {doc.status}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{doc.name || doc.title || 'Untitled'}</h3>
              {doc.type && (
                <p className="text-sm text-gray-400 mb-3">{doc.type}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
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
