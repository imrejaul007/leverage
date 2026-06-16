'use client';

import { useState } from 'react';
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Check,
  Loader2,
  FileText,
  Truck,
  DollarSign,
  AlertCircle,
  Settings,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ElementType;
  enabled: boolean;
}

interface NotificationType {
  id: string;
  title: string;
  description: string;
  channels: string[];
}

export default function NotificationsSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [channels, setChannels] = useState<NotificationChannel[]>([
    { id: 'email', name: 'Email', icon: Mail, enabled: true },
    { id: 'push', name: 'Push', icon: Smartphone, enabled: true },
    { id: 'sms', name: 'SMS', icon: MessageSquare, enabled: false },
    { id: 'inapp', name: 'In-App', icon: Bell, enabled: true },
  ]);

  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    orders: true,
    shipments: true,
    documents: true,
    payments: true,
    rfqs: true,
    messages: true,
    marketing: false,
    updates: true,
  });

  const toggleChannel = (id: string) => {
    setChannels(channels.map(c =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ));
  };

  const toggleNotification = (id: string) => {
    setNotifications(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const notificationTypes: NotificationType[] = [
    { id: 'orders', title: 'Orders', description: 'Order confirmations and updates', channels: ['email', 'push', 'inapp'] },
    { id: 'shipments', title: 'Shipments', description: 'Tracking updates and delivery alerts', channels: ['email', 'push', 'sms', 'inapp'] },
    { id: 'documents', title: 'Documents', description: 'Document ready and expiration alerts', channels: ['email', 'inapp'] },
    { id: 'payments', title: 'Payments', description: 'Invoice and payment notifications', channels: ['email', 'push', 'sms', 'inapp'] },
    { id: 'rfqs', title: 'RFQs', description: 'New quote requests and responses', channels: ['email', 'push', 'inapp'] },
    { id: 'messages', title: 'Messages', description: 'New messages from buyers/suppliers', channels: ['email', 'push', 'sms', 'inapp'] },
    { id: 'marketing', title: 'Marketing', description: 'Promotions and product updates', channels: ['email'] },
    { id: 'updates', title: 'Product Updates', description: 'New features and improvements', channels: ['email', 'inapp'] },
  ];

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Notifications"
        subtitle="How you receive alerts"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Save Status */}
        {saved && (
          <div className="p-3 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-xl flex items-center gap-2 text-[#16A34A] text-sm">
            <Check className="w-4 h-4" />
            Notification preferences saved!
          </div>
        )}

        {/* Notification Channels */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10">
            <h3 className="text-[#101111] font-bold mb-4 pt-2">Notification Channels</h3>
            <div className="grid grid-cols-2 gap-3">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => toggleChannel(channel.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                    channel.enabled
                      ? 'bg-[#154230]/10 border-2 border-[#154230]'
                      : 'bg-[#E6E2DA] border-2 border-transparent'
                  }`}
                >
                  <channel.icon className={`w-6 h-6 ${channel.enabled ? 'text-[#154230]' : 'text-[#4A4A4A]'}`} />
                  <span className={`font-medium ${channel.enabled ? 'text-[#101111]' : 'text-[#4A4A4A]'}`}>
                    {channel.name}
                  </span>
                  <div className={`ml-auto w-5 h-5 rounded-full flex items-center justify-center ${
                    channel.enabled ? 'bg-[#154230]' : 'bg-[#4A4A4A]/30'
                  }`}>
                    {channel.enabled && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 space-y-3 pt-4">
            <h3 className="text-[#101111] font-bold mb-2">Notification Types</h3>
            {notificationTypes.map(type => (
              <div
                key={type.id}
                className="flex items-center gap-3 p-4 bg-[#E6E2DA] rounded-xl"
              >
                <div className="flex-1">
                  <h4 className="text-[#101111] font-medium">{type.title}</h4>
                  <p className="text-[#4A4A4A] text-xs">{type.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(type.id)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    notifications[type.id] ? 'bg-[#154230]' : 'bg-[#4A4A4A]/30'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      notifications[type.id] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[#101111] font-bold">Quiet Hours</h3>
                <p className="text-[#4A4A4A] text-sm">Pause non-urgent notifications</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#4A4A4A] text-sm">10:00 PM - 8:00 AM</span>
                <button className="p-2 bg-[#E6E2DA] rounded-lg hover:bg-[#154230]/10">
                  <Settings className="w-4 h-4 text-[#4A4A4A]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
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
              Save Preferences
            </>
          )}
        </button>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
