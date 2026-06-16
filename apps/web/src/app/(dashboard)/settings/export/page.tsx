'use client';

import { useState } from 'react';
import {
  Download,
  FileText,
  Database,
  Loader2,
  Check,
  ExternalLink,
  Package,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const dataTypes = [
  { id: 'orders', name: 'Orders', description: 'Order history and details', count: 156, icon: Package },
  { id: 'shipments', name: 'Shipments', description: 'Shipment records', count: 42, icon: Download },
  { id: 'documents', name: 'Documents', description: 'All trade documents', count: 89, icon: FileText },
  { id: 'profile', name: 'Profile', description: 'Profile information', count: 1, icon: Database },
];

export default function ExportSettingsPage() {
  const [exporting, setExporting] = useState<string | null>(null);
  const [exported, setExported] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['orders', 'shipments', 'documents']);

  const toggleType = (id: string) => {
    setSelectedTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleExport = async (id: string) => {
    setExporting(id);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setExporting(null);
    setExported(prev => [...prev, id]);
    setTimeout(() => {
      setExported(prev => prev.filter(t => t !== id));
    }, 3000);
  };

  const handleExportAll = async () => {
    if (selectedTypes.length === 0) return;
    setExporting('all');
    await new Promise(resolve => setTimeout(resolve, 3000));
    setExporting(null);
    setExported(selectedTypes);
    alert('Data exported successfully! Check your downloads.');
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Export Data"
        subtitle="Download your account data"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Info */}
        <div className="bg-[#154230]/5 rounded-2xl p-4 flex items-start gap-3">
          <FileText className="w-5 h-5 text-[#154230] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#101111] font-medium text-sm">Your Data Export</p>
            <p className="text-[#4A4A4A] text-xs mt-1">
              Download a copy of your data in JSON or CSV format. Exports are typically ready within a few minutes.
            </p>
          </div>
        </div>

        {/* Data Types */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-4 border-b border-black/5">
            <h3 className="text-[#101111] font-bold">Select Data to Export</h3>
            <p className="text-[#4A4A4A] text-sm">Choose which data you want to download</p>
          </div>
          {dataTypes.map((type, i) => (
            <div
              key={type.id}
              className={`p-4 flex items-center gap-3 ${i !== dataTypes.length - 1 ? 'border-b border-black/5' : ''}`}
            >
              <button
                onClick={() => toggleType(type.id)}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  selectedTypes.includes(type.id)
                    ? 'bg-[#154230] border-[#154230]'
                    : 'border-[#4A4A4A]/30'
                }`}
              >
                {selectedTypes.includes(type.id) && <Check className="w-4 h-4 text-white" />}
              </button>
              <div className="w-12 h-12 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                <type.icon className="w-6 h-6 text-[#154230]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#101111] font-semibold">{type.name}</h4>
                <p className="text-[#4A4A4A] text-sm">{type.description}</p>
              </div>
              <span className="text-[#4A4A4A] text-sm">{type.count} items</span>
            </div>
          ))}
        </div>

        {/* Export Selected */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Export Format</h3>
          <div className="flex gap-3 mb-4">
            <label className="flex-1 flex items-center gap-2 p-3 bg-[#E6E2DA] rounded-xl cursor-pointer">
              <input type="radio" name="format" value="json" defaultChecked className="text-[#154230]" />
              <div>
                <p className="text-[#101111] font-medium">JSON</p>
                <p className="text-[#4A4A4A] text-xs">Machine-readable format</p>
              </div>
            </label>
            <label className="flex-1 flex items-center gap-2 p-3 bg-[#E6E2DA] rounded-xl cursor-pointer">
              <input type="radio" name="format" value="csv" className="text-[#154230]" />
              <div>
                <p className="text-[#101111] font-medium">CSV</p>
                <p className="text-[#4A4A4A] text-xs">Spreadsheet format</p>
              </div>
            </label>
          </div>
          <button
            onClick={handleExportAll}
            disabled={exporting !== null || selectedTypes.length === 0}
            className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {exporting === 'all' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export Selected ({selectedTypes.length})
              </>
            )}
          </button>
        </div>

        {/* Export Individual */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Export Individual Data</h3>
          <div className="grid grid-cols-2 gap-3">
            {dataTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleExport(type.id)}
                disabled={exporting !== null}
                className="p-4 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {exported.includes(type.id) ? (
                  <Check className="w-5 h-5 text-[#16A34A]" />
                ) : exporting === type.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 text-[#154230]" />
                )}
                <span className="text-[#101111] font-medium text-sm">{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
