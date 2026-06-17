'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Download, FileText, File, Image, Check } from 'lucide-react';

const exportFormats = [
  { id: 'pdf', name: 'PDF', desc: 'Portable Document Format', icon: FileText, selected: true },
  { id: 'docx', name: 'Word', desc: 'Microsoft Word Document', icon: File, selected: false },
  { id: 'xlsx', name: 'Excel', desc: 'Spreadsheet Format', icon: File, selected: false },
  { id: 'png', name: 'PNG', desc: 'Image Format', icon: Image, selected: false },
];

export default function ExportPage() {
  const [format, setFormat] = useState('pdf');
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Export" subtitle="Export documents in different formats" backHref="/documents" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Select Format</h3>
          <div className="space-y-2">
            {exportFormats.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
                    format === f.id
                      ? 'bg-[#154230]/10 border-2 border-[#154230]'
                      : 'bg-[#E6E2DA] hover:bg-[#d5d1c9]'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${format === f.id ? 'text-[#154230]' : 'text-[#4A4A4A]'}`} />
                  <div className="flex-1">
                    <p className={`font-medium ${format === f.id ? 'text-[#154230]' : 'text-[#101111]'}`}>{f.name}</p>
                    <p className="text-xs text-[#4A4A4A]">{f.desc}</p>
                  </div>
                  {format === f.id && <Check className="w-5 h-5 text-[#154230]" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Options</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#154230]" />
              <span className="text-[#101111]">Include all pages</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl cursor-pointer">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#154230]" />
              <span className="text-[#101111]">Add watermark</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-[#154230]" />
              <span className="text-[#101111]">Compress file size</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full py-4 bg-[#154230] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          {exporting ? 'Exporting...' : 'Export Document'}
        </button>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
