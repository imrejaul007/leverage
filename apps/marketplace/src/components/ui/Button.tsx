'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-[#154230] text-white hover:bg-[#1a5a3a] active:scale-[0.98] focus-visible:ring-[#154230]',
      accent: 'bg-[#A6824A] text-white hover:bg-[#8a6a3a] active:scale-[0.98] focus-visible:ring-[#A6824A]',
      secondary: 'bg-[#E6E2DA] text-[#101111] hover:bg-[#D5D1C9] active:scale-[0.98] focus-visible:ring-[#4A4A4A]',
      ghost: 'text-[#4A4A4A] hover:bg-black/5 active:scale-[0.98] focus-visible:ring-[#4A4A4A]',
      outline: 'border-2 border-[#154230] text-[#154230] hover:bg-[#154230]/5 active:scale-[0.98] focus-visible:ring-[#154230]',
      danger: 'bg-[#5D1E21] text-white hover:bg-[#7a2629] active:scale-[0.98] focus-visible:ring-[#5D1E21]',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm gap-1.5',
      md: 'h-11 px-5 text-base gap-2',
      lg: 'h-13 px-7 text-lg gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
