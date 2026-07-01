'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FileText, Plus, Filter, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RFQCard } from '@/components/shared/RFQCard';
import { Pagination } from '@/components/shared/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { rfqs, RFQStatus } from '@/data/rfqs';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'OPEN', label: 'Open', count: rfqs.filter(r => r.status === 'OPEN').length },
  { value: 'IN_REVIEW', label: 'In Review', count: rfqs.filter(r => r.status === 'IN_REVIEW').length },
  { value: 'CLOSED', label: 'Closed', count: rfqs.filter(r => r.status === 'CLOSED').length },
  { value: 'AWARDED', label: 'Awarded', count: rfqs.filter(r => r.status === 'AWARDED').length },
];

const ITEMS_PER_PAGE = 10;

export default function RFQsPage() {
  const [status, setStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'indiamart'>('indiamart');

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
    <div className="min-h-screen bg-gray-50">
      <Header activeRoute="/rfqs" />

      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Request for Quotes</h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredRFQs.length} RFQs from verified buyers
            </p>
          </div>
          <Link href="/rfqs/new">
            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Post RFQ
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setStatus(opt.value); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  status === opt.value
                    ? 'bg-[#154230] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
                {opt.count !== undefined && (
                  <span className="ml-1 text-xs opacity-70">({opt.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* RFQ List */}
        {paginatedRFQs.length > 0 ? (
          <>
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                  : 'flex flex-col gap-3'
              }
            >
              {paginatedRFQs.map((rfq) => (
                <RFQCard
                  key={rfq.id}
                  rfq={rfq}
                  variant={viewMode === 'grid' ? 'default' : 'indiamart'}
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
      </main>

      <Footer />
    </div>
  );
}
