'use client';

import { useState } from 'react';
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  FileText,
  Check,
  Loader2,
  Upload,
  Users,
  Calendar,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

export default function CompanySettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Acme Trading Co',
    registrationNumber: 'REG-2024-12345',
    type: 'Private Limited',
    industry: 'Import/Export',
    website: 'https://acmetrading.com',
    email: 'contact@acmetrading.com',
    phone: '+1 (555) 987-6543',
    address: '123 Commerce Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    taxId: 'US12-3456789',
    employees: '50-100',
    annualRevenue: '$10M-$50M',
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Company"
        subtitle="Business information"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Verification Status */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 flex items-center gap-4 pt-2">
            <div className="w-16 h-16 bg-[#154230]/10 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[#154230]" />
            </div>
            <div className="flex-1">
              <h2 className="text-[#101111] font-bold text-lg">{formData.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-[#16A34A]/10 text-[#16A34A] text-xs font-semibold rounded flex items-center gap-1">
                  <Check className="w-3 h-3" /> Verified
                </span>
                <span className="px-2 py-0.5 bg-[#A6824A]/10 text-[#A6824A] text-xs font-semibold rounded">
                  {formData.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-3">Verified Documents</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
              <FileText className="w-5 h-5 text-[#154230]" />
              <div className="flex-1">
                <p className="text-[#101111] text-sm font-medium">Business Registration</p>
                <p className="text-[#4A4A4A] text-xs">Uploaded Jan 15, 2024</p>
              </div>
              <span className="px-2 py-0.5 bg-[#16A34A]/10 text-[#16A34A] text-xs font-semibold rounded">Approved</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
              <FileText className="w-5 h-5 text-[#154230]" />
              <div className="flex-1">
                <p className="text-[#101111] text-sm font-medium">Tax Certificate</p>
                <p className="text-[#4A4A4A] text-xs">Uploaded Jan 15, 2024</p>
              </div>
              <span className="px-2 py-0.5 bg-[#16A34A]/10 text-[#16A34A] text-xs font-semibold rounded">Approved</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 space-y-4 pt-4">
            {saved && (
              <div className="mb-4 p-3 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-xl flex items-center gap-2 text-[#16A34A] text-sm">
                <Check className="w-4 h-4" />
                Company info saved!
              </div>
            )}

            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Registration Number</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Company Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                >
                  <option>Private Limited</option>
                  <option>Public Limited</option>
                  <option>Partnership</option>
                  <option>Sole Proprietorship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                >
                  <option>Import/Export</option>
                  <option>Manufacturing</option>
                  <option>Logistics</option>
                  <option>Wholesale</option>
                </select>
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Tax ID</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">
                <Globe className="w-3 h-3 inline mr-1" />
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">
                  <Mail className="w-3 h-3 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">
                  <Phone className="w-3 h-3 inline mr-1" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">
                <MapPin className="w-3 h-3 inline mr-1" />
                Street Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">ZIP</label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save Company Info
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
