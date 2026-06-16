'use client';

import { useState } from 'react';
import {
  Smartphone,
  Globe,
  Check,
  Trash2,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Clock,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
  trusted: boolean;
}

export default function SessionsSettingsPage() {
  const [sessions, setSessions] = useState<Session[]>([
    { id: '1', device: 'MacBook Pro', browser: 'Chrome 122', location: 'San Francisco, CA', ip: '192.168.1.1', lastActive: 'Now', current: true, trusted: true },
    { id: '2', device: 'iPhone 15 Pro', browser: 'Safari Mobile', location: 'San Francisco, CA', ip: '192.168.1.2', lastActive: '2 hours ago', current: false, trusted: true },
    { id: '3', device: 'Windows PC', browser: 'Firefox 123', location: 'New York, NY', ip: '10.0.0.1', lastActive: '3 days ago', current: false, trusted: false },
    { id: '4', device: 'iPad Pro', browser: 'Safari', location: 'Los Angeles, CA', ip: '172.16.0.1', lastActive: '1 week ago', current: false, trusted: false },
  ]);

  const terminateSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const terminateAll = () => {
    setSessions(sessions.filter(s => s.current));
  };

  const trustSession = (id: string) => {
    setSessions(sessions.map(s =>
      s.id === id ? { ...s, trusted: true } : s
    ));
  };

  const currentSession = sessions.find(s => s.current);
  const otherSessions = sessions.filter(s => !s.current);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Sessions"
        subtitle="Manage active sessions"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Security Notice */}
        <div className="bg-[#154230]/5 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#154230] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#101111] font-medium text-sm">Keep your account secure</p>
            <p className="text-[#4A4A4A] text-xs mt-1">
              Regularly review your active sessions and remove any that you don't recognize.
            </p>
          </div>
        </div>

        {/* Current Session */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-2">
            <h3 className="text-[#101111] font-bold mb-4">Current Session</h3>
            {currentSession && (
              <div className="p-4 bg-[#154230]/5 rounded-xl border border-[#154230]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-[#154230]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[#101111] font-semibold">{currentSession.device}</h4>
                      <span className="px-2 py-0.5 bg-[#154230] text-white text-xs font-semibold rounded">Current</span>
                    </div>
                    <p className="text-[#4A4A4A] text-sm">{currentSession.browser}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-[#4A4A4A]">
                    <MapPin className="w-4 h-4" />
                    {currentSession.location}
                  </div>
                  <div className="flex items-center gap-2 text-[#4A4A4A]">
                    <Clock className="w-4 h-4" />
                    {currentSession.lastActive}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Sessions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">Other Sessions</h3>
            {otherSessions.length > 0 && (
              <button
                onClick={terminateAll}
                className="text-[#DC2626] text-sm font-medium hover:underline"
              >
                Sign out all
              </button>
            )}
          </div>
          {otherSessions.length === 0 ? (
            <div className="text-center py-8">
              <Check className="w-12 h-12 text-[#16A34A] mx-auto mb-3" />
              <p className="text-[#101111] font-medium">No other active sessions</p>
              <p className="text-[#4A4A4A] text-sm">You're signed in on this device only</p>
            </div>
          ) : (
            <div className="space-y-3">
              {otherSessions.map(session => (
                <div key={session.id} className="p-4 bg-[#E6E2DA] rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#4A4A4A]/10 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#4A4A4A]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[#101111] font-semibold">{session.device}</h4>
                        {!session.trusted && (
                          <span className="px-2 py-0.5 bg-[#CA8A04]/10 text-[#CA8A04] text-xs font-semibold rounded">New</span>
                        )}
                      </div>
                      <p className="text-[#4A4A4A] text-xs">{session.browser}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-[#4A4A4A]">
                        <span>{session.location}</span>
                        <span>•</span>
                        <span>{session.ip}</span>
                        <span>•</span>
                        <span>{session.lastActive}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!session.trusted && (
                        <button
                          onClick={() => trustSession(session.id)}
                          className="px-3 py-1 bg-[#154230]/10 text-[#154230] text-xs font-medium rounded-lg hover:bg-[#154230]/20"
                        >
                          Trust
                        </button>
                      )}
                      <button
                        onClick={() => terminateSession(session.id)}
                        className="p-2 bg-[#DC2626]/10 rounded-lg hover:bg-[#DC2626]/20"
                      >
                        <Trash2 className="w-4 h-4 text-[#DC2626]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security Tips */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Security Tips</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <span className="text-[#4A4A4A] text-sm">Use strong, unique passwords for each account</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <span className="text-[#4A4A4A] text-sm">Enable two-factor authentication</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <span className="text-[#4A4A4A] text-sm">Sign out from devices you don't use</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <span className="text-[#4A4A4A] text-sm">Avoid public Wi-Fi for sensitive transactions</span>
            </li>
          </ul>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
