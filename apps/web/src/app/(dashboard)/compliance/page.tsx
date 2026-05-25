'use client';

import Link from 'next/link';

export default function CompliancePage() {
  const checks = [
    { name: 'Denied Party Screening', status: 'passed', items: 0 },
    { name: 'HS Code Classification', status: 'passed', items: 5 },
    { name: 'License Requirements', status: 'warning', items: 2 },
    { name: 'Sanction Lists', status: 'passed', items: 0 },
    { name: 'Country Restrictions', status: 'passed', items: 0 },
  ];

  const statusColors: Record<string, string> = {
    passed: 'bg-emerald-600/20 text-emerald-400',
    warning: 'bg-amber-600/20 text-amber-400',
    failed: 'bg-red-600/20 text-red-400',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Compliance Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Compliance Score</p>
              <p className="text-3xl font-bold text-emerald-400">98%</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">All major checks passed</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Shipments</p>
              <p className="text-3xl font-bold text-white">12</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">2 pending compliance review</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pending Issues</p>
              <p className="text-3xl font-bold text-amber-400">2</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Requires attention</p>
        </div>
      </div>

      {/* Compliance Checks */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-4">Automated Compliance Checks</h2>
        <div className="space-y-3">
          {checks.map((check, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${check.status === 'passed' ? 'bg-emerald-500' : check.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="text-white font-medium">{check.name}</p>
                  {check.items > 0 && <p className="text-gray-400 text-sm">{check.items} items flagged</p>}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[check.status]}`}>
                {check.status === 'passed' ? 'Passed' : check.status === 'warning' ? 'Review Required' : 'Failed'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/compliance/hs-codes"
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors"
        >
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">HS Code Search</h3>
          <p className="text-gray-400 text-sm">Search and classify products with HS codes</p>
        </Link>

        <Link
          href="/compliance/duty-calculator"
          className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors"
        >
          <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">Duty Calculator</h3>
          <p className="text-gray-400 text-sm">Calculate import duties and taxes</p>
        </Link>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">Generate Report</h3>
          <p className="text-gray-400 text-sm">Export compliance documentation</p>
        </div>
      </div>
    </div>
  );
}
