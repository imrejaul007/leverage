'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#E6E2DA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#154230] border-t-transparent"></div>
      </div>
    );
  }

  // Just render children - each page has its own sidebar/header/nav
  return <>{children}</>;
}
