'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Shield, CheckCircle, AlertTriangle, Copy, Download, X } from 'lucide-react';

interface HSCode {
  code: string;
  description: string;
  duty: string;
  origin: string;
}

const hsCodes: HSCode[] = [
  { code: '8471.30', description: 'Portable digital automatic data processing machines', duty: '0%', origin: 'USA' },
  { code: '8471.41', description: 'Other digital automatic data processing machines', duty: '0%', origin: 'USA' },
  { code: '8471.50', description: 'Digital processing units, other', duty: '0%', origin: 'USA' },
  { code: '8471.70', description: 'Storage units', duty: '0%', origin: 'USA' },
  { code: '1006.30', description: 'Semi-milled or wholly milled rice', duty: '6%', origin: 'USA' },
  { code: '5201.00', description: 'Cotton, not carded or combed', duty: '4.5%', origin: 'USA' },
  { code: '8542.31', description: 'Electronic integrated circuits - processors', duty: '0%', origin: 'USA' },
  { code: '8542.39', description: 'Electronic integrated circuits - other', duty: '0%', origin: 'USA' },
  { code: '7210.41', description: 'Flat-rolled iron or non-alloy steel, width >= 600mm', duty: '20%', origin: 'USA' },
  { code: '3004.90', description: 'Medicaments, measured doses', duty: '0%', origin: 'USA' },
];

