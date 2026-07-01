'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Shield, Globe, Truck, Users, MapPin, Star, TrendingUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard, Product } from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/useToast';
import { products } from '@/data/products';

// Popular categories (IndiaMART-style)
const popularCategories = [
  { name: 'Food & Agriculture', slug: 'Food & Agriculture', emoji: '🌾', count: products.filter(p => p.category === 'Food & Agriculture').length },
  { name: 'Textiles', slug: 'Textiles', emoji: '🧵', count: products.filter(p => p.category === 'Textiles').length },
  { name: 'Metals & Minerals', slug: 'Metals & Minerals', emoji: '⚙️', count: products.filter(p => p.category === 'Metals & Minerals').length },
  { name: 'Energy', slug: 'Energy', emoji: '⚡', count: products.filter(p => p.category === 'Energy').length },
];

// Quick access cities
const popularLocations = [
  'Mumbai', 'Delhi', 'Ahmedabad', 'Dubai', 'Shanghai', 'Istanbul', 'Addis Claude'
];

const features = [
  { icon: Shield, title: 'Verified Suppliers', description: 'All suppliers are vetted and verified' },
  { icon: Globe, title: '150+ Countries', description: 'Global reach for your business' },
  { icon: Truck, title: 'Integrated Logistics', description: 'End-to-end shipping solutions' },
  { icon: Users, title: '20K+ Buyers', description: 'Growing community of traders' },
];

const ITEMS_PER_PAGE = 8;

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { cartItems, addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const featuredProducts = useMemo(() => {
    return products.filter(p => p.featured || p.rating >= 4.8).slice(0, 4);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return featuredProducts;
    return products.filter(p => p.category === selectedCategory).slice(0, 8);
  }, [selectedCategory, featuredProducts]);

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
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} notificationCount={3} activeRoute="/" />

      {/* Hero Section - IndiaMART Style */}
      <section className="bg-gradient-to-br from-[#154230] via-[#1a5a3a] to-[#0d3d28] px-4 sm:px-8 py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Global B2B Marketplace
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Connect with verified suppliers and buyers from 150+ countries
            </p>
          </div>

          {/* Search Bar */}
          <form action="/products" method="GET" className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search products, suppliers, categories..."
                  className="w-full h-14 px-4 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                />
              </div>
              <button
                type="submit"
                className="h-14 px-8 bg-[#5D1E21] hover:bg-[#7a2629] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Products', value: '2,847' },
              { label: 'Suppliers', value: '523' },
              { label: 'Countries', value: '150+' },
              { label: 'Verified', value: '98%' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-6 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Post RFQ Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#A6824A] to-[#8a6a3a] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-white text-center sm:text-left">
              <h3 className="text-xl font-bold mb-1">Can't find what you need?</h3>
              <p className="text-white/80">Post a Request for Quote and let suppliers come to you</p>
            </div>
            <Link href="/rfqs/new">
              <Button variant="secondary" size="lg" rightIcon={<Plus className="w-5 h-5" />} className="bg-white text-[#A6824A] hover:bg-white/90">
                Post RFQ
              </Button>
            </Link>
          </motion.div>

          {/* Popular Categories */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Browse Categories</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {popularCategories.map((cat, i) => (
                <Link key={cat.slug} href={`/products?category=${encodeURIComponent(cat.slug)}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-[#154230]/30 transition-all cursor-pointer"
                  >
                    <span className="text-3xl mb-2 block">{cat.emoji}</span>
                    <h3 className="font-semibold text-gray-900 text-sm">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{cat.count}+ products</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>

          {/* Top Products */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCategory || 'Featured Products'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredProducts.length} products from verified suppliers
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/products" className="text-[#154230] font-medium hover:underline flex items-center gap-1 text-sm">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite(product.id)}
                  isInCart={isInCart(product.id)}
                />
              ))}
            </div>
          </section>

          {/* Trending Products Row - IndiaMART Style */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#A6824A]" />
                <h2 className="text-xl font-bold text-gray-900">Trending This Week</h2>
              </div>
              <Link href="/products?sort=sales" className="text-[#154230] font-medium hover:underline flex items-center gap-1 text-sm">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.sort((a, b) => b.salesCount - a.salesCount).slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="indiamart"
                  onAddToCart={handleAddToCart}
                  isInCart={isInCart(product.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose LEVERAGE Marketplace?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The trusted platform for global B2B trade
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-[#154230] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-r from-[#154230] to-[#1a5a3a]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to start trading?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of businesses already trading globally on LEVERAGE Marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} className="bg-white text-[#154230] hover:bg-white/90">
                Create Free Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
