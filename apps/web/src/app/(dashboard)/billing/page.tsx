'use client';

import { useState, useEffect } from 'react';
import { DollarSign, CreditCard, Download, Plus, ArrowUpRight, ArrowDownRight, X, CheckCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export default function BillingPage() {
  const [balance, setBalance] = useState(124580);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const initialTx: Transaction[] = [
      { id: 'TXN-001', type: 'debit', amount: 250, description: 'Consultation - Sarah Chen', date: '2024-01-15', status: 'completed' },
      { id: 'TXN-002', type: 'credit', amount: 5000, description: 'Credit Purchase', date: '2024-01-14', status: 'completed' },
      { id: 'TXN-003', type: 'debit', amount: 1250, description: 'Freight Booking - Maersk', date: '2024-01-12', status: 'completed' },
      { id: 'TXN-004', type: 'debit', amount: 45, description: 'Document Verification', date: '2024-01-10', status: 'completed' },
      { id: 'TXN-005', type: 'debit', amount: 99, description: 'Pro Subscription', date: '2024-01-08', status: 'completed' },
    ];
    setTransactions(initialTx);

    const initialInvoices: Invoice[] = [
      { id: 'INV-2024-001', date: '2024-01-20', amount: 2500, status: 'paid', description: 'Pro Plan - Monthly' },
      { id: 'INV-2024-002', date: '2024-01-15', amount: 450, status: 'pending', description: 'Document Services' },
      { id: 'INV-2024-003', date: '2024-01-01', amount: 2500, status: 'paid', description: 'Pro Plan - Monthly' },
    ];
    setInvoices(initialInvoices);
  }, []);

  const statusConfig: Record<string, { color: string; bg: string }> = {
    completed: { color: 'text-[#154230]', bg: 'bg-[#154230]/10' },
    pending: { color: 'text-[#A6824A]', bg: 'bg-[#A6824A]/10' },
    failed: { color: 'text-[#5D1E21]', bg: 'bg-[#5D1E21]/10' },
    paid: { color: 'text-[#154230]', bg: 'bg-[#154230]/10' },
    overdue: { color: 'text-[#5D1E21]', bg: 'bg-[#5D1E21]/10' },
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Billing</h1>
        <p className="text-[#4A4A4A] text-sm">Manage your payments and invoices</p>
      </div>

      {/* Balance Card */}
      <div className="bg-[#154230] rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-white/70" />
            <span className="text-white/70 text-sm">Available Balance</span>
          </div>
          <CreditCard className="w-5 h-5 text-white/70" />
        </div>
        <p className="text-3xl font-bold mb-4">${balance.toLocaleString()}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddFunds(true)}
            className="flex-1 py-2.5 bg-white text-[#154230] font-semibold rounded-lg text-sm hover:bg-white/90 transition-colors"
          >
            Add Funds
          </button>
          <button className="px-4 py-2.5 bg-white/10 text-white font-semibold rounded-lg text-sm hover:bg-white/20 transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'overview' ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A] border border-black/5'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'transactions' ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A] border border-black/5'
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'invoices' ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A] border border-black/5'
          }`}
        >
          Invoices
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-black/5 rounded-xl p-4">
            <p className="text-[#4A4A4A] text-xs mb-1">This Month</p>
            <p className="text-xl font-bold text-[#101111]">$2,450</p>
            <p className="text-[#4A4A4A] text-xs">Total Spent</p>
          </div>
          <div className="bg-white border border-black/5 rounded-xl p-4">
            <p className="text-[#4A4A4A] text-xs mb-1">Credits Used</p>
            <p className="text-xl font-bold text-[#101111]">$5,000</p>
            <p className="text-[#4A4A4A] text-xs">Available</p>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="space-y-2">
          {transactions.map(tx => (
            <div key={tx.id} className="bg-white border border-black/5 rounded-xl p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                tx.type === 'credit' ? 'bg-[#154230]/10' : 'bg-[#5D1E21]/10'
              }`}>
                {tx.type === 'credit' ? (
                  <ArrowDownRight className="w-5 h-5 text-[#154230]" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-[#5D1E21]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#101111] text-sm font-medium truncate">{tx.description}</p>
                <p className="text-[#4A4A4A] text-xs">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-[#154230]' : 'text-[#101111]'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()}
                </p>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[tx.status].bg} ${statusConfig[tx.status].color}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="space-y-2">
          {invoices.map(inv => (
            <div key={inv.id} className="bg-white border border-black/5 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E6E2DA] flex items-center justify-center">
                <Download className="w-5 h-5 text-[#4A4A4A]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#101111] text-sm font-medium">{inv.description}</p>
                <p className="text-[#4A4A4A] text-xs">{inv.id} • {inv.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[#101111] text-sm font-semibold">${inv.amount.toLocaleString()}</p>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[inv.status].bg} ${statusConfig[inv.status].color}`}>
                  {inv.status}
                </span>
              </div>
              <button className="p-2 text-[#4A4A4A] hover:text-[#154230] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setShowAddFunds(false)}>
          <div className="bg-white border border-black/5 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-[#101111] font-semibold text-sm">Add Funds</h2>
              <button onClick={() => setShowAddFunds(false)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-[#101111] text-xs font-medium mb-1.5">Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000].map(val => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toString())}
                    className="py-2 bg-[#E6E2DA] text-[#101111] rounded-lg text-sm font-medium hover:bg-[#D4CCBE] transition-colors"
                  >
                    ${val}
                  </button>
                ))}
              </div>
              <button className="w-full h-12 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
