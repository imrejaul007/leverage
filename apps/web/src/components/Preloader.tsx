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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if preloader was already shown in this session
    const alreadyShown = sessionStorage.getItem('preloader_shown');

    if (!alreadyShown) {
      // Show preloader on first visit
      setIsVisible(true);

      // Mark as shown after first image (to ensure it displays)
      const markTimer = setTimeout(() => {
        sessionStorage.setItem('preloader_shown', 'true');
      }, 500);

      return () => clearTimeout(markTimer);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Auto-advance after 2 seconds (longer to let user see the brand images)
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
  }, [currentIndex, isVisible, onComplete]);

  const handleTap = () => {
    if (currentIndex < preloaderImages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsVisible(false);
      onComplete?.();
    }
  };

  // Don't render if not visible (already dismissed or already shown this session)
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#081512] cursor-pointer"
      onClick={handleTap}
      onTouchEnd={(e) => { e.preventDefault(); handleTap(); }}
    >
      {/* Preloader Images - Full Screen Cover */}
      <div className="absolute inset-0">
        {preloaderImages.map((src, index) => (
          <Image
            key={src}
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

      {/* Tap indicator */}
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