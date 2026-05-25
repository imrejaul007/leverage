'use client';

import { useState } from 'react';

export default function HSCodesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState<typeof codes[0] | null>(null);

  const codes = [
    { code: '8542.31.00', description: 'Electronic integrated circuits - Processors and controllers', duty: '0%', unit: 'piece' },
    { code: '8542.32.00', description: 'Electronic integrated circuits - Memories', duty: '0%', unit: 'piece' },
    { code: '8481.80.10', description: 'Valves for oleohydraulic or pneumatic transmissions', duty: '3.5%', unit: 'kg' },
    { code: '8481.20.00', description: 'Valves for oil hydraulic or pneumatic systems', duty: '3.5%', unit: 'kg' },
    { code: '9031.80.00', description: 'Measuring or checking instruments, nesoi', duty: '1.7%', unit: 'piece' },
    { code: '8471.30.01', description: 'Portable digital automatic data processing machines', duty: '0%', unit: 'piece' },
  ];

  const filteredCodes = codes.filter(code =>
    code.code.includes(searchQuery) ||
    code.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">HS Code Search</h1>

      {/* Search */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by HS code or product description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 pl-10 border border-slate-600 focus:outline-none focus:border-blue-500"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select className="bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:border-blue-500">
            <option>All Chapters</option>
            <option>Chapter 84 - Nuclear Reactors, Machinery</option>
            <option>Chapter 85 - Electrical Machinery</option>
            <option>Chapter 90 - Optical, Medical Instruments</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Results */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Search Results ({filteredCodes.length})</h2>
          {filteredCodes.map((code) => (
            <button
              key={code.code}
              onClick={() => setSelectedCode(code)}
              className={`w-full text-left bg-slate-800 rounded-xl p-5 border transition-colors ${
                selectedCode?.code === code.code ? 'border-blue-500' : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-blue-400 font-mono font-semibold">{code.code}</span>
                  <p className="text-white mt-1">{code.description}</p>
                </div>
                <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 rounded text-sm font-medium">
                  {code.duty} duty
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Details Panel */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          {selectedCode ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedCode.code}</h3>
                <p className="text-gray-400">{selectedCode.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Import Duty</p>
                  <p className="text-2xl font-bold text-emerald-400">{selectedCode.duty}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Unit of Measure</p>
                  <p className="text-2xl font-bold text-white">{selectedCode.unit}</p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Additional Information</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <dt className="text-gray-400">MFN Rate</dt>
                    <dd className="text-white">{selectedCode.duty}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <dt className="text-gray-400">General Rate</dt>
                    <dd className="text-white">{selectedCode.duty}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <dt className="text-gray-400">Special Rate</dt>
                    <dd className="text-white">Free</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-400">Chapter</dt>
                    <dd className="text-white">85</dd>
                  </div>
                </dl>
              </div>

              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                Classify Product with this Code
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-400">Select an HS code to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