const countries = [
  { value: 'USA', label: 'United States' },
  { value: 'EU', label: 'European Union' },
  { value: 'UAE', label: 'United Arab Emirates' },
  { value: 'SG', label: 'Singapore' },
  { value: 'CN', label: 'China' },
  { value: 'IN', label: 'India' },
  { value: 'UK', label: 'United Kingdom' },
];

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('hs-codes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHsCode, setSelectedHsCode] = useState<HSCode | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredCodes = hsCodes.filter(code =>
    code.code.includes(searchQuery) ||
    code.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Compliance</h1>
        <p className="text-[#4A4A4A] text-sm">HS codes, duties, and trade regulations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('hs-codes')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'hs-codes' ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A] border border-black/5'
          }`}
        >
          HS Codes
        </button>
        <button
          onClick={() => setActiveTab('regulations')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'regulations' ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A] border border-black/5'
          }`}
        >
          Regulations
        </button>
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'checklist' ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A] border border-black/5'
          }`}
        >
          Checklist
        </button>
      </div>

      {activeTab === 'hs-codes' && (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by HS code or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
            />
          </div>

          {/* HS Codes List */}
          <div className="space-y-2">
            {filteredCodes.map(code => (
              <div
                key={code.code}
                onClick={() => setSelectedHsCode(code)}
                className="bg-white border border-black/5 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#5D1E21] font-mono font-semibold text-sm">{code.code}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        code.duty === '0%' ? 'bg-[#154230]/10 text-[#154230]' : 'bg-[#5D1E21]/10 text-[#5D1E21]'
                      }`}>
                        {code.duty} duty
                      </span>
                    </div>
                    <p className="text-[#101111] text-sm">{code.description}</p>
                    <p className="text-[#4A4A4A] text-xs mt-1">Origin: {code.origin}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(code.code);
                    }}
                    className="p-2 text-[#4A4A4A] hover:text-[#154230] hover:bg-[#E6E2DA] rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {copied && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#154230] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Copied to clipboard!
            </div>
          )}
        </>
      )}

      {activeTab === 'regulations' && (
        <div className="space-y-3">
          <div className="bg-white border border-black/5 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#154230]" />
              </div>
              <div>
                <h3 className="text-[#101111] font-semibold text-sm">USA Import Regulations</h3>
                <p className="text-[#4A4A4A] text-xs">Last updated: Jan 15, 2024</p>
              </div>
            </div>
            <p className="text-[#101111] text-sm mb-3">All imports to the USA must comply with CBP regulations, including proper classification, valuation, and country of origin marking.</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[#E6E2DA] text-[#101111] rounded-lg text-xs font-medium hover:bg-[#D4CCBE] transition-colors">
                <Download className="w-3 h-3" />
                Download Guide
              </button>
            </div>
          </div>

          <div className="bg-white border border-black/5 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#5D1E21]" />
              </div>
              <div>
                <h3 className="text-[#101111] font-semibold text-sm">EU Product Standards</h3>
                <p className="text-[#4A4A4A] text-xs">Last updated: Jan 10, 2024</p>
              </div>
            </div>
            <p className="text-[#101111] text-sm mb-3">Products entering the EU must meet CE marking requirements, REACH regulations, and proper documentation.</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[#E6E2DA] text-[#101111] rounded-lg text-xs font-medium hover:bg-[#D4CCBE] transition-colors">
                <Download className="w-3 h-3" />
                Download Guide
              </button>
            </div>
          </div>

          <div className="bg-white border border-black/5 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#5D1E21]" />
              </div>
              <div>
                <h3 className="text-[#101111] font-semibold text-sm">Restricted Items Notice</h3>
                <p className="text-[#4A4A4A] text-xs">Updated daily</p>
              </div>
            </div>
            <p className="text-[#101111] text-sm mb-3">Certain products require special licenses for import/export. Check the restricted items list before shipping.</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[#5D1E21]/10 text-[#5D1E21] rounded-lg text-xs font-medium hover:bg-[#5D1E21]/20 transition-colors">
                View Restricted Items
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className="space-y-3">
          <div className="bg-white border border-black/5 rounded-xl p-4">
            <h3 className="text-[#101111] font-semibold text-sm mb-3">Pre-Shipment Checklist</h3>
            <div className="space-y-2">
              {[
                { item: 'HS Code Classification', done: true },
                { item: 'Duty Calculation', done: true },
                { item: 'Country of Origin Certificate', done: true },
                { item: 'Commercial Invoice', done: false },
                { item: 'Packing List', done: false },
                { item: 'Bill of Lading / Airway Bill', done: false },
                { item: 'Insurance Certificate', done: false },
                { item: 'Import License (if required)', done: false },
              ].map((check, i) => (
                <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#E6E2DA] cursor-pointer transition-colors">
                  <input type="checkbox" checked={check.done} className="w-5 h-5 rounded border-[#154230] text-[#154230] accent-[#154230]" />
                  <span className={`text-sm ${check.done ? 'text-[#4A4A4A] line-through' : 'text-[#101111]'}`}>
                    {check.item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HS Code Detail Modal */}
      {selectedHsCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setSelectedHsCode(null)}>
          <div className="bg-white border border-black/5 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-black/5 flex items-center justify-between">
              <div>
                <h2 className="text-[#101111] font-semibold text-sm">HS Code Details</h2>
                <p className="text-[#5D1E21] font-mono text-xs">{selectedHsCode.code}</p>
              </div>
              <button onClick={() => setSelectedHsCode(null)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 bg-[#E6E2DA] rounded-lg">
                <p className="text-[#4A4A4A] text-xs mb-1">Description</p>
                <p className="text-[#101111] text-sm">{selectedHsCode.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#E6E2DA] rounded-lg">
                  <p className="text-[#4A4A4A] text-xs mb-1">Import Duty</p>
                  <p className={`text-sm font-semibold ${selectedHsCode.duty === '0%' ? 'text-[#154230]' : 'text-[#5D1E21]'}`}>
                    {selectedHsCode.duty}
                  </p>
                </div>
                <div className="p-3 bg-[#E6E2DA] rounded-lg">
                  <p className="text-[#4A4A4A] text-xs mb-1">Origin</p>
                  <p className="text-[#101111] text-sm font-semibold">{selectedHsCode.origin}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(selectedHsCode.code)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#154230] text-white font-semibold rounded-lg text-sm hover:bg-[#1d5240] transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy HS Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
