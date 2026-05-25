'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'company', label: 'Company' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'billing', label: 'Billing' },
    { id: 'integrations', label: 'Integrations' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64 flex lg:flex-col gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
              <h2 className="text-lg font-semibold text-white">Profile Settings</h2>

              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                    Upload Photo
                  </button>
                  <p className="text-gray-400 text-sm mt-2">JPG, PNG up to 5MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@company.com"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role</label>
                  <input
                    type="text"
                    defaultValue="Trade Manager"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Timezone</label>
                  <select className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
                    <option>UTC-8 Pacific Time</option>
                    <option>UTC-5 Eastern Time</option>
                    <option>UTC+0 London</option>
                    <option>UTC+1 Central European</option>
                  </select>
                </div>
              </div>

              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
              <h2 className="text-lg font-semibold text-white">Company Settings</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Company Name</label>
                  <input
                    type="text"
                    defaultValue="Acme Trading Corp"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Business Type</label>
                  <select className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
                    <option>Exporter</option>
                    <option>Importer</option>
                    <option>Trading Company</option>
                    <option>Manufacturer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Industry</label>
                  <select className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
                    <option>Electronics</option>
                    <option>Manufacturing</option>
                    <option>Raw Materials</option>
                    <option>Consumer Goods</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Business Park Drive, Suite 400"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">City</label>
                  <input
                    type="text"
                    defaultValue="San Francisco"
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Country</label>
                  <select className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                  </select>
                </div>
              </div>

              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
              <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>

              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive updates via email' },
                  { label: 'Order Updates', desc: 'Get notified when order status changes' },
                  { label: 'Shipment Tracking', desc: 'Receive tracking updates for shipments' },
                  { label: 'Messages', desc: 'Get notified when you receive new messages' },
                  { label: 'Marketing', desc: 'Receive promotional emails and offers' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={i < 4} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
              <h2 className="text-lg font-semibold text-white">Security Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                  <h3 className="text-white font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white">2FA is currently disabled</p>
                      <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'billing' || activeTab === 'integrations') && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <p className="text-gray-400">{activeTab === 'billing' ? 'Billing settings' : 'Integration settings'} coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
