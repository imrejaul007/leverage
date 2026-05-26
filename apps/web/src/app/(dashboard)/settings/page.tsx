'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const stored = localStorage.getItem('leverage_profile');
    if (stored) setProfile(JSON.parse(stored));
    const storedNotif = localStorage.getItem('leverage_notifications');
    if (storedNotif) setNotifications(JSON.parse(storedNotif));
  }, []);

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
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'company', label: 'Company', icon: '🏢' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'security', label: 'Security', icon: '🔒' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#F4F1EA]">Settings</h1>
        <p className="text-[#D8CCBC]/60 text-sm">Manage your account settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Profile Information</h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C49A6C] to-[#D4AA82] flex items-center justify-center text-[#081512] text-2xl font-bold">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <button className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg text-sm font-medium">
              Change Photo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">First Name</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Role</label>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="input w-full"
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            className="mt-6 px-6 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm"
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* Company Tab */}
      {activeTab === 'company' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Company Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[#D8CCBC] text-sm mb-2">Company Name</label>
              <input type="text" value={profile.company} className="input w-full" />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Business Type</label>
              <select className="input w-full">
                <option>Trading Company</option>
                <option>Manufacturer</option>
                <option>Exporter</option>
                <option>Importer</option>
                <option>Freight Forwarder</option>
              </select>
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Country</label>
              <select value={profile.country} className="input w-full">
                <option>United States</option>
                <option>China</option>
                <option>India</option>
                <option>Germany</option>
                <option>UAE</option>
                <option>Singapore</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#D8CCBC] text-sm mb-2">Address</label>
              <textarea className="input w-full resize-none" rows={3} placeholder="Enter company address..." />
            </div>
          </div>

          <button className="mt-6 px-6 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm">
            Update Company
          </button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Notification Preferences</h2>

          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
              { key: 'rfqAlerts', label: 'RFQ Alerts', desc: 'New quotes and RFQ updates' },
              { key: 'orderUpdates', label: 'Order Updates', desc: 'Shipment and delivery updates' },
              { key: 'marketing', label: 'Marketing', desc: 'Promotions and announcements' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div>
                  <p className="text-[#F4F1EA] font-medium">{item.label}</p>
                  <p className="text-[#D8CCBC]/50 text-sm">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] });
                    saveNotifications();
                  }}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications] ? 'bg-[#C49A6C]' : 'bg-[rgba(255,255,255,0.1)]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Change Password</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Current Password</label>
                <input type="password" className="input w-full" placeholder="Enter current password" />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">New Password</label>
                <input type="password" className="input w-full" placeholder="Enter new password" />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Confirm New Password</label>
                <input type="password" className="input w-full" placeholder="Confirm new password" />
              </div>
            </div>

            <button className="mt-6 px-6 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm">
              Update Password
            </button>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Two-Factor Authentication</h2>
            <p className="text-[#D8CCBC]/50 text-sm mb-4">Add an extra layer of security to your account</p>
            <button className="px-6 py-2.5 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium text-sm border border-[rgba(255,255,255,0.1)]">
              Enable 2FA
            </button>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Active Sessions</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <div>
                    <p className="text-[#F4F1EA] text-sm">MacBook Pro - Chrome</p>
                    <p className="text-[#D8CCBC]/50 text-xs">New York, USA • Current session</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-sm">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-[#F4F1EA] text-sm">iPhone 15 - Safari</p>
                    <p className="text-[#D8CCBC]/50 text-xs">2 hours ago</p>
                  </div>
                </div>
                <button className="text-red-400 text-sm hover:underline">Revoke</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
