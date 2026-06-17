'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Settings, Building, Bell, Shield, Save } from 'lucide-react';

export default function DocumentsSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'LEVERAGE Trading Co.',
    companyAddress: '123 Trade Street, New York, NY 10001',
    companyPhone: '+1 (555) 123-4567',
    companyEmail: 'billing@leverage.one',
    taxId: '12-3456789',
    autoSave: true,
    emailNotifications: true,
    defaultFormat: 'pdf',
    signature: '',
  });

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Document Settings" subtitle="Configure your document preferences" backHref="/documents" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-6 h-6 text-[#154230]" />
            <h3 className="text-[#101111] font-bold">Company Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[#4A4A4A] text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-sm font-medium mb-1">Address</label>
              <textarea
                value={settings.companyAddress}
                onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#4A4A4A] text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  value={settings.companyPhone}
                  onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-sm font-medium mb-1">Tax ID</label>
                <input
                  type="text"
                  value={settings.taxId}
                  onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 text-[#154230]" />
            <h3 className="text-[#101111] font-bold">Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#101111] font-medium">Auto-save drafts</p>
                <p className="text-xs text-[#4A4A4A]">Save documents automatically</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.autoSave ? 'bg-[#154230]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-sm font-medium mb-1">Default Export Format</label>
              <select
                value={settings.defaultFormat}
                onChange={(e) => setSettings({ ...settings, defaultFormat: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              >
                <option value="pdf">PDF</option>
                <option value="docx">Word (DOCX)</option>
                <option value="xlsx">Excel (XLSX)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-[#154230]" />
            <h3 className="text-[#101111] font-bold">Notifications</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#101111] font-medium">Email notifications</p>
              <p className="text-xs text-[#4A4A4A]">Get updates on document status</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.emailNotifications ? 'bg-[#154230]' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <button className="w-full py-4 bg-[#154230] text-white rounded-2xl font-semibold flex items-center justify-center gap-2">
          <Save className="w-5 h-5" /> Save Settings
        </button>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
