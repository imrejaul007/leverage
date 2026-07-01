'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, Grid3X3, List, Filter, ChevronDown, ChevronUp, X, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shared/ProductCard';
import { Pagination } from '@/components/shared/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { MobileFilterSheet, type FilterOption } from '@/components/shared/MobileFilterSheet';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/useToast';
import { products, Product } from '@/data/products';

// Categories with counts
const categories: FilterOption[] = [
  { value: 'all', label: 'All Products', count: products.length },
  { value: 'Food & Agriculture', label: 'Food & Agriculture', emoji: '🌾', count: products.filter(p => p.category === 'Food & Agriculture').length },
  { value: 'Textiles', label: 'Textiles', emoji: '🧵', count: products.filter(p => p.category === 'Textiles').length },
  { value: 'Metals & Minerals', label: 'Metals & Minerals', emoji: '⚙️', count: products.filter(p => p.category === 'Metals & Minerals').length },
  { value: 'Energy', label: 'Energy', emoji: '⚡', count: products.filter(p => p.category === 'Energy').length },
];

const priceRanges: FilterOption[] = [
  { value: '', label: 'All Prices' },
  { value: '0-100', label: 'Under $100' },
  { value: '100-500', label: '$100 - $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000+', label: '$1,000+' },
];

const sortOptions: FilterOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'sales', label: 'Most Selling' },
];

const countries: FilterOption[] = [
  { value: 'all', label: 'All India' },
  { value: 'India', label: 'India' },
  { value: 'UAE', label: 'UAE' },
  { value: 'China', label: 'China' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Ethiopia', label: 'Ethiopia' },
];

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'indiamart'>('indiamart');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    country: false,
  });

  const { cartItems, addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.supplier.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by country
    if (selectedCountry !== 'all') {
      result = result.filter((p) => p.country === selectedCountry);
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter((p) => {
        if (priceRange === '1000+') return p.price >= 1000;
        return p.price >= min && p.price <= max;
      });
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'sales':
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, selectedCategory, sortBy, priceRange, selectedCountry]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddToCart = (product: Product) => {
    if (isInCart(product.id)) {
      showToast(`${product.name} is already in your cart`, 'info');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      currency: product.currency,
      moq: product.moq,
    });
    showToast(`${product.name} added to cart`, 'success');
  };

  const handleToggleFavorite = (product: Product) => {
    toggleFavorite(product.id);
    showToast(
      isFavorite(product.id) ? 'Removed from favorites' : 'Added to favorites',
      'success'
    );
  };

  const handleMobileFilterApply = () => {
    setMobileFiltersOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} notificationCount={3} activeRoute="/products" />

      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredProducts.length} products from verified suppliers
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
              onClick={() => setSortBy('featured')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                sortBy === 'featured' ? 'bg-[#154230] text-white' : 'bg-white border border-gray-200'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setSortBy('price-low')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                sortBy === 'price-low' ? 'bg-[#154230] text-white' : 'bg-white border border-gray-200'
              }`}
            >
              Low Price
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                sortBy === 'rating' ? 'bg-[#154230] text-white' : 'bg-white border border-gray-200'
              }`}
            >
              Top Rated
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Left Sidebar - Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Filters</h2>

              {/* Categories */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('category')}
                  className="flex items-center justify-between w-full font-medium text-sm mb-2"
                >
                  Category
                  {expandedSections.category ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.category && (
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => { setSelectedCategory(cat.value); setCurrentPage(1); }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat.value
                            ? 'bg-[#154230]/10 text-[#154230] font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {cat.emoji && <span>{cat.emoji}</span>}
                          {cat.label}
                        </span>
                        {cat.count !== undefined && (
                          <span className="text-xs text-gray-400">({cat.count})</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('price')}
                  className="flex items-center justify-between w-full font-medium text-sm mb-2"
                >
                  Price
                  {expandedSections.price ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.price && (
                  <div className="space-y-1">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => { setPriceRange(range.value); setCurrentPage(1); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          priceRange === range.value
                            ? 'bg-[#154230]/10 text-[#154230] font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('country')}
                  className="flex items-center justify-between w-full font-medium text-sm mb-2"
                >
                  Location
                  {expandedSections.country ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.country && (
                  <div className="space-y-1">
                    {countries.map((country) => (
                      <button
                        key={country.value}
                        onClick={() => { setSelectedCountry(country.value); setCurrentPage(1); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCountry === country.value
                            ? 'bg-[#154230]/10 text-[#154230] font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {country.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== 'all' || priceRange || selectedCountry !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('');
                    setSelectedCountry('all');
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

          {/* Products Grid/List */}
          <div className="flex-1 min-w-0">
            {/* Desktop: Sort & View controls */}
            <div className="hidden lg:flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} products
                </span>
              </div>

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
            {(selectedCategory !== 'all' || priceRange || selectedCountry !== 'all') && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#154230]/10 text-[#154230] rounded-full text-sm">
                    {categories.find(c => c.value === selectedCategory)?.emoji} {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {priceRange && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#154230]/10 text-[#154230] rounded-full text-sm">
                    {priceRanges.find(r => r.value === priceRange)?.label}
                    <button onClick={() => setPriceRange('')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCountry !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#154230]/10 text-[#154230] rounded-full text-sm">
                    <MapPin className="w-3 h-3" /> {selectedCountry}
                    <button onClick={() => setSelectedCountry('all')} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products */}
            {paginatedProducts.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                      : 'flex flex-col gap-3'
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant={viewMode === 'grid' ? 'default' : 'indiamart'}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={isFavorite(product.id)}
                      isInCart={isInCart(product.id)}
                    />
                  ))}
                </div>

                {/* Pagination */}
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
                icon={<Package className="w-16 h-16" />}
                title="No products found"
                description="Try adjusting your search or filters to find what you're looking for."
                action={
                  <div className="flex gap-3">
                    <Button onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange('');
                      setSelectedCountry('all');
                      setSearch('');
                    }}>
                      Clear Filters
                    </Button>
                    <Link href="/rfqs/new">
                      <Button variant="outline">Post an RFQ</Button>
                    </Link>
                  </div>
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
          priceRanges,
          selectedPriceRange: priceRange,
          onPriceRangeChange: setPriceRange,
          sortOptions,
          selectedSort: sortBy,
          onSortChange: setSortBy,
          countries,
          selectedCountry,
          onCountryChange: setSelectedCountry,
        }}
        resultsCount={filteredProducts.length}
        onApply={handleMobileFilterApply}
      />

      <Footer />
    </div>
  );
}
