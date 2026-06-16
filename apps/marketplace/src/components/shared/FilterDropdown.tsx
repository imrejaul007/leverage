'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
  multiple = false,
  placeholder = 'Select...',
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter((v) => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange(multiple ? [] : '');
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (multiple) {
      const values = Array.isArray(value) ? value : [];
      if (values.length === 0) return placeholder;
      if (values.length === 1) {
        return options.find((o) => o.value === values[0])?.label || placeholder;
      }
      return `${values.length} selected`;
    }
    const selected = options.find((o) => o.value === value);
    return selected?.label || placeholder;
  };

  const hasSelection = multiple
    ? (Array.isArray(value) ? value.length > 0 : false)
    : !!value;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm font-medium transition-colors ${
          hasSelection
            ? 'border-[#154230] text-[#154230]'
            : 'border-black/10 text-[#4A4A4A] hover:border-black/20'
        }`}
      >
        <span>{getDisplayValue()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-black/10 shadow-lg z-50 overflow-hidden"
          >
            <div className="p-2 border-b border-black/5">
              <span className="text-xs text-[#4A4A4A] px-2">{label}</span>
            </div>

            <div className="max-h-64 overflow-y-auto p-2">
              {options.map((option) => {
                const isSelected = multiple
                  ? (Array.isArray(value) ? value.includes(option.value) : false)
                  : value === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? 'bg-[#154230]/10 text-[#154230]'
                        : 'hover:bg-[#f7f5f1] text-[#101111]'
                    }`}
                  >
                    <span>{option.label}</span>
                    <div className="flex items-center gap-2">
                      {option.count !== undefined && (
                        <span className="text-xs text-[#4A4A4A]">{option.count}</span>
                      )}
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {hasSelection && (
              <div className="p-2 border-t border-black/5">
                <button
                  onClick={handleClear}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#5D1E21] hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear selection
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
