'use client';

import { useState, useEffect } from 'react';
import { User, Building2, Bell, Shield, Save, CheckCircle, Camera } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 555 123 4567',
    company: 'Acme Trading Co.',
    role: 'Trade Manager',
    country: 'United States',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    rfqAlerts: true,
    orderUpdates: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  const saveProfile = () => {
    localStorage.setItem('leverage_profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveNotifications = () => {
    localStorage.setItem('leverage_notifications', JSON.stringify(notifications));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Settings</h1>
        <p className="text-[#4A4A4A] text-sm">Manage your account settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A] border border-black/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white border border-black/5 rounded-xl p-5">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-xl bg-[#154230] flex items-center justify-center text-white text-2xl font-bold">
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </div>
            <div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#E6E2DA] text-[#101111] rounded-lg text-sm font-medium hover:bg-[#D4CCBE] transition-colors">
                <Camera className="w-4 h-4" />
                Change Photo
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#101111] text-xs font-medium mb-1.5">First Name</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
              />
            </div>
            <div>
              <label className="block text-[#101111] text-xs font-medium mb-1.5">Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
              />
            </div>
            <div>
              <label className="block text-[#101111] text-xs font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
              />
            </div>
            <div>
              <label className="block text-[#101111] text-xs font-medium mb-1.5">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={saveProfile}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg text-sm hover:bg-[#1d5240] transition-colors"
            >
              {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'company' && (
        <div className="bg-white border border-black/5 rounded-xl p-5">
          <h2 className="text-[#101111] font-semibold text-sm mb-4">Company Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#101111] text-xs font-medium mb-1.5">Company Name</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
              />
            </div>
            <div>
              <label className="block text-[#101111] text-xs font-medium mb-1.5">Role</label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[#101111] text-xs font-medium mb-1.5">Country</label>
              <select
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>Singapore</option>
                <option>UAE</option>
                <option>India</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={saveProfile}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg text-sm hover:bg-[#1d5240] transition-colors"
            >
              {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white border border-black/5 rounded-xl p-5">
          <h2 className="text-[#101111] font-semibold text-sm mb-4">Notification Preferences</h2>
          <div className="space-y-3">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Get real-time alerts' },
              { key: 'rfqAlerts', label: 'RFQ Alerts', desc: 'New quotes and responses' },
              { key: 'orderUpdates', label: 'Order Updates', desc: 'Shipment and delivery status' },
              { key: 'marketing', label: 'Marketing', desc: 'Tips and promotional content' },
            ].map(item => (
              <label key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#E6E2DA] cursor-pointer transition-colors">
                <div>
                  <p className="text-[#101111] text-sm font-medium">{item.label}</p>
                  <p className="text-[#4A4A4A] text-xs">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                  className="w-5 h-5 rounded accent-[#154230]"
                />
              </label>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={saveNotifications}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg text-sm hover:bg-[#1d5240] transition-colors"
            >
              {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="bg-white border border-black/5 rounded-xl p-5">
            <h2 className="text-[#101111] font-semibold text-sm mb-4">Change Password</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-[#101111] text-xs font-medium mb-1.5">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
              </div>
              <div>
                <label className="block text-[#101111] text-xs font-medium mb-1.5">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
              </div>
              <div>
                <label className="block text-[#101111] text-xs font-medium mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
              </div>
            </div>
            <button className="mt-4 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg text-sm hover:bg-[#1d5240] transition-colors">
              Update Password
            </button>
          </div>

          <div className="bg-white border border-black/5 rounded-xl p-5">
            <h2 className="text-[#101111] font-semibold text-sm mb-2">Two-Factor Authentication</h2>
            <p className="text-[#4A4A4A] text-xs mb-4">Add an extra layer of security to your account</p>
            <button className="px-4 py-2.5 bg-[#E6E2DA] text-[#101111] font-semibold rounded-lg text-sm hover:bg-[#D4CCBE] transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
