'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  sku: string;
  minOrder: string;
  createdAt: string;
  image?: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    const stored = localStorage.getItem('leverage_products');
    if (stored) {
      const products: Product[] = JSON.parse(stored);
      const found = products.find(p => p.id === id);
      setProduct(found || null);
    }
    setIsLoading(false);
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cartItems = JSON.parse(localStorage.getItem('leverage_cart') || '[]');
    const existing = cartItems.find((item: Product & { quantity: number }) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }

    localStorage.setItem('leverage_cart', JSON.stringify(cartItems));
    router.push('/marketplace');
  };

  const handleContactSupplier = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    const inquiries = JSON.parse(localStorage.getItem('leverage_inquiries') || '[]');
    inquiries.push({
      id: Date.now().toString(),
      productId: product?.id,
      productName: product?.name,
      ...contactForm,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('leverage_inquiries', JSON.stringify(inquiries));

    setContactSent(true);
    setTimeout(() => {
      setShowContactModal(false);
      setContactSent(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/products" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Product Not Found</h1>
        </div>
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📦</span>
          </div>
          <p className="text-[#D8CCBC]/50 mb-4">This product does not exist or has been removed.</p>
          <Link href="/products" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400',
    inactive: 'bg-gray-500/20 text-gray-400',
    draft: 'bg-amber-500/20 text-amber-400',
  };

  const statusLabels: Record<string, string> = {
    active: 'Active',
    inactive: 'Inactive',
    draft: 'Draft',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/products" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-[#F4F1EA]">Product Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="aspect-square bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-xl flex items-center justify-center mb-4">
            <span className="text-8xl opacity-50">📦</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-[#0E3B36]/50 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-2xl opacity-50">📦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#F4F1EA]">{product.name}</h2>
                <p className="text-[#C49A6C] text-sm mt-1">SKU: {product.sku}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[product.status]}`}>
                {statusLabels[product.status]}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-bold text-[#C49A6C]">
                ${product.price.toLocaleString()}
                <span className="text-lg text-[#D8CCBC]/50 ml-2">{product.currency}</span>
              </p>
              <p className="text-[#D8CCBC]/50 mt-1">{product.stock} units in stock</p>
            </div>

            <div className="mb-6">
              <label className="text-[#D8CCBC] text-sm mb-2 block">Quantity</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-[#0E3B36] rounded-lg text-[#F4F1EA] flex items-center justify-center hover:bg-[#0E3B36]/80 transition-colors">-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 h-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F4F1EA] text-center focus:outline-none focus:border-[#C49A6C]" />
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 bg-[#0E3B36] rounded-lg text-[#F4F1EA] flex items-center justify-center hover:bg-[#0E3B36]/80 transition-colors">+</button>
                <span className="text-[#D8CCBC]/50 text-sm ml-2">Min order: {product.minOrder}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleAddToCart} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">Add to Cart</button>
              <button onClick={() => setShowContactModal(true)} className="flex-1 py-3 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-semibold hover:bg-[#0E3B36]/80 transition-colors border border-[rgba(255,255,255,0.1)]">Contact Supplier</button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-[#F4F1EA] font-semibold mb-4">Specifications</h3>
            <dl className="space-y-3">
              <div className="flex justify-between py-2 border-b border-[rgba(255,255,255,0.05)]"><dt className="text-[#D8CCBC]/50">Category</dt><dd className="text-[#F4F1EA]">{product.category}</dd></div>
              <div className="flex justify-between py-2 border-b border-[rgba(255,255,255,0.05)]"><dt className="text-[#D8CCBC]/50">Minimum Order</dt><dd className="text-[#F4F1EA]">{product.minOrder}</dd></div>
              <div className="flex justify-between py-2 border-b border-[rgba(255,255,255,0.05)]"><dt className="text-[#D8CCBC]/50">Stock Available</dt><dd className={`font-medium ${product.stock < 10 ? 'text-red-400' : 'text-[#F4F1EA]'}`}>{product.stock} units</dd></div>
              <div className="flex justify-between py-2"><dt className="text-[#D8CCBC]/50">Created</dt><dd className="text-[#F4F1EA]">{product.createdAt}</dd></div>
            </dl>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-[#F4F1EA] font-semibold mb-4">Description</h3>
        <p className="text-[#D8CCBC]/80 leading-relaxed">{product.description}</p>
      </div>

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">Contact Supplier</h2>
              <button onClick={() => setShowContactModal(false)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>

            {contactSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-[#F4F1EA] font-medium">Message Sent Successfully!</p>
                <p className="text-[#D8CCBC]/50 text-sm mt-2">The supplier will respond within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Your Name</label><input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full input" placeholder="John Smith" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Email Address</label><input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full input" placeholder="john@company.com" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Message</label><textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="w-full input resize-none" rows={4} placeholder={`I'm interested in ${product.name}. Please provide more details about pricing, MOQ, and delivery timeline.`} /></div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowContactModal(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">Cancel</button>
                  <button onClick={handleContactSupplier} disabled={!contactForm.name || !contactForm.email || !contactForm.message} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50">Send Message</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
