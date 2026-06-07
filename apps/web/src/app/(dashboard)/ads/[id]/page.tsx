'use client';

import Link from 'next/link';

export default function CampaignDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/ads" className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-white">Campaign Details</h1>
      </div>

      {/* Campaign Header */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-white">Spring Sale 2024</h2>
              <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
            <p className="text-gray-400">Created on January 10, 2024</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
              Edit
            </button>
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
              Pause
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-gray-400 text-sm">Budget</p>
          <p className="text-3xl font-bold text-white mt-2">$5,000</p>
          <p className="text-gray-400 text-sm mt-2">Total budget</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-gray-400 text-sm">Spent</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">$3,240</p>
          <p className="text-gray-400 text-sm mt-2">64.8% of budget</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-gray-400 text-sm">Impressions</p>
          <p className="text-3xl font-bold text-white mt-2">125K</p>
          <p className="text-emerald-400 text-sm mt-2">+15% vs last week</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-gray-400 text-sm">Clicks</p>
          <p className="text-3xl font-bold text-white mt-2">3,450</p>
          <p className="text-gray-400 text-sm mt-2">2.76% CTR</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Daily Performance</h2>
          <div className="h-64 flex items-end justify-around p-4">
            {[45, 52, 48, 60, 55, 70, 65, 80, 75, 85, 78, 90].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-8 bg-blue-600/50 hover:bg-blue-600 rounded-t transition-colors"
                  style={{ height: `${h * 2}px` }}
                />
                <span className="text-gray-500 text-xs">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Preview */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Ad Preview</h2>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <div>
                <p className="text-gray-800 font-semibold">Leverge</p>
                <p className="text-gray-500 text-sm">Sponsored</p>
              </div>
            </div>
            <p className="text-gray-800 mt-4">
              Spring Sale is here! Get up to 30% off on industrial sensors and components.
              Streamline your trade operations with our AI-powered platform.
            </p>
            <div className="mt-4 bg-gray-100 rounded-lg p-3">
              <p className="text-gray-600 text-sm">leveragebylerar.com/spring-sale</p>
            </div>
          </div>
        </div>
      </div>

      {/* Targeting & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Targeting</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-gray-400 text-sm">Location</dt>
              <dd className="text-white">United States, Germany, United Kingdom</dd>
            </div>
            <div>
              <dt className="text-gray-400 text-sm">Age Range</dt>
              <dd className="text-white">25-54</dd>
            </div>
            <div>
              <dt className="text-gray-400 text-sm">Interests</dt>
              <dd className="text-white">B2B, Import/Export, Manufacturing, Supply Chain</dd>
            </div>
            <div>
              <dt className="text-gray-400 text-sm">Placements</dt>
              <dd className="text-white">LinkedIn, Google Display Network</dd>
            </div>
          </dl>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Schedule & Budget</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-gray-400 text-sm">Start Date</dt>
              <dd className="text-white">January 15, 2024</dd>
            </div>
            <div>
              <dt className="text-gray-400 text-sm">End Date</dt>
              <dd className="text-white">March 31, 2024</dd>
            </div>
            <div>
              <dt className="text-gray-400 text-sm">Daily Budget</dt>
              <dd className="text-white">$50.00</dd>
            </div>
            <div>
              <dt className="text-gray-400 text-sm">Bidding Strategy</dt>
              <dd className="text-white">Cost per Click (CPC)</dd>
            </div>
            <div>
              <dt className="text-gray-400 text-sm">Average CPC</dt>
              <dd className="text-white">$0.94</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
