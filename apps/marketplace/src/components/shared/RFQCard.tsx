'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, ArrowRight, Package, MapPin, FileText } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { RFQ } from '@/data/rfqs';

interface RFQCardProps {
  rfq: RFQ;
  variant?: 'default' | 'compact' | 'list' | 'indiamart';
  onQuote?: (rfq: RFQ) => void;
}

const statusColors: Record<RFQ['status'], 'success' | 'warning' | 'error' | 'default' | 'accent' | 'emerald'> = {
  OPEN: 'success',
  IN_REVIEW: 'warning',
  CLOSED: 'default',
  AWARDED: 'emerald',
};

const statusLabels: Record<RFQ['status'], string> = {
  OPEN: 'Open',
  IN_REVIEW: 'In Review',
  CLOSED: 'Closed',
  AWARDED: 'Awarded',
};

export function RFQCard({ rfq, variant = 'default', onQuote }: RFQCardProps) {
  const handleQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuote?.(rfq);
  };

  const isExpired = new Date(rfq.deadline) < new Date();

  // IndiaMART-style list variant
  if (variant === 'indiamart') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <Link href={`/rfqs/${rfq.id}`} className="block p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 hover:text-[#154230] transition-colors line-clamp-1">
                {rfq.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">{rfq.product}</p>
            </div>
            <Badge variant={statusColors[rfq.status]} size="sm" className="ml-2 flex-shrink-0">
              {statusLabels[rfq.status]}
            </Badge>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-3 gap-3 text-sm mb-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="font-bold text-gray-900">{rfq.quantity}</p>
              <p className="text-xs text-gray-500">{rfq.unit}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="font-bold text-gray-900">{rfq.responseCount}</p>
              <p className="text-xs text-gray-500">Quotes</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className={`font-bold ${isExpired ? 'text-red-500' : 'text-gray-900'}`}>
                {rfq.deadline.split(' ')[0]}
              </p>
              <p className="text-xs text-gray-500">Deadline</p>
            </div>
          </div>

          {/* Location & Price */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{rfq.deliveryCountry}</span>
            </div>
            {rfq.targetPrice && (
              <span className="font-medium text-gray-900">Target: {rfq.targetPrice}</span>
            )}
          </div>

          {/* Buyer & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              <span>By {rfq.buyer}</span>
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={handleQuote}
            >
              Submit Quote
            </Button>
          </div>
        </Link>
      </motion.div>
    );
  }

  // List variant
  if (variant === 'list') {
    return (
      <Link
        href={`/rfqs/${rfq.id}`}
        className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-500">RFQ ID: {rfq.id}</span>
              <Badge variant={statusColors[rfq.status]} size="sm">
                {statusLabels[rfq.status]}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900">{rfq.title}</h3>
          </div>
          <Badge variant={statusColors[rfq.status]} size="sm">
            {rfq.responseCount} quotes
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Buyer</span>
            <p className="font-medium">{rfq.buyer}</p>
          </div>
          <div>
            <span className="text-gray-500">Product</span>
            <p className="font-medium truncate">{rfq.product}</p>
          </div>
          <div>
            <span className="text-gray-500">Quantity</span>
            <p className="font-medium">{rfq.quantity} {rfq.unit}</p>
          </div>
          <div>
            <span className="text-gray-500">Deadline</span>
            <p className={`font-medium flex items-center gap-1 ${isExpired ? 'text-red-500' : ''}`}>
              <Calendar className="w-3 h-3" />
              {rfq.deadline}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // Default card variant
  return (
    <Link
      href={`/rfqs/${rfq.id}`}
      className="block bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500">RFQ ID: {rfq.id}</span>
            {isExpired && (
              <Badge variant="error" size="sm">Expired</Badge>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-[#154230] transition-colors">
            {rfq.title}
          </h3>
        </div>
        <Badge variant={statusColors[rfq.status]} size="sm">
          {statusLabels[rfq.status]}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
        {rfq.description}
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Package className="w-4 h-4" />
          <span className="truncate">{rfq.quantity} {rfq.unit}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{rfq.deliveryCountry}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {rfq.responseCount} quotes
          </span>
          <span className={`flex items-center gap-1 ${isExpired ? 'text-red-500' : ''}`}>
            <Clock className="w-4 h-4" />
            {rfq.deadline}
          </span>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={handleQuote}
        >
          Quote
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Link>
  );
}

// Re-export the RFQ type for convenience
export type { RFQ };
