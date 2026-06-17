'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Share2, Link, Mail, Users, Clock, Copy, Check } from 'lucide-react';

const sharedDocuments = [
  { id: '1', name: 'Invoice INV-2026-045', sharedWith: 'ABC Imports', sharedAt: '2 hours ago', access: 'edit' },
  { id: '2', name: 'B/L BOL-2026-012', sharedWith: 'XYZ Corporation', sharedAt: '1 day ago', access: 'view' },
  { id: '3', name: 'COO COO-2026-008', sharedWith: 'Customs Agent', sharedAt: '3 days ago', access: 'edit' },
];

export default function SharedPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`https://leverge.one/documents/${id}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Shared Documents" subtitle="Documents shared with others" backHref="/documents" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Share Settings</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-[#E6E2DA] rounded-xl">
              <Link className="w-6 h-6 text-[#154230]" />
              <span className="text-sm font-medium text-[#101111]">Copy Link</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-[#E6E2DA] rounded-xl">
              <Mail className="w-6 h-6 text-[#154230]" />
              <span className="text-sm font-medium text-[#101111]">Email</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-[#E6E2DA] rounded-xl">
              <Users className="w-6 h-6 text-[#154230]" />
              <span className="text-sm font-medium text-[#101111]">Team</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-[#E6E2DA] rounded-xl">
              <Share2 className="w-6 h-6 text-[#154230]" />
              <span className="text-sm font-medium text-[#101111]">More</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Shared ({sharedDocuments.length})</h3>
          <div className="space-y-3">
            {sharedDocuments.map((doc) => (
              <div key={doc.id} className="bg-[#E6E2DA] rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-[#101111]">{doc.name}</h4>
                    <p className="text-xs text-[#4A4A4A]">Shared with {doc.sharedWith}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    doc.access === 'edit' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {doc.access}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#4A4A4A]">
                    <Clock className="w-3 h-3" />
                    {doc.sharedAt}
                  </div>
                  <button
                    onClick={() => copyLink(doc.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-[#154230]"
                  >
                    {copied === doc.id ? (
                      <><Check className="w-3 h-3" /> Copied</>
                    ) : (
                      <><Copy className="w-3 h-3" /> Copy Link</>
                    )}
                  </button>
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
