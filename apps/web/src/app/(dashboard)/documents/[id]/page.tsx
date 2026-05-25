'use client';

import Link from 'next/link';

export default function DocumentViewerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/documents" className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-white">Document Viewer</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document Preview */}
        <div className="lg:col-span-3 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-white font-medium">Commercial Invoice - LBL-2024-001.pdf</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                Download
              </button>
              <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Share
              </button>
            </div>
          </div>
          <div className="aspect-[3/4] bg-slate-900 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">Document preview would render here</p>
              <p className="text-gray-600 text-sm mt-1">PDF, 245 KB</p>
            </div>
          </div>
        </div>

        {/* Document Info */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Document Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-gray-400 text-sm">Document Type</dt>
                <dd className="text-white">Commercial Invoice</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-sm">Order Reference</dt>
                <dd className="text-blue-400">LBL-2024-001</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-sm">Created</dt>
                <dd className="text-white">January 15, 2024</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-sm">Status</dt>
                <dd>
                  <span className="px-2 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-xs font-medium">
                    Approved
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-sm">File Size</dt>
                <dd className="text-white">245 KB</dd>
              </div>
            </dl>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                Request Changes
              </button>
              <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                Send for Signature
              </button>
              <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                Archive
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Audit Trail</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                <div>
                  <p className="text-white text-sm">Document approved</p>
                  <p className="text-gray-500 text-xs">Jan 15, 2024 at 3:45 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                <div>
                  <p className="text-white text-sm">Uploaded by John</p>
                  <p className="text-gray-500 text-xs">Jan 15, 2024 at 10:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
