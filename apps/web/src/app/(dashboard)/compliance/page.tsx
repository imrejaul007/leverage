'use client';

import { useState } from 'react';

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('hs-codes');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">Trade Compliance</h1>
        <p className="text-[#D8CCBC]/60">HS codes, duty calculations, and sanctions screening</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'hs-codes', label: 'HS Codes', icon: '📋' },
          { id: 'duty-calc', label: 'Duty Calculator', icon: '💰' },
          { id: 'sanctions', label: 'Sanctions Screening', icon: '⚠️' },
          { id: 'documents', label: 'Document Check', icon: '📄' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0E3B36]/80'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* HS Codes Search */}
      {activeTab === 'hs-codes' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">HS Code Classification</h2>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter product description or HS code..."
              className="flex-1 input"
            />
            <button className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
              Search
            </button>
          </div>
          <div className="space-y-4">
            {[
              { code: '8471.30', desc: 'Portable digital automatic data processing machines', duty: '0%', source: 'USA' },
              { code: '8471.41', desc: 'Other digital automatic data processing machines', duty: '0%', source: 'USA' },
              { code: '8471.50', desc: 'Digital processing units, other', duty: '0%', source: 'USA' },
            ].map(item => (
              <div key={item.code} className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.02)] rounded-xl">
                <div>
                  <span className="text-[#C49A6C] font-mono font-semibold">{item.code}</span>
                  <p className="text-[#F4F1EA] mt-1">{item.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-medium">{item.duty} duty</span>
                  <p className="text-[#D8CCBC]/50 text-sm">{item.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Duty Calculator */}
      {activeTab === 'duty-calc' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Import Duty Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[#D8CCBC]/80 text-sm mb-2">Product Value (USD)</label>
              <input type="number" placeholder="10000" className="input w-full" />
            </div>
            <div>
              <label className="block text-[#D8CCBC]/80 text-sm mb-2">HS Code</label>
              <input type="text" placeholder="8471.30" className="input w-full" />
            </div>
            <div>
              <label className="block text-[#D8CCBC]/80 text-sm mb-2">Destination Country</label>
              <select className="input w-full">
                <option>United States</option>
                <option>European Union</option>
                <option>UAE</option>
                <option>Singapore</option>
              </select>
            </div>
          </div>
          <button className="w-full mt-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
            Calculate Duty
          </button>
        </div>
      )}

      {/* Sanctions Screening */}
      {activeTab === 'sanctions' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Sanctions Screening</h2>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter company name, address, or ID..."
              className="flex-1 input"
            />
            <button className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
              Screen
            </button>
          </div>
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-emerald-400 font-medium">No Matches Found</p>
                <p className="text-[#D8CCBC]/60 text-sm">This entity has not been flagged on any sanctions lists</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Check */}
      {activeTab === 'documents' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Document Compliance Check</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-xl text-center">
              <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-[#F4F1EA] mb-2">Drop files here or click to upload</p>
              <p className="text-[#D8CCBC]/50 text-sm">Invoice, Packing List, BL, COO</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[#F4F1EA] font-medium">Check Results</h3>
              {[
                { name: 'Invoice Validation', status: 'pass' },
                { name: 'HS Code Match', status: 'pass' },
                { name: 'Value Consistency', status: 'pass' },
                { name: 'Country of Origin', status: 'warning' },
              ].map(item => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.02)] rounded-xl">
                  <span className="text-[#F4F1EA]">{item.name}</span>
                  {item.status === 'pass' ? (
                    <span className="text-emerald-400">✓ Pass</span>
                  ) : (
                    <span className="text-amber-400">⚠ Warning</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
