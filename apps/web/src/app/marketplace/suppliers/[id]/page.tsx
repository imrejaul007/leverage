'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Star, MapPin, Clock, CheckCircle, Phone, MessageCircle, Shield, Award,
  ChevronRight, ArrowLeft, Globe, Calendar, TrendingUp, Package, FileText
} from 'lucide-react';

// Demo supplier data
const supplierData = {
  id: '1',
  name: 'Global Textile Exports Pvt Ltd',
  type: 'Manufacturer',
  location: 'Mumbai, India',
  established: '2010',
  rating: 4.8,
  reviews: 234,
  responseTime: '< 1 hour',
  gst: true,
  verified: true,
  tradeVolume: '$5M - $10M',
  description: 'Leading manufacturer and exporter of premium quality textiles, cotton fabrics, and apparel. We specialize in sustainable manufacturing with state-of-the-art facilities.',
  image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
  products: [
    { id: '1', name: 'Premium Cotton Fabric', price: '$4.50/meter', moq: '500 meters', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400' },
    { id: '2', name: 'Organic Cotton Yarn', price: '$6.80/kg', moq: '1000 kg', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400' },
    { id: '3', name: 'Bamboo Blend Fabric', price: '$8.20/meter', moq: '300 meters', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400' },
  ],
  certifications: ['ISO 9001:2015', 'GOTS Certified', 'OEKO-TEX'],
  yearsInBusiness: 14,
  totalOrders: 1247,
  onTimeDelivery: '98%',
};

export default function SupplierDetailPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const supplier = supplierData;
  const supplierProducts = supplier.products;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/marketplace/suppliers" className="flex items-center gap-2" style={{ color: '#4A4A4A' }}>
            <ArrowLeft className="w-5 h-5" />
            Back to Suppliers
          </Link>
          <Link href="/" className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>
            LEVERGE
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Supplier Hero */}
        <div className="rounded-2xl overflow-hidden mb-8" style={{ backgroundColor: 'white' }}>
          <div className="h-32" style={{ backgroundColor: '#154230' }} />
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-12">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-4" style={{ borderColor: 'white', backgroundColor: '#E6E2DA' }}>
                <img src={supplier.image} alt={supplier.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 pt-4 md:pt-12">
                <h1 className="text-2xl font-bold" style={{ color: '#101111' }}>{supplier.name}</h1>
                <p className="mt-1" style={{ color: '#4A4A4A' }}>{supplier.type}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-current" style={{ color: '#CA8A04' }} />
                    <span className="font-bold">{supplier.rating}</span>
                    <span className="text-sm" style={{ color: '#4A4A4A' }}>({supplier.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" style={{ color: '#4A4A4A' }} />
                    <span style={{ color: '#4A4A4A' }}>{supplier.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" style={{ color: '#4A4A4A' }} />
                    <span style={{ color: '#4A4A4A' }}>Responds {supplier.responseTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 md:pt-12">
                <button className="px-6 py-3 rounded-xl font-bold text-white" style={{ backgroundColor: '#154230' }}>
                  Send Enquiry
                </button>
                <button className="px-6 py-3 rounded-xl font-bold" style={{ backgroundColor: '#25D366', color: 'white' }}>
                  <MessageCircle className="w-5 h-5 inline mr-1" /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b" style={{ borderColor: '#E5E5E5' }}>
              {['products', 'about', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="pb-3 px-2 font-medium capitalize"
                  style={{
                    color: activeTab === tab ? '#154230' : '#4A4A4A',
                    borderBottom: activeTab === tab ? '2px solid #154230' : '2px solid transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {supplierProducts.map(product => (
                  <Link
                    key={product.id}
                    href={`/marketplace/products/${product.id}`}
                    className="rounded-xl overflow-hidden"
                    style={{ backgroundColor: 'white' }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium" style={{ color: '#101111' }}>{product.name}</h3>
                      <p className="font-bold mt-1" style={{ color: '#154230' }}>{product.price}</p>
                      <p className="text-sm mt-1" style={{ color: '#4A4A4A' }}>MOQ: {product.moq}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
                <h2 className="font-bold mb-4" style={{ color: '#101111' }}>About {supplier.name}</h2>
                <p style={{ color: '#4A4A4A' }}>{supplier.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-sm" style={{ color: '#4A4A4A' }}>Established</p>
                    <p className="font-medium">{supplier.established}</p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#4A4A4A' }}>Total Orders</p>
                    <p className="font-medium">{supplier.totalOrders.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#4A4A4A' }}>On-Time Delivery</p>
                    <p className="font-medium" style={{ color: '#16A34A' }}>{supplier.onTimeDelivery}</p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#4A4A4A' }}>Trade Volume</p>
                    <p className="font-medium">{supplier.tradeVolume}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm mb-2" style={{ color: '#4A4A4A' }}>Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {supplier.certifications.map(cert => (
                      <span key={cert} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#15423015', color: '#154230' }}>
                        <Award className="w-4 h-4 inline mr-1" />{cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold" style={{ color: '#154230' }}>{supplier.rating}</div>
                    <div>
                      <div className="flex">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#CA8A04' }} />
                        ))}
                      </div>
                      <p className="text-sm mt-1" style={{ color: '#4A4A4A' }}>Based on {supplier.reviews} reviews</p>
                    </div>
                  </div>
                </div>
                {[1,2,3].map(i => (
                  <div key={i} className="p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#154230', color: 'white' }}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <div>
                          <p className="font-medium">Company {String.fromCharCode(65 + i)}</p>
                          <p className="text-sm" style={{ color: '#4A4A4A' }}>Verified Buyer</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className="w-4 h-4 fill-current" style={{ color: '#CA8A04' }} />
                        ))}
                      </div>
                    </div>
                    <p style={{ color: '#4A4A4A' }}>
                      Excellent quality products and professional service. Highly recommended for textile exports.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Badges */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
              <h3 className="font-bold mb-4">Trust Badges</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" style={{ color: '#16A34A' }} />
                  <span>GST Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" style={{ color: '#0891B2' }} />
                  <span>Verified Supplier</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" style={{ color: '#A6824A' }} />
                  <span>High Response Rate</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
              <h3 className="font-bold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span style={{ color: '#4A4A4A' }}>Years in Business</span>
                  <span className="font-bold">{supplier.yearsInBusiness}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#4A4A4A' }}>Total Orders</span>
                  <span className="font-bold">{supplier.totalOrders.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#4A4A4A' }}>On-Time Delivery</span>
                  <span className="font-bold" style={{ color: '#16A34A' }}>{supplier.onTimeDelivery}</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'white' }}>
              <h3 className="font-bold mb-4">Contact Supplier</h3>
              <button className="w-full py-3 rounded-xl font-bold text-white mb-3" style={{ backgroundColor: '#154230' }}>
                Send Enquiry
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-xl font-medium" style={{ backgroundColor: '#25D366', color: 'white' }}>
                  <MessageCircle className="w-5 h-5 inline mr-1" /> WhatsApp
                </button>
                <button className="py-3 rounded-xl font-medium" style={{ backgroundColor: '#16A34A', color: 'white' }}>
                  <Phone className="w-5 h-5 inline mr-1" /> Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
