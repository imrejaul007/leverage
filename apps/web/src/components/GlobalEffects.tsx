'use client';

import { useEffect, useState } from 'react';

// Simple scroll progress bar
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-black/5">
      <div
        className="h-full bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Main Global Effects Provider - lightweight
export function GlobalEffectsProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}