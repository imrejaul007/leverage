'use client';

import Link from 'next/link';
import { Calendar, Users, Clock, ArrowRight, Package, MapPin } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface RFQ {
  id: string;
  title: string;
  description: string;
  buyer: string;
  buyerId?: string;
  product: string;
  quantity: string;
  unit: string;
  targetPrice?: string;
  currency?: string;
  deliveryCountry: string;
  deadline: string;
  status: 'OPEN' | 'IN_REVIEW' | 'CLOSED' | 'AWARDED';
  responseCount: number;
  createdAt: string;
}

interface RFQCardProps {
  rfq: RFQ;
  variant?: 'default' | 'compact' | 'list';
  onQuote?: (rfq: RFQ) => void;
}

const statusColors: Record<RFQ['status'], 'success' | 'warning' | 'error' | 'default' | 'accent'> = {
  OPEN: 'success',
  IN_REVIEW: 'warning',
  CLOSED: 'default',
  AWARDED: 'accent',
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

  if (variant === 'list') {
    return (
      <Link
        href={`/rfqs/${rfq.id}`}
        className="block bg-white rounded-xl border border-black/5 p-4 hover:shadow-md hover:border-black/10 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-[#4A4A4A]">RFQ ID</span>
              <Badge variant={statusColors[rfq.status]} size="sm">
                {statusLabels[rfq.status]}
              </Badge>
            </div>
            <h3 className="font-semibold text-[#101111]">{rfq.title}</h3>
          </div>
          <Badge variant={statusColors[rfq.status]} size="sm">
            {rfq.responseCount} quotes
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-[#4A4A4A]">Buyer</span>
            <p className="font-medium">{rfq.buyer}</p>
          </div>
          <div>
            <span className="text-[#4A4A4A]">Product</span>
            <p className="font-medium truncate">{rfq.product}</p>
          </div>
          <div>
            <span className="text-[#4A4A4A]">Quantity</span>
            <p className="font-medium">{rfq.quantity} {rfq.unit}</p>
          </div>
          <div>
            <span className="text-[#4A4A4A]">Deadline</span>
            <p className={`font-medium flex items-center gap-1 ${isExpired ? 'text-red-500' : ''}`}>
              <Calendar className="w-3 h-3" />
              {rfq.deadline}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/rfqs/${rfq.id}`}
      className="block bg-white rounded-2xl border border-black/5 p-5 hover:shadow-lg hover:border-black/10 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-[#4A4A4A]">RFQ ID: {rfq.id}</span>
            {isExpired && (
              <Badge variant="error" size="sm">Expired</Badge>
            )}
          </div>
          <h3 className="font-semibold text-[#101111] line-clamp-1 group-hover:text-[#154230] transition-colors">
            {rfq.title}
          </h3>
        </div>
        <Badge variant={statusColors[rfq.status]} size="sm">
          {statusLabels[rfq.status]}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-4">
        {rfq.description}
      </p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="flex items-center gap-2 text-[#4A4A4A]">
          <Package className="w-4 h-4" />
          <span className="truncate">{rfq.quantity} {rfq.unit}</span>
        </div>
        <div className="flex items-center gap-2 text-[#4A4A4A]">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{rfq.deliveryCountry}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-black/5">
        <div className="flex items-center gap-4 text-sm text-[#4A4A4A]">
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
