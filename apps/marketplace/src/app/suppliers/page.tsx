'use client';

import { useState, useMemo } from 'react';
import { Building2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/layout/Hero';
import { SupplierCard, Supplier } from '@/components/shared/SupplierCard';
import { FilterDropdown } from '@/components/shared/FilterDropdown';
import { Pagination } from '@/components/shared/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

const suppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Global Trade Exports',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Leading exporter of premium agricultural products including rice, spices, and pulses from India.',
    location: 'Mumbai, India',
    verified: true,
    rating: 4.8,
    reviews: 128,
    products: 245,
    responseTime: '< 2 hours',
    categories: ['Food & Agriculture', 'Spices'],
  },
  {
    id: 'sup-002',
    name: 'Cotton World Ltd',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Specialized in organic and conventional cotton yarn, fabrics, and textile raw materials.',
    location: 'Ahmedabad, India',
    verified: true,
    rating: 4.7,
    reviews: 96,
    products: 128,
    responseTime: '< 4 hours',
    categories: ['Textiles', 'Raw Materials'],
  },
  {
    id: 'sup-003',
    name: 'MetalLink Global',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Industrial metals and minerals supplier with global logistics capabilities.',
    location: 'Dubai, UAE',
    verified: true,
    rating: 4.9,
    reviews: 78,
    products: 89,
    responseTime: '< 1 hour',
    categories: ['Metals & Minerals', 'Industrial'],
  },
  {
    id: 'sup-004',
    name: 'Shanghai Import Co.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Electronics and solar energy products manufacturer and exporter.',
    location: 'Shanghai, China',
    verified: false,
    rating: 4.6,
    reviews: 89,
    products: 156,
    responseTime: '< 6 hours',
    categories: ['Electronics', 'Energy'],
  },
  {
    id: 'sup-005',
    name: 'Turkey Merchants',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Premium food products exporter from Turkey. Olive oil, dried fruits, and more.',
    location: 'Istanbul, Turkey',
    verified: true,
    rating: 4.9,
    reviews: 156,
    products: 78,
    responseTime: '< 3 hours',
    categories: ['Food & Agriculture', 'Dried Fruits'],
  },
  {
    id: 'sup-006',
    name: 'Ethiopia Direct',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Direct source of premium Ethiopian coffee beans and specialty exports.',
    location: 'Addis Claude, Ethiopia',
    verified: true,
    rating: 4.8,
    reviews: 64,
    products: 34,
    responseTime: '< 4 hours',
    categories: ['Food & Agriculture', 'Coffee'],
  },
];

const countries = [
  { value: 'all', label: 'All Countries' },
  { value: 'india', label: 'India' },
  { value: 'uae', label: 'UAE' },
  { value: 'china', label: 'China' },
  { value: 'turkey', label: 'Turkey' },
  { value: 'ethiopia', label: 'Ethiopia' },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Food & Agriculture', label: 'Food & Agriculture' },
  { value: 'Textiles', label: 'Textiles' },
  { value: 'Metals & Minerals', label: 'Metals & Minerals' },
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Energy', label: 'Energy' },
];

const ITEMS_PER_PAGE = 12;

export default function SuppliersPage() {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const matchesSearch =
        search === '' ||
        supplier.name.toLowerCase().includes(search.toLowerCase()) ||
        supplier.description.toLowerCase().includes(search.toLowerCase());
      const matchesCountry =
        selectedCountry === 'all' ||
        supplier.location.toLowerCase().includes(selectedCountry);
      const matchesCategory =
        selectedCategory === 'all' ||
        supplier.categories.includes(selectedCategory);
      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [search, selectedCountry, selectedCategory]);

  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSuppliers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSuppliers, currentPage]);

  const totalPages = Math.ceil(filteredSuppliers.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header activeRoute="/suppliers" />

      <HeroSection
        title="Supplier Directory"
        subtitle="Discover verified suppliers from around the world. Connect with trusted partners for your trade business."
        icon={<Building2 className="w-10 h-10" />}
        searchPlaceholder="Search suppliers..."
        stats={[
          { label: 'Verified Suppliers', value: '523' },
          { label: 'Countries', value: '45' },
          { label: 'Products', value: '12K+' },
          { label: 'Response Rate', value: '98%' },
        ]}
        primaryCTA={{ label: 'Register as Supplier', href: '/signup?type=supplier' }}
      />

      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3">
            <FilterDropdown
              label="Country"
              options={countries}
              value={selectedCountry}
              onChange={(v) => {
                setSelectedCountry(v as string);
                setCurrentPage(1);
              }}
            />
            <FilterDropdown
              label="Category"
              options={categories}
              value={selectedCategory}
              onChange={(v) => {
                setSelectedCategory(v as string);
                setCurrentPage(1);
              }}
            />
            <div className="flex-1" />
            <span className="text-sm text-[#4A4A4A]">
              {filteredSuppliers.length} suppliers
            </span>
          </div>

          {/* Suppliers Grid */}
          {paginatedSuppliers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {paginatedSuppliers.map((supplier) => (
                  <SupplierCard
                    key={supplier.id}
                    supplier={supplier}
                    onContact={() => {
                      window.location.href = '/inbox';
                    }}
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
                <Button onClick={() => { setSearch(''); setSelectedCountry('all'); setSelectedCategory('all'); }}>
                  Clear Filters
                </Button>
              }
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
