'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Document {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  fileSize: string;
  description?: string;
}

export default function DocumentDetailPage() {
  const params = useParams();
  const [doc, setDoc] = useState<Document | null>(null);

  useEffect(() => {
    if (!params.id) return;
    const docs = JSON.parse(localStorage.getItem('leverage_documents') || '[]') as Document[];
    const found = docs.find(d => d.id === params.id);
    if (found) setDoc(found);
  }, [params.id]);

  const handleDelete = () => {
    if (!doc) return;
    if (confirm('Delete this document?')) {
      const docs = JSON.parse(localStorage.getItem('leverage_documents') || '[]') as Document[];
      localStorage.setItem('leverage_documents', JSON.stringify(docs.filter(d => d.id !== doc.id)));
      window.location.href = '/documents';
    }
  };

  if (!doc) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div></div>;
  }

  const statusColors: Record<string, string> = {
    VALIDATED: 'bg-emerald-500/20 text-emerald-400',
    APPROVED: 'bg-emerald-500/20 text-emerald-400',
    PENDING: 'bg-amber-500/20 text-amber-400',
    REJECTED: 'bg-red-500/20 text-red-400',
    DRAFT: 'bg-gray-500/20 text-gray-400',
  };

  const typeIcons: Record<string, string> = {
    INVOICE: '📄', BILL_OF_LADING: '📋', PACKING_LIST: '📦',
    CERTIFICATE_OF_ORIGIN: '🏛️', CUSTOMS_DECLARATION: '📝', INSURANCE: '🛡️', OTHER: '📎',
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link href="/documents" className="text-[#D8CCBC] hover:text-[#F4F1EA] flex items-center gap-2 text-sm">← Back</Link>
      
      <div className="card">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-xl flex items-center justify-center text-3xl">{typeIcons[doc.type] || '📄'}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-[#F4F1EA]">{doc.name}</h1>
              <span className={`px-3 py-1 text-sm rounded-full ${statusColors[doc.status] || ''}`}>{doc.status}</span>
            </div>
            <p className="text-[#C49A6C]">{doc.type.replace('_', ' ')}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
          <div><p className="text-[#D8CCBC]/60 text-xs">Created</p><p className="text-[#F4F1EA]">{doc.createdAt}</p></div>
          <div><p className="text-[#D8CCBC]/60 text-xs">Type</p><p className="text-[#F4F1EA]">{doc.type.replace('_', ' ')}</p></div>
          <div><p className="text-[#D8CCBC]/60 text-xs">Size</p><p className="text-[#F4F1EA]">{doc.fileSize}</p></div>
        </div>
        {doc.description && <p className="mt-4 text-[#D8CCBC]">{doc.description}</p>}
      </div>

      <div className="card aspect-[3/4] bg-[rgba(255,255,255,0.03)] rounded-xl flex items-center justify-center">
        <div className="text-center"><span className="text-6xl opacity-30">{typeIcons[doc.type] || '📄'}</span><p className="text-[#D8CCBC]/50 mt-4">Document preview</p></div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-3 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium border border-[rgba(255,255,255,0.1)]">Download</button>
        <button onClick={handleDelete} className="py-3 px-6 bg-red-500/20 text-red-400 rounded-xl font-medium">Delete</button>
      </div>
    </div>
  );
}
