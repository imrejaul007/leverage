'use client';

import Link from 'next/link';

export default function OrderDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/orders" className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-white">Order Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">LBL-2024-001</h2>
                <p className="text-gray-400">Placed on January 15, 2024</p>
              </div>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                Processing
              </span>
            </div>

            <h3 className="text-white font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Industrial Sensors X200</p>
                    <p className="text-gray-400 text-sm">SKU: IND-SEN-X200-001</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white">50 units @ $299.99</p>
                  <p className="text-gray-400 text-sm">$14,999.50</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">$14,999.50</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Shipping</span>
                <span className="text-white">$450.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Tax</span>
                <span className="text-white">$1,349.96</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-slate-700">
                <span className="text-white font-semibold">Total</span>
                <span className="text-white font-bold text-xl">$16,799.46</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Shipment Tracking</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div className="flex-1">
                  <p className="text-white">Order Confirmed</p>
                  <p className="text-gray-400 text-sm">January 15, 2024 at 10:30 AM</p>
                </div>
              </div>
              <div className="ml-1.5 border-l-2 border-slate-600 h-6"></div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-white">Processing at Warehouse</p>
                  <p className="text-gray-400 text-sm">January 16, 2024 at 2:15 PM</p>
                </div>
              </div>
              <div className="ml-1.5 border-l-2 border-slate-600 h-6"></div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div className="flex-1">
                  <p className="text-gray-400">Shipped - Pending</p>
                  <p className="text-gray-500 text-sm">Estimated: January 18, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Buyer Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Company</p>
                <p className="text-white">TechCorp Inc.</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Contact</p>
                <p className="text-white">John Smith</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-blue-400">john@techcorp.com</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Shipping Address</h3>
            <p className="text-gray-300">
              123 Business Park Drive<br />
              Suite 400<br />
              San Francisco, CA 94105<br />
              United States
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Update Status
              </button>
              <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                Download Invoice
              </button>
              <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                Message Buyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
