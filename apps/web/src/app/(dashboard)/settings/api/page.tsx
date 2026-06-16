'use client';

import { useState } from 'react';
import {
  Key,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Loader2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const apiKeys = [
  { id: '1', name: 'Production Key', key: 'lvg_live_xxxxxxxxxxxxxxxxxxxx', created: 'Jan 15, 2024', lastUsed: '2 hours ago', permissions: ['read', 'write'] },
  { id: '2', name: 'Development Key', key: 'lvg_test_xxxxxxxxxxxxxxxx', created: 'Jan 10, 2024', lastUsed: '1 day ago', permissions: ['read'] },
];

export default function ApiSettingsPage() {
  const [showKey, setShowKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const maskKey = (key: string) => {
    return key.slice(0, 8) + '•'.repeat(key.length - 12) + key.slice(-4);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="API Keys"
        subtitle="Manage your API access"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* API Overview */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Key className="w-6 h-6" />
            <span className="font-bold">API Access</span>
          </div>
          <p className="text-white/70 text-sm mb-4">
            Use API keys to authenticate requests to the LEVERAGE API.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-bold">{apiKeys.length}</p>
              <p className="text-xs text-white/70">Active Keys</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-bold">2,450</p>
              <p className="text-xs text-white/70">Requests Today</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-bold">99.9%</p>
              <p className="text-xs text-white/70">Uptime</p>
            </div>
          </div>
        </div>

        {/* Create New Key */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Create New Key</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Key Name</label>
              <input
                type="text"
                placeholder="e.g., Production API Key"
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Permissions</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 p-3 bg-[#E6E2DA] rounded-xl cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#154230]" />
                  <span className="text-[#101111] text-sm">Read</span>
                </label>
                <label className="flex items-center gap-2 p-3 bg-[#E6E2DA] rounded-xl cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-[#154230]" />
                  <span className="text-[#101111] text-sm">Write</span>
                </label>
              </div>
            </div>
            <button className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Generate Key
            </button>
          </div>
        </div>

        {/* Existing Keys */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Active API Keys</h3>
          <div className="space-y-3">
            {apiKeys.map(apiKey => (
              <div key={apiKey.id} className="p-4 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[#101111] font-semibold">{apiKey.name}</h4>
                    {apiKey.permissions.includes('write') && (
                      <span className="px-2 py-0.5 bg-[#A6824A]/20 text-[#A6824A] text-xs font-semibold rounded">Full Access</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg">
                      <RefreshCw className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg">
                      <Trash2 className="w-4 h-4 text-[#DC2626]" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg mb-2">
                  <code className="flex-1 text-[#101111] text-sm font-mono truncate">
                    {showKey === apiKey.id ? apiKey.key : maskKey(apiKey.key)}
                  </code>
                  <button
                    onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                    className="p-1 hover:bg-[#E6E2DA] rounded"
                  >
                    {showKey === apiKey.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyKey(apiKey.key, apiKey.id)}
                    className="p-1 hover:bg-[#E6E2DA] rounded"
                  >
                    {copied === apiKey.id ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#4A4A4A]">
                  <span>Created {apiKey.created}</span>
                  <span>Last used {apiKey.lastUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Documentation</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors">
              <ExternalLink className="w-5 h-5 text-[#154230]" />
              <span className="text-[#101111] flex-1">API Documentation</span>
              <span className="text-[#4A4A4A] text-xs">View →</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors">
              <ExternalLink className="w-5 h-5 text-[#154230]" />
              <span className="text-[#101111] flex-1">Rate Limits</span>
              <span className="text-[#4A4A4A] text-xs">View →</span>
            </a>
            <a href="#" className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors">
              <ExternalLink className="w-5 h-5 text-[#154230]" />
              <span className="text-[#101111] flex-1">SDK Examples</span>
              <span className="text-[#4A4A4A] text-xs">View →</span>
            </a>
          </div>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
