'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, CreditCard, Download, Plus, ArrowUpRight, ArrowDownRight, X, CheckCircle, Home, Search, Truck, FileText, User, MessageSquare, Settings, Bell, Menu, LogOut, BarChart3, Package } from 'lucide-react';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      { id: 'INV-2024-003', date: '2024-01-10', amount: 1200, status: 'overdue', description: 'Freight Charges' },
    ];
    setInvoices(initialInvoices);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <span className="text-[#154230] font-bold text-lg">LEVERAGE</span>
          </div>
          <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Bell className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <h1 className="text-white font-bold text-2xl">Billing& Payments</h1>
          <p className="text-white/70 text-sm mt-1">Manage your credits and transactions</p>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-4 lg:py-6 space-y-4">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-2xl p-5 text-white">
            <p className="text-white/70 text-sm mb-1">Available Balance</p>
            <p className="text-4xl font-bold mb-4">{formatCurrency(balance)}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddFunds(true)}
                className="flex-1 py-3 bg-white text-[#154230] rounded-xl font-semibold text-sm"
              >
                Add Funds
              </button>
              <button className="flex-1 py-3 bg-white/20 text-white rounded-xl font-semibold text-sm">
                Withdraw
              </button>
            </div>
          </div>

          {/* Add Funds Modal */}
          {showAddFunds && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-[#101111]">Add Funds</h3>
                  <button onClick={() => setShowAddFunds(false)} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
                    <X className="w-5 h-5 text-[#4A4A4A]" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Amount (USD)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-lg"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[500, 1000, 5000].map(val => (
                      <button
                        key={val}
                        onClick={() => setAmount(val.toString())}
                        className="py-2 bg-[#E6E2DA] text-[#101111] rounded-lg text-sm font-medium hover:bg-[#D4CCBE] transition-colors"
                      >
                        ${val.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold">
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'transactions'
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A]'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'invoices'
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A]'
              }`}
            >
              Invoices
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white border border-black/5 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-[#101111]">{formatCurrency(12500)}</p>
                <p className="text-xs text-[#4A4A4A]">Total Credits</p>
              </div>
              <div className="bg-white border border-black/5 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-2">
                  <ArrowDownRight className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-[#101111]">{formatCurrency(2694)}</p>
                <p className="text-xs text-[#4A4A4A]">Total Debits</p>
              </div>
              <div className="bg-white border border-black/5 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center mb-2">
                  <CreditCard className="w-5 h-5 text-[#154230]" />
                </div>
                <p className="text-2xl font-bold text-[#101111]">3</p>
                <p className="text-xs text-[#4A4A4A]">Active Cards</p>
              </div>
              <div className="bg-white border border-black/5 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center mb-2">
                  <DollarSign className="w-5 h-5 text-[#A6824A]" />
                </div>
                <p className="text-2xl font-bold text-[#101111]">2</p>
                <p className="text-xs text-[#4A4A4A]">Pending Invoices</p>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="bg-white border border-black/5 rounded-xl overflow-hidden">
              {transactions.map((tx, i) => (
                <div key={tx.id} className={`flex items-center justify-between p-4 ${i !== transactions.length - 1 ? 'border-b border-black/5' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {tx.type === 'credit' ? (
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#101111]">{tx.description}</p>
                      <p className="text-xs text-[#4A4A4A]">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-[#101111]'}`}>
                    {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="bg-white border border-black/5 rounded-xl overflow-hidden">
              {invoices.map((inv, i) => (
                <div key={inv.id} className={`flex items-center justify-between p-4 ${i !== invoices.length - 1 ? 'border-b border-black/5' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E6E2DA] flex items-center justify-center">
                      <Download className="w-5 h-5 text-[#4A4A4A]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#101111]">{inv.description}</p>
                      <p className="text-xs text-[#4A4A4A]">{inv.id} • {inv.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-[#101111]">{formatCurrency(inv.amount)}</p>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      inv.status === 'paid' ? 'bg-green-100 text-green-700' :
                      inv.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#eee] h-[72px] flex items-center justify-around z-30">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#666]">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/marketplace" className="flex flex-col items-center gap-1 text-[#666]">
          <span className="text-2xl">🔍</span>
          <span className="text-[10px] font-medium">Browse</span>
        </Link>
        <Link href="/rfqs/new" className="flex flex-col items-center -mt-4">
          <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
            +
          </div>
        </Link>
        <Link href="/marketplace/inbox" className="flex flex-col items-center gap-1 text-[#666]">
          <span className="text-2xl">💬</span>
          <span className="text-[10px] font-medium">Inbox</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center gap-1 text-[#666]">
          <span className="text-2xl">👤</span>
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </nav>
    </div>
  );
}
