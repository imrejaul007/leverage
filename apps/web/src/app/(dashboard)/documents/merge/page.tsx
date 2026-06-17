'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { FileText, Plus, Trash2, File, Merge, Download } from 'lucide-react';

const availableDocs = [
  { id: '1', name: 'Invoice INV-2026-045', pages: 2 },
  { id: '2', name: 'Packing List PL-2026-045', pages: 1 },
  { id: '3', name: 'Bill of Lading BOL-2026-012', pages: 1 },
  { id: '4', name: 'Certificate COO-2026-008', pages: 1 },
];

export default function MergePage() {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [merging, setMerging] = useState(false);

  const toggleDoc = (id: string) => {
    setSelectedDocs(selectedDocs.includes(id)
      ? selectedDocs.filter(d => d !== id)
      : [...selectedDocs, id]
    );
  };

  const handleMerge = () => {
    if (selectedDocs.length < 2) return;
    setMerging(true);
    setTimeout(() => setMerging(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Merge Documents" subtitle="Combine multiple documents into one PDF" backHref="/documents" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Merge className="w-6 h-6 text-[#154230]" />
            <div>
              <h3 className="text-[#101111] font-bold">Select Documents</h3>
              <p className="text-sm text-[#4A4A4A]">Choose at least 2 documents to merge</p>
            </div>
          </div>

          <div className="space-y-2">
            {availableDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
                  selectedDocs.includes(doc.id)
                    ? 'bg-[#154230]/10 border-2 border-[#154230]'
                    : 'bg-[#E6E2DA] hover:bg-[#d5d1c9]'
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  selectedDocs.includes(doc.id)
                    ? 'bg-[#154230] border-[#154230]'
                    : 'border-[#4A4A4A]'
                }`}>
                  {selectedDocs.includes(doc.id) && (
                    <div className="w-2 h-2 bg-white rounded-sm" />
                  )}
                </div>
                <File className="w-5 h-5 text-[#4A4A4A]" />
                <div className="flex-1">
                  <p className="text-[#101111] font-medium">{doc.name}</p>
                  <p className="text-xs text-[#4A4A4A]">{doc.pages} page{doc.pages > 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedDocs.length >= 2 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-[#101111] font-bold mb-4">Merge Order</h3>
            <p className="text-sm text-[#4A4A4A] mb-4">
              Documents will be merged in the order shown above. Drag to reorder.
            </p>
            <div className="space-y-2">
              {selectedDocs.map((id, index) => {
                const doc = availableDocs.find(d => d.id === id);
                return doc ? (
                  <div key={id} className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
                    <span className="w-6 h-6 bg-[#154230] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-[#101111] font-medium">{doc.name}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <button
          onClick={handleMerge}
          disabled={selectedDocs.length < 2 || merging}
          className="w-full py-4 bg-[#154230] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {merging ? (
            <><FileText className="w-5 h-5 animate-pulse" /> Merging...</>
          ) : (
            <><Merge className="w-5 h-5" /> Merge {selectedDocs.length} Documents</>
          )}
        </button>

        {merging && (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-[#154230] animate-pulse" />
            </div>
            <p className="text-[#101111] font-bold">Creating merged PDF...</p>
          </div>
        )}
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
