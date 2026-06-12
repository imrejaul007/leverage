'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'DRAFT' | 'PENDING' | 'VALIDATED' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  fileSize: string;
  description?: string;
  content?: string;
  orderRef?: string;
}

const documentTypes = [
  { value: 'INVOICE', label: 'Invoice', icon: '📄' },
  { value: 'BILL_OF_LADING', label: 'Bill of Lading', icon: '📋' },
  { value: 'PACKING_LIST', label: 'Packing List', icon: '📦' },
  { value: 'CERTIFICATE_OF_ORIGIN', label: 'Certificate of Origin', icon: '🏛️' },
  { value: 'CUSTOMS_DECLARATION', label: 'Customs Declaration', icon: '📝' },
  { value: 'INSURANCE', label: 'Insurance', icon: '🛡️' },
  { value: 'LC', label: 'Letter of Credit', icon: '📜' },
  { value: 'OTHER', label: 'Other', icon: '📎' },
];

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-500/20 text-gray-400',
  PENDING: 'bg-amber-500/20 text-amber-400',
  VALIDATED: 'bg-emerald-500/20 text-emerald-400',
  APPROVED: 'bg-emerald-500/20 text-emerald-400',
  REJECTED: 'bg-red-500/20 text-red-400',
};

const statusLabels: Record<string, string> = {
  DRAFT: 'Draft',
  PENDING: 'Pending Review',
  VALIDATED: 'Validated',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const stored = localStorage.getItem('leverage_documents');
    if (stored) {
      const documents: Document[] = JSON.parse(stored);
      const found = documents.find(d => d.id === id);
      setDocument(found || null);
    }
    setIsLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    if (!document) return;
    if (!confirm('Are you sure you want to delete this document?')) return;
    const stored = localStorage.getItem('leverage_documents');
    if (stored) {
      const documents: Document[] = JSON.parse(stored);
      const filtered = documents.filter(d => d.id !== document.id);
      localStorage.setItem('leverage_documents', JSON.stringify(filtered));
    }
    router.push('/documents');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/documents" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></Link>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Document Not Found</h1>
        </div>
        <div className="card text-center py-12"><div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">📄</span></div><p className="text-[#D8CCBC]/50 mb-4">This document does not exist.</p><Link href="/documents" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">Back to Documents</Link></div>
      </div>
    );
  }

  const docType = documentTypes.find(t => t.value === document.type) || documentTypes[documentTypes.length - 1];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/documents" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{docType.icon}</span>
            <h1 className="text-2xl font-bold text-[#F4F1EA]">{document.name}</h1>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[document.status]}`}>{statusLabels[document.status]}</span>
            <span className="text-[#D8CCBC]/50 text-sm">{document.fileSize}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 card">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{docType.icon}</span>
              <div><p className="text-[#F4F1EA] font-medium">{document.name}</p><p className="text-[#D8CCBC]/50 text-sm">{document.fileSize}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg text-sm font-medium hover:bg-[#0E3B36]/80 transition-colors flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download</button>
              <button className="px-4 py-2 bg-[#C49A6C] text-[#081512] rounded-lg text-sm font-semibold hover:bg-[#D4AA82] transition-colors flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>Share</button>
            </div>
          </div>
          <div className="aspect-[3/4] bg-gradient-to-b from-[#0E3B36]/30 to-[#081512] rounded-xl flex items-center justify-center">
            <div className="text-center p-8">
              {document.content ? <pre className="text-[#D8CCBC]/80 whitespace-pre-wrap font-mono text-sm bg-[rgba(255,255,255,0.03)] p-4 rounded-xl max-w-md mx-auto">{document.content}</pre> : (
                <><div className="w-24 h-24 bg-[#0E3B36] rounded-2xl flex items-center justify-center mx-auto mb-4"><span className="text-5xl">{docType.icon}</span></div><p className="text-[#D8CCBC]/50 mb-2">Document preview would render here</p><p className="text-[#D8CCBC]/30 text-sm">PDF, {document.fileSize}</p></>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-[#F4F1EA] font-semibold mb-4">Document Details</h3>
            <dl className="space-y-4">
              <div><dt className="text-[#D8CCBC]/50 text-xs">Document Type</dt><dd className="text-[#F4F1EA] mt-1">{docType.label}</dd></div>
              {document.orderRef && <div><dt className="text-[#D8CCBC]/50 text-xs">Order Reference</dt><dd className="text-[#C49A6C] font-medium mt-1">{document.orderRef}</dd></div>}
              <div><dt className="text-[#D8CCBC]/50 text-xs">Status</dt><dd className="mt-1"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[document.status]}`}>{statusLabels[document.status]}</span></dd></div>
              <div><dt className="text-[#D8CCBC]/50 text-xs">File Size</dt><dd className="text-[#F4F1EA] mt-1">{document.fileSize}</dd></div>
              <div><dt className="text-[#D8CCBC]/50 text-xs">Created</dt><dd className="text-[#F4F1EA] mt-1">{document.createdAt}</dd></div>
              <div><dt className="text-[#D8CCBC]/50 text-xs">Last Updated</dt><dd className="text-[#F4F1EA] mt-1">{document.updatedAt}</dd></div>
            </dl>
          </div>

          {document.description && <div className="card"><h3 className="text-[#F4F1EA] font-semibold mb-4">Description</h3><p className="text-[#D8CCBC]/80 text-sm leading-relaxed">{document.description}</p></div>}

          <div className="card">
            <h3 className="text-[#F4F1EA] font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-3 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium hover:bg-[#0E3B36]/80 transition-colors flex items-center justify-center gap-2"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Edit Document</button>
              <button className="w-full py-3 bg-red-500/10 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-colors border border-red-500/20 flex items-center justify-center gap-2" onClick={handleDelete}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Delete Document</button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-[#F4F1EA] font-semibold mb-4">Audit Trail</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${document.status === 'APPROVED' || document.status === 'VALIDATED' ? 'bg-emerald-500' : document.status === 'PENDING' ? 'bg-amber-500' : 'bg-gray-500'}`} />
                <div><p className="text-[#F4F1EA] text-sm font-medium">{document.status === 'APPROVED' ? 'Document Approved' : document.status === 'VALIDATED' ? 'Document Validated' : document.status === 'PENDING' ? 'Submitted for Review' : 'Document Created'}</p><p className="text-[#D8CCBC]/50 text-xs">{document.updatedAt}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div><p className="text-[#F4F1EA] text-sm">Document uploaded</p><p className="text-[#D8CCBC]/50 text-xs">{document.createdAt}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeItem="documents" />
    </div>
  );
}
