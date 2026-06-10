'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import BottomNav from '@/components/BottomNav';

interface Supplier {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  verified: boolean;
  rating: number;
  responseTime: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  moq: string;
  image: string;
  category: string;
  supplier: Supplier;
  tradeTerms: string[];
  reviews: number;
  salesCount: number;
  specifications: Record<string, string>;
  certifications: string[];
}

const products: Record<string, Product> = {
  '1': {
    id: '1', name: 'Premium Basmati Rice 1121', description: 'Extra long grain, aromatic basmati rice.', price: 850, currency: 'USD', moq: '50 MT', image: '🍚', category: 'Food & Agriculture',
    supplier: { id: '1', name: 'Global Trade Exports', country: 'India', countryCode: '🇮🇳', verified: true, rating: 4.8, responseTime: '< 2h' },
    tradeTerms: ['FOB', 'CIF', 'EXW'], reviews: 128, salesCount: 1248,
    specifications: { 'Grain Length': '8.35mm+', 'Moisture': '12% max', 'Broken': '1% max', 'Origin': 'India', 'Crop Year': '2023' },
    certifications: ['FSSAI', 'ISO 22000', 'HACCP'],
  },
  '2': {
    id: '2', name: 'Organic Cotton Yarn 40/1', description: '100% organic cotton yarn.', price: 3.20, currency: 'USD', moq: '10 MT', image: '🧶', category: 'Textiles',
    supplier: { id: '1', name: 'Global Trade Exports', country: 'India', countryCode: '🇮🇳', verified: true, rating: 4.8, responseTime: '< 2h' },
    tradeTerms: ['FOB', 'CIF'], reviews: 45, salesCount: 520,
    specifications: { 'Count': 'Ne 40/1', 'Type': 'Combed', 'Material': '100% Organic', 'Strength': '280 cN' },
    certifications: ['OEKO-TEX', 'GOTS'],
  },
  '3': {
    id: '3', name: 'Solar Panels 550W Mono PERC', description: 'Tier 1 solar panels.', price: 165, currency: 'USD', moq: '100 units', image: '☀️', category: 'Energy',
    supplier: { id: '2', name: 'Shanghai Import Co.', country: 'China', countryCode: '🇨🇳', verified: true, rating: 4.6, responseTime: '< 4h' },
    tradeTerms: ['FOB', 'CIF', 'DDP'], reviews: 89, salesCount: 2100,
    specifications: { 'Power': '550W', 'Efficiency': '21.5%', 'Warranty': '25 years', 'Dimensions': '2274×1134mm' },
    certifications: ['IEC 61215', 'CE', 'TUV'],
  },
  '4': {
    id: '4', name: 'Steel Billets Grade A', description: 'IS 2062 certified steel billets.', price: 620, currency: 'USD', moq: '100 MT', image: '⚙️', category: 'Metals & Minerals',
    supplier: { id: '3', name: 'Turkey Merchants', country: 'Turkey', countryCode: '🇹🇷', verified: true, rating: 4.9, responseTime: '< 1h' },
    tradeTerms: ['FOB', 'CIF'], reviews: 32, salesCount: 890,
    specifications: { 'Grade': 'IS 2062', 'Type': 'Carbon Steel', 'Length': '6-12m', 'Surface': 'Mill Finish' },
    certifications: ['ISO 9001', 'CE'],
  },
};

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids')?.split(',') || [];
  const compareProducts = ids.map(id => products[id]).filter(Boolean);

  if (compareProducts.length < 2) {
    return (
      <div className="space-y-6">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-[#D8CCBC] hover:text-[#F4F1EA]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Marketplace
        </Link>
        <div className="card text-center py-16">
          <span className="text-6xl mb-4 block">⚖️</span>
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-2">Select Products to Compare</h2>
          <p className="text-[#D8CCBC]/60">Go back and select at least 2 products to compare</p>
          <Link href="/marketplace" className="inline-block mt-6 px-6 py-3 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Get all unique specifications
  const allSpecs = useMemo(() => {
    const specs = new Set<string>();
    compareProducts.forEach(p => Object.keys(p.specifications).forEach(k => specs.add(k)));
    return Array.from(specs);
  }, [compareProducts]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-[#D8CCBC] hover:text-[#F4F1EA]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1 className="text-xl font-bold text-[#F4F1EA]">Compare Products</h1>
        <div />
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {compareProducts.map((product) => (
          <Link
            key={product.id}
            href={`/marketplace/${product.id}`}
            className="card hover:border-[#C49A6C]/30 transition-all"
          >
            <div className="aspect-square bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-xl flex items-center justify-center mb-4">
              <span className="text-6xl">{product.image}</span>
            </div>
            <h3 className="text-[#F4F1EA] font-semibold mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-[#C49A6C]">${product.price}</p>
          </Link>
        ))}
        {[...Array(4 - compareProducts.length)].map((_, i) => (
          <div key={i} className="card border-dashed flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-2 opacity-30">+</span>
            <p className="text-[#D8CCBC]/50 text-sm">Add Product</p>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="card overflow-x-auto">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Detailed Comparison</h2>

        {/* Price Row */}
        <div className="grid grid-cols-5 gap-4 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <div className="text-[#D8CCBC]/60 text-sm">Price</div>
          {compareProducts.map(p => (
            <div key={p.id} className={`text-xl font-bold ${p.price === Math.min(...compareProducts.map(x => x.price)) ? 'text-emerald-400' : 'text-[#C49A6C]'}`}>
              ${p.price}/{p.currency}
            </div>
          ))}
          {[...Array(4 - compareProducts.length)].map((_, i) => <div key={i} />)}
        </div>

        {/* MOQ Row */}
        <div className="grid grid-cols-5 gap-4 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <div className="text-[#D8CCBC]/60 text-sm">MOQ</div>
          {compareProducts.map(p => <div key={p.id} className="text-[#F4F1EA]">{p.moq}</div>)}
          {[...Array(4 - compareProducts.length)].map((_, i) => <div key={i} />)}
        </div>

        {/* Rating Row */}
        <div className="grid grid-cols-5 gap-4 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <div className="text-[#D8CCBC]/60 text-sm">Rating</div>
          {compareProducts.map(p => (
            <div key={p.id} className="flex items-center gap-1">
              <span className="text-[#C49A6C] font-semibold">{p.supplier.rating}</span>
              <span className="text-[#D8CCBC]/50 text-sm">({p.reviews})</span>
            </div>
          ))}
          {[...Array(4 - compareProducts.length)].map((_, i) => <div key={i} />)}
        </div>

        {/* Sales Row */}
        <div className="grid grid-cols-5 gap-4 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <div className="text-[#D8CCBC]/60 text-sm">Sales</div>
          {compareProducts.map(p => <div key={p.id} className="text-[#F4F1EA]">{p.salesCount.toLocaleString()}</div>)}
          {[...Array(4 - compareProducts.length)].map((_, i) => <div key={i} />)}
        </div>

        {/* Supplier Row */}
        <div className="grid grid-cols-5 gap-4 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <div className="text-[#D8CCBC]/60 text-sm">Supplier</div>
          {compareProducts.map(p => (
            <div key={p.id} className="flex items-center gap-2">
              <span>{p.supplier.countryCode}</span>
              <div>
                <div className="text-[#F4F1EA] text-sm">{p.supplier.name}</div>
                {p.supplier.verified && <span className="text-[#C49A6C] text-xs">✓ Verified</span>}
              </div>
            </div>
          ))}
          {[...Array(4 - compareProducts.length)].map((_, i) => <div key={i} />)}
        </div>

        {/* Trade Terms Row */}
        <div className="grid grid-cols-5 gap-4 py-4 border-b border-[rgba(255,255,255,0.05)]">
          <div className="text-[#D8CCBC]/60 text-sm">Trade Terms</div>
          {compareProducts.map(p => (
            <div key={p.id} className="flex flex-wrap gap-1">
              {p.tradeTerms.map(t => (
                <span key={t} className="px-2 py-0.5 bg-[#0E3B36] text-[#D8CCBC]/70 text-xs rounded">{t}</span>
              ))}
            </div>
          ))}
          {[...Array(4 - compareProducts.length)].map((_, i) => <div key={i} />)}
        </div>

        {/* Specifications */}
        {allSpecs.map(spec => (
          <div key={spec} className="grid grid-cols-5 gap-4 py-4 border-b border-[rgba(255,255,255,0.05)]">
            <div className="text-[#D8CCBC]/60 text-sm">{spec}</div>
            {compareProducts.map(p => (
              <div key={p.id} className="text-[#F4F1EA] text-sm">{p.specifications[spec] || '-'}</div>
            ))}
            {[...Array(4 - compareProducts.length)].map((_, i) => <div key={i} />)}
          </div>
        ))}

        {/* Certifications */}
        <div className="grid grid-cols-5 gap-4 py-4">
          <div className="text-[#D8CCBC]/60 text-sm">Certifications</div>
          {compareProducts.map(p => (
            <div key={p.id} className="flex flex-wrap gap-1">
              {p.certifications.slice(0, 2).map(c => (
                <span key={c} className="px-2 py-0.5 bg-[#0E3B36] text-[#C49A6C] text-xs rounded">{c}</span>
              ))}
            </div>
          ))}
          {[...Array(4 - compareProducts.length)].map((_, i) => <div key={i} />)}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        {compareProducts.map(p => (
          <Link
            key={p.id}
            href={`/marketplace/${p.id}`}
            className="flex-1 py-4 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl text-center hover:bg-[#D4AA82] transition-colors"
          >
            Get Quote - {p.name}
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeItem="marketplace" />
    </div>
  );
}
