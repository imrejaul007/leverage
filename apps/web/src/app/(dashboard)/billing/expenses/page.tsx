'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Receipt, Plus, Filter, TrendingUp, Package, Truck, Users } from 'lucide-react';

const expenses = [
  { id: '1', category: 'Shipping', vendor: 'FedEx', amount: 1250, date: 'Jun 10, 2026', status: 'paid' },
  { id: '2', category: 'Warehouse', vendor: 'Storage Plus', amount: 3500, date: 'Jun 5, 2026', status: 'paid' },
  { id: '3', category: 'Customs', vendor: 'CBP Fees', amount: 890, date: 'Jun 8, 2026', status: 'pending' },
  { id: '4', category: 'Insurance', vendor: 'Marine Insurance Co', amount: 450, date: 'Jun 1, 2026', status: 'paid' },
  { id: '5', category: 'Freight', vendor: 'Air Cargo Express', amount: 2100, date: 'May 28, 2026', status: 'paid' },
];

const categoryIcons = {
  Shipping: Truck,
  Warehouse: Package,
  Customs: Receipt,
  Insurance: Users,
  Freight: TrendingUp,
};

const categoryColors = {
  Shipping: 'bg-blue-100 text-blue-700',
  Warehouse: 'bg-purple-100 text-purple-700',
  Customs: 'bg-orange-100 text-orange-700',
  Insurance: 'bg-green-100 text-green-700',
  Freight: 'bg-indigo-100 text-indigo-700',
};

const statusColors = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

export default function ExpensesPage() {
  const [expensesList] = useState(expenses);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const paidExpenses = expenses.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Expenses" subtitle="Track your business expenses" backHref="/billing" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-[#4A4A4A]">Total Expenses</p>
            <p className="text-2xl font-bold text-[#101111]">${totalExpenses.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-[#4A4A4A]">This Month</p>
            <p className="text-2xl font-bold text-[#154230]">${paidExpenses.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">Recent Expenses</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-[#E6E2DA] rounded-lg">
                <Filter className="w-4 h-4 text-[#4A4A4A]" />
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[#154230] text-white rounded-lg text-xs font-medium">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {expensesList.map((expense) => {
              const Icon = categoryIcons[expense.category as keyof typeof categoryIcons] || Receipt;
              const colorClass = categoryColors[expense.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700';
              return (
                <div key={expense.id} className="bg-[#E6E2DA] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#101111]">{expense.vendor}</h4>
                      <p className="text-xs text-[#4A4A4A]">{expense.category} • {expense.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#101111]">${expense.amount.toLocaleString()}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[expense.status as keyof typeof statusColors]}`}>
                        {expense.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav activeItem="billing" />
    </div>
  );
}
