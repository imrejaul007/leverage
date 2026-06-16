'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/layout/Hero';
import { RFQCard, RFQ } from '@/components/shared/RFQCard';
import { FilterDropdown } from '@/components/shared/FilterDropdown';
import { Pagination } from '@/components/shared/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

const rfqs: RFQ[] = [
  {
    id: 'RFQ-2024-001',
    title: 'Premium Basmati Rice 1121',
    description: 'Looking for 500 MT of premium basmati rice for our distribution network in the Middle East.',
    buyer: 'Global Imports LLC',
    buyerId: 'buyer-001',
    product: 'Basmati Rice',
    quantity: '500',
    unit: 'MT',
    targetPrice: '$800',
    currency: 'USD',
    deliveryCountry: 'UAE',
    deadline: 'Jun 25, 2026',
    status: 'OPEN',
    responseCount: 5,
    createdAt: '2026-06-10',
  },
  {
    id: 'RFQ-2024-002',
    title: 'Organic Cotton Yarn 40s',
    description: 'Need 10,000 KG of organic cotton yarn for our textile manufacturing facility.',
    buyer: 'EuroTrade Partners',
    buyerId: 'buyer-002',
    product: 'Cotton Yarn',
    quantity: '10,000',
    unit: 'KG',
    deliveryCountry: 'Germany',
    deadline: 'Jun 28, 2026',
    status: 'IN_REVIEW',
    responseCount: 3,
    createdAt: '2026-06-08',
  },
  {
    id: 'RFQ-2024-003',
    title: 'Electronic Components Set',
    description: 'Seeking various electronic components for our manufacturing needs.',
    buyer: 'Asia Pacific Trading',
    buyerId: 'buyer-003',
    product: 'Electronic Components',
    quantity: '5,000',
    unit: 'units',
    deliveryCountry: 'Singapore',
    deadline: 'Jul 1, 2026',
    status: 'OPEN',
    responseCount: 8,
    createdAt: '2026-06-05',
  },
  {
    id: 'RFQ-2024-004',
    title: 'Steel Billets Grade A',
    description: 'IS 2062 certified steel billets required for construction project.',
    buyer: 'Middle East Builders',
    buyerId: 'buyer-004',
    product: 'Steel Billets',
    quantity: '1,000',
    unit: 'MT',
    deliveryCountry: 'Saudi Arabia',
    deadline: 'Jul 5, 2026',
    status: 'OPEN',
    responseCount: 2,
    createdAt: '2026-06-01',
  },
  {
    id: 'RFQ-2024-005',
    title: 'Solar Panel Modules',
    description: 'Tier 1 solar panels for our renewable energy project.',
    buyer: 'Green Energy Solutions',
    buyerId: 'buyer-005',
    product: 'Solar Panels',
    quantity: '10,000',
    unit: 'units',
    deliveryCountry: 'Spain',
    deadline: 'Jul 10, 2026',
    status: 'OPEN',
    responseCount: 4,
    createdAt: '2026-05-28',
  },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_REVIEW', label: 'In Review' },
  { value: 'CLOSED', label: 'Closed' },
  { value: 'AWARDED', label: 'Awarded' },
];

const ITEMS_PER_PAGE = 10;

export default function RFQsPage() {
  const [status, setStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRFQs = useMemo(() => {
    if (status === 'all') return rfqs;
    return rfqs.filter((rfq) => rfq.status === status);
  }, [status]);

  const paginatedRFQs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRFQs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRFQs, currentPage]);

  const totalPages = Math.ceil(filteredRFQs.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header activeRoute="/rfqs" />

      <HeroSection
        title="Request for Quotes"
        subtitle="Submit quotes on RFQs from verified buyers worldwide. Win more business with competitive offers."
        icon={<FileText className="w-10 h-10" />}
        searchPlaceholder="Search RFQs..."
        stats={[
          { label: 'Active RFQs', value: rfqs.filter(r => r.status === 'OPEN').length.toString() },
          { label: 'Total Value', value: '$45M' },
          { label: 'Quote Win Rate', value: '89%' },
          { label: 'Avg Response', value: '24h' },
        ]}
        primaryCTA={{ label: 'Post RFQ', href: '/rfqs/new' }}
        secondaryCTA={{ label: 'Browse RFQs', href: '/rfqs' }}
      />

      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
            <FilterDropdown
              label="Status"
              options={statusOptions}
              value={status}
              onChange={(v) => {
                setStatus(v as string);
                setCurrentPage(1);
              }}
            />
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#4A4A4A]">
                {filteredRFQs.length} RFQs
              </span>
              <Link href="/rfqs/new">
                <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Post RFQ
                </Button>
              </Link>
            </div>
          </div>

          {/* RFQ List */}
          {paginatedRFQs.length > 0 ? (
            <>
              <div className="space-y-4">
                {paginatedRFQs.map((rfq) => (
                  <RFQCard
                    key={rfq.id}
                    rfq={rfq}
                    variant="list"
                    onQuote={() => {
                      window.location.href = `/rfqs/${rfq.id}`;
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
              icon={<FileText className="w-16 h-16" />}
              title="No RFQs found"
              description="There are no RFQs matching your filters."
              action={
                <div className="flex gap-3">
                  <Button onClick={() => setStatus('all')}>Clear Filters</Button>
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
