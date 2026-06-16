'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  CheckCircle,
  MapPin,
  MessageSquare,
  Globe,
  Calendar,
  Package,
  ExternalLink,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard, Product } from '@/components/shared/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const suppliers: Record<string, {
  id: string;
  name: string;
  logo: string;
  description: string;
  location: string;
  verified: boolean;
  rating: number;
  reviews: number;
  products: number;
  responseTime: string;
  categories: string[];
  established: string;
  website?: string;
  products: Product[];
}> = {
  'sup-001': {
    id: 'sup-001',
    name: 'Global Trade Exports',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Leading exporter of premium agricultural products including rice, spices, and pulses from India. With over 15 years of experience in international trade, we have established ourselves as a reliable partner for businesses worldwide. Our products are sourced directly from certified farms and processed under strict quality control measures.',
    location: 'Mumbai, India',
    verified: true,
    rating: 4.8,
    reviews: 128,
    products: 245,
    responseTime: '< 2 hours',
    categories: ['Food & Agriculture', 'Spices'],
    established: '2009',
    website: 'https://globaltradeexports.com',
    products: [
      {
        id: '1',
        name: 'Premium Basmati Rice 1121',
        description: 'Extra long grain aromatic basmati rice.',
        price: 850,
        currency: 'MT',
        moq: '50 MT',
        category: 'Food & Agriculture',
        supplier: 'Global Trade Exports',
        supplierId: 'sup-001',
        rating: 4.8,
        reviews: 128,
        salesCount: 1248,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
      },
    ],
  },
};

export default function SupplierProfilePage() {
  const params = useParams();
  const supplierId = params.id as string;
  const supplier = suppliers[supplierId];

  if (!supplier) {
    return (
      <div className="min-h-screen bg-[#f7f5f1]">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#101111] mb-4">Supplier Not Found</h1>
          <p className="text-[#4A4A4A] mb-8">The supplier you're looking for doesn't exist.</p>
          <Link href="/suppliers">
            <Button>Browse Suppliers</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-[#4A4A4A] hover:text-[#154230]">Home</Link>
          <span className="text-[#4A4A4A]">/</span>
          <Link href="/suppliers" className="text-[#4A4A4A] hover:text-[#154230]">Suppliers</Link>
          <span className="text-[#4A4A4A]">/</span>
          <span className="text-[#101111]">{supplier.name}</span>
        </nav>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative w-24 h-24 bg-[#f7f5f1] rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={supplier.logo}
                alt={supplier.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-[#101111]">{supplier.name}</h1>
                {supplier.verified && (
                  <Badge variant="emerald">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#4A4A4A] mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {supplier.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#A6824A] text-[#A6824A]" />
                  {supplier.rating} ({supplier.reviews} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Est. {supplier.established}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {supplier.categories.map((cat) => (
                  <Badge key={cat} variant="default">{cat}</Badge>
                ))}
              </div>

              <p className="text-[#4A4A4A]">{supplier.description}</p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link href="/inbox">
                <Button className="w-full" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Contact Supplier
                </Button>
              </Link>
              {supplier.website && (
                <Button variant="outline" className="w-full" leftIcon={<Globe className="w-4 h-4" />}>
                  Visit Website
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-black/5">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#154230]">{supplier.products}</p>
              <p className="text-sm text-[#4A4A4A]">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#154230]">{supplier.responseTime}</p>
              <p className="text-sm text-[#4A4A4A]">Response Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#154230]">{supplier.rating}</p>
              <p className="text-sm text-[#4A4A4A]">Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#101111]">Products</h2>
            <span className="text-sm text-[#4A4A4A]">{supplier.products.length} products</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {supplier.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
