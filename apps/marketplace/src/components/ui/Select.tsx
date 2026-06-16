'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, hint, options, placeholder, id, value, onChange, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-[#101111] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`
              w-full h-12 px-4 pr-10 bg-white border rounded-xl text-[#101111]
              focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer
              ${error
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                : 'border-black/10 focus:ring-[#154230]/20 focus:border-[#154230]'
              }
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A] pointer-events-none" />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-[#4A4A4A]">{hint}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
