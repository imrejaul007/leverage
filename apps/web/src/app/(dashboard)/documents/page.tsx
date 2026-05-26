'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
}

const initialDocuments: Document[] = [
  { id: '1', name: 'Commercial Invoice - Order #1234', type: 'INVOICE', status: 'VALIDATED', createdAt: '2024-01-20', updatedAt: '2024-01-20', fileSize: '245 KB', description: 'Invoice for order #1234 - Electronics shipment' },
  { id: '2', name: 'Bill of Lading - Shipment #5678', type: 'BILL_OF_LADING', status: 'PENDING', createdAt: '2024-01-19', updatedAt: '2024-01-19', fileSize: '128 KB', description: 'BOL for container MSCU123456' },
  { id: '3', name: 'Packing List - Container #CL1234', type: 'PACKING_LIST', status: 'APPROVED', createdAt: '2024-01-18', updatedAt: '2024-01-18', fileSize: '89 KB', description: 'Packing list for sea freight shipment' },
  { id: '4', name: 'Certificate of Origin - India', type: 'CERTIFICATE_OF_ORIGIN', status: 'VALIDATED', createdAt: '2024-01-17', updatedAt: '2024-01-17', fileSize: '156 KB', description: 'COO for Indian export goods' },
  { id: '5', name: 'Customs Declaration - Dubai', type: 'CUSTOMS_DECLARATION', status: 'PENDING', createdAt: '2024-01-16', updatedAt: '2024-01-16', fileSize: '312 KB', description: 'Import declaration for UAE customs' },
  { id: '6', name: 'Insurance Certificate - Marine', type: 'INSURANCE', status: 'APPROVED', createdAt: '2024-01-15', updatedAt: '2024-01-15', fileSize: '78 KB', description: 'Marine insurance for sea cargo' },
];

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

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'INVOICE',
    description: '',
    content: '',
  });

  useEffect(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem('leverage_documents');
    if (stored) {
      setDocuments(JSON.parse(stored));
    } else {
      setDocuments(initialDocuments);
      localStorage.setItem('leverage_documents', JSON.stringify(initialDocuments));
    }
    setIsLoading(false);
  }, []);

  const saveDocuments = (docs: Document[]) => {
    setDocuments(docs);
    localStorage.setItem('leverage_documents', JSON.stringify(docs));
  };

  const types = ['all', ...new Set(documents.map(d => d.type))];

  const statusColors: Record<string, string> = {
    DRAFT: 'bg-gray-500/20 text-gray-400',
    PENDING: 'bg-amber-500/20 text-amber-400',
    VALIDATED: 'bg-emerald-500/20 text-emerald-400',
    APPROVED: 'bg-emerald-500/20 text-emerald-400',
    REJECTED: 'bg-red-500/20 text-red-400',
  };

  const statusLabels: Record<string, string> = {
    DRAFT: 'Draft',
    PENDING: 'Pending',
    VALIDATED: 'Validated',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreate = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      status: 'DRAFT',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      fileSize: `${Math.floor(Math.random() * 500) + 50} KB`,
      description: formData.description,
      content: formData.content,
    };
    saveDocuments([newDoc, ...documents]);
    setShowCreateModal(false);
    setFormData({ name: '', type: 'INVOICE', description: '', content: '' });
  };

  const handleUpdate = () => {
    if (!selectedDoc) return;
    const updated = documents.map(d =>
      d.id === selectedDoc.id
        ? { ...d, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
        : d
    );
    saveDocuments(updated);
    setShowEditModal(false);
    setSelectedDoc(null);
    setFormData({ name: '', type: 'INVOICE', description: '', content: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      saveDocuments(documents.filter(d => d.id !== id));
      setViewingDoc(null);
    }
  };

  const openEditModal = (doc: Document) => {
    setSelectedDoc(doc);
    setFormData({
      name: doc.name,
      type: doc.type,
      description: doc.description || '',
      content: doc.content || '',
    });
    setShowEditModal(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Documents</h1>
          <p className="text-[#D8CCBC]/60 text-sm">{filteredDocuments.length} documents</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm"
        >
          + Create Document
        </button>
      </div>

      {/* Search & Filter */}
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
            <option key={type} value={type}>{type === 'all' ? 'All Types' : type.replace('_', ' ')}</option>
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
          <p className="text-[#D8CCBC]/50 text-sm mb-4">No documents found</p>
          <button onClick={() => setShowCreateModal(true)} className="text-[#C49A6C] hover:text-[#D4AA82] font-medium text-sm">
            Create your first document
          </button>
        </div>
      )}

      {/* Documents Grid */}
      {!isLoading && filteredDocuments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map(doc => {
            const docType = documentTypes.find(t => t.value === doc.type);
            return (
              <div
                key={doc.id}
                onClick={() => setViewingDoc(doc)}
                className="card cursor-pointer hover:border-[#C49A6C]/30 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#0E3B36] rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                    {docType?.icon || '📄'}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[doc.status]}`}>
                    {statusLabels[doc.status]}
                  </span>
                </div>
                <h3 className="text-[#F4F1EA] font-semibold mb-1 line-clamp-2 text-sm sm:text-base">{doc.name}</h3>
                <p className="text-[#D8CCBC]/50 text-xs mb-3">{doc.type.replace('_', ' ')}</p>
                <div className="flex items-center justify-between text-xs text-[#D8CCBC]/40 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                  <span>{doc.createdAt}</span>
                  <span>{doc.fileSize}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">Create Document</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Document Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full input"
                  placeholder="e.g., Commercial Invoice - Order #1234"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Document Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full input"
                >
                  {documentTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full input resize-none"
                  rows={3}
                  placeholder="Brief description of the document..."
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full input resize-none"
                  rows={6}
                  placeholder="Document content..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!formData.name}
                  className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">Document Details</h2>
              <button onClick={() => setViewingDoc(null)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#0E3B36] rounded-xl flex items-center justify-center text-3xl">
                  {documentTypes.find(t => t.value === viewingDoc.type)?.icon || '📄'}
                </div>
                <div>
                  <h3 className="text-[#F4F1EA] text-lg font-semibold">{viewingDoc.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${statusColors[viewingDoc.status]}`}>
                    {statusLabels[viewingDoc.status]}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Type</p>
                  <p className="text-[#F4F1EA]">{viewingDoc.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Created</p>
                  <p className="text-[#F4F1EA]">{viewingDoc.createdAt}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Size</p>
                  <p className="text-[#F4F1EA]">{viewingDoc.fileSize}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Last Updated</p>
                  <p className="text-[#F4F1EA]">{viewingDoc.updatedAt}</p>
                </div>
              </div>
              {viewingDoc.description && (
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs mb-1">Description</p>
                  <p className="text-[#F4F1EA]">{viewingDoc.description}</p>
                </div>
              )}
              {viewingDoc.content && (
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs mb-1">Content</p>
                  <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl text-[#F4F1EA] text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {viewingDoc.content}
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button onClick={() => handleDelete(viewingDoc.id)} className="py-3 px-6 bg-red-500/20 text-red-400 rounded-xl font-medium">
                  Delete
                </button>
                <button onClick={() => { setViewingDoc(null); openEditModal(viewingDoc); }} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">Edit Document</h2>
              <button onClick={() => setShowEditModal(false)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Document Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full input"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Document Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full input"
                >
                  {documentTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full input resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full input resize-none"
                  rows={6}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={!formData.name}
                  className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
