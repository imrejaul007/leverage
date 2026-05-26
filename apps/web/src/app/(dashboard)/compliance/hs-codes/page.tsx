'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HSCode {
  code: string;
  description: string;
  duty: string;
  unit: string;
  chapter: string;
  category: string;
}

const allHSCodes: HSCode[] = [
  { code: '8542.31', description: 'Electronic integrated circuits - Processors and controllers', duty: '0%', unit: 'piece', chapter: '85', category: 'Electrical' },
  { code: '8542.32', description: 'Electronic integrated circuits - Memories', duty: '0%', unit: 'piece', chapter: '85', category: 'Electrical' },
  { code: '8542.39', description: 'Electronic integrated circuits - Other', duty: '0%', unit: 'piece', chapter: '85', category: 'Electrical' },
  { code: '8471.30', description: 'Portable digital automatic data processing machines', duty: '0%', unit: 'piece', chapter: '84', category: 'Machinery' },
  { code: '8471.41', description: 'Other digital automatic data processing machines', duty: '0%', unit: 'piece', chapter: '84', category: 'Machinery' },
  { code: '8471.50', description: 'Digital processing units, other', duty: '0%', unit: 'piece', chapter: '84', category: 'Machinery' },
  { code: '8471.70', description: 'Storage units', duty: '0%', unit: 'piece', chapter: '84', category: 'Machinery' },
  { code: '8481.80', description: 'Valves for oleohydraulic or pneumatic transmissions', duty: '3.5%', unit: 'kg', chapter: '84', category: 'Machinery' },
  { code: '8481.20', description: 'Valves for oil hydraulic or pneumatic systems', duty: '3.5%', unit: 'kg', chapter: '84', category: 'Machinery' },
  { code: '9031.80', description: 'Measuring or checking instruments, nesoi', duty: '1.7%', unit: 'piece', chapter: '90', category: 'Instruments' },
  { code: '1006.30', description: 'Semi-milled or wholly milled rice', duty: '6%', unit: 'kg', chapter: '10', category: 'Agriculture' },
  { code: '1006.10', description: 'Rice in the husk (paddy or rough)', duty: '3%', unit: 'kg', chapter: '10', category: 'Agriculture' },
  { code: '5201.00', description: 'Cotton, not carded or combed', duty: '4.5%', unit: 'kg', chapter: '52', category: 'Textiles' },
  { code: '5205.00', description: 'Cotton yarn (other than sewing thread)', duty: '5%', unit: 'kg', chapter: '52', category: 'Textiles' },
  { code: '7210.41', description: 'Flat-rolled iron or non-alloy steel, width >= 600mm', duty: '20%', unit: 'kg', chapter: '72', category: 'Metals' },
  { code: '7210.49', description: 'Flat-rolled iron or non-alloy steel, other', duty: '25%', unit: 'kg', chapter: '72', category: 'Metals' },
  { code: '3004.90', description: 'Medicaments, measured doses, packaged', duty: '0%', unit: 'piece', chapter: '30', category: 'Pharmaceuticals' },
  { code: '3002.10', description: 'Blood fractions and immunological products', duty: '0%', unit: 'kg', chapter: '30', category: 'Pharmaceuticals' },
  { code: '8534.00', description: 'Printed circuits', duty: '0%', unit: 'piece', chapter: '85', category: 'Electrical' },
  { code: '8536.90', description: 'Electrical apparatus for switching/protecting circuits', duty: '2.7%', unit: 'piece', chapter: '85', category: 'Electrical' },
];

const chapters = [
  { value: 'all', label: 'All Chapters' },
  { value: '10', label: 'Chapter 10 - Cereals' },
  { value: '30', label: 'Chapter 30 - Pharmaceuticals' },
  { value: '52', label: 'Chapter 52 - Cotton' },
  { value: '72', label: 'Chapter 72 - Iron and Steel' },
  { value: '84', label: 'Chapter 84 - Nuclear Reactors, Machinery' },
  { value: '85', label: 'Chapter 85 - Electrical Machinery' },
  { value: '90', label: 'Chapter 90 - Optical, Medical Instruments' },
];

