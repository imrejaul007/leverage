'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  MessageSquare,
  Shield,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  Eye,
  Minus,
  Plus,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard, Product } from '@/components/shared/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/useToast';

// Mock product data
const getProduct = (id: string): Product | undefined => {
  const products: Record<string, Product> = {
    '1': {
      id: '1',
      name: 'Premium Basmati Rice 1121',
      description: 'Extra long grain aromatic basmati rice for export. Perfect for international trade. Our premium Basmati Rice 1121 is sourced directly from the finest farms in India and Pakistan, ensuring authentic quality and taste.',
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
      images: [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
        'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800',
        'https://images.unsplash.com/photo-1596811928834-5ab10af3f0ec?w=800',
      ],
    },
    '2': {
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
    '3': {
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
  };
  return products[id];
};

const relatedProducts: Product[] = [
  {
    id: '5',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold pressed, first harvest olive oil.',
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
  {
    id: '4',
    name: 'Solar Panels 550W',
    description: 'Tier 1 solar panels with high efficiency.',
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
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProduct(productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { cartItems, addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f5f1]">
        <Header cartCount={cartCount} />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#101111] mb-4">Product Not Found</h1>
          <p className="text-[#4A4A4A] mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images || [product.image];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
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
    }, quantity);
    showToast(`${quantity} x ${product.name} added to cart`, 'success');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    showToast(
      isFavorite(product.id) ? 'Removed from favorites' : 'Added to favorites',
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header cartCount={cartCount} notificationCount={3} />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-[#4A4A4A] hover:text-[#154230]">
            Home
          </Link>
          <span className="text-[#4A4A4A]">/</span>
          <Link href="/products" className="text-[#4A4A4A] hover:text-[#154230]">
            Products
          </Link>
          <span className="text-[#4A4A4A]">/</span>
          <span className="text-[#101111]">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
              {discount > 0 && (
                <Badge variant="error" className="absolute top-4 left-4">
                  -{discount}% OFF
                </Badge>
              )}
              {product.featured && (
                <Badge variant="accent" className="absolute top-4 left-4">
                  Featured
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? 'border-[#154230]'
                        : 'border-transparent hover:border-black/10'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <Badge variant="emerald" size="sm" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#A6824A] text-[#A6824A]" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-[#4A4A4A]">({product.reviews} reviews)</span>
                </div>
                <span className="text-[#4A4A4A]">|</span>
                <span className="text-[#4A4A4A]">{product.salesCount.toLocaleString()} sold</span>
              </div>
            </div>

            <p className="text-[#4A4A4A] mb-6">{product.description}</p>

            {/* Price */}
            <div className="bg-[#f7f5f1] rounded-xl p-4 mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-[#154230]">
                  ${typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                </span>
                <span className="text-lg text-[#4A4A4A]">/{product.currency}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[#4A4A4A] line-through ml-2">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#4A4A4A]">
                MOQ: <span className="font-medium">{product.moq}</span>
              </p>
            </div>

            {/* Supplier Info */}
            <Link
              href={`/suppliers/${product.supplierId}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-black/5 mb-6 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#154230] rounded-lg flex items-center justify-center text-white font-bold">
                {product.supplier.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#101111]">{product.supplier}</span>
                  <CheckCircle className="w-4 h-4 text-[#154230]" />
                </div>
                <span className="text-sm text-[#4A4A4A]">Verified Supplier</span>
              </div>
              <Button variant="ghost" size="sm">
                View Profile
              </Button>
            </Link>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#101111] mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 text-center border border-black/10 rounded-lg"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                variant={isInCart(product.id) ? 'accent' : 'primary'}
                className="flex-1"
                onClick={handleAddToCart}
                leftIcon={<ShoppingCart className="w-5 h-5" />}
              >
                {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleToggleFavorite}
                leftIcon={
                  <Heart
                    className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`}
                  />
                }
              >
                {isFavorite(product.id) ? 'Favorited' : 'Favorite'}
              </Button>
              <Link href="/inbox">
                <Button size="lg" variant="secondary" leftIcon={<MessageSquare className="w-5 h-5" />}>
                  Contact
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-black/10">
              <div className="text-center">
                <Shield className="w-6 h-6 text-[#154230] mx-auto mb-2" />
                <span className="text-xs text-[#4A4A4A]">Verified Supplier</span>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 text-[#154230] mx-auto mb-2" />
                <span className="text-xs text-[#4A4A4A]">Global Shipping</span>
              </div>
              <div className="text-center">
                <CheckCircle className="w-6 h-6 text-[#154230] mx-auto mb-2" />
                <span className="text-xs text-[#4A4A4A]">Quality Assured</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-xl font-bold text-[#101111] mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={() => {
                  addToCart({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    currency: p.currency,
                    moq: p.moq,
                  });
                  showToast(`${p.name} added to cart`, 'success');
                }}
                isInCart={isInCart(p.id)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
