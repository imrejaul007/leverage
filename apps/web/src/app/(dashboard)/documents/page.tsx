'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const types = ['all', 'Invoice', 'Packing List', 'Bill of Lading', 'Certificate', 'Contract'];

  const documents = [
    { id: '1', name: 'Commercial Invoice - LBL-2024-001', type: 'Invoice', date: '2024-01-15', status: 'approved', size: '245 KB' },
    { id: '2', name: 'Packing List - LBL-2024-001', type: 'Packing List', date: '2024-01-15', status: 'approved', size: '128 KB' },
    { id: '3', name: 'Bill of Lading - MSKU1234567', type: 'Bill of Lading', date: '2024-01-16', status: 'pending', size: '312 KB' },
    { id: '4', name: 'Certificate of Origin - TechCorp', type: 'Certificate', date: '2024-01-14', status: 'approved', size: '189 KB' },
    { id: '5', name: 'Purchase Contract - Order 2024-002', type: 'Contract', date: '2024-01-10', status: 'approved', size: '456 KB' },
    { id: '6', name: 'Insurance Certificate - SHP-001', type: 'Certificate', date: '2024-01-12', status: 'pending', size: '234 KB' },
  ];

  const statusColors: Record<string, string> = {
    approved: 'bg-emerald-600/20 text-emerald-400',
    pending: 'bg-amber-600/20 text-amber-400',
    rejected: 'bg-red-600/20 text-red-400',
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Documents</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + Upload Document
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
            className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 pl-10 border border-slate-700 focus:outline-none focus:border-blue-500"
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:border-blue-500"
        >
          {types.map(type => (
            <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
          ))}
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <Link
            key={doc.id}
            href={`/documents/${doc.id}`}
            className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{doc.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-400 text-sm">{doc.type}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400 text-sm">{doc.size}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-gray-500 text-sm">{doc.date}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
