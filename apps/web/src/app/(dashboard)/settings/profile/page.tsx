'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe,
  Camera,
  Check,
  Loader2,
  Calendar,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

export default function ProfileSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Trading Co',
    role: 'Export Manager',
    country: 'United States',
    city: 'New York',
    timezone: 'America/New_York',
    language: 'English',
    bio: 'International trade specialist with 10+ years of experience in global logistics.',
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
        title="Profile"
        subtitle="Your personal information"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Avatar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="flex flex-col items-center pt-4">
            <div className="relative">
              <div className="w-24 h-24 bg-[#154230] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#A6824A] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#8a6a3a] transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-[#101111] font-bold text-xl mt-4">{formData.firstName} {formData.lastName}</h2>
            <p className="text-[#4A4A4A] text-sm">{formData.role} at {formData.company}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 space-y-4 pt-4">
            {saved && (
              <div className="mb-4 p-3 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-xl flex items-center gap-2 text-[#16A34A] text-sm">
                <Check className="w-4 h-4" />
                Profile saved successfully!
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">
                <Building2 className="w-3 h-3 inline mr-1" />
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>

            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Job Title</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>China</option>
                  <option>India</option>
                </select>
              </div>
              <div>
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Bio</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] resize-none"
              />
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
                  Save Changes
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
