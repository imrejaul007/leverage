'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, MapPin, CheckCircle, Phone, MessageCircle, Camera } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
  isInCart?: boolean;
  variant?: 'default' | 'compact' | 'list' | 'indiamart';
  showQuickSpecs?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  isInCart = false,
  variant = 'default',
  showQuickSpecs = true,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const images = product.images || [product.image];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Auto-rotate images on hover (IndiaMART-style carousel)
  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  // IndiaMART-style compact list view
  if (variant === 'indiamart') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <Link href={`/products/${product.id}`} className="flex">
          {/* Image with carousel */}
          <div
            className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 bg-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setCurrentImageIndex(0); }}
          >
            <Image
              src={images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
              onLoad={() => setImageLoaded(true)}
            />

            {/* Image dots indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Discount badge */}
            {discount > 0 && (
              <Badge variant="error" size="sm" className="absolute top-2 left-2">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-3 flex flex-col">
            <div className="flex-1">
              <h3 className="font-semibold text-blue-600 hover:text-blue-700 line-clamp-2 text-sm sm:text-base">
                {product.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {product.location}
              </p>

              {/* Quick specs badges */}
              {showQuickSpecs && product.specifications && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                    <span key={key} className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                      {value}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Trust */}
            <div className="mt-2">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-lg font-bold text-gray-900">
                  ${typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                </span>
                <span className="text-xs text-gray-500">/{product.currency}</span>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2">
                {product.gstVerified && (
                  <span className="flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    GST Verified
                  </span>
                )}
                {product.trustseal && (
                  <span className="flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    TrustSEAL
                  </span>
                )}
                {product.yearsInBusiness && (
                  <span>{product.yearsInBusiness}+ yrs</span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-400">({product.reviews})</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant="accent"
                className="flex-1 text-xs h-8"
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart?.(product);
                }}
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Enquire
              </Button>
              <Button
                size="sm"
                variant="primary"
                className="flex-1 text-xs h-8"
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart?.(product);
                }}
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // List view
  if (variant === 'list') {
    return (
      <Link
        href={`/products/${product.id}`}
        className="block bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-md transition-all duration-200"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 bg-[#f7f5f1]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
              onLoad={() => setImageLoaded(true)}
            />
            {product.featured && (
              <div className="absolute top-2 left-2">
                <Badge variant="accent" size="sm">Featured</Badge>
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-2 left-2">
                <Badge variant="error" size="sm">-{discount}%</Badge>
              </div>
            )}
          </div>
          <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-[#101111] mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-2">{product.description}</p>
              <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#A6824A] text-[#A6824A]" />
                  {product.rating} ({product.reviews})
                </span>
                <span>MOQ: {product.moq}</span>
                <span className="hidden sm:inline">by {product.supplier}</span>
              </div>
            </div>
            <div className="flex sm:flex-col items-center sm:items-end gap-3">
              <div>
                <span className="text-xl font-bold text-[#154230]">${product.price.toLocaleString()}</span>
                <span className="text-sm text-[#4A4A4A]">/{product.currency}</span>
              </div>
              <Button
                size="sm"
                variant={isInCart ? 'accent' : 'primary'}
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart?.(product);
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                {isInCart ? 'Added' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default grid card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className={`bg-white rounded-2xl overflow-hidden border border-black/5 transition-all duration-200 ${
          isHovered ? 'shadow-lg border-black/10' : 'shadow-sm'
        }`}>
          {/* Image with carousel */}
          <div className="relative h-40 sm:h-48 bg-[#f7f5f1] overflow-hidden">
            <Image
              src={images[currentImageIndex]}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
              unoptimized
              onLoad={() => setImageLoaded(true)}
            />

            {/* Navigation arrows on hover */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className={`absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                    currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="text-xs">‹</span>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-xs">›</span>
                </button>
              </>
            )}

            {/* Image dots */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.featured && !product.originalPrice && (
                <Badge variant="accent" size="sm">Featured</Badge>
              )}
              {discount > 0 && (
                <Badge variant="error" size="sm">-{discount}% OFF</Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite?.(product);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isFavorite
                    ? 'bg-[#5D1E21] text-white'
                    : 'bg-white/90 hover:bg-white text-[#4A4A4A]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-[#101111] line-clamp-1 group-hover:text-[#154230] transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-[#4A4A4A] flex-shrink-0">
                <Star className="w-3 h-3 fill-[#A6824A] text-[#A6824A]" />
                <span>{product.rating}</span>
              </div>
            </div>

            <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-3 min-h-[2.5rem]">
              {product.description}
            </p>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-xl font-bold text-[#154230]">
                ${typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
              </span>
              <span className="text-xs text-[#4A4A4A]">/{product.currency}</span>
            </div>
            <p className="text-xs text-[#4A4A4A] mb-3">MOQ: {product.moq}</p>

            <div className="flex items-center justify-between text-xs text-[#4A4A4A] mb-3">
              <span className="truncate">{product.supplier}</span>
              <span className="flex-shrink-0">{product.salesCount.toLocaleString()} sold</span>
            </div>

            <Button
              className="w-full"
              size="sm"
              variant={isInCart ? 'accent' : 'primary'}
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Re-export the Product type for convenience
export type { Product };
