'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/products" className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-white">Product Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="aspect-square bg-slate-700 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-24 h-24 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div className="flex gap-2">
            <div className="w-20 h-20 bg-slate-700 rounded-lg"></div>
            <div className="w-20 h-20 bg-slate-700 rounded-lg"></div>
            <div className="w-20 h-20 bg-slate-700 rounded-lg"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Industrial Sensors X200</h2>
                <p className="text-gray-400">SKU: IND-SEN-X200-001</p>
              </div>
              <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-sm font-medium">
                Active
              </span>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-bold text-white">$299.99</p>
              <p className="text-gray-400">150 units in stock</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Quantity</label>
                <div className="flex items-center gap-2 mt-1">
                  <button className="w-10 h-10 bg-slate-700 rounded-lg text-white">-</button>
                  <input type="number" defaultValue={1} className="w-20 bg-slate-700 text-white rounded-lg px-3 py-2 text-center" />
                  <button className="w-10 h-10 bg-slate-700 rounded-lg text-white">+</button>
                </div>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                Add to Order
              </button>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Specifications</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-gray-400">Category</dt>
                <dd className="text-white">Electronics</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">HS Code</dt>
                <dd className="text-white">8542.31.00</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Weight</dt>
                <dd className="text-white">0.5 kg</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Origin</dt>
                <dd className="text-white">Germany</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Description</h3>
        <p className="text-gray-400">
          High-precision industrial sensors for manufacturing automation. Features digital output,
          temperature compensation, and IP67 rating for harsh environments.
        </p>
      </div>
    </div>
  );
}