export default function HSCodesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [selectedCode, setSelectedCode] = useState<HSCode | null>(null);
  const [filteredCodes, setFilteredCodes] = useState<HSCode[]>(allHSCodes);

  useEffect(() => {
    let results = allHSCodes;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        code =>
          code.code.includes(query) ||
          code.description.toLowerCase().includes(query) ||
          code.category.toLowerCase().includes(query)
      );
    }

    if (selectedChapter !== 'all') {
      results = results.filter(code => code.chapter === selectedChapter);
    }

    setFilteredCodes(results);
  }, [searchQuery, selectedChapter]);

  const getDutyColor = (duty: string) => {
    const rate = parseFloat(duty.replace('%', ''));
    if (rate === 0) return 'text-emerald-400';
    if (rate < 5) return 'text-[#F4F1EA]';
    if (rate < 15) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/compliance" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-[#F4F1EA]">HS Code Search</h1>
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by HS code or product description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full input pl-12"
            />
            <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="input md:w-64"
          >
            {chapters.map(ch => (
              <option key={ch.value} value={ch.value}>{ch.label}</option>
            ))}
          </select>
        </div>
        <p className="text-[#D8CCBC]/50 text-sm mt-4">{filteredCodes.length} codes found</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Results */}
        <div className="space-y-4">
          <div className="card p-0 overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              {filteredCodes.map((code) => (
                <button
                  key={code.code}
                  onClick={() => setSelectedCode(code)}
                  className={`w-full text-left p-4 border-b border-[rgba(255,255,255,0.03)] transition-colors ${
                    selectedCode?.code === code.code
                      ? 'bg-[#0E3B36]/50 border-l-2 border-l-[#C49A6C]'
                      : 'hover:bg-[rgba(255,255,255,0.02)]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-[#C49A6C] font-mono font-semibold">{code.code}</span>
                      <p className="text-[#F4F1EA] text-sm mt-1 line-clamp-2">{code.description}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC]/50 text-xs rounded">
                        Chapter {code.chapter}
                      </span>
                    </div>
                    <span className={`font-semibold ml-4 ${getDutyColor(code.duty)}`}>
                      {code.duty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="card">
          {selectedCode ? (
            <div className="space-y-6">
              <div>
                <span className="text-[#C49A6C] font-mono text-xs">{selectedCode.chapter}</span>
                <h3 className="text-xl font-bold text-[#F4F1EA] mt-1">{selectedCode.code}</h3>
                <p className="text-[#D8CCBC]/70 mt-2">{selectedCode.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                  <p className="text-[#D8CCBC]/50 text-xs mb-1">Import Duty</p>
                  <p className={`text-2xl font-bold ${getDutyColor(selectedCode.duty)}`}>{selectedCode.duty}</p>
                </div>
                <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                  <p className="text-[#D8CCBC]/50 text-xs mb-1">Unit of Measure</p>
                  <p className="text-2xl font-bold text-[#F4F1EA]">{selectedCode.unit}</p>
                </div>
              </div>

              <div>
                <h4 className="text-[#F4F1EA] font-semibold mb-3">Tariff Rates by Country</h4>
                <div className="space-y-2">
                  {[
                    { country: 'United States', rate: selectedCode.duty },
                    { country: 'European Union', rate: parseFloat(selectedCode.duty.replace('%', '')) > 0 ? (parseFloat(selectedCode.duty.replace('%', '')) * 0.8).toFixed(1) + '%' : '0%' },
                    { country: 'UK', rate: selectedCode.duty },
                    { country: 'Singapore', rate: '0%' },
                  ].map(item => (
                    <div key={item.country} className="flex justify-between p-3 bg-[rgba(255,255,255,0.02)] rounded-lg">
                      <span className="text-[#D8CCBC]">{item.country}</span>
                      <span className="text-[#F4F1EA] font-medium">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[#F4F1EA] font-semibold mb-3">Additional Information</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-[rgba(255,255,255,0.05)]">
                    <dt className="text-[#D8CCBC]/50">Category</dt>
                    <dd className="text-[#F4F1EA]">{selectedCode.category}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[rgba(255,255,255,0.05)]">
                    <dt className="text-[#D8CCBC]/50">Chapter</dt>
                    <dd className="text-[#F4F1EA]">{selectedCode.chapter}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-[#D8CCBC]/50">Unit</dt>
                    <dd className="text-[#F4F1EA]">{selectedCode.unit}</dd>
                  </div>
                </dl>
              </div>

              <Link
                href="/compliance/duty-calculator"
                className="block w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-center hover:bg-[#D4AA82] transition-colors"
              >
                Calculate Duty for this Code
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-[#D8CCBC]/50">Select an HS code to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
