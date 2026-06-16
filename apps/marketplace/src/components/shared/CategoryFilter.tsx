'use client';

import { motion } from 'framer-motion';

export interface Category {
  name: string;
  slug: string;
  icon?: string;
  emoji?: string;
  count?: string | number;
}

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (category: string) => void;
  variant?: 'pill' | 'card' | 'icon';
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
  variant = 'pill',
}: CategoryFilterProps) {
  if (variant === 'card') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center ${
              selected === cat.slug
                ? 'ring-2 ring-[#154230] shadow-md'
                : ''
            }`}
          >
            {cat.emoji && (
              <span className="text-3xl mb-2">{cat.emoji}</span>
            )}
            <span className="font-medium text-sm text-[#101111]">{cat.name}</span>
            {cat.count && (
              <span className="text-xs text-[#4A4A4A] mt-1">{cat.count} items</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-200 ${
              selected === cat.slug
                ? 'bg-[#154230] text-white'
                : 'bg-white text-[#4A4A4A] hover:bg-[#E6E2DA]'
            }`}
          >
            {cat.emoji && (
              <span className="text-2xl">{cat.emoji}</span>
            )}
            <span className="text-sm font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
    );
  }

  // Default: pill variant
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((cat, index) => (
        <motion.button
          key={cat.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect(cat.slug)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors ${
            selected === cat.slug
              ? 'bg-[#154230] text-white'
              : 'bg-white text-[#4A4A4A] hover:bg-[#E6E2DA] border border-black/5'
          }`}
        >
          {cat.emoji && (
            <span>{cat.emoji}</span>
          )}
          <span className="text-sm font-medium">{cat.name}</span>
          {cat.count && (
            <span className={`text-xs ${selected === cat.slug ? 'text-white/70' : 'text-[#4A4A4A]'}`}>
              {cat.count}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
