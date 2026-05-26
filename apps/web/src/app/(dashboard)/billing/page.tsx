'use client';

import { useState } from 'react';

const transactions = [
  { id: 'TXN-001', date: '2024-01-15', description: 'Consultation - Sarah Chen', amount: -250, status: 'completed' },
  { id: 'TXN-002', date: '2024-01-14', description: 'Credit Purchase - 500 credits', amount: 50, status: 'completed' },
  { id: 'TXN-003', date: '2024-01-12', description: 'Freight Booking - DHL Express', amount: -1250, status: 'completed' },
  { id: 'TXN-004', date: '2024-01-10', description: 'Document Verification', amount: -45, status: 'completed' },
  { id: 'TXN-005', date: '2024-01-08', description: 'Pro Subscription - Monthly', amount: -99, status: 'completed' },
];

const invoices = [
  { id: 'INV-2024-001', date: '2024-01-15', amount: 250, status: 'paid' },
  { id: 'INV-2024-002', date: '2024-01-14', amount: 50, status: 'paid' },
  { id: 'INV-2024-003', date: '2024-01-12', amount: 1250, status: 'paid' },
];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">Billing & Payments</h1>
        <p className="text-[#D8CCBC]/60">Manage your payments, invoices, and subscriptions</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-[#0E3B36] to-[#081512] border-[#C49A6C]/20">
          <p className="text-[#D8CCBC]/60 text-sm mb-2">Available Balance</p>
          <p className="text-4xl font-bold text-[#F4F1EA] mb-4">$12,458.00</p>
          <div className="flex gap-3">
            <button className="flex-1 py-2 bg-[#C49A6C] text-[#081512] rounded-lg font-semibold text-sm hover:bg-[#D4AA82] transition-colors">
              Add Funds
            </button>
            <button className="flex-1 py-2 bg-[rgba(255,255,255,0.05)] text-[#F4F1EA] rounded-lg font-medium text-sm border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        <div className="card">
          <p className="text-[#D8CCBC]/60 text-sm mb-2">This Month Spent</p>
          <p className="text-4xl font-bold text-[#F4F1EA] mb-4">$1,644.00</p>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 text-sm">↓ 12%</span>
            <span className="text-[#D8CCBC]/50 text-sm">vs last month</span>
          </div>
        </div>

        <div className="card">
          <p className="text-[#D8CCBC]/60 text-sm mb-2">Credits Balance</p>
          <p className="text-4xl font-bold text-[#F4F1EA] mb-4">2,450</p>
          <div className="flex items-center gap-2">
            <span className="text-[#C49A6C] text-sm">≈ $245 value</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[rgba(255,255,255,0.05)]">
        {['overview', 'transactions', 'invoices', 'methods'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'text-[#C49A6C] border-b-2 border-[#C49A6C]'
                : 'text-[#D8CCBC]/60 hover:text-[#F4F1EA]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transactions */}
      {activeTab === 'transactions' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.02)] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    tx.amount > 0 ? 'bg-emerald-500/20' : 'bg-[#0E3B36]'
                  }`}>
                    <span className={tx.amount > 0 ? 'text-emerald-400' : 'text-[#C49A6C]'}>
                      {tx.amount > 0 ? '+' : '-'}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#F4F1EA] font-medium">{tx.description}</p>
                    <p className="text-[#D8CCBC]/50 text-sm">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${tx.amount > 0 ? 'text-emerald-400' : 'text-[#F4F1EA]'}`}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                  </p>
                  <span className="text-emerald-400 text-xs capitalize">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoices */}
      {activeTab === 'invoices' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Invoices</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <th className="text-left py-3 text-[#D8CCBC]/60 text-sm font-medium">Invoice</th>
                  <th className="text-left py-3 text-[#D8CCBC]/60 text-sm font-medium">Date</th>
                  <th className="text-left py-3 text-[#D8CCBC]/60 text-sm font-medium">Amount</th>
                  <th className="text-left py-3 text-[#D8CCBC]/60 text-sm font-medium">Status</th>
                  <th className="text-right py-3"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id} className="border-b border-[rgba(255,255,255,0.03)]">
                    <td className="py-4 text-[#F4F1EA]">{inv.id}</td>
                    <td className="py-4 text-[#D8CCBC]/60">{inv.date}</td>
                    <td className="py-4 text-[#F4F1EA]">${inv.amount.toLocaleString()}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full capitalize">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-[#C49A6C] hover:text-[#D4AA82] text-sm font-medium">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      {activeTab === 'methods' && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#F4F1EA]">Payment Methods</h2>
            <button className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg font-medium text-sm hover:bg-[#0f4a42] transition-colors">
              + Add Method
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[#C49A6C]/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="text-[#F4F1EA] font-medium">•••• •••• •••• 4242</p>
                  <p className="text-[#D8CCBC]/50 text-sm">Expires 12/25</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#C49A6C]/20 text-[#C49A6C] text-xs rounded-full">Default</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Spending by Category</h2>
            <div className="space-y-4">
              {[
                { name: 'Consultations', amount: 650, percent: 40, color: '#C49A6C' },
                { name: 'Freight', amount: 800, percent: 49, color: '#0E3B36' },
                { name: 'Documents', amount: 145, percent: 9, color: '#D8CCBC' },
                { name: 'Subscriptions', amount: 99, percent: 6, color: '#F4F1EA' },
              ].map(cat => (
                <div key={cat.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#D8CCBC] text-sm">{cat.name}</span>
                    <span className="text-[#F4F1EA] text-sm">${cat.amount}</span>
                  </div>
                  <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Active Subscriptions</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.02)] rounded-xl">
                <div>
                  <p className="text-[#F4F1EA] font-medium">Pro Plan</p>
                  <p className="text-[#D8CCBC]/50 text-sm">Renews on Feb 15, 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-[#C49A6C] font-bold">$99/mo</p>
                  <button className="text-[#D8CCBC]/60 text-sm hover:text-[#F4F1EA]">Manage</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
