'use client';

import { forwardRef, HTMLAttributes } from 'react';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className = '', icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
        {...props}
      >
        {icon && (
          <div className="w-16 h-16 bg-[#E6E2DA] rounded-full flex items-center justify-center mb-4 text-[#4A4A4A]">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-[#101111] mb-2">{title}</h3>
        {description && (
          <p className="text-[#4A4A4A] max-w-sm mb-6">{description}</p>
        )}
        {action && <div>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
