'use client';

import Link from 'next/link';
import { ArrowLeft, Bell } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  showNotifications?: boolean;
  showBack?: boolean;
  notificationCount?: number;
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  backHref,
  showNotifications = true,
  showBack = true,
  notificationCount = 0,
  actions,
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {backHref && showBack && (
            <Link
              href={backHref}
              className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <h1 className="text-white font-bold text-xl">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {showNotifications && (
            <Link
              href="/marketplace/inbox"
              className="relative p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5D1E21] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
      {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
    </div>
  );
}
