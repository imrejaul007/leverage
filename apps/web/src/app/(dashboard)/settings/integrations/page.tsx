'use client';

import { useState } from 'react';
import { Link2, Check, ExternalLink, Loader2, Plus, RefreshCw, Trash2, Settings, Zap, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'erp' | 'accounting' | 'shipping' | 'communication' | 'other';
  connected: boolean;
  lastSync?: string;
  features: string[];
}

const integrations: Integration[] = [
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Sync invoices, expenses, and financial data',
    icon: '📊',
    category: 'accounting',
    connected: false,
    features: ['Auto-sync invoices', 'Expense tracking', 'Financial reports'],
  },
  {
    id: 'xero',
    name: 'Xero',
    description: 'Cloud accounting for growing businesses',
    icon: '📐',
    category: 'accounting',
    connected: false,
    features: ['Invoice sync', 'Bank reconciliation', 'Multi-currency'],
  },
  {
    id: 'sap',
    name: 'SAP Business One',
    description: 'Enterprise resource planning solution',
    icon: '🏢',
    category: 'erp',
    connected: false,
    features: ['Full ERP integration', 'Inventory sync', 'Order management'],
  },
  {
    id: 'netsuite',
    name: 'NetSuite',
    description: 'Cloud ERP for growing companies',
    icon: '☁️',
    category: 'erp',
    connected: false,
    features: ['Real-time sync', 'Custom workflows', 'Global support'],
  },
  {
    id: 'fedex',
    name: 'FedEx',
    description: 'Live shipping rates and tracking',
    icon: '✈️',
    category: 'shipping',
    connected: true,
    lastSync: '2 min ago',
    features: ['Live rates', 'Auto-tracking', 'Label printing'],
  },
  {
    id: 'dhl',
    name: 'DHL Express',
    description: 'International shipping integration',
    icon: '📦',
    category: 'shipping',
    connected: false,
    features: ['International rates', 'Customs docs', 'Door-to-door'],
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get trade alerts in your channels',
    icon: '💬',
    category: 'communication',
    connected: false,
    features: ['Order notifications', 'Shipment alerts', 'Team collaboration'],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect with 5000+ apps',
    icon: '⚡',
    category: 'other',
    connected: false,
    features: ['Automated workflows', 'Custom triggers', 'No-code integration'],
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'accounting', name: 'Accounting' },
  { id: 'erp', name: 'ERP' },
  { id: 'shipping', name: 'Shipping' },
  { id: 'communication', name: 'Communication' },
  { id: 'other', name: 'Other' },
];

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [connecting, setConnecting] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [connections, setConnections] = useState<Record<string, boolean>>(
    integrations.reduce((acc, int) => ({ ...acc, [int.id]: int.connected }), {})
  );
  const [lastSync, setLastSync] = useState<Record<string, string>>(
    integrations.reduce((acc, int) => ({ ...acc, [int.id]: int.lastSync }), {})
  );

  const filteredIntegrations = selectedCategory === 'all'
    ? integrations
    : integrations.filter(i => i.category === selectedCategory);

  const handleConnect = async (id: string) => {
    setConnecting(id);

    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));

    setConnections(prev => ({ ...prev, [id]: true }));
    setLastSync(prev => ({ ...prev, [id]: 'Just now' }));
    setConnecting(null);
  };

  const handleDisconnect = (id: string) => {
    setConnections(prev => ({ ...prev, [id]: false }));
    setLastSync(prev => {
      const newSync = { ...prev };
      delete newSync[id];
      return newSync;
    });
  };

  const handleSync = async () => {
    setSyncStatus('syncing');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncStatus('success');
    const now = new Date().toLocaleTimeString();
    setLastSync(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key] = 'Just now';
      });
      return updated;
    });
    setTimeout(() => setSyncStatus('idle'), 2000);
  };

  const connectedCount = Object.values(connections).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Integrations"
        subtitle="Connect your business tools"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-[#101111] font-bold">Connected Apps</h2>
                <p className="text-[#4A4A4A] text-xs">{connectedCount} of {integrations.length} integrations active</p>
              </div>
              {connectedCount > 0 && (
                <button
                  onClick={handleSync}
                  disabled={syncStatus === 'syncing'}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    syncStatus === 'success'
                      ? 'bg-[#16A34A]/10 text-[#16A34A]'
                      : 'bg-[#154230]/10 text-[#154230]'
                  }`}
                >
                  {syncStatus === 'syncing' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Syncing...
                    </>
                  ) : syncStatus === 'success' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Synced!
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Sync All
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Connected Apps */}
            {connectedCount > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {integrations.filter(i => connections[i.id]).map(int => (
                  <div
                    key={int.id}
                    className="flex items-center gap-2 px-3 py-2 bg-[#154230]/10 rounded-lg whitespace-nowrap"
                  >
                    <span className="text-lg">{int.icon}</span>
                    <span className="text-[#101111] text-sm font-medium">{int.name}</span>
                    <span className="text-[#4A4A4A] text-xs">
                      {lastSync[int.id] && `• ${lastSync[int.id]}`}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {connectedCount === 0 && (
              <p className="text-[#4A4A4A] text-sm">No integrations connected yet</p>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A] hover:bg-[#154230]/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Integrations List */}
        <div className="space-y-3">
          {filteredIntegrations.map(integration => (
            <div
              key={integration.id}
              className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#E6E2DA] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {integration.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[#101111] font-bold">{integration.name}</h3>
                      {connections[integration.id] && (
                        <span className="px-2 py-0.5 bg-[#16A34A]/10 text-[#16A34A] text-xs font-semibold rounded">
                          Connected
                        </span>
                      )}
                    </div>
                    <p className="text-[#4A4A4A] text-xs mt-0.5">{integration.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {integration.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#E6E2DA] text-[#4A4A4A] text-[10px] rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {connections[integration.id] ? (
                      <>
                        <button
                          onClick={() => {/* Open settings */}}
                          className="p-2 bg-[#E6E2DA] rounded-lg hover:bg-[#154230]/10"
                        >
                          <Settings className="w-4 h-4 text-[#4A4A4A]" />
                        </button>
                        <button
                          onClick={() => handleDisconnect(integration.id)}
                          className="p-2 bg-[#DC2626]/10 rounded-lg hover:bg-[#DC2626]/20"
                        >
                          <Trash2 className="w-4 h-4 text-[#DC2626]" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleConnect(integration.id)}
                        disabled={connecting === integration.id}
                        className="px-4 py-2 bg-[#154230] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#1a5a3a] disabled:opacity-50"
                      >
                        {connecting === integration.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Connect
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Last Sync Info */}
                {connections[integration.id] && lastSync[integration.id] && (
                  <div className="mt-3 pt-3 border-t border-black/5 flex items-center gap-2 text-xs text-[#4A4A4A]">
                    <RefreshCw className="w-3 h-3" />
                    Last synced: {lastSync[integration.id]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Premium Features */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Enterprise Integrations</p>
              <p className="text-sm text-white/70">Custom ERP connections, dedicated API access, and priority support</p>
            </div>
            <button className="px-4 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20">
              Learn More
            </button>
          </div>
        </div>

        {/* API Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
              <Link2 className="w-6 h-6 text-[#154230]" />
            </div>
            <div>
              <h2 className="text-[#101111] font-bold">API Access</h2>
              <p className="text-[#4A4A4A] text-xs">Build custom integrations with our API</p>
            </div>
          </div>

          <div className="bg-[#E6E2DA] rounded-xl p-4 font-mono text-sm mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#4A4A4A]">API Key</span>
              <button className="text-[#154230] text-xs font-medium">Regenerate</button>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-[#101111] truncate">
                lvg_live_••••••••••••••••••••••••
              </code>
              <button className="text-[#154230] hover:underline text-xs">Copy</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#E6E2DA] rounded-xl p-3">
              <p className="text-[#101111] font-bold text-lg">2,450</p>
              <p className="text-[#4A4A4A] text-xs">Requests Today</p>
            </div>
            <div className="bg-[#E6E2DA] rounded-xl p-3">
              <p className="text-[#101111] font-bold text-lg">99.9%</p>
              <p className="text-[#4A4A4A] text-xs">Uptime</p>
            </div>
            <div className="bg-[#E6E2DA] rounded-xl p-3">
              <p className="text-[#101111] font-bold text-lg">1.2s</p>
              <p className="text-[#4A4A4A] text-xs">Avg Response</p>
            </div>
          </div>
        </div>

        {/* Help Card */}
        <div className="bg-[#154230]/5 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#154230] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#101111] font-medium text-sm">Need help with integrations?</p>
            <p className="text-[#4A4A4A] text-xs mt-1">
              Check our integration guides or contact support for custom setup assistance.
            </p>
          </div>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
