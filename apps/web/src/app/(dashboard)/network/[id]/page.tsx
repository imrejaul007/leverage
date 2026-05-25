'use client';

import Link from 'next/link';

export default function CompanyProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/network" className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-white">Company Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold">
            TE
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">TechExport Solutions</h2>
              <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium">Verified</span>
            </div>
            <p className="text-gray-400 mb-4">Electronics & Components Exporter</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-white font-medium">4.8</span>
                <span className="text-gray-400">(234 reviews)</span>
              </div>
              <div className="text-gray-400">
                <strong className="text-white">500+</strong> trades completed
              </div>
              <div className="text-gray-400">
                Member since <strong className="text-white">2022</strong>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Connect
            </button>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
              Message
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">About</h3>
            <p className="text-gray-300">
              TechExport Solutions is a leading electronics exporter based in Shenzhen, China.
              We specialize in industrial sensors, display modules, and electronic components
              for B2B customers worldwide. With over 10 years of experience, we serve clients
              in North America, Europe, and Southeast Asia.
            </p>
          </div>

          {/* Products */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Featured Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Industrial Sensors',
                'LED Modules',
                'Display Units',
                'Control Systems',
                'Power Supplies',
                'Connectors',
              ].map((product, i) => (
                <div key={i} className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <p className="text-white text-sm">{product}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                <div>
                  <p className="text-white text-sm">Completed order LBL-2024-089</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-white text-sm">Posted an update</p>
                  <p className="text-gray-500 text-xs">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Contact Information</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-gray-400 text-sm">Location</dt>
                <dd className="text-white">Shenzhen, China</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-sm">Website</dt>
                <dd className="text-blue-400">techexport-solutions.com</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-sm">Email</dt>
                <dd className="text-blue-400">contact@techexport.com</dd>
              </div>
            </dl>
          </div>

          {/* Trade Capabilities */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Trade Capabilities</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sea Freight Export
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Air Freight Export
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Document Processing
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Quality Inspection
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-700 rounded text-gray-300 text-xs">ISO 9001</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-gray-300 text-xs">CE</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-gray-300 text-xs">RoHS</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-gray-300 text-xs">FCC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
