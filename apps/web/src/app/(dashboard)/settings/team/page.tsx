'use client';

import { useState } from 'react';
import {
  Users,
  Plus,
  Crown,
  Mail,
  MoreVertical,
  Shield,
  Loader2,
  Check,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const teamMembers = [
  { id: '1', name: 'John Doe', email: 'john@company.com', role: 'Owner', avatar: 'JD', status: 'active' },
  { id: '2', name: 'Sarah Smith', email: 'sarah@company.com', role: 'Admin', avatar: 'SS', status: 'active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@company.com', role: 'Member', avatar: 'MJ', status: 'active' },
  { id: '4', name: 'Emily Davis', email: 'emily@company.com', role: 'Member', avatar: 'ED', status: 'pending' },
];

const roles = [
  { id: 'owner', name: 'Owner', color: '#A6824A', permissions: ['all'] },
  { id: 'admin', name: 'Admin', color: '#154230', permissions: ['manage', 'edit', 'view'] },
  { id: 'member', name: 'Member', color: '#4A4A4A', permissions: ['edit', 'view'] },
  { id: 'viewer', name: 'Viewer', color: '#4A4A4A', permissions: ['view'] },
];

export default function TeamSettingsPage() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [invited, setInvited] = useState(false);

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setInviting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setInviting(false);
    setInvited(true);
    setInviteEmail('');
    setTimeout(() => setInvited(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Team"
        subtitle="Manage team members"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Coming Soon Banner */}
        <div className="bg-[#A6824A] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold">Team Management Coming Soon</p>
              <p className="text-white/70 text-sm">Full team features are being developed</p>
            </div>
          </div>
        </div>

        {/* Invite */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="relative z-10 pt-2">
            <h3 className="text-[#101111] font-bold mb-4">Invite Team Member</h3>
            {invited && (
              <div className="mb-4 p-3 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-xl flex items-center gap-2 text-[#16A34A] text-sm">
                <Check className="w-4 h-4" />
                Invitation sent successfully!
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
              <button
                onClick={handleInvite}
                disabled={inviting || !inviteEmail}
                className="px-6 py-3 bg-[#154230] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Invite
              </button>
            </div>
          </div>
        </div>

        {/* Current Team */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Current Members</h3>
          <div className="space-y-3">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
                <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[#101111] font-semibold">{member.name}</p>
                    {member.role === 'Owner' && <Crown className="w-4 h-4 text-[#A6824A]" />}
                  </div>
                  <p className="text-[#4A4A4A] text-sm">{member.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {member.status === 'pending' ? (
                    <span className="px-2 py-1 bg-[#CA8A04]/10 text-[#CA8A04] text-xs font-semibold rounded">Pending</span>
                  ) : (
                    <span className="px-2 py-1 bg-[#16A34A]/10 text-[#16A34A] text-xs font-semibold rounded">{member.role}</span>
                  )}
                  {member.role !== 'Owner' && (
                    <button className="p-2 hover:bg-white rounded-lg">
                      <MoreVertical className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Roles</h3>
          <div className="space-y-3">
            {roles.map(role => (
              <div key={role.id} className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: role.color }}
                />
                <div className="flex-1">
                  <p className="text-[#101111] font-semibold">{role.name}</p>
                  <p className="text-[#4A4A4A] text-xs capitalize">{role.permissions.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
