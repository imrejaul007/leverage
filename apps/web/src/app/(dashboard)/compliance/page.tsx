'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  { code: '8542.31', description: 'Electronic integrated circuits - processors and controllers', duty: '0%', origin: 'USA' },
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
  const [hsCodeResults, setHsCodeResults] = useState<HSCode[]>([]);
  const [selectedHsCode, setSelectedHsCode] = useState<HSCode | null>(null);

  const [calcForm, setCalcForm] = useState({ origin: '', destination: '', hsCode: '', value: '' });
  const [calcResult, setCalcResult] = useState<{ duty: number; vat: number; processingFee: number; total: number } | null>(null);

  const [sanctionQuery, setSanctionQuery] = useState('');
  const [sanctionResult, setSanctionResult] = useState<'clear' | 'warning' | null>(null);

  const handleSearchHsCode = () => {
    if (!searchQuery) { setHsCodeResults(hsCodes); return; }
    const filtered = hsCodes.filter(hs => hs.code.includes(searchQuery) || hs.description.toLowerCase().includes(searchQuery.toLowerCase()));
    setHsCodeResults(filtered);
  };

  const handleDutyCalculate = () => {
    if (!calcForm.origin || !calcForm.destination || !calcForm.hsCode || !calcForm.value) return;
    const value = parseFloat(calcForm.value);
    const hsCode = hsCodes.find(h => h.code === calcForm.hsCode) || hsCodes[0];
    const dutyRate = parseFloat(hsCode.duty.replace('%', '')) / 100;
    const duty = value * dutyRate;
    const vat = (value + duty) * 0.1;
    const processingFee = 50;
    setCalcResult({ duty, vat, processingFee, total: duty + vat + processingFee });
  };

  const handleSanctionCheck = () => {
    if (!sanctionQuery.trim()) return;
    const blockedTerms = ['sanction', 'prohibited', 'restricted', 'blocked'];
    const warnings = ['iran', 'north korea', 'syria', 'russia', 'crimea'];
    const query = sanctionQuery.toLowerCase();
    if (blockedTerms.some(term => query.includes(term))) setSanctionResult('warning');
    else if (warnings.some(term => query.includes(term))) setSanctionResult('warning');
    else setSanctionResult('clear');
  };

  if (hsCodeResults.length === 0 && searchQuery === '') setHsCodeResults(hsCodes);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-[#F4F1EA]">Trade Compliance</h1><p className="text-[#D8CCBC]/60 text-sm">HS codes, duty calculations, and sanctions screening</p></div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[{ id: 'hs-codes', label: 'HS Codes', icon: '📋' }, { id: 'duty-calc', label: 'Duty Calculator', icon: '💰' }, { id: 'sanctions', label: 'Sanctions', icon: '⚠️' }, { id: 'documents', label: 'Document Check', icon: '📄' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0E3B36]/80'}`}>
            <span>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hs-codes' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">HS Code Classification</h2>
            <div className="flex gap-4">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearchHsCode()} placeholder="Enter product description or HS code..." className="flex-1 input" />
              <button onClick={handleSearchHsCode} className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">Search</button>
            </div>
            <Link href="/compliance/hs-codes" className="inline-flex items-center gap-2 text-[#C49A6C] hover:text-[#D4AA82] text-sm mt-4"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>Browse full HS Code database</Link>
          </div>
          <div className="space-y-4">
            {hsCodeResults.map(hs => (
              <div key={hs.code} onClick={() => setSelectedHsCode(hs)} className="card cursor-pointer hover:border-[#C49A6C]/30 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1"><span className="text-[#C49A6C] font-mono font-semibold text-lg">{hs.code}</span><p className="text-[#F4F1EA] mt-2">{hs.description}</p></div>
                  <div className="text-right ml-4"><span className="text-emerald-400 font-semibold">{hs.duty} duty</span><p className="text-[#D8CCBC]/50 text-sm">{hs.origin}</p></div>
                </div>
              </div>
            ))}
          </div>
          {hsCodeResults.length === 0 && searchQuery && <div className="card text-center py-12"><div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🔍</span></div><p className="text-[#D8CCBC]/50 mb-4">No HS codes found for "{searchQuery}"</p></div>}

          {selectedHsCode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg">
                <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-[#F4F1EA]">HS Code Details</h2><button onClick={() => setSelectedHsCode(null)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button></div>
                <div className="space-y-4">
                  <div><p className="text-[#D8CCBC]/50 text-xs">HS Code</p><p className="text-[#C49A6C] font-mono text-xl font-bold">{selectedHsCode.code}</p></div>
                  <div><p className="text-[#D8CCBC]/50 text-xs">Description</p><p className="text-[#F4F1EA]">{selectedHsCode.description}</p></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl"><p className="text-[#D8CCBC]/50 text-xs">Import Duty</p><p className="text-emerald-400 text-xl font-bold">{selectedHsCode.duty}</p></div>
                    <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl"><p className="text-[#D8CCBC]/50 text-xs">Origin</p><p className="text-[#F4F1EA] text-xl font-bold">{selectedHsCode.origin}</p></div>
                  </div>
                  <button onClick={() => { setCalcForm({ ...calcForm, hsCode: selectedHsCode.code }); setActiveTab('duty-calc'); setSelectedHsCode(null); }} className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">Calculate Duty for this Code</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'duty-calc' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Import Duty Calculator</h2>
            <div className="space-y-4">
              <div><label className="block text-[#D8CCBC]/80 text-sm mb-2">Product Value (USD)</label><input type="number" value={calcForm.value} onChange={(e) => setCalcForm({ ...calcForm, value: e.target.value })} placeholder="10000" className="w-full input" /></div>
              <div><label className="block text-[#D8CCBC]/80 text-sm mb-2">HS Code</label><input type="text" value={calcForm.hsCode} onChange={(e) => setCalcForm({ ...calcForm, hsCode: e.target.value })} placeholder="8471.30" className="w-full input" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[#D8CCBC]/80 text-sm mb-2">Origin Country</label><select value={calcForm.origin} onChange={(e) => setCalcForm({ ...calcForm, origin: e.target.value })} className="w-full input"><option value="">Select...</option>{countries.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
                <div><label className="block text-[#D8CCBC]/80 text-sm mb-2">Destination</label><select value={calcForm.destination} onChange={(e) => setCalcForm({ ...calcForm, destination: e.target.value })} className="w-full input"><option value="">Select...</option>{countries.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
              </div>
              <button onClick={handleDutyCalculate} disabled={!calcForm.origin || !calcForm.destination || !calcForm.hsCode || !calcForm.value} className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors disabled:opacity-50">Calculate Duty</button>
            </div>
            <Link href="/compliance/duty-calculator" className="inline-flex items-center gap-2 text-[#C49A6C] hover:text-[#D4AA82] text-sm mt-4"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>Advanced duty calculator</Link>
          </div>

          {calcResult && (
            <div className="card">
              <h3 className="text-lg font-semibold text-[#F4F1EA] mb-6">Estimated Costs</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[rgba(255,255,255,0.05)]"><span className="text-[#D8CCBC]">Product Value</span><span className="text-[#F4F1EA] font-medium">${parseFloat(calcForm.value).toLocaleString()}</span></div>
                <div className="flex justify-between py-3 border-b border-[rgba(255,255,255,0.05)]"><span className="text-[#D8CCBC]">Import Duty</span><span className="text-[#C49A6C] font-medium">${calcResult.duty.toFixed(2)}</span></div>
                <div className="flex justify-between py-3 border-b border-[rgba(255,255,255,0.05)]"><span className="text-[#D8CCBC]">VAT/Tax</span><span className="text-[#C49A6C] font-medium">${calcResult.vat.toFixed(2)}</span></div>
                <div className="flex justify-between py-3 border-b border-[rgba(255,255,255,0.05)]"><span className="text-[#D8CCBC]">Processing Fee</span><span className="text-[#C49A6C] font-medium">${calcResult.processingFee.toFixed(2)}</span></div>
                <div className="flex justify-between py-4 bg-[#0E3B36]/50 rounded-xl px-4"><span className="text-[#F4F1EA] font-semibold">Total Estimated Cost</span><span className="text-[#C49A6C] font-bold text-xl">${calcResult.total.toFixed(2)}</span></div>
              </div>
            </div>
          )}
          {!calcResult && <div className="card flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🧮</span></div><p className="text-[#D8CCBC]/50">Enter values to calculate duties</p></div></div>}
        </div>
      )}

      {activeTab === 'sanctions' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Sanctions Screening</h2>
            <div className="flex gap-4">
              <input type="text" value={sanctionQuery} onChange={(e) => setSanctionQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSanctionCheck()} placeholder="Enter company name, address, or ID..." className="flex-1 input" />
              <button onClick={handleSanctionCheck} disabled={!sanctionQuery.trim()} className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors disabled:opacity-50">Screen</button>
            </div>
          </div>
          {sanctionResult === 'clear' && (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-3"><div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center"><svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div><div><p className="text-emerald-400 font-semibold">No Matches Found</p><p className="text-[#D8CCBC]/60 text-sm">This entity has not been flagged on any sanctions lists</p></div></div>
            </div>
          )}
          {sanctionResult === 'warning' && (
            <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <div className="flex items-center gap-3"><div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center"><svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><div><p className="text-amber-400 font-semibold">Potential Match - Manual Review Required</p><p className="text-[#D8CCBC]/60 text-sm">This entity requires additional verification.</p></div></div>
            </div>
          )}
          {!sanctionResult && <div className="card"><div className="text-center py-8"><div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🔍</span></div><p className="text-[#D8CCBC]/50">Enter a search term to check sanctions lists</p></div></div>}
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Document Compliance Check</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-xl text-center">
              <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg></div>
              <p className="text-[#F4F1EA] mb-2">Drop files here or click to upload</p><p className="text-[#D8CCBC]/50 text-sm">Invoice, Packing List, BL, COO</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[#F4F1EA] font-medium">Check Results</h3>
              {[{ name: 'Invoice Validation', status: 'pass' }, { name: 'HS Code Match', status: 'pass' }, { name: 'Value Consistency', status: 'pass' }, { name: 'Country of Origin', status: 'warning' }].map(item => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.02)] rounded-xl">
                  <span className="text-[#F4F1EA]">{item.name}</span>
                  {item.status === 'pass' ? <span className="text-emerald-400 flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Pass</span> : <span className="text-amber-400 flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>Warning</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
