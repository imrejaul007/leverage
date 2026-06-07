'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after mount
    const animTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);

    // Hide preloader after animation
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2500);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#081512] transition-all duration-700 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated Logo */}
      <div className="relative">
        <Image
          src="/preloader.png"
          alt="Loading"
          width={300}
          height={200}
          className={`object-contain transition-transform duration-1000 ${
            isAnimating ? 'scale-100 animate-pulse' : 'scale-50'
          }`}
          priority
        />

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span
            className={`w-3 h-3 rounded-full bg-[#C49A6C] transition-all duration-500 ${
              isAnimating ? 'animate-bounce' : 'opacity-0'
            }`}
            style={{ animationDelay: '0ms' }}
          />
          <span
            className={`w-3 h-3 rounded-full bg-[#C49A6C] transition-all duration-500 ${
              isAnimating ? 'animate-bounce' : 'opacity-0'
            }`}
            style={{ animationDelay: '150ms' }}
          />
          <span
            className={`w-3 h-3 rounded-full bg-[#C49A6C] transition-all duration-500 ${
              isAnimating ? 'animate-bounce' : 'opacity-0'
            }`}
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>

      {/* Glow effect behind logo */}
      <div className="absolute w-80 h-80 rounded-full bg-[#C49A6C]/10 blur-3xl animate-pulse" />
    </div>
  );
}
