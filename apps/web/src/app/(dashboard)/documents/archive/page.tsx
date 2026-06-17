'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Archive, Search, Filter, Download, Trash2, RotateCcw } from 'lucide-react';

const archivedDocuments = [
  { id: '1', name: 'Invoice INV-2024-001', type: 'Invoice', archived: 'Jan 15, 2024', size: '245 KB' },
  { id: '2', name: 'B/L BOL-2024-015', type: 'Bill of Lading', archived: 'Jan 14, 2024', size: '189 KB' },
  { id: '3', name: 'COO COO-2024-008', type: 'Certificate of Origin', archived: 'Jan 10, 2024', size: '156 KB' },
  { id: '4', name: 'Invoice INV-2024-002', type: 'Invoice', archived: 'Dec 20, 2024', size: '234 KB' },
  { id: '5', name: 'P/L PL-2024-022', type: 'Packing List', archived: 'Dec 15, 2024', size: '178 KB' },
];

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredDocs = archivedDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Archive" subtitle="Archived documents" backHref="/documents" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archived documents..."
              className="w-full pl-12 pr-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {['All', 'Invoice', 'Bill of Lading', 'Packing List', 'Certificate'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type === 'All' ? null : type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  (type === 'All' && !selectedType) || selectedType === type
                    ? 'bg-[#154230] text-white'
                    : 'bg-[#E6E2DA] text-[#101111]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">Archived ({filteredDocs.length})</h3>
            <span className="text-xs text-[#4A4A4A]">Auto-archived after 12 months</span>
          </div>

          <div className="space-y-2">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-[#E6E2DA] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Archive className="w-5 h-5 text-[#4A4A4A]" />
                    <div>
                      <p className="font-medium text-[#101111]">{doc.name}</p>
                      <p className="text-xs text-[#4A4A4A]">{doc.type} • {doc.size} • Archived {doc.archived}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg" title="Restore">
                      <RotateCcw className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg" title="Download">
                      <Download className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg text-red-500" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
