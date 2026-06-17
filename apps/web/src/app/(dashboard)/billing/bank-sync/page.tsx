'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Building2, Link2, RefreshCw, Check, ExternalLink } from 'lucide-react';

const connectedAccounts = [
  { id: '1', bank: 'Chase Bank', account: '****4521', lastSync: '2 hours ago', status: 'connected' },
  { id: '2', bank: 'Bank of America', account: '****8832', lastSync: '1 day ago', status: 'connected' },
];

export default function BankSyncPage() {
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Bank Sync" subtitle="Connect your bank accounts" backHref="/billing" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Secure Bank Connection</p>
              <p className="text-sm text-white/70">Bank-level encryption for your data</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {connectedAccounts.map((account) => (
              <div key={account.id} className="bg-[#E6E2DA] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#154230] rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#101111]">{account.bank}</p>
                      <p className="text-xs text-[#4A4A4A]">{account.account}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <Check className="w-4 h-4" /> Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#4A4A4A]">Last sync: {account.lastSync}</span>
                  <button className="text-xs text-[#154230] font-medium">Disconnect</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-3 text-[#154230] font-semibold">
          <Link2 className="w-5 h-5" /> Connect New Bank
        </button>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#101111] font-bold">Sync All Accounts</h3>
              <p className="text-sm text-[#4A4A4A]">Update all transaction data</p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white rounded-lg font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-3">How It Works</h3>
          <div className="space-y-3">
            {[
              { step: '1', title: 'Connect securely', desc: 'Link your bank with bank-level encryption' },
              { step: '2', title: 'Automatic sync', desc: 'Transactions sync every 4 hours' },
              { step: '3', title: 'Categorize', desc: 'AI automatically categorizes expenses' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#154230] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-[#101111]">{item.title}</p>
                  <p className="text-xs text-[#4A4A4A]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="billing" />
    </div>
  );
}
