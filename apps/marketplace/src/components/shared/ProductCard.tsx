'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  moq: string;
  category: string;
  supplier: string;
  supplierId?: string;
  rating: number;
  reviews: number;
  salesCount: number;
  featured?: boolean;
  image: string;
  images?: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
  isInCart?: boolean;
  variant?: 'default' | 'compact' | 'list';
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  isInCart = false,
  variant = 'default',
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

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
          {/* Image */}
          <div className="relative h-40 sm:h-48 bg-[#f7f5f1] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
              unoptimized
              onLoad={() => setImageLoaded(true)}
            />

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
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-[#4A4A4A] transition-colors"
              >
                <Eye className="w-4 h-4" />
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
