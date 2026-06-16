'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'accent' | 'emerald' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-semibold rounded-lg';

    const variants = {
      default: 'bg-[#E6E2DA] text-[#4A4A4A]',
      success: 'bg-emerald-500/20 text-emerald-600',
      warning: 'bg-amber-500/20 text-amber-600',
      error: 'bg-red-500/20 text-red-600',
      accent: 'bg-[#A6824A]/20 text-[#A6824A]',
      emerald: 'bg-[#154230]/20 text-[#154230]',
      gold: 'bg-[#A6824A] text-white',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
