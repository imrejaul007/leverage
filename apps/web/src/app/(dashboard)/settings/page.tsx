'use client';

import { useState, useEffect } from 'react';
import { User, Building2, Bell, Shield, Save, CheckCircle, Camera, Settings as SettingsIcon, Key, Lock } from 'lucide-react';

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
    <div className="space-y-4 relative overflow-hidden">
      {/* Background decorations - Settings/Gear themed */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Globe */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] animate-[spin_90s_linear_infinite]">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.05]">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#154230" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" transform="rotate(60 200 200)" />
          </svg>
        </div>

        {/* Gear/Settings Pattern */}
        <svg className="absolute top-0 left-0 w-[300px] h-[300px] opacity-[0.04]" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="60" fill="none" stroke="#A6824A" strokeWidth="2" />
          <circle cx="150" cy="150" r="40" fill="none" stroke="#A6824A" strokeWidth="1" />
          <circle cx="150" cy="150" r="20" fill="#A6824A" />
          {/* Gear teeth */}
          <line x1="150" y1="85" x2="150" y2="60" stroke="#A6824A" strokeWidth="4" />
          <line x1="150" y1="215" x2="150" y2="240" stroke="#A6824A" strokeWidth="4" />
          <line x1="85" y1="150" x2="60" y2="150" stroke="#A6824A" strokeWidth="4" />
          <line x1="215" y1="150" x2="240" y2="150" stroke="#A6824A" strokeWidth="4" />
          <line x1="104" y1="104" x2="86" y2="86" stroke="#A6824A" strokeWidth="4" />
          <line x1="196" y1="196" x2="214" y2="214" stroke="#A6824A" strokeWidth="4" />
          <line x1="196" y1="104" x2="214" y2="86" stroke="#A6824A" strokeWidth="4" />
          <line x1="104" y1="196" x2="86" y2="214" stroke="#A6824A" strokeWidth="4" />
        </svg>

        {/* User/Profile Pattern */}
        <svg className="absolute bottom-10 right-10 w-[200px] h-[150px] opacity-[0.04]" viewBox="0 0 200 150">
          <circle cx="100" cy="50" r="30" fill="none" stroke="#A6824A" strokeWidth="2" />
          <ellipse cx="100" cy="120" rx="50" ry="30" fill="none" stroke="#A6824A" strokeWidth="2" />
        </svg>

        {/* Shield Pattern */}
        <svg className="absolute bottom-0 left-10 w-[150px] h-[180px] opacity-[0.04]" viewBox="0 0 150 180">
          <path d="M75,10 L130,30 L130,90 Q130,150 75,175 Q20,150 20,90 L20,30 Z" fill="none" stroke="#154230" strokeWidth="1.5" />
          <path d="M75,30 L110,45 L110,85 Q110,125 75,145 Q40,125 40,85 L40,45 Z" fill="none" stroke="#154230" strokeWidth="1" />
        </svg>

        {/* Floating Settings Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${5 + (i * 6)}%`,
              top: `${15 + (i % 6) * 13}%`,
              width: i % 2 === 0 ? '3px' : '4px',
              height: i % 2 === 0 ? '3px' : '4px',
              backgroundColor: i % 3 === 0 ? '#A6824A' : i % 3 === 1 ? '#154230' : '#5D1E21',
              animation: `pulse ${2 + (i % 2)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.12 + (i % 4) * 0.04,
            }}
          />
        ))}

        {/* Lock/Security Pattern */}
        <svg className="absolute top-1/3 right-20 w-[100px] h-[120px] opacity-[0.04]" viewBox="0 0 100 120">
          <rect x="15" y="45" width="70" height="60" fill="none" stroke="#A6824A" strokeWidth="2" rx="5" />
          <path d="M30,45 L30,30 Q30,10 50,10 Q70,10 70,30 L70,45" fill="none" stroke="#A6824A" strokeWidth="2" />
          <circle cx="50" cy="75" r="8" fill="#A6824A" />
        </svg>

        {/* Wave Pattern */}
        <svg className="absolute bottom-0 left-0 right-0 h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path d="M0,32 Q180,10 360,32 T720,32 T1080,32 T1440,32" fill="none" stroke="#154230" strokeWidth="0.5" opacity="0.2" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3">
        {/* Settings icon */}
        <div className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Account Settings</h1>
          <p className="text-[#4A4A4A] text-sm">Manage your profile and preferences</p>
        </div>
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
