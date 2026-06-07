'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'accent';
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', interactive = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl p-5 transition-all duration-200';

    const variants = {
      default: 'bg-[var(--color-card-bg)] border border-[var(--color-border)]',
      elevated: 'bg-[var(--color-bg-secondary)] border border-[var(--color-border)] shadow-lg shadow-black/20',
      outlined: 'bg-transparent border border-[var(--color-border)]',
      accent: 'bg-[var(--color-bg-secondary)] border border-[var(--color-accent)]/30',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          interactive && 'cursor-pointer hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card-bg)]/50 active:scale-[0.99]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between mb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-lg font-semibold text-[var(--color-text-primary)]', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export { Card, CardHeader, CardTitle };
