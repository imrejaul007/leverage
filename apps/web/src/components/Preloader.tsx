'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const preloaderImages = [
  '/prelaoder1.PNG',
  '/prelaoder2.PNG',
  '/prelaoder3.PNG',
  '/prelaoder4.PNG',
];

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % preloaderImages.length);
    }, 600);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#081512]">
      {/* Preloader Images Cycling */}
      <div className="relative w-full h-full flex items-center justify-center">
        {preloaderImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Loading ${index + 1}`}
            fill
            className={`object-contain transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority
          />
        ))}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {preloaderImages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#C49A6C] w-6' : 'bg-[#D8CCBC]/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}