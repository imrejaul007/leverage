'use client';

import { useState, useEffect } from 'react';

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
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Load from localStorage
    const storedBalance = localStorage.getItem('leverage_balance');
    if (storedBalance) setBalance(parseFloat(storedBalance));

    const storedTx = localStorage.getItem('leverage_transactions');
    if (storedTx) {
      setTransactions(JSON.parse(storedTx));
    } else {
      const initialTx: Transaction[] = [
        { id: 'TXN-001', type: 'debit', amount: 250, description: 'Consultation - Sarah Chen', date: '2024-01-15', status: 'completed' },
        { id: 'TXN-002', type: 'credit', amount: 5000, description: 'Credit Purchase', date: '2024-01-14', status: 'completed' },
        { id: 'TXN-003', type: 'debit', amount: 1250, description: 'Freight Booking - Maersk', date: '2024-01-12', status: 'completed' },
        { id: 'TXN-004', type: 'debit', amount: 45, description: 'Document Verification', date: '2024-01-10', status: 'completed' },
        { id: 'TXN-005', type: 'debit', amount: 99, description: 'Pro Subscription', date: '2024-01-08', status: 'completed' },
      ];
      setTransactions(initialTx);
      localStorage.setItem('leverage_transactions', JSON.stringify(initialTx));
    }

    const storedInv = localStorage.getItem('leverage_invoices');
    if (storedInv) {
      setInvoices(JSON.parse(storedInv));
    } else {
      const initialInv: Invoice[] = [
        { id: 'INV-2024-001', date: '2024-01-15', amount: 250, status: 'paid', description: 'Consultation Fee' },
        { id: 'INV-2024-002', date: '2024-01-14', amount: 5000, status: 'paid', description: 'Credit Purchase' },
        { id: 'INV-2024-003', date: '2024-01-12', amount: 1250, status: 'paid', description: 'Freight Booking' },
        { id: 'INV-2024-004', date: '2024-01-10', amount: 45, status: 'overdue', description: 'Document Verification' },
      ];
      setInvoices(initialInv);
      localStorage.setItem('leverage_invoices', JSON.stringify(initialInv));
    }
  }, []);

  const handleAddFunds = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    const newBalance = balance + numAmount;
    setBalance(newBalance);
    localStorage.setItem('leverage_balance', newBalance.toString());

    const newTx: Transaction = {
      id: `TXN-${Date.now()}`,
      type: 'credit',
      amount: numAmount,
      description: 'Funds Added',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem('leverage_transactions', JSON.stringify(updatedTx));

    setShowAddFunds(false);
    setAmount('');
  };

  const handleWithdraw = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0 || numAmount > balance) return;

    const newBalance = balance - numAmount;
    setBalance(newBalance);
    localStorage.setItem('leverage_balance', newBalance.toString());

    const newTx: Transaction = {
      id: `TXN-${Date.now()}`,
      type: 'debit',
      amount: numAmount,
      description: 'Withdrawal',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem('leverage_transactions', JSON.stringify(updatedTx));

    setShowWithdraw(false);
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F4F1EA]">Billing & Payments</h1>
        <p className="text-[#D8CCBC]/60 text-sm">Manage your wallet and transactions</p>
      </div>

      {/* Balance Card */}
      <div className="card bg-gradient-to-br from-[#0E3B36] to-[#081512] border-[#C49A6C]/20">
        <p className="text-[#D8CCBC]/60 text-sm mb-2">Available Balance</p>
        <p className="text-4xl font-bold text-[#F4F1EA] mb-4">${balance.toLocaleString()}.00</p>
        <div className="flex gap-3">
          <button onClick={() => setShowAddFunds(true)} className="flex-1 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm hover:bg-[#D4AA82]">
            Add Funds
          </button>
          <button onClick={() => setShowWithdraw(true)} className="flex-1 py-2.5 bg-[rgba(255,255,255,0.05)] text-[#F4F1EA] rounded-xl font-medium text-sm border border-[rgba(255,255,255,0.1)]">
            Withdraw
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {['overview', 'transactions', 'invoices'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap ${
              activeTab === tab ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <p className="text-[#D8CCBC]/60 text-sm mb-2">Total Spent</p>
            <p className="text-2xl font-bold text-[#F4F1EA]">${transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-[#D8CCBC]/60 text-sm mb-2">Total Received</p>
            <p className="text-2xl font-bold text-[#F4F1EA]">${transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-[#D8CCBC]/60 text-sm mb-2">Pending</p>
            <p className="text-2xl font-bold text-[#F4F1EA]">$0.00</p>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Transaction History</h2>
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {tx.type === 'credit' ? '↓' : '↑'}
                  </div>
                  <div>
                    <p className="text-[#F4F1EA] text-sm">{tx.description}</p>
                    <p className="text-[#D8CCBC]/50 text-xs">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Invoices</h2>
          <div className="space-y-3">
            {invoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div>
                  <p className="text-[#F4F1EA] text-sm font-medium">{inv.id}</p>
                  <p className="text-[#D8CCBC]/50 text-xs">{inv.description} • {inv.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#F4F1EA] font-semibold">${inv.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    inv.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' :
                    inv.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-[#F4F1EA] mb-4">Add Funds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full input"
                  placeholder="Enter amount"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAddFunds(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">Cancel</button>
                <button onClick={handleAddFunds} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold">Add Funds</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-[#F4F1EA] mb-4">Withdraw Funds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Amount (USD) - Max: ${balance.toLocaleString()}</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full input"
                  placeholder="Enter amount"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowWithdraw(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">Cancel</button>
                <button onClick={handleWithdraw} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold">Withdraw</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
