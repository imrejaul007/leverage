'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { FileText, Plus, Download, Star, Copy, MoreVertical } from 'lucide-react';

const templates = [
  { id: '1', name: 'Standard Invoice', type: 'Invoice', usage: 156, lastUsed: 'Today', featured: true },
  { id: '2', name: 'Proforma Invoice', type: 'Invoice', usage: 89, lastUsed: 'Yesterday', featured: true },
  { id: '3', name: 'Detailed Packing List', type: 'Packing', usage: 234, lastUsed: '3 days ago', featured: false },
  { id: '4', name: 'Bill of Lading', type: 'Shipping', usage: 178, lastUsed: '1 week ago', featured: true },
  { id: '5', name: 'Certificate of Origin', type: 'Certification', usage: 67, lastUsed: '2 weeks ago', featured: false },
  { id: '6', name: 'Customs Declaration', type: 'Customs', usage: 45, lastUsed: '1 month ago', featured: false },
];

export default function TemplatesPage() {
  const [templatesList, setTemplatesList] = useState(templates);

  const toggleFeatured = (id: string) => {
    setTemplatesList(templatesList.map(t =>
      t.id === id ? { ...t, featured: !t.featured } : t
    ));
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Templates" subtitle="Document templates" backHref="/documents" />

      <div className="px-4 -mt-6 space-y-4">
        <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-center gap-2 text-[#154230] font-semibold">
          <Plus className="w-5 h-5" /> Create Template
        </button>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">My Templates</h3>
            <span className="text-xs text-[#4A4A4A]">{templatesList.length} templates</span>
          </div>

          <div className="space-y-3">
            {templatesList.map((template) => (
              <div key={template.id} className="bg-[#E6E2DA] rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#154230] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-[#101111]">{template.name}</h4>
                        {template.featured && (
                          <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                        )}
                      </div>
                      <p className="text-xs text-[#4A4A4A]">{template.type} • Used {template.usage} times</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white rounded-lg">
                    <MoreVertical className="w-4 h-4 text-[#4A4A4A]" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#4A4A4A]">Last used: {template.lastUsed}</span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg" title="Duplicate">
                      <Copy className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#154230] text-white rounded-lg text-xs font-medium">
                      <Download className="w-3 h-3" /> Use
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#A6824A] to-[#c9a066] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8" />
            <div className="flex-1">
              <p className="font-bold">Template Library</p>
              <p className="text-sm text-white/80">Access 50+ professional templates</p>
            </div>
            <button className="px-4 py-2 bg-white text-[#A6824A] rounded-lg font-semibold text-sm">
              Browse
            </button>
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
