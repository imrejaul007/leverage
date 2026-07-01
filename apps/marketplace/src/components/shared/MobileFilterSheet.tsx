'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface FilterOption {
  value: string;
  label: string;
  emoji?: string;
  count?: number;
}

export interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    categories?: FilterOption[];
    selectedCategory: string;
    onCategoryChange: (cat: string) => void;
    priceRanges?: FilterOption[];
    selectedPriceRange?: string;
    onPriceRangeChange?: (range: string) => void;
    sortOptions?: FilterOption[];
    selectedSort?: string;
    onSortChange?: (sort: string) => void;
    countries?: FilterOption[];
    selectedCountry?: string;
    onCountryChange?: (country: string) => void;
  };
  resultsCount: number;
  onApply: () => void;
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  filters,
  resultsCount,
  onApply,
}: MobileFilterSheetProps) {
  const [activeTab, setActiveTab] = useState<'category' | 'price' | 'sort' | 'location'>('category');

  const tabs = [
    { id: 'category' as const, label: 'Category' },
    { id: 'price' as const, label: 'Price' },
    { id: 'sort' as const, label: 'Sort' },
    { id: 'location' as const, label: 'Location' },
  ];

  const hasPrice = filters.priceRanges && filters.onPriceRangeChange;
  const hasSort = filters.sortOptions && filters.onSortChange;
  const hasLocation = filters.countries && filters.onCountryChange;

  const visibleTabs = tabs.filter(tab => {
    if (tab.id === 'price') return hasPrice;
    if (tab.id === 'sort') return hasSort;
    if (tab.id === 'location') return hasLocation;
    return true;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-lg">Filters</h2>
                <p className="text-sm text-gray-500">{resultsCount} results</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#154230] text-[#154230]'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Categories */}
              {activeTab === 'category' && filters.categories && (
                <div className="space-y-1">
                  {filters.categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => filters.onCategoryChange(cat.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        filters.selectedCategory === cat.value
                          ? 'bg-[#154230]/10 text-[#154230]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {cat.emoji && <span>{cat.emoji}</span>}
                        <span>{cat.label}</span>
                        {cat.count !== undefined && (
                          <span className="text-xs text-gray-400">({cat.count})</span>
                        )}
                      </span>
                      {filters.selectedCategory === cat.value && (
                        <Check className="w-5 h-5 text-[#154230]" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Price Ranges */}
              {activeTab === 'price' && filters.priceRanges && filters.onPriceRangeChange && (
                <div className="space-y-1">
                  {filters.priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => filters.onPriceRangeChange?.(range.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        filters.selectedPriceRange === range.value
                          ? 'bg-[#154230]/10 text-[#154230]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{range.label}</span>
                      {filters.selectedPriceRange === range.value && (
                        <Check className="w-5 h-5 text-[#154230]" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Sort */}
              {activeTab === 'sort' && filters.sortOptions && filters.onSortChange && (
                <div className="space-y-1">
                  {filters.sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => filters.onSortChange?.(option.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        filters.selectedSort === option.value
                          ? 'bg-[#154230]/10 text-[#154230]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{option.label}</span>
                      {filters.selectedSort === option.value && (
                        <Check className="w-5 h-5 text-[#154230]" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Location */}
              {activeTab === 'location' && filters.countries && filters.onCountryChange && (
                <div className="space-y-1">
                  {filters.countries.map((country) => (
                    <button
                      key={country.value}
                      onClick={() => filters.onCountryChange?.(country.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                        filters.selectedCountry === country.value
                          ? 'bg-[#154230]/10 text-[#154230]'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{country.label}</span>
                      {filters.selectedCountry === country.value && (
                        <Check className="w-5 h-5 text-[#154230]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-4 border-t border-gray-100">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  filters.onCategoryChange('all');
                  filters.onPriceRangeChange?.('');
                  filters.onSortChange?.('featured');
                  filters.onCountryChange?.('all');
                }}
              >
                Clear All
              </Button>
              <Button className="flex-1" onClick={onApply}>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
