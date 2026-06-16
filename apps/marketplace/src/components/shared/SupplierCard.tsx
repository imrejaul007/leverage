'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, CheckCircle, MapPin, ArrowRight, MessageSquare, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface Supplier {
  id: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  country?: string;
  verified: boolean;
  rating: number;
  reviews: number;
  products: number;
  responseTime?: string;
  categories: string[];
  established?: string;
  contactEmail?: string;
  website?: string;
}

interface SupplierCardProps {
  supplier: Supplier;
  variant?: 'default' | 'compact' | 'list';
  onContact?: (supplier: Supplier) => void;
}

export function SupplierCard({
  supplier,
  variant = 'default',
  onContact,
}: SupplierCardProps) {
  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContact?.(supplier);
  };

  if (variant === 'list') {
    return (
      <Link
        href={`/suppliers/${supplier.id}`}
        className="block bg-white rounded-xl border border-black/5 p-4 hover:shadow-md hover:border-black/10 transition-all duration-200"
      >
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 bg-[#f7f5f1] rounded-lg overflow-hidden flex-shrink-0">
            {supplier.logo ? (
              <Image
                src={supplier.logo}
                alt={supplier.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#154230] font-bold text-xl">
                {supplier.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-[#101111] truncate">{supplier.name}</h3>
              {supplier.verified && (
                <CheckCircle className="w-4 h-4 text-[#154230] flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-[#4A4A4A] line-clamp-1 mb-2">{supplier.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#4A4A4A]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {supplier.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#A6824A] text-[#A6824A]" />
                {supplier.rating} ({supplier.reviews})
              </span>
              <span>{supplier.products} products</span>
            </div>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={handleContact}
          >
            Contact
          </Button>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/suppliers/${supplier.id}`}
      className="block bg-white rounded-2xl border border-black/5 p-5 hover:shadow-lg hover:border-black/10 transition-all duration-200 group"
    >
      {/* Header with Logo */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 bg-[#f7f5f1] rounded-xl overflow-hidden flex-shrink-0">
          {supplier.logo ? (
            <Image
              src={supplier.logo}
              alt={supplier.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#154230] font-bold text-2xl">
              {supplier.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-[#101111] truncate group-hover:text-[#154230] transition-colors">
              {supplier.name}
            </h3>
            {supplier.verified && (
              <CheckCircle className="w-4 h-4 text-[#154230] flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
            <MapPin className="w-3 h-3" />
            <span>{supplier.location}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-4">
        {supplier.description}
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-1 mb-4">
        {supplier.categories.slice(0, 3).map((cat) => (
          <Badge key={cat} variant="default" size="sm">
            {cat}
          </Badge>
        ))}
        {supplier.categories.length > 3 && (
          <Badge variant="default" size="sm">
            +{supplier.categories.length - 3}
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-black/5">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-[#A6824A] text-[#A6824A]" />
          <span className="font-semibold text-[#101111]">{supplier.rating}</span>
          <span className="text-[#4A4A4A]">({supplier.reviews})</span>
        </div>
        <span className="text-[#4A4A4A]">{supplier.products} products</span>
        {supplier.responseTime && (
          <span className="text-[#4A4A4A]">{supplier.responseTime}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleContact}
          className="text-[#5D1E21]"
        >
          <MessageSquare className="w-4 h-4" />
          Contact
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-[#4A4A4A]"
        >
          View Profile
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Link>
  );
}
