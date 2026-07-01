'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Filter, ChevronDown, X, MapPin, Grid3X3, List } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SupplierCard } from '@/components/shared/SupplierCard';
import { Pagination } from '@/components/shared/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { MobileFilterSheet, type FilterOption } from '@/components/shared/MobileFilterSheet';
import { suppliers, Supplier } from '@/data/suppliers';

// Country filters
const countries: FilterOption[] = [
  { value: 'all', label: 'All India' },
  { value: 'India', label: 'India', count: suppliers.filter(s => s.country === 'India').length },
  { value: 'UAE', label: 'UAE', count: suppliers.filter(s => s.country === 'UAE').length },
  { value: 'China', label: 'China', count: suppliers.filter(s => s.country === 'China').length },
  { value: 'Turkey', label: 'Turkey', count: suppliers.filter(s => s.country === 'Turkey').length },
  { value: 'Ethiopia', label: 'Ethiopia', count: suppliers.filter(s => s.country === 'Ethiopia').length },
];

// Category filters
const categories: FilterOption[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'Food & Agriculture', label: 'Food & Agriculture', emoji: '🌾' },
  { value: 'Textiles', label: 'Textiles', emoji: '🧵' },
  { value: 'Metals & Minerals', label: 'Metals & Minerals', emoji: '⚙️' },
  { value: 'Electronics', label: 'Electronics', emoji: '💻' },
  { value: 'Energy', label: 'Energy', emoji: '⚡' },
];

const sortOptions: FilterOption[] = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'products', label: 'Most Products' },
  { value: 'years', label: 'Most Experienced' },
];

const ITEMS_PER_PAGE = 12;

export default function SuppliersPage() {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'indiamart'>('indiamart');

  const filteredSuppliers = useMemo(() => {
    let result = [...suppliers];

    // Search
    if (search) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase()) ||
          s.categories.some(c => c.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Country filter
    if (selectedCountry !== 'all') {
      result = result.filter((s) => s.country === selectedCountry);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.categories.includes(selectedCategory));
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'products':
        result.sort((a, b) => b.products - a.products);
        break;
      case 'years':
        result.sort((a, b) => (b.yearsInBusiness || 0) - (a.yearsInBusiness || 0));
        break;
    }

    return result;
  }, [search, selectedCountry, selectedCategory, sortBy]);

  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSuppliers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSuppliers, currentPage]);

  const totalPages = Math.ceil(filteredSuppliers.length / ITEMS_PER_PAGE);

  const handleContact = (supplier: Supplier) => {
    window.location.href = '/inbox';
  };

  const handleMobileFilterApply = () => {
    setMobileFiltersOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeRoute="/suppliers" />

      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Supplier Directory</h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredSuppliers.length} verified suppliers
            </p>
          </div>
        </div>

        {/* Mobile: Filter chips & sort */}
        <div className="lg:hidden mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                sortBy === 'rating' ? 'bg-[#154230] text-white' : 'bg-white border border-gray-200'
              }`}
            >
              Top Rated
            </button>
            <button
              onClick={() => setSortBy('years')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                sortBy === 'years' ? 'bg-[#154230] text-white' : 'bg-white border border-gray-200'
              }`}
            >
              Experienced
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Left Sidebar - Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Filters</h2>

              {/* Location */}
              <div className="mb-6">
                <h3 className="font-medium text-sm text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </h3>
                <div className="space-y-1">
                  {countries.map((country) => (
                    <button
                      key={country.value}
                      onClick={() => { setSelectedCountry(country.value); setCurrentPage(1); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCountry === country.value
                          ? 'bg-[#154230]/10 text-[#154230] font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <span>{country.label}</span>
                      {country.count !== undefined && (
                        <span className="text-xs text-gray-400">({country.count})</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <h3 className="font-medium text-sm text-gray-900 mb-3">Category</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => { setSelectedCategory(cat.value); setCurrentPage(1); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.value
                          ? 'bg-[#154230]/10 text-[#154230] font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {cat.emoji && <span>{cat.emoji}</span>}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Only */}
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#154230] focus:ring-[#154230]"
                  />
                  <span className="text-sm">Verified suppliers only</span>
                </label>
              </div>

              {/* Clear Filters */}
              {(selectedCountry !== 'all' || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCountry('all');
                    setSelectedCategory('all');
                    setCurrentPage(1);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Suppliers List */}
          <div className="flex-1 min-w-0">
            {/* Desktop: Sort & View controls */}
            <div className="hidden lg:flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                {filteredSuppliers.length} suppliers
              </span>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('indiamart')}
                    className={`p-2 transition-colors ${
                      viewMode === 'indiamart' ? 'bg-[#154230] text-white' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid' ? 'bg-[#154230] text-white' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCountry !== 'all' || selectedCategory !== 'all') && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCountry !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#154230]/10 text-[#154230] rounded-full text-sm">
                    <MapPin className="w-3 h-3" /> {selectedCountry}
                    <button onClick={() => setSelectedCountry('all')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#154230]/10 text-[#154230] rounded-full text-sm">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Suppliers */}
            {paginatedSuppliers.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                      : 'flex flex-col gap-3'
                  }
                >
                  {paginatedSuppliers.map((supplier) => (
                    <SupplierCard
                      key={supplier.id}
                      supplier={supplier}
                      variant={viewMode === 'grid' ? 'default' : 'indiamart'}
                      onContact={handleContact}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                icon={<Building2 className="w-16 h-16" />}
                title="No suppliers found"
                description="Try adjusting your search or filters to find suppliers."
                action={
                  <Button onClick={() => {
                    setSearch('');
                    setSelectedCountry('all');
                    setSelectedCategory('all');
                  }}>
                    Clear Filters
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={{
          categories,
          selectedCategory,
          onCategoryChange: setSelectedCategory,
          countries,
          selectedCountry,
          onCountryChange: setSelectedCountry,
          sortOptions,
          selectedSort: sortBy,
          onSortChange: setSortBy,
        }}
        resultsCount={filteredSuppliers.length}
        onApply={handleMobileFilterApply}
      />

      <Footer />
    </div>
  );
}
