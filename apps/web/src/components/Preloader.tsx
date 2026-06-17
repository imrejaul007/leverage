'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWindowSize } from '@/hooks/useWindowSize';

const mobileImages = [
  '/prelaoder2.PNG',
  '/prelaoder3.PNG',
  '/prelaoder4.PNG',
  '/prelaoder1.PNG',
];

const desktopImages = [
  '/prelaoder-d2.PNG',
  '/prelaoder-d3.PNG',
  '/prelaoder-d4.PNG',
  '/prelaoder-d1.PNG',
];

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const preloaderImages = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('preloader_shown');

    if (!alreadyShown) {
      setIsVisible(true);

      const markTimer = setTimeout(() => {
        sessionStorage.setItem('preloader_shown', 'true');
      }, 500);

      return () => clearTimeout(markTimer);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const autoTimer = setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev < preloaderImages.length - 1) {
          return prev + 1;
        } else {
          setIsVisible(false);
          onComplete?.();
          return prev;
        }
      });
    }, 2000);

    return () => clearTimeout(autoTimer);
  }, [currentIndex, isVisible, onComplete, preloaderImages.length]);

  const handleTap = () => {
    if (currentIndex < preloaderImages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsVisible(false);
      onComplete?.();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#081512] cursor-pointer"
      onClick={handleTap}
      onTouchEnd={(e) => { e.preventDefault(); handleTap(); }}
    >
      <div className="absolute inset-0">
        {preloaderImages.map((src, index) => (
          <Image
            key={`${isMobile ? 'm' : 'd'}-${src}`}
            src={src}
            alt={`Loading ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-white/60 text-sm">Tap to continue</p>
        <div className="flex items-center gap-2">
          {preloaderImages.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-6' : 'bg-white/30 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}