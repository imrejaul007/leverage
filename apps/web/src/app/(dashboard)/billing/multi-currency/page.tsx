'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Globe, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1, enabled: true },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, enabled: true },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, enabled: true },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24, enabled: true },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', rate: 3.67, enabled: false },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.12, enabled: false },
];

const transactions = [
  { id: '1', currency: 'USD', amount: 15000, type: 'incoming', date: 'Jun 15, 2026' },
  { id: '2', currency: 'EUR', amount: 8500, type: 'outgoing', date: 'Jun 14, 2026' },
  { id: '3', currency: 'CNY', amount: 45000, type: 'incoming', date: 'Jun 12, 2026' },
];

export default function MultiCurrencyPage() {
  const [currencyList, setCurrencyList] = useState(currencies);

  const toggleCurrency = (code: string) => {
    setCurrencyList(currencyList.map(c =>
      c.code === code ? { ...c, enabled: !c.enabled } : c
    ));
  };

  const getSymbol = (code: string) => currencies.find(c => c.code === code)?.symbol || '$';

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Multi-Currency" subtitle="Manage multiple currencies" backHref="/billing" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-[#154230]" />
            <div>
              <h3 className="text-[#101111] font-bold">Enabled Currencies</h3>
              <p className="text-sm text-[#4A4A4A]">Toggle currencies for invoicing</p>
            </div>
          </div>

          <div className="space-y-2">
            {currencyList.map((currency) => (
              <div key={currency.code} className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#154230]">{currency.symbol}</span>
                  <div>
                    <p className="font-medium text-[#101111]">{currency.code}</p>
                    <p className="text-xs text-[#4A4A4A]">{currency.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleCurrency(currency.code)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    currency.enabled ? 'bg-[#154230]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    currency.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">Exchange Rates</h3>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[#E6E2DA] rounded-lg text-xs font-medium">
              <RefreshCw className="w-3 h-3" /> Update
            </button>
          </div>

          <div className="space-y-2">
            {currencyList.filter(c => c.enabled).slice(1).map((currency) => (
              <div key={currency.code} className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                <span className="text-[#101111]">1 USD = {currency.rate} {currency.code}</span>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  Updated today
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-center gap-2">
                  {tx.type === 'incoming' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm text-[#4A4A4A]">{tx.date}</span>
                </div>
                <span className={`font-bold ${tx.type === 'incoming' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'incoming' ? '+' : '-'}{getSymbol(tx.currency)}{tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="billing" />
    </div>
  );
}
