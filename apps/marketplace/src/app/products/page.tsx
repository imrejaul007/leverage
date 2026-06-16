'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/layout/Hero';
import { ProductCard, Product } from '@/components/shared/ProductCard';
import { CategoryFilter, Category } from '@/components/shared/CategoryFilter';
import { FilterDropdown } from '@/components/shared/FilterDropdown';
import { Pagination } from '@/components/shared/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/useToast';

// Product data
const products: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice 1121',
    description: 'Extra long grain aromatic basmati rice for export. Perfect for international trade.',
    price: 850,
    originalPrice: 950,
    currency: 'MT',
    moq: '50 MT',
    category: 'Food & Agriculture',
    supplier: 'Global Trade Exports',
    supplierId: 'sup-001',
    rating: 4.8,
    reviews: 128,
    salesCount: 1248,
    featured: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
  },
  {
    id: '2',
    name: 'Organic Cotton Yarn 40s',
    description: 'Premium organic cotton yarn for textiles. Sustainable and certified.',
    price: 4.20,
    currency: 'KG',
    moq: '1000 KG',
    category: 'Textiles',
    supplier: 'Cotton World Ltd',
    supplierId: 'sup-002',
    rating: 4.7,
    reviews: 96,
    salesCount: 890,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
  },
  {
    id: '3',
    name: 'Copper Cathode 99.99%',
    description: 'Industrial grade copper cathode for manufacturing.',
    price: 7250,
    currency: 'MT',
    moq: '25 MT',
    category: 'Metals & Minerals',
    supplier: 'MetalLink Global',
    supplierId: 'sup-003',
    rating: 4.9,
    reviews: 78,
    salesCount: 560,
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800',
  },
  {
    id: '4',
    name: 'Solar Panels 550W',
    description: 'Tier 1 solar panels with high efficiency rating.',
    price: 165,
    currency: 'unit',
    moq: '100 units',
    category: 'Energy',
    supplier: 'Shanghai Import Co.',
    supplierId: 'sup-004',
    rating: 4.6,
    reviews: 89,
    salesCount: 2100,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
  },
  {
    id: '5',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold pressed, first harvest olive oil. Premium quality.',
    price: 4.50,
    currency: 'L',
    moq: '5 MT',
    category: 'Food & Agriculture',
    supplier: 'Turkey Merchants',
    supplierId: 'sup-005',
    rating: 4.9,
    reviews: 156,
    salesCount: 3450,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
  },
  {
    id: '6',
    name: 'Steel Billets Grade A',
    description: 'IS 2062 certified steel billets for construction.',
    price: 620,
    currency: 'MT',
    moq: '100 MT',
    category: 'Metals & Minerals',
    supplier: 'Turkey Merchants',
    supplierId: 'sup-005',
    rating: 4.9,
    reviews: 32,
    salesCount: 890,
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
  },
  {
    id: '7',
    name: 'Fresh Green Coffee Beans',
    description: 'Arabica coffee beans, washed process.',
    price: 3200,
    currency: 'MT',
    moq: '10 MT',
    category: 'Food & Agriculture',
    supplier: 'Ethiopia Direct',
    supplierId: 'sup-006',
    rating: 4.8,
    reviews: 64,
    salesCount: 420,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
  },
  {
    id: '8',
    name: 'Wheat Grain Grade 1',
    description: 'High quality wheat for milling and export.',
    price: 280,
    currency: 'MT',
    moq: '100 MT',
    category: 'Food & Agriculture',
    supplier: 'Ukraine Grain Co.',
    supplierId: 'sup-007',
    rating: 4.5,
    reviews: 45,
    salesCount: 2100,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
  },
];

const categories: Category[] = [
  { name: 'All', slug: 'all' },
  { name: 'Food & Agriculture', slug: 'Food & Agriculture', emoji: '🌾' },
  { name: 'Textiles', slug: 'Textiles', emoji: '🧵' },
  { name: 'Electronics', slug: 'Electronics', emoji: '💻' },
  { name: 'Metals & Minerals', slug: 'Metals & Minerals', emoji: '⚙️' },
  { name: 'Energy', slug: 'Energy', emoji: '⚡' },
  { name: 'Chemicals', slug: 'Chemicals', emoji: '🧪' },
  { name: 'Machinery', slug: 'Machinery', emoji: '🔧' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'sales', label: 'Best Sales' },
];

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<string>('');

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
  }, [search, selectedCategory, sortBy]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

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

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header cartCount={cartCount} notificationCount={3} activeRoute="/products" />

      {/* Hero */}
      <HeroSection
        title="Browse Products"
        subtitle="Discover verified products from trusted suppliers worldwide"
        icon={<Package className="w-10 h-10" />}
        searchPlaceholder="Search products..."
        stats={[
          { label: 'Products', value: products.length.toString() },
          { label: 'Categories', value: categories.length - 1 + '' },
          { label: 'Suppliers', value: '523' },
          { label: 'Countries', value: '45' },
        ]}
      />

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Categories */}
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            variant="pill"
          />

          {/* Filters Bar */}
          <div className="bg-white rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <FilterDropdown
                label="Sort By"
                options={sortOptions}
                value={sortBy}
                onChange={(v) => setSortBy(v as string)}
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#4A4A4A]">
                {filteredProducts.length} products
              </span>
              <div className="flex items-center gap-1 border-l border-black/10 pl-3">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#154230] text-white'
                      : 'hover:bg-black/5'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#154230] text-white'
                      : 'hover:bg-black/5'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {paginatedProducts.length > 0 ? (
            <>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === 'list' ? 'list' : 'default'}
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
                  <Button onClick={() => { setSelectedCategory('all'); setSearch(''); }}>
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
      </main>

      <Footer />
    </div>
  );
}
